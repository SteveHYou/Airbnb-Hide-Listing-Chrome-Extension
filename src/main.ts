/**
 * Imports in browser environments must include file extensions,
 * but allowImportingTsExtensions: true won't work as it requires 
 * noEmit and we need to emit js files.
 * 
 * Putting .js extension as workaround as setting up project to use webpack
 * infrastructure seems too cumbersome.
 */
import { isOnSearchPage } from "./utils/isOnSearchPage.js"
import { addHideBtnToPage } from "./utils/addHideBtnToPage.js"
import { createTable, dropTable } from "./utils/database/chromeStorageLocalDb.js"
import { hideListings } from "./utils/hideListings.js"

/**
 * See src/content_scripts.ts for the purpose of this file.
 * This function should contain all content_script logic.
 */
export default async function() {
    if (!isOnSearchPage(window.location.href)) {
        console.log(`Not on search page. Exiting.`)
        return
    }
    // await dropTable('HiddenListing')
    // console.log(`Current storage: ${JSON.stringify(await chrome.storage.local.get())}`)

    /**
     * Probably table should be created one time after installing the extension instead of putting here
     * But let's keep it simple...
     */
    await createTable('HiddenListing')
    hideListings()
    addHideBtnToPage()
    console.log(`isOnSearchPage: ${isOnSearchPage(window.location.href)}`)
}
