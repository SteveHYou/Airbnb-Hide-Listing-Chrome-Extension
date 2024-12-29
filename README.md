# Airbnb-Hide-Listing-Chrome-Extension

Rules:
- Use named exports only, for ease of refactoring.


Troubleshooting FAQ:
- Uncaught (in promise) TypeError: Failed to fetch dynamically imported module: chrome-extension://piibfkamejcgnkjjimllmjiipfjmhaph/dist/src/main.js
    - Make sure content script imports have .js file extension
