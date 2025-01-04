import { searchListingEleQuery, urlWithinSearchListingQuery as urlEleQueryWithinSearchListing } from "../constants.js"
import { SearchListing } from "../types/SearchListing.js"
import { getHideButtonId } from "./getHideButtonId.js"

/**
 * Parses current page's HTML to build SearchListing objs
 */
export function getSearchListings(): SearchListing[] {
    const eles = document.querySelectorAll(searchListingEleQuery)
    if (!eles || eles.length <= 0) {
        return []
    }

    return [...eles].map(ele => {
        return convertElementToSearchListing(ele)
    }).filter(ele => ele !== undefined)
}

/**
 * Converts a search listing element into SearchListing instance
 * @param ele Element for a search listing
 * @returns 
 */
export function convertElementToSearchListing(ele: Element): SearchListing | undefined {
    if (!(ele instanceof HTMLElement)) {
        console.error(`convertElementToSearchListing::: Found a non-HTMLElement`)
        return
    }

    const listingId = getListingIdFromSearchListing(ele)
    if (!listingId) {
        return
    }

    const searchListing: SearchListing = {
        element: ele,
        listingId,
        hideBtn: getHideButtonFromSearchListing(listingId),
    }
    return searchListing
}

/**
 * Returns listing ID for a search listing
 * @param ele Element for a search listing
 * @returns 
 */
export function getListingIdFromSearchListing(ele: Element): string | undefined {
    if (!(ele instanceof HTMLElement)) {
        console.error(`getListingIdFromSearchListing ::: Found a non-HTMLElement`)
        return
    }
    const url = ele.querySelector(urlEleQueryWithinSearchListing)?.getAttribute('content')
    if (!url) {
        console.error(`getListingIdFromSearchListing ::: Couldn't find url within ele. Element might not be a search listing element, or listing structure has changed by Airbnb.`)
        return
    }
    return url.split('/rooms/')?.[1]
        ?.match(/^\d+/)?.[0] // Grabs all numeric digits from beginning of string
}

export function getHideButtonFromSearchListing(listingId: string): HTMLElement | undefined {
    if (!listingId) {
        throw new Error(`getHideButtonFromSearchListing(): Valid listingId must be passed in`)
    }

    const hideBtns = document.querySelectorAll(`${searchListingEleQuery} button#${getHideButtonId(listingId)}`)
    if (!hideBtns || hideBtns.length <= 0) {
        console.log(`getHideButtonFromSearchListing(): No hide buttons found from listing ID [${listingId}]`)
        return
    }
    if (hideBtns.length > 1) {
        /**
         * If this happens:
         * - Ensure there is only one hide button on the screen for specific listing
         * - Hide button query is unique enough
         */
        throw new Error(`getHideButtonFromSearchListing(): Found more than 1 hide button for listing ID [${listingId}].`)
    }

    const hideBtn = hideBtns[0]
    if (!(hideBtn instanceof HTMLElement)) {
        console.log(`getHideButtonFromSearchListing(): Found an element from listing ID [${listingId}] but it wasn't an HTMLElement.`)
        return
    }
    return hideBtn
}