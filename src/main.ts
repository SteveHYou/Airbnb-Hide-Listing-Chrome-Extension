/**
 * Imports in browser environments must include file extensions,
 * but allowImportingTsExtensions: true won't work as it requires 
 * noEmit and we need to emit js files.
 * 
 * Putting .js extension as workaround as setting up project to use webpack
 * infrastructure seems too cumbersome.
 */
import { isOnSearchPage } from "./utils/isOnSearchPage.js"

/**
 * See src/content_scripts.ts for the purpose of this file.
 * This function should contain all content_script logic.
 */
export default function() {
    if (!isOnSearchPage()) {
        console.log(`Not on search page. Exiting.`)
        return
    }

    console.log(`isOnSearchPage: ${isOnSearchPage()}`)
    console.log('hello')
}
