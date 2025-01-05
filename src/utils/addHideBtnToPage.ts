import { HIDE_BUTTON_TEXTCONTENT, LISTING_ID_ATTRIBUTE_NAME, searchListingEleQuery } from "../constants.js"; 
import { createElement } from "./createElement.js";
import { getHideButtonId } from "./getHideButtonId.js";
import { getSearchListings } from "./getSearchListings.js";
import { onclickHideButton } from "./onclickHideButton.js";

export function addHideBtnToPage() {
    const interval = setInterval(() => {
        const listings = getSearchListings()
        listings?.forEach(l => {
            if (!l.hideBtn) {
                console.log(`Listing ID ${l.listingId} is missing a hide button. Adding.`)
                const btnEle = createElement(
                    'button',
                    HIDE_BUTTON_TEXTCONTENT,
                    getHideButtonId(l.listingId),
                    onclickHideButton,
                    {
                        attributeName: LISTING_ID_ATTRIBUTE_NAME,
                        attributeValue: l.listingId
                    }
                )
                l.element.appendChild(btnEle)
            }
        })
    }, 250)
}
