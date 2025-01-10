import { getAll } from "./database/chromeStorageLocalDb.js"
import { getSearchListings } from "./getSearchListings.js"

/**
 * If listings were previously hidden, load them from DB
 * and hide them from showing on screen
 */
export function hideListings() {
    //@ts-ignore
    const removeListingInterval = SetIntervalAsync.dynamic.setIntervalAsync(async () => {
        const hiddenListings = await getAll('HiddenListing')
        const listings = getSearchListings()
        listings?.forEach(l => {
            if (hiddenListings.find(hidden => hidden.id === l.listingId)) {
                l.element.hidden = true
            }
        })
    }, 250)
}