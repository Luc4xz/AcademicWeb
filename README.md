# AcademicWeb

Static academic portfolio deployed with GitHub Pages.

## First-party visitor analytics

The former MapMyVisitor widget has been removed. The site now includes an optional self-hosted analytics system with:

- anonymous unique visitor and page-view counts;
- visitor-country, device, and browser breakdowns;
- daily traffic and top-page summaries;
- a token-protected dashboard at `analytics.html`;
- no raw IP, full user-agent, referrer, query-string, or cookie storage.

Tracking is disabled until the Worker is deployed and its URL is added to `analytics-config.js`. See `analytics-worker/README.md` for setup and deployment instructions.
