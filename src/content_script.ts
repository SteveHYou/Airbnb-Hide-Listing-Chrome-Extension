/**
 * Only purpose of this file is to import main.ts and feed into manifest.json's content_scripts.js
 * 
 * Technical limitations prevent content scripts from being modules
 * so using dynamic import (ES2020 required) as workaround.
 * https://stackoverflow.com/a/53033388
 * 
 * Also, as we cannot use any imports, handling typing becomes challenging.
 * Therefore main.ts was created to be the "wrapper" for entire content_scripts logic,
 * then it is dynamically imported and triggered here once.
 */

chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
  if (message?.message === 'Tab updated') {  // Ideally this string should be part of constant.ts but don't want to deal with another dynamic import scenario :(
    console.log(`Tab updated: ${JSON.stringify(message)}`);
    (async () => {
      /**
       * Ideally import should be done once but performance impact is probably minimal
       * and would rather not worry about caching the import
       */
      const main = await import(chrome.runtime.getURL('dist/src/main.js'))
      main.default()
      sendResponse('Finished processing Tab updated')
    })();
  } else {
    // Prevents error "background.js:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received"
    sendResponse('No processing was done')
  }
  return true // Indicates async processing used in this listener. Makes chrome.tabs.sendMessage to wait for the async response.
})
