/* _fx.jsx — Journey FX kit
 * Loaded via <script type="text/babel" src="journey/_fx.jsx">
 * Requires: React 18 UMD, @babel/standalone, GSAP 3.12.5 + ScrollTrigger (globals)
 * Exposes: window.JourneyFX, window.ComicBubble, window.ThemeToggle
 */

/* ─── Inject shared CSS (once) ──────────────────────────────────────────── */
(function injectStyles() {
  if (document.getElementById('jfx-styles')) return;
  const style = document.createElement('style');
  style.id = 'jfx-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    .jfx-bubble-wrap {
      position: fixed;
      pointer-events: none;
      z-index: 90;
      transition: opacity 0.18s ease, transform 0.18s ease;
      transform-origin: bottom center;
    }
    .jfx-bubble-wrap.jfx-visible {
      opacity: 1;
      transform: scale(1);
    }
    .jfx-bubble-wrap.jfx-hidden {
      opacity: 0;
      transform: scale(0.82);
    }
    .jfx-bubble-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
      pointer-events: none;
      user-select: none;
    }
    .jfx-bubble-text {
      position: absolute;
      /* inset as % of the 330x180 bubble box to stay inside white area */
      top: 26%;
      bottom: 18%;
      left: 18%;
      right: 18%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: 'Press Start 2P', var(--font-mono), monospace;
      font-size: 8.5px;
      line-height: 1.7;
      letter-spacing: 0;
      word-spacing: -1px;
      color: #1a1a1a;
      overflow: hidden;
      word-break: break-word;
    }

    .jfx-theme-toggle {
      position: fixed;
      top: 18px;
      left: 18px;
      z-index: 70;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px 6px 10px;
      background: hsl(var(--card, 222 14% 12%));
      border: 1px solid hsl(var(--border, 222 14% 22%));
      border-radius: 9999px;
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      color: hsl(var(--foreground, 0 0% 94%));
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      line-height: 1;
    }
    .jfx-theme-toggle:hover {
      border-color: hsl(var(--primary, 16 92% 58%));
    }
    .jfx-theme-toggle svg {
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
})();

/* ─── JourneyFX ─────────────────────────────────────────────────────────── */

const FX_CANVAS_ATTR = 'data-jfx-canvas';
const FX_MAX_CANVASES = 6;

function _countFxCanvases() {
  return document.querySelectorAll(`[${FX_CANVAS_ATTR}]`).length;
}

