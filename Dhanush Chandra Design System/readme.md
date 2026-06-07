# Dhanush Chandra — Design System

A design system distilled from **Dhanush Chandra's data-engineer portfolio** — a
Next.js site whose single job is to convince a hiring manager that Dhanush is a
credible Data Engineer, with a built-in "Ask my AI" assistant as its
differentiator.

> **Brand in three words:** precise · trustworthy · technical.
> The interface should evoke the calm confidence of a well-run data platform —
> *engineered, not decorated.*

## Source material

This system was reverse-engineered from the live portfolio codebase. Explore it
to build richer, more accurate designs:

- **GitHub:** https://github.com/DhanushAnegondi/portfolio_Dhanush
  (Next.js 14, Tailwind + shadcn/ui, lucide-react, `@basementstudio/shader-lab`)
- Key files read: `app/globals.css` (tokens), `app/layout.js` (fonts),
  `components/Hero.js`, `components/ChatWidget.js`, `components/ShaderBackground.js`,
  `components/ui/*`, `data/about.js`, and `PRODUCT.md` (brand brief).

The reader is encouraged to browse that repository for deeper context before
producing branded work.

---

## Content fundamentals

How the brand writes. The voice is **first-person, confident, and concrete** —
an engineer who ships reliable infrastructure, never a marketer.

- **Person & address.** First person for Dhanush ("I'm Dhanush Chandra…"); the
  AI assistant speaks in third person as a "sharp, friendly advocate." Visitors
  are addressed directly only in CTAs ("Get in touch", "Ask my AI").
- **Tone.** Calm, precise, technical. Confidence without hype. "Confident without
  hype" is a literal product principle — no superlatives, no exclamation marks in
  body copy.
- **Casing.** Sentence case for headlines and buttons. **UPPERCASE only** for the
  mono eyebrow labels (`Data Engineer · India · open to work`), always tracked
  wide. Terminal/command text is lowercase (`whoami`, `cat core-stack.txt`).
- **Honesty.** A hard rule: *no invented metrics, employers, or achievements.*
  Both the page and the AI speak only from verifiable background. When a number
  isn't real, it isn't shown.
- **Vocabulary.** Engineering-native: "pipelines", "data quality", "observability",
  "batch and streaming", "messy source → trusted dataset". Uses the metaphor of a
  running system ("pipelines: green", "status").
