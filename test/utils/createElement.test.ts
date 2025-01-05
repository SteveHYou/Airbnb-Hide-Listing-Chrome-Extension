import { LISTING_ID_ATTRIBUTE_NAME, searchListingEleQuery } from "../../src/constants"
import { createElement } from "../../src/utils/createElement"
import { getHideButtonId } from "../../src/utils/getHideButtonId"

describe(`createElement`, () => {
    it(`returns an element with intended configurations`, () => {
        const listingId = '47821617'
        const tagName: keyof HTMLElementTagNameMap = 'button'
        const textContent = 'Hide'
        const id = getHideButtonId(listingId)
        let onclick = vi.fn()

        const ele = createElement(
            tagName,
            textContent, 
            id, 
            onclick,
            {
                attributeName: LISTING_ID_ATTRIBUTE_NAME,
                attributeValue: listingId
            }
        )

        expect(ele).not.toBeUndefined()
        expect(ele?.tagName).toStrictEqual(tagName.toUpperCase())
        expect(ele?.textContent).toStrictEqual(textContent)
        expect(ele?.id).toStrictEqual(id)
        ele?.click(); expect(onclick).toHaveBeenCalledOnce()
        expect(ele?.getAttribute(LISTING_ID_ATTRIBUTE_NAME)).toStrictEqual(listingId)
    })
})