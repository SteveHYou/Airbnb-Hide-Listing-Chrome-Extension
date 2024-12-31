# Airbnb-Hide-Listing-Chrome-Extension

Rules:
- Use named exports only, for ease of refactoring.


Troubleshooting FAQ:
- Uncaught (in promise) TypeError: Failed to fetch dynamically imported module: chrome-extension://piibfkamejcgnkjjimllmjiipfjmhaph/dist/src/main.js
    - FIX: Make sure content script imports have .js file extension

- Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist.
    - Reason 1: As of writing this, content scripts were set to load on only AirBnb specific pages (controlled in manifest.json). On the other hand, service workers get triggered on every page, including non-airbnb sites.
        - This means service worker was sending chrome.tabs.onUpdated info to content script for any tab update. But if we view a non-AirBnb page, there is no content script to consume the onUpdated info since it wouldn't run.
        - FIX: restrict service worker to run sendMessage only for Airbnb search pages.
            - https://stackoverflow.com/a/73276111
    - Reason 2?: In content_scripts.ts, chrome.runtime.onMessage listener was defined within async IIFE to faciliate dynamic import of main.ts (Dynamic import allows usage of ESM modules. It returns a promise.)
        - But this was incorrect usage of listeners must be defined in global scope and not nested in async functions (https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events#step-5 describes for service workers but it also applies for content scripts it appears.). This caused intermittent issues, although I'm not 100% sure if this caused the specific error. I didn't specifically test for it.
        - FIX: moved the listener to global scope.

- Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
    - FIX: See Reason 2 of "Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist."
    - Apart from the fix, if using async operations within a onMessage listener (Using any promise or async func), make sure sendResponse() is called at least once AND "true" boolean is returned in all branching logic. Otherwise it will cause this same error because sendMessage() will never receive a response it's looking for.
        - Using async within listener: https://stackoverflow.com/a/46628145

