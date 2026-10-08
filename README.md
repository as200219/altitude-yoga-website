# Yoga Teacher Highlight Page

This project is a local working space for building a teacher-focused webpage for the yoga studio before publishing the finished content and design in Wix.

## Start here

1. Read `00-project-brief/README.md`.
2. Add teacher information in `01-content/teachers.md`.
3. Record visual decisions in `02-design/README.md`.
4. Open `03-build/index.html` in a browser to preview the current scaffold.
5. Use `04-wix-handoff/README.md` when transferring the finished page into Wix.

## Current status

The local preview now includes a booking-focused, locally searchable homepage, an About page with the teacher directory, a photo-rich Plan Your Visit hub, a membership sales page, and a separate full Pricing Options page using the official pricing guide asset. Jessica's bio, contact details, booking links, and final pricing approval are still pending.

Project-specific agent guidance lives in `.github/copilot-instructions.md`.

## Numbered workflow

- `00-project-brief`: goals, audience, questions, and decisions to make together.
- `01-content`: teacher bios, specialties, photos, and calls to action.
- `02-design`: themes, colors, typography, layout, and interaction decisions.
- `03-build`: the local HTML, CSS, JavaScript, and future assets.
- `04-wix-handoff`: Wix implementation notes and publishing checklist.

Keep content, design decisions, and implementation separate. That makes it easy to change the look without rewriting teacher information, and it gives us a clean path from local prototype to Wix.

## Publishing

Every push to `main` publishes `03-build/` to https://as200219.github.io/altitude-yoga-website/ (about a minute; see the Actions tab). Work on a branch and open a pull request when you want a change reviewed before it goes live. Raw photos, zip exports, and the inspiration board stay on your machine and are not uploaded (see `.gitignore`).
