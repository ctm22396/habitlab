{cfy, add_noerr} = require 'cfy'

open_debug_page_for_tab_id = (tab_id) ->>
  debug_page_url = chrome.runtime.getURL('index.html?tag=terminal-view&autoload=true&ispopup=true&tabid=' + tab_id)
  popup_windows = await add_noerr -> chrome.windows.getAll {windowTypes: ['popup']}, it
  for popup_window in popup_windows
    window_info = await add_noerr -> chrome.windows.get popup_window.id, {populate: true}, it
    for tab in window_info.tabs
      if tab.url == debug_page_url
        await add_noerr -> chrome.tabs.update tab.id, {active: true}, it
        return await add_noerr -> chrome.windows.update popup_window.id, {focused: true}, it
  await add_noerr -> chrome.windows.create {url: debug_page_url, type: 'popup', width: 566, height: 422}, it

module.exports.open_debug_page_for_tab_id = open_debug_page_for_tab_id