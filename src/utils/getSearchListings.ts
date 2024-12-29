import { searchListingEleQuery, urlWithinSearchListingQuery as urlEleQueryWithinSearchListing } from "../constants"
import { SearchListing } from "../types/SearchListing"

/**
 * Parses current page's HTML to build SearchListing objs
 */
export function getSearchListings(): SearchListing[] | undefined {
    const eles = document.querySelectorAll(searchListingEleQuery)
    if (!eles || eles.length <= 0) {
        return
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
