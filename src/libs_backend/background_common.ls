$ = require 'jquery'
{
  memoizeSingleAsync
  memoize
} = require 'libs_common/memoize'

require! {
  async
  dexie
}

{gexport} = require 'libs_common/gexport'

export getInterventionInfo = (intervention_name, callback) ->
  intervention_info_text <- $.get "/interventions/#{intervention_name}/info.json"
  intervention_info = JSON.parse intervention_info_text
  intervention_info.name = intervention_name
  callback intervention_info

export get_enabled_interventions = ->
  enabled_interventions_str = localStorage.getItem('enabled_interventions')
  if not enabled_interventions_str?
    enabled_interventions = {}
  else
    enabled_interventions = JSON.parse enabled_interventions_str
  return enabled_interventions

export set_enabled_interventions = (enabled_interventions) ->
  localStorage.setItem 'enabled_interventions', JSON.stringify(enabled_interventions)

export set_intervention_enabled = (intervention_name) ->
  enabled_interventions = get_enabled_interventions()
  if enabled_interventions[intervention_name]?
    return
  enabled_interventions[intervention_name] = true
  set_enabled_interventions enabled_interventions

export set_intervention_disabled = (intervention_name) ->
  enabled_interventions = get_enabled_interventions()
  if not enabled_interventions[intervention_name]?
    return
  delete enabled_interventions[intervention_name]
  set_enabled_interventions enabled_interventions

export is_intervention_enabled = (intervention_name) ->
  enabled_interventions = get_enabled_interventions()
  return enabled_interventions[intervention_name]?

export get_interventions = memoizeSingleAsync (callback) ->
  $.get '/interventions/interventions.json', (interventions_list_text) ->
    interventions_list = JSON.parse interventions_list_text
    output = {}
    fix_content_script_options = (options, intervention_name) ->
      if typeof options == 'string'
        options = {path: options}
      if options.path[0] == '/'
        options.path = options.path.substr(1)
      else
        options.path = "interventions/#{intervention_name}/#{options.path}"
      if not options.run_at?
        options.run_at = 'document_end' # document_start
      if not options.all_frames?
        options.all_frames = false
      return options
    fix_background_script_options = (options, intervention_name) ->
      if typeof options == 'string'
        options = {path: options}
      if options.path[0] == '/'
        options.path = options.path.substr(1)
      else
        options.path = "interventions/#{intervention_name}/#{options.path}"
      return options
    errors,results <- async.mapSeries interventions_list, (intervention_name, ncallback) ->
      intervention_info <- getInterventionInfo intervention_name
      if not intervention_info.nomatches?
        intervention_info.nomatches = []
      if not intervention_info.matches?
        intervention_info.matches = []
      if not intervention_info.content_scripts?
        intervention_info.content_scripts = []
      if not intervention_info.background_scripts?
        intervention_info.background_scripts = []
      intervention_info.content_script_options = [fix_content_script_options(x, intervention_name) for x in intervention_info.content_scripts]
      intervention_info.background_script_options = [fix_background_script_options(x, intervention_name) for x in intervention_info.background_scripts]
      intervention_info.match_regexes = [new RegExp(x) for x in intervention_info.matches]
      intervention_info.nomatch_regexes = [new RegExp(x) for x in intervention_info.nomatches]
      output[intervention_name] = intervention_info
      ncallback null, null
    callback output

export list_enabled_interventions_for_location = (location, callback) ->
  available_interventions <- list_available_interventions_for_location(location)
  enabled_interventions = get_enabled_interventions()
  callback available_interventions.filter((x) -> enabled_interventions[x]?)

export list_available_interventions_for_location = (location, callback) ->
  all_interventions <- get_interventions()
  possible_interventions = []
  for intervention_name,intervention_info of all_interventions
    blacklisted = false
    for regex in intervention_info.nomatch_regexes
      if regex.test(location)
        blacklisted = true
        break
    if blacklisted
      continue
    matches = false
    for regex in intervention_info.match_regexes
      if regex.test(location)
        matches = true
        break
    if matches
      possible_interventions.push intervention_name
  callback possible_interventions

export send_message_to_active_tab = (type, data, callback) ->
  chrome.tabs.query {active: true, lastFocusedWindow: true}, (tabs) ->
    if tabs.length == 0
      return
    chrome.tabs.sendMessage tabs[0].id, {type, data}, {}, callback

