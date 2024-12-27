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
(async () => {
    const main = await import(chrome.runtime.getURL('dist/src/main.js'));
    main.default()
  })();
