/**
 * /s path for search
 * @returns 
 */
export function isOnSearchPage(): boolean {
    return /^\/s\//.test(window.location.pathname)
}