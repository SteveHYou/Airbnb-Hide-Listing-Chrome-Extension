/**
 * Content scripts cannot be used as a module, so using dynamic import (ES2020 required) as workaround.
 * https://stackoverflow.com/a/53033388
 */
(async () => {
    const utilsFile = chrome.runtime.getURL('dist/scripts/utils.js');
    const utils = await import(utilsFile);
    console.log(`isOnSearchPage: ${utils.isOnSearchPage()}`)
  })();