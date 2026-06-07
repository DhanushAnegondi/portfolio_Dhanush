---
name: dhanush-chandra-design
description: Use this skill to generate well-branded interfaces and assets for Dhanush Chandra's data-engineer portfolio brand, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Brand:** precise · trustworthy · technical. Engineered, not decorated. A cool
  near-black terminal substrate lit by one ember accent (`hsl(16 92% 58%)`).
- **Tokens:** link `styles.css` (it `@import`s `tokens/*.css`). Use CSS custom
  properties via `hsl(var(--primary))`, `hsl(var(--card))`, etc. Dark is default.
- **Type:** Hanken Grotesk (display/UI), JetBrains Mono (terminal/labels), Caveat
  (rare hand accent) — loaded from Google Fonts in `tokens/fonts.css`.
- **Components:** `components/**` — Button, Card, Input, Badge, TerminalPanel,
  ChatWidget. In standalone HTML, load `_ds_bundle.js` and read
  `window.DhanushChandraDesignSystem_2b4e61`. See each component's `.prompt.md`.
- **UI kit:** `ui_kits/portfolio/` is a working recreation to copy patterns from.
- **Foundations:** `guidelines/*.html` are specimen cards for colors, type,
  spacing, and brand motifs (terminal panel, blueprint backdrop, wordmark).

## House rules

- One ember accent only — it's signal, never decoration. One filled CTA per view.
- No emoji. No invented metrics or achievements. Sentence case; UPPERCASE only for
  tracked mono eyebrows. Lift-on-hover, no bounce.
- The terminal panel is the brand's "imagery" — prefer it over stock decoration.
- Icons: lucide-react (1.5px stroke, rounded caps) or the terminal glyph set
  (`$ › ● ↗ ✦`). Honor `prefers-reduced-motion`.
