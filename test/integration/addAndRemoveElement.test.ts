import { readFileSync } from 'fs';
import path from 'path';
import { LISTING_ID_ATTRIBUTE_NAME, searchListingEleQuery } from '../../src/constants';
import { getHideButtonId } from '../../src/utils/getHideButtonId';
import { createElement } from '../../src/utils/createElement';
import { getSearchListings } from '../../src/utils/getSearchListings';
import { onclickHideButton } from '../../src/utils/onclickHideButton';

describe(`Add and hide element`, () => {
    it(`adds and hides element in correct location`, () => {
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/partial/single-search-listing.html`), 'utf8')
        const mockEles = document.querySelectorAll(searchListingEleQuery)
        expect(mockEles).toHaveLength(1) // Verify mock data

        const listingId = '47821617'
        const tagName: keyof HTMLElementTagNameMap = 'button'
        const textContent = 'Hide'
        const id = getHideButtonId(listingId)
        const hideBtnEle = createElement(
            tagName,
            textContent, 
            id, 
            onclickHideButton,
            {
                attributeName: LISTING_ID_ATTRIBUTE_NAME,
                attributeValue: listingId
            }
        )
        const listings = getSearchListings()
        expect(listings).toHaveLength(1)
        expect(listings[0].hideBtn).toBeUndefined()
        expect(listings[0].isElementHidden).toBe(false)

        listings[0].element.appendChild(hideBtnEle)
        const listingsAfterAddingHideBtn = getSearchListings()
        expect(listingsAfterAddingHideBtn[0].hideBtn).toBeInstanceOf(HTMLElement)
        
        listingsAfterAddingHideBtn[0].hideBtn?.click()
        const listingsAfterClickingHideBtn = getSearchListings()
        expect(listingsAfterClickingHideBtn).toHaveLength(1)
        expect(listingsAfterClickingHideBtn[0].isElementHidden).toBe(true)
    })
})