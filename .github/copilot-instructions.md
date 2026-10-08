# Altitude Yoga Project Instructions

## Project purpose

This workspace builds the Altitude Yoga website locally before the finished page is recreated and published in Wix Studio. The current focus is the homepage and teacher/class content.

## Source of truth

- Approved website copy: `01-content/Copy/Altitude Website Info.txt`
- Original copy PDF: `01-content/Copy/Altitude Website Info.pdf`
- Editable logo master: `01-content/Logos and assets/Altitude Logo.ai`
- Web-ready logo exports: `01-content/Logos and assets/High-res exports/`
- Local pages: `03-build/index.html`, `03-build/about.html`, `03-build/teachers.html`, and `03-build/pricing.html`
- Design decisions: `02-design/README.md`
- Wix transfer notes: `04-wix-handoff/README.md`

Use the text export for page copy. Do not replace approved names, bios, class descriptions, or prices with invented content. Jessica's bio is pending in the source copy and should remain clearly marked until supplied.

The homepage is the booking and local-search landing page. Keep the full About story and teacher directory on About, use Plan Your Visit as the class/FAQ/photo planning hub, and keep the membership sales page separate from the detailed pricing options page.

## Visual direction

Use the Wix Studio reference and Pinterest board as the visual reference: warm paper, black editorial serif typography, restrained navigation, centered oval mark, oversized wordmark, monochrome photography, fine rules, and generous spacing. Preserve the existing Altitude logo assets rather than redrawing them.

## Editing workflow

1. Read the current file before editing because the page may be updated between turns.
2. Keep homepage structure and content separate where practical.
3. Make the smallest focused edit.
4. Run editor validation on changed HTML, CSS, and JavaScript files.
5. Refresh the localhost browser preview immediately after each edit.
6. Use the live preview at `http://localhost:8000/03-build/index.html` while the temporary PowerShell server is running.
7. Do not treat draft links, contact details, or pricing as final until the studio confirms them.

## Publishing to the live site

Pushing to `main` publishes the site to the public internet within about a minute. Pushing is the only step that makes a change live, so it must always be Wesley's explicit decision.

- Edit, preview, and commit locally as needed; none of that is visible to the public.
- Never run `git push`, Sync Changes, or any other command that uploads commits unless Wesley has explicitly said to publish in this conversation.
- When a set of changes is finished, summarize what changed and ask: "Do you want to publish these changes to the live website now?" Push only after she answers yes.
- Never force-push, rewrite published history, or delete branches; GitHub blocks these on `main`.

## Wix handoff

The local page is a design and content prototype, not an automatic Wix importer. Recreate the approved structure with native Wix sections, repeaters, buttons, images, and CMS collections where ongoing teacher updates require them.
