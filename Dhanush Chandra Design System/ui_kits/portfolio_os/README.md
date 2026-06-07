# DhanushOS — immersive portfolio UI kit

An original, immersive data-engineer portfolio: you **boot into a CRT
"data-platform" desktop** and explore the work as draggable apps. Inspired by
the genre of bootable-OS portfolios (e.g. Henry Heffernan's) but built fresh on
the Dhanush Chandra design system — ember-on-charcoal, terminal motifs, motion
turned up.

## The experience

1. **Boot sequence** — DhanushOS types its way up (`mounting /pipelines… [ OK ]`,
   `verifying data-quality contracts… [ OK ]`), then auto-enters (click to skip).
2. **Desktop** — menu bar, blueprint-grid wallpaper with an ember glow, a
   `DATA ENGINEER` watermark, left-rail app icons, and a dock. Two windows greet
   you: **Projects** and **Terminal**.
3. **Apps** (draggable windows, traffic-light controls, dock + menu launchers):
   - **Projects** — each pipeline expands to reveal an **animated data-flow
     diagram** (ember packets travel Source → … → Dashboard) plus
     Problem / Approach / Outcome.
   - **Terminal** — a real, typeable shell: `help`, `ls`, `whoami`, `skills`,
     `open projects`, `clear`… commands can open other apps.
   - **About / Skills / Experience / Writing / Resume / Contact** — the full set,
     with a timeline, an expandable blog reader, and a contact form.
4. **Ask AI** — the floating assistant (canned, on-brand replies) is kept as a
   helper, per the brief.
5. **Light / dark toggle** in the menu bar (persisted to `localStorage`).

Everything honors `prefers-reduced-motion`.

## Files

- `index.html` — boots the OS, owns the window manager (open / focus / drag /
  minimize / close) and the app registry.
- `os.css` — the CRT screen, scanlines, boot, windows, dock, desktop, pipeline
  diagram, timeline, and app styling (all on design-system tokens).
- `data.js` — **placeholder content** (swap for real material; no invented
  metrics are presented as fact).
- `icons.jsx` — lucide-style icon set (matches the brand's lucide-react usage).
- `desktop.jsx` — boot sequence, menu bar, desktop icons, dock, draggable Window.
- `apps.jsx` — About / Skills / Experience / Writing / Resume / Contact.
- `projects.jsx` — Projects app + animated `PipelineDiagram`.
- `terminal.jsx` — interactive Terminal + floating AI Assistant.

## Notes

- Built for laptop/desktop widths; a small-screen notice shows under 720px.
- It links `../../styles.css` for tokens and renders its own components inline
  (it does **not** depend on the compiled `_ds_bundle.js`), so it runs anywhere.
- Replace the strings in `data.js` and wire the résumé download + contact form to
  go fully live.
