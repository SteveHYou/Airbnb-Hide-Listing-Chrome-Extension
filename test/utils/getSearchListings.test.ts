import { readFileSync } from 'fs';
import path from 'path';
import { searchListingEleQuery } from '../../src/constants';
import { convertElementToSearchListing, getListingIdFromSearchListing, getSearchListings } from '../../src/utils/getSearchListings';

describe('getSearchListings', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('returns undefined if no search listings on page', () => {
        document.body.innerHTML = `
        <html>
            <div id='random'>Random content</div>
        </html>
        `
        const listings = getSearchListings()
        expect(listings).toBeUndefined()
    })

    it('returns array of SearchListing if valid listings on page', () => {
        document.body.innerHTML = readFileSync(path.resolve(`test/mocks/html/full/search-hongdae-20250404-to-20250427-on-20241229.html`), 'utf8')
        const listings = getSearchListings()
        expect(listings).toHaveLength(18)
        expect(listings?.[0]).not.toBeUndefined()
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