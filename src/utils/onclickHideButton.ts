import { LISTING_ID_ATTRIBUTE_NAME } from "../constants.js";
import { HiddenListing } from "../types/database/model/HiddenListing.js";
import { add } from "./database/chromeStorageLocalDb.js";
import { getSearchListings } from "./getSearchListings.js";

/**
 * onclick for Hide button
 * @param event 
 */
export async function onclickHideButton(event: MouseEvent) {
    const listingId = (event.target as HTMLElement).getAttribute(LISTING_ID_ATTRIBUTE_NAME)
    if (!listingId) {
        throw new Error(`onclickHideButton(): Hide button is displayed on screen but does not contain the listing ID.`)
    }

    const listing = getSearchListings().find(l => l.listingId === listingId)
    if (!listing) {
        throw new Error(`onclickHideButton(): Hide button is displayed on screen but could not find a matching listing on the page. ${JSON.stringify(getSearchListings())}`)
    }

    await add('HiddenListing', {
        id: listingId,
        addedDate: new Date()
    } as HiddenListing)

    /**
     * Do not remove the element from DOM as it breaks results page when moving between pages
     */
    listing.element.hidden = true
    console.log(`onclickHideButton success for listing ID: ${listingId}`)
}