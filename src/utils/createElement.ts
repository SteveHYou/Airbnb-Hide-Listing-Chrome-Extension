export function createElement(
    tagName: keyof HTMLElementTagNameMap, 
    textContent: string,
    id: string,
    onclick: (event: MouseEvent) => any,
    attributeToAdd: { attributeName: string, attributeValue: string}
): HTMLElement | undefined {
    const ele = document.createElement(tagName)
    if (!(ele instanceof HTMLElement)) {
        console.error(`createElement(): Failed to create HTMLElement. tagName: [${tagName}] textContent: [${textContent}] id: [${id}] attributeToAdd: [${JSON.stringify(attributeToAdd)}]`)
        return
    }
    ele.textContent = textContent
    ele.id = id
    ele.onclick = onclick
    ele.setAttribute(attributeToAdd.attributeName, attributeToAdd.attributeValue)
    return ele
}