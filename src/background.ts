/**
 * Service workers can use modules as defined in manifest.json.
 * So no need to worry about dynamic imports like within content script, but 
 * ESM modules still require file extensions on imports.
 */

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    /**
     * When onUpdated is triggered from 'complete' status, it doesn't populate changeInfo.url since it's separate from url change
     * So we must use tab.url to grab current url state
     */
    if (changeInfo.status === 'complete' &&
        /**
         * Handles error "Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist."
         * See README.
         */
        tab?.url && /:\/\/.*\.airbnb\..*\/s\//.test(tab.url)) {
        console.log(`tabs.onUpdated ::: Detected load completion of Airbnb search page ${tab.url}. Sending update message.`)
        chrome.tabs.sendMessage(tabId, {
            message: 'Tab updated'
        })
    }
})
