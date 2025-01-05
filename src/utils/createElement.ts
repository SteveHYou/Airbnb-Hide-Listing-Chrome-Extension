export function createElement(
    tagName: keyof HTMLElementTagNameMap, 
    textContent: string,
    id: string,
    onclick: (event: MouseEvent) => any,
    attributeToAdd: { attributeName: string, attributeValue: string}
): HTMLElement {
    const ele = document.createElement(tagName)
    ele.textContent = textContent
    ele.id = id
    ele.onclick = onclick
    ele.setAttribute(attributeToAdd.attributeName, attributeToAdd.attributeValue)
    return ele
}