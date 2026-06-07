# Windows 7 Design System — Complete Reference

A full visual-language spec for the Windows 7 "Aero" aesthetic (2009): colors, typography,
glass effects, window chrome, controls, the taskbar/Start orb, and the icon language. Includes
ready-to-paste CSS tokens for recreating the look on the web.

> Era: Windows 7 / Windows Server 2008 R2. Design language: **Windows Aero** ("Authentic,
> Energetic, Reflective, Open"). Successor to Vista's Aero, refined for performance and polish.

---

## 1. Design principles

Windows 7's look rests on a few consistent ideas. Match these and everything else falls into place.

- **Glass (Aero).** Frames, the taskbar, and flyouts are translucent, blurred, and lightly
  tinted by a user accent color. Light passes "through" the chrome.
- **Glossy, dimensional controls.** Buttons and bars have a top-to-bottom gloss: a brighter
  upper half, a subtle highlight line at the very top, and a darker lower half — a "gel" look.
- **Soft depth.** Everything has gentle outer glows, 1px light/dark bevels, and rounded corners
  (typically 4–6px on windows, 3px on buttons).
- **Saturated but calm.** Bright blues dominate; accents glow rather than shout. Default desktop
  is the blue-bokeh "Harmony" wallpaper.
- **Reflection & light.** Highlights sit at the top of surfaces, as if lit from above. Many
  surfaces carry a faint reflective sheen.

---

## 2. Color palette

### 2.1 Core system colors

| Role | Hex | Notes |
|------|-----|-------|
| Aero accent (default blue) | `#3399FF` / `#1E90FF` | Default window/glass tint |
| Glass tint base | `#7FB8E8` | Light blue cast over blurred content |
| Selection blue (start) | `#3399FF` | Gradient top of selected items |
| Selection blue (end) | `#2A8EF0` | Gradient bottom |
| Hover blue (start) | `#EAF6FD` | Very light blue, control hover top |
| Hover blue (end) | `#BEE6FD` | Control hover bottom |
| Hover border | `#3C7FB1` | Outline on hovered controls |
| Pressed blue (start) | `#C2E4F6` | Pressed control top |
| Pressed blue (end) | `#A6D2F2` | Pressed control bottom |
| Window background | `#F0F0F0` | Dialog / client area gray |
| Content background | `#FFFFFF` | Lists, text areas, Explorer panes |
| Control face (start) | `#F2F2F2` | Button gloss top |
| Control face (end) | `#E5E5E5` | Button gloss bottom |
| Control border | `#707070` / `#8E8F8F` | Default button outline |
| Text (primary) | `#000000` | Body text |
| Text (secondary) | `#444746` / `#6D6D6D` | Labels, hints |
| Text (disabled) | `#A0A0A0` | Greyed text |
| Link / command text | `#0066CC` | Explorer command links |
| Link hover | `#3399FF` | — |

### 2.2 Explorer & navigation

| Role | Hex |
|------|-----|
| Navigation pane background | `#EDF3FB` → `#DCE9F8` (subtle vertical) |
| Selected nav item (start) | `#D9EBF9` |
| Selected nav item (end) | `#BDE2F8` |
| Selected nav border | `#7DA2CE` |
| Explorer header / address bar glass | translucent white over accent |
| Breadcrumb chevron | `#5A5A5A` |

### 2.3 Window frame (Aero glass)

| Role | Value |
|------|-------|
| Active frame tint | accent color @ ~60–80% over blur |
| Inactive frame tint | desaturated gray-blue @ ~40% |
| Frame inner highlight | `rgba(255,255,255,0.45)` 1px line inside the glass edge |
| Frame outer shadow | `rgba(0,0,0,0.45)` large soft drop shadow |

### 2.4 Window control buttons (caption)

| Button | Resting | Hover | Pressed |
|--------|---------|-------|---------|
| Minimize / Maximize | glass, white glyph | light-blue glow `#9CD2FF` | brighter |
| **Close (X)** | glass, white glyph | red glow `#E81123`/`#D60E1B` | deep red `#B60710` |

The Close button is the only colored caption control — it glows red on hover. Glyphs are thin
white strokes.

---

## 3. Typography

Windows 7 standardized on **Segoe UI**, the humanist sans-serif that became the Microsoft system
face. ClearType subpixel rendering was on by default.

### 3.1 Font stack

```
font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe", Tahoma, Geneva, Verdana, sans-serif;
```

Fallbacks: pre-Segoe systems used **Tahoma** (Win 2000/XP UI) and **Verdana**. Headings in some
"experience" surfaces (Media Center, Welcome) used **Segoe UI Light** or **Segoe UI Semibold**.

### 3.2 Bundled font families (selected)

| Font | Use |
|------|-----|
| **Segoe UI** | The entire OS UI — menus, dialogs, labels |
| Segoe UI Light / Semibold / Bold | Large headers, banners |
| Segoe Print / Segoe Script | Casual / handwriting surfaces |
| **Tahoma** | Legacy UI, tooltips on older apps |
| **Calibri** | Default Office body font (ships w/ Office) |
| **Cambria** / Candara / Constantia / Corbel | ClearType Collection (Office) |
| Consolas | Monospace / code |
| Times New Roman, Arial, Courier New | Legacy compatibility |
| Lucida Console | Console / terminal default |
| Marlett, Webdings, Wingdings | Glyph/symbol fonts |

### 3.3 Type scale (UI)

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Window title (caption) | 12pt (~16px) | Regular | white (on glass), shadowed |
| Menu / menu bar | 9pt (~12px) | Regular | `#000` |
| Dialog body text | 9pt (~12px) | Regular | `#000` |
| Button label | 9pt (~12px) | Regular | `#000` |
| Group box / section header | 9pt | Bold or `#0066CC` | — |
| "Main instruction" (task dialogs) | 12pt (~16px) | Regular | `#003399` (blue) |
| Tooltip | 9pt | Regular | `#000` on `#FFFFE1` |
| Status bar | 9pt | Regular | `#444` |

> Default system DPI was 96 (100%). 9pt ≈ 12px at 96 DPI. The caption used a slightly larger
> point size and a soft text shadow so white text stays legible on translucent glass.

### 3.4 Caption text shadow (for glass legibility)

```css
color: #fff;
text-shadow: 0 0 4px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.4);
```

---

## 4. Aero glass — the signature effect

The defining trait: window frames, the taskbar, and flyouts are **translucent + Gaussian-blurred
+ accent-tinted**, with a bright inner edge and a saturating "color hint."

### 4.1 Recipe

1. **Blur** what's behind (~15–25px Gaussian).
2. **Tint** with the accent color at low-to-mid opacity.
3. **Saturate / brighten** slightly (the "color intensity" slider).
4. **Inner highlight**: 1px `rgba(255,255,255,0.45)` along the top/inner edge.
5. **Outer shadow**: large soft black drop shadow for separation.
6. **Rounded corners**: ~6px on top window corners (square bottom when maximized).

### 4.2 CSS (modern backdrop-filter approximation)

```css
.aero-glass {
  background: rgba(180, 215, 245, 0.45);          /* accent tint over content */
  backdrop-filter: blur(20px) saturate(1.4) brightness(1.05);
  -webkit-backdrop-filter: blur(20px) saturate(1.4) brightness(1.05);
  border: 1px solid rgba(255, 255, 255, 0.55);     /* inner light edge */
  border-radius: 6px 6px 0 0;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.6),           /* top highlight line */
    0 12px 40px rgba(0,0,0,0.45);                   /* outer soft shadow */
}
```

> Pre-`backdrop-filter` clones faked the blur with a pre-blurred background image or a
> semi-transparent light-blue gradient. The accent color was user-adjustable in
> *Personalization → Window Color* (with a "Color intensity" slider and an "Enable transparency"
> checkbox). **Windows 7 Basic** and **Classic** themes dropped glass entirely for flat,
> opaque frames.

---

## 5. Window chrome

### 5.1 Anatomy (top to bottom)

```
┌─────────────────────────────────────────────┐  ← glass frame, 6px rounded top
│ [icon]  Window Title              _  ▢  ✕   │  ← caption bar (glass, ~30px tall)
├─────────────────────────────────────────────┤
│ File  Edit  View  ...           (menu bar)   │
│ [toolbar / ribbon / address bar]             │
├─────────────────────────────────────────────┤
│                                              │
│  client area  (#FFFFFF or #F0F0F0)           │
│                                              │
├─────────────────────────────────────────────┤
│ status bar                                   │
└─────────────────────────────────────────────┘
```

### 5.2 Metrics

| Property | Value |
|----------|-------|
| Caption height | ~30px (glass), 22px (classic) |
| Frame border thickness | ~8px translucent glass (resize grip area) |
| Window corner radius | 6px top corners; 0 when maximized |
| Caption button size | ~45 × 21px hit target, glyph ~10px |
| Title icon | 16×16 app icon, left of title |

### 5.3 Caption buttons CSS

```css
.caption-btn {
  width: 29px; height: 21px;
  display: grid; place-items: center;
  color: #fff;
  background: linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 3px;
}
.caption-btn:hover { background: rgba(156,210,255,0.5); }     /* min/max glow */
.caption-btn.close:hover {
  background: linear-gradient(to bottom, #E81123, #B60710);   /* red close */
  border-color: #B60710;
}
```

### 5.4 Aero features

- **Aero Snap** — drag a window to a screen edge to dock/maximize (top = maximize, left/right =
  half-tile). A translucent blue preview rectangle animates into place.
- **Aero Peek** — hover the far-right taskbar nub to make all windows glass-transparent and reveal
  the desktop; hover a taskbar thumbnail to peek a single window.
- **Aero Shake** — grab a title bar and shake to minimize all *other* windows.
- **Live thumbnails** — taskbar buttons show real-time window previews on hover.

---

## 6. Controls

### 6.1 Push button (the "gel" gloss)

Two-stop gloss + faint top highlight + soft outer glow on hover.

```css
.win7-button {
  font: 9pt "Segoe UI", Tahoma, sans-serif;
  color: #000;
  padding: 4px 14px;
  min-height: 23px;
  border: 1px solid #707070;
  border-radius: 3px;
  background: linear-gradient(to bottom, #F2F2F2 0%, #EBEBEB 49%, #DDDDDD 50%, #CFCFCF 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
}
.win7-button:hover {
  border-color: #3C7FB1;
  background: linear-gradient(to bottom, #EAF6FD 0%, #D9F0FC 49%, #BEE6FD 50%, #A7D9F5 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 0 6px rgba(60,127,177,0.45);
}
.win7-button:active {
  background: linear-gradient(to bottom, #C2E4F6 0%, #ABDAF3 49%, #90CBEB 50%, #77BEE5 100%);
  border-color: #2C628B;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.25);
}
.win7-button:focus { outline: 1px dotted #000; outline-offset: -4px; }
.win7-button:disabled {
  color: #A0A0A0; border-color: #BCBCBC;
  background: #F4F4F4; box-shadow: none;
}
```

> The 49%/50% split creates the characteristic mid-button "fold" where the gloss steps from a
> lighter upper half to a darker lower half.

### 6.2 Default button

Identical gloss, plus a pulsing/static blue glow ring to mark the default action:

```css
.win7-button.default {
  border-color: #3C7FB1;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 0 7px 1px rgba(51,153,255,0.6);
}
```

### 6.3 Text input

```css
.win7-input {
  font: 9pt "Segoe UI", sans-serif;
  padding: 3px 5px;
  background: #fff;
  border: 1px solid #ABADB3;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.10);
}
.win7-input:hover  { border-color: #5794BF; }
.win7-input:focus  { border-color: #3399FF; outline: none; box-shadow: inset 0 0 0 1px #3399FF; }
```

### 6.4 Checkbox & radio

- 13×13px box, white fill, `#707070` border; hover → blue border + faint blue inner glow.
- Check = blue/black tick; radio = filled blue dot. Checked state often gets a subtle blue sheen.

### 6.5 Scrollbar

- Width ~17px, light gray track, glossy rounded thumb (`#C7CDD6`→`#A9B1BD`) with a center grip
  texture; arrow buttons at each end with chevron glyphs. Thumb brightens to blue-gray on hover.

### 6.6 Progress bar

- Glossy green fill (`#06B025`→`#3FE05A`) with a moving diagonal **animated shimmer** sweeping
  left→right; the trough is recessed light gray. Error/paused states recolor to red/yellow.

```css
.win7-progress { height: 18px; background: #E6E6E6; border: 1px solid #BCBCBC; border-radius: 3px; overflow: hidden; }
.win7-progress > .fill {
  height: 100%;
  background: linear-gradient(to bottom, #4BE066 0%, #25C73E 50%, #06B025 51%, #2BD64A 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
}
```

### 6.7 Tooltip & balloon

- Pale yellow `#FFFFE1` (legacy) **or** white glass with a 1px `#767676` border and soft shadow;
  9pt text. Notification balloons point with a small tail toward the tray icon.

### 6.8 Menus

- White/near-white background, 1px `#979797` border, soft shadow.
- Left gutter strip (`#F1F1F1`) holds 16×16 icons; hover highlights a row with a light-blue
  gradient (`#E8F0FE`→`#D8E6FC`) and `#90C8F6` border. Separators are 1px `#E0E0E0`.

---

## 7. Taskbar

The Windows 7 "Superbar" — the most recognizable 7 element.

### 7.1 Look

- Full-width glass strip at the bottom, **~40px tall** (large icons) — translucent, blurred,
  accent-tinted, with a bright top edge line.
- **Large icon buttons** (no text labels by default) — apps are pinnable; running apps show a
  subtle glossy "lozenge" frame around the icon; multiple windows show a stacked/staggered edge.
- Hover → a colored glass highlight that samples the icon's dominant color ("color hot-track"),
  plus a live thumbnail preview popping above.
- Active window's button has a brighter, more pronounced lit lozenge.

### 7.2 Right side

- **System tray** (notification area) with a small up-chevron to reveal hidden icons; clock
  shows time + date.
- **Show Desktop** button — a thin vertical glass sliver at the very far right (Aero Peek).

### 7.3 Jump Lists

- Right-click a taskbar icon → a dark/glass vertical menu of recent files, pinned items, and
  tasks. Rounded top, app icon header, grouped sections ("Pinned", "Recent", "Tasks").

### 7.4 CSS sketch

```css
.taskbar {
  position: fixed; bottom: 0; left: 0; right: 0; height: 40px;
  display: flex; align-items: center; gap: 2px; padding: 0 4px;
  background: rgba(40, 55, 80, 0.55);
  backdrop-filter: blur(22px) saturate(1.5);
  border-top: 1px solid rgba(255,255,255,0.4);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 -2px 8px rgba(0,0,0,0.3);
}
.task-btn {
  width: 40px; height: 36px; display: grid; place-items: center;
  border-radius: 3px; border: 1px solid transparent;
}
.task-btn.running {
  background: linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.04));
  border-color: rgba(255,255,255,0.30);
  box-shadow: inset 0 0 8px rgba(255,255,255,0.12);
}
.task-btn:hover { background: rgba(120,180,255,0.35); border-color: rgba(160,210,255,0.6); }
```

---

## 8. Start menu & Start orb

### 8.1 The orb

- Round translucent **blue glass sphere** with the four-pane Windows flag inside, sitting on the
  taskbar's left end, slightly overhanging the top edge.
- Three states: resting (soft blue glow), hover (brighter, expanding inner glow), pressed
  (intense white-blue bloom). The orb breathes a faint glow.

### 8.2 Start menu panel

- Two-column glass panel above the orb:
  - **Left column** (white, ~65%): pinned programs (top) + most-used (auto), a separator, then
    "All Programs" which slides into an in-place scrolling tree.
  - **Right column** (lighter, accent-tinted): user picture header + links — Documents, Pictures,
    Music, Games, Computer, Control Panel, Devices and Printers, Default Programs, Help and
    Support.
- **Search box** at the bottom-left ("Search programs and files") with instant incremental
  results that replace the menu contents as you type.
- **Power button** bottom-right (Shut down) with a chevron for Restart/Sleep/Log off.
- Program rows: 24–32px tall, 16–24px icon + label, hover = light-blue gradient highlight.

```css
.start-menu {
  width: 480px; border-radius: 6px;
  background: rgba(235,242,252,0.92);
  backdrop-filter: blur(24px) saturate(1.3);
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 14px 50px rgba(0,0,0,0.5);
}
.start-orb {
  width: 54px; height: 54px; border-radius: 50%;
  background: radial-gradient(circle at 50% 35%, #BFE6FF 0%, #3FA0E8 45%, #1E64B4 80%, #0A3A78 100%);
  box-shadow: 0 0 10px rgba(60,150,255,0.7), inset 0 2px 4px rgba(255,255,255,0.6);
}
.start-orb:hover { box-shadow: 0 0 16px rgba(120,200,255,0.95), inset 0 2px 5px rgba(255,255,255,0.8); }
```

---

## 9. Icon language

Windows 7 icons follow the **Aero icon style** — semi-realistic, glossy, rendered as if small
physical objects, lit from the upper-front, often viewed at a slight **¾ / 45° downward angle**
(especially folders and devices).

### 9.1 Style rules

- **Perspective:** objects shown at a 45° tilted top-down view (the "desk" angle). Flat
  glyph-style icons exist for toolbars but the hero icons are dimensional.
- **Lighting:** consistent top-left/top-front light; soft contact shadow beneath; glossy
  reflective highlights on glass/metal surfaces.
- **Material realism:** glass, brushed metal, plastic, paper — rendered with gradients,
  reflections, and subtle transparency.
- **Color:** rich, saturated, with smooth gradients (no flat fills on hero icons).
- **Rounded, friendly forms;** generous antialiasing.

### 9.2 Sizes (icon resource set)

Every shell icon shipped at multiple sizes in one `.ico`:

| Size | Use |
|------|-----|
| 16×16 | Title bars, menus, tree views, small list view |
| 24×24 | Some toolbars |
| 32×32 | Standard desktop / alt-tab |
| 48×48 | Medium icons view |
| 96×96 | Large icons |
| **256×256** | **Extra-large icons (PNG-compressed, new in Vista/7)** |

> The 256×256 PNG-in-ICO was the headline upgrade — it let Explorer's slider scale icons up to
> jumbo size with full detail. Design at 256 then hand-tune the smaller hinted versions.

### 9.3 Signature icons

| Icon | Description |
|------|-------------|
| **Computer** | Silver/blue LCD monitor at ¾ angle, glossy screen showing a blue glow |
| **Folder** | Manila-yellow folder, open lid at 45°, glassy sheen; populated folders preview contents |
| **Recycle Bin** | Translucent glass/green wire bin; full = crumpled paper inside |
| **Documents library** | Stack of papers with a colored band; "Library" icons add a small stack motif |
| **Control Panel** | Blue slider + green/red toggles on a panel |
| **Network** | Globe + connected monitors |
| **Drives** | 3D drive bay; system drive carries a Windows flag badge |
| **User account** | Round/rounded-square photo tile in a glossy frame |

### 9.4 Library & overlay badges

- **Libraries** (Documents/Music/Pictures/Videos) — new in 7 — use a stacked-folder motif with a
  colored accent.
- **Overlays:** shortcut = small arrow badge (bottom-left), shared = two-people badge, UAC
  shield = blue/yellow/green four-color shield on actions needing elevation, sync/compressed/
  offline overlays as small corner badges.

### 9.5 Recreating Aero icons (web)

- Build at 256px, export 16/32/48/256. Use layered gradients + a glossy top-half overlay + a
  soft drop shadow + a faint floor reflection.
- For glyph/flat needs, a single-color silhouette with a 1px inner bevel reads as "Win7 toolbar."

---

## 10. Motion & feedback

| Interaction | Animation |
|-------------|-----------|
| Open/close window | Scale + fade (~200ms ease-out), "genie"-style grow from taskbar |
| Minimize | Shrink toward taskbar button |
| Aero Snap | Translucent blue rectangle eases into the dock target |
| Aero Peek | Windows fade to glass outlines (~150ms) |
| Hover highlights | ~120ms fade-in, slightly slower fade-out |
| Progress shimmer | Continuous diagonal gloss sweep |
| Start orb | Slow ambient glow pulse; quick bloom on press |
| Taskbar thumbnail | Pop + fade (~150ms) above the button |

General feel: **fast, eased, subtle** — 120–250ms, ease-out, nothing bouncy.

---

## 11. CSS design tokens (drop-in)

```css
:root {
  /* Accent / glass */
  --w7-accent:        #3399FF;
  --w7-accent-deep:   #1E64B4;
  --w7-glass-tint:    rgba(180, 215, 245, 0.45);
  --w7-glass-edge:    rgba(255, 255, 255, 0.55);
  --w7-glass-shadow:  rgba(0, 0, 0, 0.45);

  /* Surfaces */
  --w7-window-bg:     #F0F0F0;
  --w7-content-bg:    #FFFFFF;
  --w7-nav-bg:        #EDF3FB;

  /* Buttons */
  --w7-btn-top:       #F2F2F2;
  --w7-btn-bottom:    #CFCFCF;
  --w7-btn-border:    #707070;
  --w7-btn-hover-top: #EAF6FD;
  --w7-btn-hover-bot: #A7D9F5;
  --w7-btn-hover-bd:  #3C7FB1;
  --w7-btn-press-top: #C2E4F6;
  --w7-btn-press-bot: #77BEE5;

  /* Selection / hover */
  --w7-sel-top:       #D9EBF9;
  --w7-sel-bot:       #BDE2F8;
  --w7-sel-border:    #7DA2CE;

  /* Text */
  --w7-text:          #000000;
  --w7-text-2:        #444746;
  --w7-text-disabled: #A0A0A0;
  --w7-link:          #0066CC;
  --w7-title-blue:    #003399;

  /* Status */
  --w7-progress-top:  #4BE066;
  --w7-progress-bot:  #06B025;
  --w7-close-red:     #E81123;

  /* Type */
  --w7-font: "Segoe UI", "Segoe UI Web (West European)", Tahoma, Geneva, Verdana, sans-serif;
  --w7-font-mono: Consolas, "Lucida Console", monospace;

  /* Geometry */
  --w7-radius-window: 6px;
  --w7-radius-ctrl:   3px;
  --w7-caption-h:     30px;
  --w7-taskbar-h:     40px;
}

body { font-family: var(--w7-font); font-size: 12px; color: var(--w7-text); }
```

---

## 12. Theme variants (fidelity tiers)

| Theme | Glass | Animations | Notes |
|-------|-------|-----------|-------|
| **Aero** | ✅ full glass + blur | ✅ all | The real Win7 look (requires WDDM GPU) |
| **Aero (no transparency)** | opaque accent frames | ✅ | Glass off, still glossy/rounded |
| **Windows 7 Basic** | ❌ flat opaque frames | ❌ most | Solid color caption, no blur, no Peek |
| **Windows Classic** | ❌ | ❌ | Windows 2000 look — square, gray, 3D bevels |
| **High Contrast** | ❌ | ❌ | Accessibility; pure black/white/yellow schemes |

For web recreations, target **Aero** for the iconic look and provide a `prefers-reduced-
transparency` / `backdrop-filter` fallback that swaps glass for a solid tinted color (the "Basic"
behavior).

---

## 13. Quick checklist for an authentic Win7 UI

- [ ] Segoe UI everywhere; 9pt body, 12pt captions/main-instructions.
- [ ] Translucent blurred accent-tinted glass on frames, taskbar, Start menu, flyouts.
- [ ] 1px white inner edge + large soft outer shadow on every floating surface.
- [ ] Two-stop glossy buttons with the 49/50% fold; blue glow on hover; default-button ring.
- [ ] 3px control radius, 6px window-top radius.
- [ ] Red-glow Close button; white caption glyphs with a legibility shadow.
- [ ] Glossy green animated-shimmer progress bars.
- [ ] Large-icon taskbar with running-app lozenges + live thumbnails + color hot-track.
- [ ] Blue glass Start orb with ambient glow; two-column Start menu + bottom search.
- [ ] Dimensional, ¾-angle, glossy Aero icons at 16/32/48/256.
- [ ] Fast (120–250ms) ease-out animations; Snap/Peek/Shake behaviors.
```
