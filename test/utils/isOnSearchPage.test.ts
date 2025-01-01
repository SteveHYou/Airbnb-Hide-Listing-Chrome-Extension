import { isOnSearchPage } from "../../src/utils/isOnSearchPage"

// TODO: Need testing on international links
describe('isOnSearchPage', () => {
    it('returns true when on search page', () => {
        const realUrl = `https://www.airbnb.ca/s/Hongdae-Street--Seoul--South-Korea/homes?place_id=ChIJ68AiKsWYfDUROpTctLKtxtU&refinement_paths%5B%5D=%2Fhomes&checkin=2025-04-04&checkout=2025-04-27&date_picker_type=calendar&adults=2&children=0&infants=0&pets=0&search_type=AUTOSUGGEST`
        expect(isOnSearchPage(realUrl)).toBe(true)
    })

    it('returns false when no url is passed', () => {
        expect(isOnSearchPage(undefined as unknown as string)).toBe(false)
        expect(isOnSearchPage('')).toBe(false)
        expect(isOnSearchPage(null as unknown as string)).toBe(false)
    })

    it('returns false if not on airbnb domain', () => {
        expect(isOnSearchPage(`https://www.google.ca/search?q=airbnb+%5C&sca_esv=4db6652e49a29e43&sxsrf=ADLYWILBg8XjaVYRDvMlY7QgNpLjcGpSNQ%3A1735740416607`)).toBe(false)
        expect(isOnSearchPage(`https://airbnb.io/projects/`)).toBe(false)
        expect(isOnSearchPage(`http://airbnb.io/projects/`)).toBe(false)
    })

    it('returns false if not on search page', () => {
        expect(isOnSearchPage(`https://www.airbnb.ca/`)).toBe(false)
        expect(isOnSearchPage(`https://www.airbnb.ca/guest/messages`)).toBe(false)
        expect(isOnSearchPage(`http://airbnb.io/projects/`)).toBe(false)

        const fakeUrlWithTest = `https://www.airbnb.ca/test/s/Hongdae-Street--Seoul--South-Korea/homes?place_id=ChIJ68AiKsWYfDUROpTctLKtxtU&refinement_paths%5B%5D=%2Fhomes&checkin=2025-04-04&checkout=2025-04-27&date_picker_type=calendar&adults=2&children=0&infants=0&pets=0&search_type=AUTOSUGGEST`
        expect(isOnSearchPage(fakeUrlWithTest)).toBe(false)

        const fakeUrlWithSearch = `https://www.airbnb.ca/search/Hongdae-Street--Seoul--South-Korea/homes?place_id=ChIJ68AiKsWYfDUROpTctLKtxtU&refinement_paths%5B%5D=%2Fhomes&checkin=2025-04-04&checkout=2025-04-27&date_picker_type=calendar&adults=2&children=0&infants=0&pets=0&search_type=AUTOSUGGEST`
        expect(isOnSearchPage(fakeUrlWithSearch)).toBe(false)
    })
})