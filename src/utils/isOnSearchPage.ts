/**
 * /s path for search
 * @returns 
 */
export function isOnSearchPage(url: string): boolean {
    if (!url) {
        console.log(`isOnSearchPage: Encountered empty url.`)
        return false
    }

    const isOnAirbnbDomain = /:\/\/.*\.airbnb\..*\//.test(url)
    if (!isOnAirbnbDomain) {
        console.log(`isOnSearchPage: Url is not on airbnb. Url: ${url}`)
        return false
    }

    const pathname = new URL(url).pathname
    const isOnSearchPath = /^\/s\//.test(pathname)
    if (!isOnSearchPath) {
        console.log(`isOnSearchPage: Path is not on /s/. Pathname: ${pathname}`)
        return false
    } 

    return true
}