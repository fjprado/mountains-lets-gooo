## Patterns

- All dependencies are CDN-loaded — avoid adding npm packages unless strictly necessary.
- DOM manipulation is direct (`getElementById`, `innerHTML`, `classList`) — no framework.
- Dynamic color classes (e.g., green/red banner) are applied conditionally inside `updateUI()` based on resort status fields.
- Operation hours section only renders when the API returns non-null open/close times.
