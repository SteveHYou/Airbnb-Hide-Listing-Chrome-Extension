import { isOnSearchPage } from "../../scripts/utils"

describe('isOnSearchPage', () => {
    it('returns true when on search page', () => {
        const mockLocation: Location = { pathname: '/s/test'} as Location
        vi.spyOn(global, 'location', 'get').mockReturnValue(mockLocation)
        expect(isOnSearchPage()).toBe(true)
    })

    it('returns false when not on search page', () => {
        const mockLocation: Location = { pathname: '/test/s/'} as Location
        vi.spyOn(global, 'location', 'get').mockReturnValue(mockLocation)
        expect(isOnSearchPage()).toBe(false)
    })
})