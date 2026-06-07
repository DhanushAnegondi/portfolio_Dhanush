# Portfolio — UI kit

A high-fidelity, click-through recreation of Dhanush Chandra's data-engineer
portfolio (the live site is Next.js + shadcn/ui). It composes the design
system's own primitives — no re-implemented Button/Card/Badge here.

## Screens & flow

`index.html` is the interactive home:

1. **Hero** (`Hero.jsx`) — status eyebrow with the pinging ember dot, a
   scan-line "wiped" headline with an ember span, lead copy, two CTAs, and the
   signature **TerminalPanel** as the right-hand imagery.
2. **Content** (`Content.jsx`) — the skills cloud (ember-tint pills) and project
   cards in the centered `max-w-3xl` column.
3. **ChatWidget** — the floating "Ask my AI" assistant. The hero's *Ask my AI*
   button opens it (controlled via `onOpenChange`); it answers with canned,
   on-brand replies.

## Fidelity notes

- The live hero renders a WebGL CRT shader (basementstudio shader-lab) behind
  the copy. That dependency can't run here, so this kit uses the brand's
  **authentic layered backdrop** — `.ds-glow → .ds-grid → .ds-grain →
  .ds-vignette` from `tokens/base.css` — as a faithful static stand-in.
- Project copy is kept concrete but free of invented metrics, per the brand's
  "honest content" principle (the live `data/about.js` ships placeholder
  examples).

## Run

Open `index.html`. It links `../../styles.css`, loads `../../_ds_bundle.js`
(the compiled component library), then mounts `Hero.jsx` and `Content.jsx`.
