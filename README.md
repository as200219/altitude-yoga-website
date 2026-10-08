# Altitude Yoga — Meet our Team

Static pages for Altitude Yoga, served by GitHub Pages. The main site (homepage, mailing-list form)
stays on Wix at https://www.altitude.yoga/ and links here.

## Editing

Everything that gets published lives in `docs/`:

- `docs/index.html` — the Meet our Team page (header, footer, intro text)
- `docs/script.js` — teacher names, bios, and photo paths (the `teachers` list at the top)
- `docs/styles.css`, `docs/team.css` — styling
- `docs/assets/headshots/` — teacher photos (web-sized JPGs only; keep raw camera files out of the repo)

Preview locally by opening `docs/index.html` in a browser.

## Publishing

Push to `main`. GitHub Pages rebuilds from `docs/` in about a minute.
Use a branch and pull request for changes so they can be reviewed before they go live.

## Rules

- No customer data, contact exports, or secrets in this repo.
- The page stays `noindex` while it is a test preview.