- **Emoji.** None. Not part of the brand. The only "human" mark is a rare Caveat
  handwritten annotation (e.g. *"try asking the AI →"`), used at most once per view.
- **Example copy.**
  - Headline: *"Reliable data pipelines, from messy source to **trusted dataset**."*
  - Lead: *"I turn raw, messy data into datasets teams can actually trust."*
  - Mono hint: *"try asking it 'why should we hire Dhanush?'"*

---

## Visual foundations

- **Color.** A cool near-black "terminal" substrate lit by a **single ember
  accent** (`hsl(16 92% 58%)`). The ember is signal, never decoration — emphasis,
  status, focus rings, one CTA. Surfaces climb a tight ink ladder
  (`ink-950` bg → `ink-900` card → `ink-850/800` fills → `ink-700` borders);
  text is off-white `paper-100` over `paper-300` muted. A light theme exists
  (`.theme-light`) but **dark is the default brand** — the live site always
  renders `.dark`.
- **Type.** Three families: **Hanken Grotesk** (UI + extrabold display, tight
  −0.03em tracking), **JetBrains Mono** (everything "from the machine" — terminal,
  labels, tech tags, eyebrows), and **Caveat** (rare handwritten accent). Display
  is big and tight; body is relaxed (1.65 leading).
- **Spacing.** A 4px base grid. Generous section padding (80–96px vertical),
  centered `max-w` columns. Even, engineered rhythm.
- **Backgrounds.** The signature is a **layered "blueprint" backdrop**: a warm
  ember bloom top-left + faint cool wash top-right (`ds-glow`), a two-weight
  blueprint grid masked to fade at the edges (`ds-grid`), a 4%-opacity film grain
  (`ds-grain`), and a bottom vignette seating it into the section (`ds-vignette`).
  The live hero layers a WebGL CRT shader (scanlines, dithering, the name baked
  in) over this; reduced-motion users get the static backdrop only.
- **Animation.** Confident deceleration, **no bounce**. Two curves do the work:
  `ease-out-quint` (0.22, 1, 0.36, 1) and `ease-out-expo` (0.16, 1, 0.3, 1).
  Entrances: a `rise` (12px up + fade), a left-to-right `wipe` scan-line reveal
  for the headline, and terminal lines that `boot` in sequence. A blinking cursor
  and a pinging status dot are the only loops. Everything has a
  `prefers-reduced-motion` fallback that resolves to the final visible state.
- **Hover & press.** Buttons **lift 1px** on hover (fill darkens via brightness;
  outline/ghost gain an accent fill) and settle to 0 on press — no shrink. Cards
  lift 2px and warm their border toward ember. Links underline on hover.
- **Borders & radii.** Hairline 1px borders in `ink-700`. Radius default is
  **12px** (`--radius`); 8px for chips/inputs, 10px for buttons, 24px for chat
  surfaces, full pills for skills/status/avatars.
- **Shadows.** Soft, pure-black, depth-not-drama: `sm → xl`. A dedicated
  `--glow-ember` (ring + bloom) marks emphasised interactive surfaces.
- **Transparency & blur.** Used sparingly: the terminal panel sits on
  `card / 0.8` with a subtle `backdrop-blur`; a `background/45` legibility scrim
  rides over the hero shader. Ember tints (`/0.1`–`/0.15`) fill skill chips and
  status pills.
- **Imagery vibe.** There is little photographic imagery; the brand's "imagery"
  is the **terminal panel** — show the work, don't decorate. Where the shader
  appears it is warm-ember over cool-charcoal, with CRT grain and bloom.

---

## Iconography

- **System:** the live site uses **lucide-react** (e.g. `MessageCircle`, `X`,
  `Send`) — thin 1.5px stroke, rounded line-caps. Match that weight and style.
  Load Lucide from CDN when you need icons:
  `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`,
  or use inline SVG at `stroke-width: 1.5`, `stroke-linecap: round`.
- **Inline SVG:** a few bespoke 1.5px-stroke glyphs appear (the arrow on the
  "Ask my AI" button). Keep custom icons to that same thin, rounded language.
- **Glyph accents:** ASCII/Unicode marks carry a lot of the "terminal" character —
  `$` prompt (ember), `›` list bullets, `●` status dot, `↗` external-link, `✦`
  spark on the chat launcher, blinking block cursor. Prefer these over icon noise.
- **Emoji:** never. Not part of the brand.
- **No logo file.** There is no icon-logo; the **wordmark** is simply the name set
  in Hanken Grotesk Extrabold (see `guidelines/brand-wordmark.html`).

---

## Index — what's in this system

**Global**
- `styles.css` — the entry point consumers link (an `@import` manifest only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `base.css` (element defaults + backdrop utilities + keyframes).

**Components** (`components/`, compiled into `_ds_bundle.js`, namespace
`window.DhanushChandraDesignSystem_2b4e61`)
- `core/Button` — 6 variants × 4 sizes, lift-on-hover.
- `core/Card` — raised surface + `CardHeader/Title/Description/Content/Footer`.
- `core/Input` — text field with ember focus ring.
- `core/Badge` — `skill` / `tag` / `status` / `ai` chips.
- `terminal/TerminalPanel` — the signature booting mono stack panel.
- `chat/ChatWidget` — the "Ask my AI" launcher + chat popover.

**UI kits** (`ui_kits/`)
- `portfolio/` — interactive recreation of the portfolio home (Hero + Skills +
  Projects + ChatWidget). `index.html` is the entry; see its `README.md`.

**Guidelines** (`guidelines/`)
- 18 foundation specimen cards (Type, Colors, Spacing, Brand) shown in the
  Design System tab.

**Other**
- `SKILL.md` — makes this folder usable as a downloadable Claude Skill.

---

## Caveats

- **Fonts** load from Google Fonts (`tokens/fonts.css`) — the exact families the
  site uses via `next/font/google`. No local binaries are bundled, so the
  compiler reports 0 `@font-face` rules; rendering is correct online.
- The **WebGL CRT shader** behind the live hero is not reproduced; the authentic
  layered CSS backdrop stands in for it.
