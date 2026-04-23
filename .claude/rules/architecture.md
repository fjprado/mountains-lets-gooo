## Architecture

This is a vanilla JS dashboard for Cypress Mountain ski resort conditions.

- **`index.html`** — HTML structure, CDN imports (Tailwind CSS, AOS animations, Feather Icons), and 3 YouTube embeds for webcam feeds.
- **`js/script.js`** — All application logic. Fetches data from the API and manipulates the DOM directly.
- **`css/style.css`** — Custom animations and Tailwind overrides (spinner, transitions, gradient effects).

### Data flow

```
page load / refresh button
    → fetchCypressDetails()   [3 retries, 500ms apart]
    → Azure API endpoint
    → updateUI()              [populates all DOM elements]
    → AOS.refresh()
```

**API endpoint:** `https://mountain-lets-gooo-api.azurewebsites.net/api/CypressData` (single Azure Functions endpoint, read-only)

**Global state:** single variable `cypressDetails` holds the raw API response — no state management library.

### Key functions in `js/script.js`

- `fetchCypressDetails()` — async fetch with retry logic; shows/hides loading and fail-screen overlays.
- `updateUI()` — the central rendering function; updates all ~30+ DOM elements from `cypressDetails`. Start here for any UI change.
