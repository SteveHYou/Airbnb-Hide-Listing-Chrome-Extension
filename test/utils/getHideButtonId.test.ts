import { getHideButtonId } from "../../src/utils/getHideButtonId"

describe('getHideButtonId', () => {
    it('returns correct id', () => {
        const listingId = '12345678'
        const result = getHideButtonId(listingId)
        expect(result).toStrictEqual(`hide-button-${listingId}`)
    })

    it('throws error if passed in value is empty', () => {
        expect(() => getHideButtonId(undefined as unknown as string)).toThrowError()
    })
})