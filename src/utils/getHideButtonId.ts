export function getHideButtonId(listingId: string) {
    if (!listingId) {
        throw new Error(`getHideButtonId(): Valid listingId must be passed in`)
    }
    return `hide-button-${listingId}`
}