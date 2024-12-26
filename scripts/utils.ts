/**
 * utils.ts - Provide general utilities for this project
 * Compiled in one file as separating this is a hassle (Need to add in manifest.json, export defaults don't work)
 * 
 * When exporting functions, use "export function xyz()" syntax only.
 */

export function isOnSearchPage() {
    return /^\/s\//.test(window.location.pathname)
}