function _makeCanvas() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute(FX_CANVAS_ATTR, '1');
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 80;
  `;
  canvas.width  = window.innerWidth  || 800;
  canvas.height = window.innerHeight || 600;
  return canvas;
}

function confettiBurst(x, y, opts) {
  if (!document || !document.body) return;
  if (_countFxCanvases() > FX_MAX_CANVASES) return;

  const options = Object.assign({
    count: 90,
    colors: [
      'hsl(16 92% 58%)',  // ember
      '#9d1535',           // IU crimson
      '#f4f4f5',           // white
      '#3ec9b0',           // teal
      '#f5b53d',           // gold
    ],
    spread: 1.0,
    power: 1.0,
  }, opts || {});

  const canvas = _makeCanvas();
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Bias velocity: up and inward (leftward) since origin is right-side card corner
  const particles = [];
  for (let i = 0; i < options.count; i++) {
    const angle = ((Math.PI * 0.6) + (Math.random() - 0.5) * Math.PI * options.spread);
    const speed = (3.5 + Math.random() * 5.5) * options.power;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed * (0.7 + Math.random() * 0.6),
      vy: -(Math.abs(Math.sin(angle)) * speed * (0.8 + Math.random() * 0.5)), // always up initially
      w: 5 + Math.random() * 7,
      h: 3 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.25,
      color: options.colors[Math.floor(Math.random() * options.colors.length)],
      alpha: 1,
    });
  }

  const gravity = 0.22;
  const drag = 0.988;
  const totalFrames = Math.round(96); // ~1.6s @ 60fps
  let frame = 0;
  let rafId = null;

  function tick() {
    ctx.clearRect(0, 0, W, H);
    const progress = frame / totalFrames;
    frame++;

    for (const p of particles) {
      p.vy += gravity;
      p.vx *= drag;
      p.vy *= drag;
      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.rotV;
      // fade in last 40% of life
      p.alpha = progress > 0.6 ? 1 - ((progress - 0.6) / 0.4) : 1;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (frame < totalFrames) {
      rafId = requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  }

  rafId = requestAnimationFrame(tick);

  // Safety cleanup
  setTimeout(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (canvas.parentNode) canvas.remove();
  }, 2200);
}

function sparkleBurst(x, y, opts) {
  if (!document || !document.body) return;
  if (_countFxCanvases() > FX_MAX_CANVASES) return;

  const options = Object.assign({
    count: 18,
    colors: [
      'hsl(16 92% 58%)',  // ember
      '#f4f4f5',           // white
      '#22d9c8',           // cyan
      '#f5b53d',           // gold
    ],
    spread: 1.0,
    power: 1.0,
  }, opts || {});

  const canvas = _makeCanvas();
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  const particles = [];
  for (let i = 0; i < options.count; i++) {
    const angle = (Math.PI * 2 * i) / options.count + (Math.random() - 0.5) * 0.4;
    const speed = (1.8 + Math.random() * 2.5) * options.power * options.spread;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 3,
      color: options.colors[Math.floor(Math.random() * options.colors.length)],
      phase: Math.random() * Math.PI, // for twinkle
      alpha: 1,
    });
  }

  const totalFrames = Math.round(54); // ~0.9s @ 60fps
  let frame = 0;
  let rafId = null;

  function drawStar(ctx, cx, cy, r, color, alpha) {
    const pts = 4;
    const inner = r * 0.38;
    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const ang = (i * Math.PI) / pts - Math.PI / 2;
      const radius = i % 2 === 0 ? r : inner;
      const px = cx + Math.cos(ang) * radius;
      const py = cy + Math.sin(ang) * radius;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    const progress = frame / totalFrames;
    frame++;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;

      // Scale: 0→1 quickly, then hold, then 1→0
      let scale;
      if (progress < 0.25) {
        scale = progress / 0.25;
      } else if (progress < 0.65) {
        scale = 1;
      } else {
        scale = 1 - ((progress - 0.65) / 0.35);
      }
      // Twinkle: slight alpha oscillation
      const twinkle = 0.75 + 0.25 * Math.sin(p.phase + progress * Math.PI * 4);
      const alpha = Math.max(0, scale * twinkle);
      const r = p.size * Math.max(0.01, scale);

      drawStar(ctx, p.x, p.y, r, p.color, alpha);
    }

    if (frame < totalFrames) {
      rafId = requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  }

  rafId = requestAnimationFrame(tick);

  setTimeout(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (canvas.parentNode) canvas.remove();
  }, 1400);
}

const JourneyFX = { confettiBurst, sparkleBurst };

/* ─── ComicBubble ───────────────────────────────────────────────────────── */

// Asset path relative to the HTML page that loads this file
// (journey/_fx.jsx → sibling folder cine/fx/)
const BUBBLE_ASSET = 'journey/cine/fx/blank-dialogue-bubble.png';
const BUBBLE_W = 330;
const BUBBLE_H = 180;

// (x, y) = viewport coords of the top of the character's head (tail anchor point).
// The bubble body renders ABOVE that point; the tail points downward toward (x, y).
function ComicBubble({ text, x, y, visible }) {
  // Clamp to viewport with 12px margins
  const safeX = typeof x === 'number' ? x : 0;
  const safeY = typeof y === 'number' ? y : 0;
  const vw = (typeof window !== 'undefined' && window.innerWidth)  || 800;
  const vh = (typeof window !== 'undefined' && window.innerHeight) || 600;

  // Horizontally center the bubble on x, clamped so it stays within viewport
  const rawLeft = safeX - BUBBLE_W / 2;
  const left = Math.min(Math.max(12, rawLeft), vw - BUBBLE_W - 12);

  // Bubble bottom sits at y (tail tip); body extends upward
  const rawTop = safeY - BUBBLE_H;
  const top = Math.min(Math.max(12, rawTop), vh - BUBBLE_H - 12);

  return (
    <div
      className={`jfx-bubble-wrap ${visible ? 'jfx-visible' : 'jfx-hidden'}`}
      style={{
        left:   left + 'px',
        top:    top  + 'px',
        width:  BUBBLE_W + 'px',
        height: BUBBLE_H + 'px',
      }}
    >
      <img
        className="jfx-bubble-img"
        src={BUBBLE_ASSET}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <div
        className="jfx-bubble-text"
        role="status"
        aria-live="polite"
      >
        {text || ''}
      </div>
    </div>
  );
}

/* ─── ThemeToggle ───────────────────────────────────────────────────────── */

const THEME_KEY = 'dhanush_theme';

function applyTheme(theme) {
  if (!document || !document.documentElement) return;
  if (theme === 'light') {
    document.documentElement.classList.add('theme-light');
  } else {
    document.documentElement.classList.remove('theme-light');
  }
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle() {
  const { useState, useEffect } = React;

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch (_) {
      return 'dark';
    }
  });

  // Apply on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) { /* storage unavailable */ }
  }, [theme]);

  function toggle() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  const isLight = theme === 'light';
  const label   = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  const icon    = isLight ? <MoonIcon /> : <SunIcon />;
  const text    = isLight ? 'Dark' : 'Light';

  return (
    <button
      className="jfx-theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

/* ─── Exports ───────────────────────────────────────────────────────────── */

window.JourneyFX   = JourneyFX;
window.ComicBubble = ComicBubble;
window.ThemeToggle = ThemeToggle;
