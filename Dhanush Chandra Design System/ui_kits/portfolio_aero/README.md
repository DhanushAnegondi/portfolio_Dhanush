# DhanushOS Aero — experience mode (Windows-7-inspired)

The optional **"experience mode"** for the hybrid portfolio. A glassy
Windows-7-era desktop you boot into — the same apps and content as the clean
site, dressed in Aero glass.

> **Original theme, not a clone.** This evokes the Windows 7 *Aero* visual
> language (frosted translucent windows, a glossy Start orb, a glass taskbar,
> rounded glass controls) but uses **none** of Microsoft's logos, chrome, icons,
> or wallpaper. It's branded **DhanushOS Aero** — the feeling, made yours.

## The experience

1. **Boot** — "Starting DhanushOS" with an original glowing-orb loader.
2. **Aero desktop** — a blue aurora wallpaper, desktop icons, and a **glass
   taskbar** with a **Start orb (D)**, running-app buttons, a clock, and a
   **◄ Classic site** button.
3. **Start menu** — the classic two-column layout: apps on the left; Résumé /
   Writing / Experience / Contact and **Exit to classic site** on the right; a
   search box at the bottom.
4. **Frosted glass windows** — draggable, with minimize / maximize / red-close
   controls. Apps: Projects (with the animated **pipeline diagrams**), About,
   Skills, Experience, Writing, Résumé, Contact, and a dark **Terminal** console.
5. **Ask AI** helper floats above the taskbar.

## How the hybrid is wired

- The **clean site** (`ui_kits/portfolio/`) is the default. It shows an
  **"enter experience mode ↗"** pill (top-right) linking here.
- This experience links **back** to the clean site from the taskbar
  (**◄ Classic site**) and the Start menu (**Exit to classic site**).

## Files

Shares `data.js`, `icons.jsx`, `apps.jsx`, `projects.jsx`, `terminal.jsx` with
the CRT edition (`../portfolio_os/`). Aero-specific:
- `index.html` — applies `theme-light` (app content) and wires the window
  manager + taskbar + Start menu.
- `aero.css` — the Aero glass chrome + light app-content styling.
- `shell.jsx` — boot, taskbar, Start orb/menu, desktop icons, glass Window.

## Notes

- Built for laptop/desktop widths; a small-screen notice shows under 720px.
- Self-contained: links `../../styles.css` for tokens, renders its own
  components inline (no dependency on the compiled `_ds_bundle.js`).
- There are **two experience themes** to choose from: this Aero edition and the
  CRT-terminal edition in `../portfolio_os/`. Point the clean site's pill at
  whichever you prefer.