send_message_to_all_active_tabs = (type, data, callback) ->
  chrome.tabs.query {active: true}, (tabs) ->
    if tabs.length == 0
      return
    outputs = []
    <- async.eachSeries tabs, (tab, ncallback) ->
      chrome.tabs.sendMessage tab.id, {type, data}, {}, (result) ->
        outputs.push(result)
        ncallback()
        return true
    callback(outputs)

export eval_content_script = (script, callback) ->
  send_message_to_all_active_tabs 'eval_content_script', script, (results) ->
    for result in results
      console.log result
    callback?(result)
    return true

export send_message_to_tabid = (tabid, type, data, callback) ->
  chrome.tabs.sendMessage tabid, {type, data}, {}, callback

export get_active_tab_info = (callback) ->
  chrome.tabs.query {active: true, lastFocusedWindow: true}, (tabs) ->
    if tabs.length == 0
      return
    chrome.tabs.get tabs[0].id, callback

export getDb = memoize ->
  db = new dexie('habitlab')
  db.version(1).stores({
    vars: 'key,val'
    lists: '++id,key,val'
  })
  return db

#export deleteDb = (callback) ->
#  getDb().delete().then callback

export getCollection = (collection_name) ->
  db = getDb()
  return db[collection_name]

export getVarsCollection = memoize ->
  getCollection 'vars'

export getListsCollection = memoize ->
  getCollection 'lists'

export incvar = (key, val, callback) ->
  data = getVarsCollection()
  new_val = val
  num_modified <- data.where(':id').equals(key).modify((x) ->
    x.val += val
    new_val := x.val
  ).then
  if num_modified == 1
    if callback?
      callback(new_val)
    return
  if num_modified > 1
    console.log "incvar #{key} matched more than 1"
    if callback?
      callback(new_val)
    return
  setvar key, val, callback

export setvar = (key, val, callback) ->
  data = getVarsCollection()
  <- data.put({key: key, val: val}).then
  if callback?
    callback val

export getvar = (key, callback) ->
  data = getVarsCollection()
  result <- data.get(key).then
  if result?
    return callback result.val
  else
    return callback null

export clearvar = (key, callback) ->
  data = getVarsCollection()
  num_deleted <- data.where(':id').equals(key).delete().then
  callback?!

export printvar = (key) ->
  result <- getvar key
  console.log result

export addtolist = (key, val, callback) ->
  data = getListsCollection()
  result <- data.add({'key': key, 'val': val}).then
  callback?!

export getlist = (key, callback) ->
  data = getListsCollection()
  result <- data.where('key').equals(key).toArray().then
  callback [x.val for x in result]

export clearlist = (key, callback) ->
  data = getListsCollection()
  num_deleted <- data.where('key').equals(key).delete().then
  callback?!


/*
export addtolist = (name, val, callback) ->
  data <- getListsCollection()
  result <- data.upsert {name: name, val: val}
  if callback?
    callback()

export getlist = (name, callback) ->
  data <- getListsCollection()
  result <- data.find({name: name}).fetch()
  callback [x.val for x in result]

export clearlist = (name, callback) ->
  data <- getListsCollection()
  result <- data.find({name: name}).fetch()
  <- async.eachSeries result, (item, ncallback) ->
    <- data.remove item['_id']
    ncallback()
  if callback?
    callback()

export printlist = (name) ->
  result <- getlist name
  console.log result

export clear_all_lists = (callback) ->
  data <- getListsCollection()
  result <- data.find({}).fetch()
  <- async.eachSeries result, (item, ncallback) ->
    <- data.remove item['_id']
    ncallback()
  if callback?
    callback()

export clear_all_vars = (callback) ->
  data <- getVarsCollection()
  result <- data.find({}).fetch()
  <- async.eachSeries result, (item, ncallback) ->
    <- data.remove item['_id']
    ncallback()
  if callback?
    callback()

export clear_all = (callback) ->
  <- async.series [
    clear_all_vars
    clear_all_lists
  ]
  if callback?
    callback()
*/

export printcb = (x) -> console.log(x)

export printfunc = (func, ...args) ->
  nargs = [x for x in args]
  nargs.push printcb
  func.apply({}, nargs)

eval_background_common = (str) -> eval(str)

get_exports_background_common = -> module.exports

gexport {
  eval_background_common
}
