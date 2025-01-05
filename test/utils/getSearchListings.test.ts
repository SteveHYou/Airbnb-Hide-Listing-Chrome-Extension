import { readFileSync } from 'fs';
import path from 'path';
import { searchListingEleQuery } from '../../src/constants';
import { convertElementToSearchListing, getHideButtonFromSearchListing, getListingIdFromSearchListing, getSearchListings } from '../../src/utils/getSearchListings';
import { getHideButtonId } from '../../src/utils/getHideButtonId';

describe('getSearchListings', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('returns empty array if no search listings on page', () => {
        document.body.innerHTML = `
        <html>
            <div id='random'>Random content</div>
        </html>
        `
        const listings = getSearchListings()
        expect(listings).toHaveLength(0)
    })

    it('returns array of SearchListing if valid listings on page', () => {
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/full/search-hongdae-20250404-to-20250427-on-20241229.html`), 'utf8')
        const listings = getSearchListings()
        expect(listings).toHaveLength(18)
        expect(listings?.[0].element).toBeInstanceOf(HTMLElement)
        expect(listings?.[0].listingId).toStrictEqual('47821617')
    })
})

describe('convertElementToSearchListing', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('generates SearchListing from a valid element', () => {
        let mockEles: NodeListOf<Element>
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/partial/single-search-listing.html`), 'utf8')
        mockEles = document.querySelectorAll(searchListingEleQuery)
        expect(mockEles).toHaveLength(1) // Verify mock data

        const searchListing = convertElementToSearchListing(mockEles[0])
        expect(searchListing).not.toBeUndefined()
        expect(searchListing?.element).toBeInstanceOf(HTMLElement)
        expect(searchListing?.listingId).toStrictEqual('47821617')
        expect(searchListing?.isElementHidden).toBe(false)
    })

    it('generates undefined from an invalid element', () => {
        document.body.innerHTML = `
        <html>
            <div id='random'>Random content</div>
        </html>
        `
        const searchListing = convertElementToSearchListing(document.querySelector('div') as Element)
        expect(searchListing).toBeUndefined()
    })

    it(`returns isElementHidden as true if element is hidden`, () => {
        let mockEles: NodeListOf<Element>
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/partial/single-search-listing.html`), 'utf8')
        mockEles = document.querySelectorAll(searchListingEleQuery)
        expect(mockEles).toHaveLength(1); // Verify mock data

        (mockEles[0] as HTMLElement).hidden = true
        const listing = convertElementToSearchListing(mockEles[0])
        expect(listing?.isElementHidden).toBe(true);

        (mockEles[0] as HTMLElement).hidden = false
        const listingAfterHiddenFalse = convertElementToSearchListing(mockEles[0])
        expect(listingAfterHiddenFalse?.isElementHidden).toBe(false);
    })


    it.todo(`returns undefined if element is not an HTMLElement`, () => {})
})

describe('getListingIdFromSearchListing', () => {
    let mockEles: NodeListOf<Element>

    beforeAll(() => {
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/partial/single-search-listing.html`), 'utf8')
        mockEles = document.querySelectorAll(searchListingEleQuery)
        expect(mockEles).toHaveLength(1) // Verify mock data
    })

    it('fetches correct search listing ID', () => {
        expect(getListingIdFromSearchListing(mockEles[0])).toStrictEqual('47821617')
    })

    it.todo(`returns undefined if element is not an HTMLElement`, () => {})
    it.todo(`returns undefined if element doesn't contain listing ID`, () => {})
})

describe('getHideButtonFromSearchListing', () => {
    const listingId = '47821617'
    const hideBtnQuery = `${searchListingEleQuery} button#${getHideButtonId(listingId)}`

    it(`throws error if listingId wasn't passed in`, () => {
        expect(() => getHideButtonFromSearchListing(undefined as unknown as string)).toThrowError()
    })

    it(`throws error if multiple hide buttons were found`, () => {
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/partial/single-search-listing-with-hide-button-duplicate.html`), 'utf8')
        let hideBtns = document.querySelectorAll(hideBtnQuery)
        expect(hideBtns).toHaveLength(2) // Verify mock data
        expect(() => getHideButtonFromSearchListing(listingId)).toThrowError()
    })

    it('fetches hide button if displayed', () => {
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/partial/single-search-listing-with-hide-button.html`), 'utf8')
        let hideBtns = document.querySelectorAll(hideBtnQuery)
        expect(hideBtns).toHaveLength(1) // Verify mock data
        expect(getHideButtonFromSearchListing(listingId)).toBeInstanceOf(HTMLElement)
    })

    it('returns undefined if not displayed', () => {
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/partial/single-search-listing.html`), 'utf8')
        let hideBtns = document.querySelectorAll(hideBtnQuery)
        expect(hideBtns).toHaveLength(0) // Verify mock data
        expect(getHideButtonFromSearchListing(listingId)).toBeUndefined()
    })
})