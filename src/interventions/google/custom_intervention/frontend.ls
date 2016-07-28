console.log 'custom intervention running'

require 'libs_common/systemjs'

require! list_requires

{
  listen_for_eval
  insert_console
} = require 'libs_frontend/content_script_debug'

javascript_code = intervention.params.code.value
if intervention.params.livescript.value
  LiveScript = require 'livescript15'
  console.log 'compiled with livescript'
  javascript_code = LiveScript.compile javascript_code, {bare: true, header: false}
  console.log javascript_code

systemjs_require <- System.import('libs_common/systemjs_require').then()
require <- systemjs_require.make_require_frontend(list_requires(javascript_code)).then()

if intervention.params.debug.value
  listen_for_eval ((x) -> eval(x))
  insert_console ((x) -> eval(x)), {lang: 'livescript'}

console.log 'starting eval in custom intervention'
eval(javascript_code)
console.log 'finishing eval in custom intervention'
