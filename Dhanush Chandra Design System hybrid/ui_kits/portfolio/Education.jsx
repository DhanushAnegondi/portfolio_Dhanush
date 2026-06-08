// Portfolio UI kit — Education Journey (scroll-driven PNG-frame render).
// Requires: React 18 UMD, GSAP 3.12.5 + ScrollTrigger (globals), loaded before this file.
// Assumes window.JourneyFX and window.ComicBubble may be present (guarded).

// ─── EDIT: real degree values ─────────────────────────────────────────────────
const BACHELOR = {
  label: "Bachelor's Degree",
  institution: "[Your University], India",
  field: "[Field of study]",
  years: "20XX – 20XX",
};
const MASTER = {
  label: "Master's Degree",
  institution: "Indiana University, Bloomington",
  field: "[Field of study]",
  years: "20XX – 20XX",
};
// ─────────────────────────────────────────────────────────────────────────────

// ── Frame sequences ───────────────────────────────────────────────────────────
const SEQS = {
  homeExit: { dir: "journey/cine/frames/home-exit/",   prefix: "home-exit-",                   n: 6  },
  walk:     { dir: "journey/cine/frames/walk/",         prefix: "student-walk-strong-",          n: 12 },
  board:    { dir: "journey/cine/frames/board/",        prefix: "student-board-flight-",         n: 6  },
  arrival:  { dir: "journey/cine/frames/arrival-look/", prefix: "student-arrival-look-",         n: 4  },
  wave:     { dir: "journey/cine/frames/wave/",         prefix: "student-iu-arrival-wave-",      n: 4  },
  toGrad:   { dir: "journey/cine/frames/to-graduate/",  prefix: "student-to-graduate-",          n: 6  },
  celebrate:{ dir: "journey/cine/frames/celebrate/",    prefix: "graduate-celebrate-",           n: 4  },
  certRaise:{ dir: "journey/cine/frames/cert-raise/",   prefix: "graduate-certificate-raise-",  n: 4  },
  certIdle: { dir: "journey/cine/frames/cert-idle/",    prefix: "graduate-certificate-idle-",   n: 4  },
  annoyed:  { dir: "journey/cine/frames/annoyed/",      prefix: "click-annoyed-",               n: 6  },
  dismiss:  { dir: "journey/cine/frames/dismiss/",      prefix: "dismissive-recovery-",         n: 4  },
  plane:    { dir: "journey/cine/frames/plane/",        prefix: "plane-flight-",                n: 6  },
};

// Helper: pick the src string for a frame sequence at local progress [0,1]
function frameSrc(seq, local) {
  const clampedLocal = Math.min(1, Math.max(0, local));
  const idx = Math.min(seq.n - 1, Math.max(0, Math.floor(clampedLocal * seq.n)));
  return seq.dir + seq.prefix + String(idx + 1).padStart(2, "0") + ".png";
}

// All frame paths for preloading
function allFramePaths() {
  const paths = [];
  for (const key in SEQS) {
    const seq = SEQS[key];
    for (let i = 1; i <= seq.n; i++) {
      paths.push(seq.dir + seq.prefix + String(i).padStart(2, "0") + ".png");
    }
  }
  return paths;
}

// ── Icon/prop assets ──────────────────────────────────────────────────────────
const IU_MARK     = "journey/iu-pixel-mark.png";
const GATE_LEFT   = "journey/cine/iu/sample-gates-left-pillar.png";
const GATE_RIGHT  = "journey/cine/iu/sample-gates-right-pillar.png";
const BANNER      = "journey/cine/iu/iu-crimson-banner.png";
const ORIGIN_PIN  = "journey/cine/route/origin-pin.png";
const ORD_PIN     = "journey/cine/route/ord-pin.png";

// ── Act bands (progress 0..1) ─────────────────────────────────────────────────
const ACTS = {
  A1_START: 0.00, A1_END: 0.20,  // DEPARTURE
  A2_START: 0.20, A2_END: 0.46,  // FLIGHT
  A3_START: 0.46, A3_END: 0.70,  // ARRIVAL
  A4_START: 0.70, A4_END: 1.00,  // GRADUATION
};

// Chapter dots
const CHAPTERS = [
  { label: "Departure", start: ACTS.A1_START, end: ACTS.A1_END },
  { label: "Flight",    start: ACTS.A2_START, end: ACTS.A2_END },
  { label: "Arrival",   start: ACTS.A3_START, end: ACTS.A3_END },
  { label: "Graduation",start: ACTS.A4_START, end: ACTS.A4_END + 0.01 },
];

// ── CSS (cine- prefix only) ──────────────────────────────────────────────────
const CINE_STYLES = `
/* Layout */
.cine {
  position: relative;
  width: 100%;
  font-family: var(--font-sans);
  border-top: 1px solid hsl(var(--border));
}

/* Dark brand backdrop — always dark in both themes */
.cine-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(220,60,30,0.08) 0%, transparent 60%),
    linear-gradient(180deg, hsl(220,25%,7%) 0%, hsl(220,20%,9%) 100%);
  pointer-events: none;
}
.cine-backdrop::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(0deg,   transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px),
    repeating-linear-gradient(90deg,  transparent, transparent 31px, rgba(255,255,255,0.025) 31px, rgba(255,255,255,0.025) 32px);
  -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
  mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
  pointer-events: none;
}

/* Stage */
.cine-stage {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 480px;
  overflow: hidden;
}

/* Ground line */
.cine-ground {
  position: absolute;
  bottom: 12%;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent 100%);
  z-index: 5;
  pointer-events: none;
}

/* HUD */
.cine-header {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 30;
  padding: 20px 28px 0;
  padding-left: 150px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  pointer-events: none;
}
.cine-heading {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  color: #f5f5f7;
  letter-spacing: var(--tracking-tight);
  margin: 0 0 2px;
  text-shadow: 0 1px 6px rgba(0,0,0,0.6);
}
.cine-subheading {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: rgba(245,245,247,0.82);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin: 0;
  text-shadow: 0 1px 6px rgba(0,0,0,0.6);
}
.cine-chapters {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 4px 0;
}
.cine-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  flex-shrink: 0;
}
.cine-dot.cine-dot--active {
  background: hsl(var(--primary));
  box-shadow: 0 0 8px hsl(var(--primary) / 0.7);
  transform: scale(1.25);
}
.cine-dot-label {
  font-family: var(--font-mono);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: rgba(245,245,247,0.82);
  text-shadow: 0 1px 6px rgba(0,0,0,0.6);
  margin-left: 2px;
  margin-right: 4px;
}

/* Progress bar */
.cine-progress-bar-wrap {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  z-index: 30;
  background: rgba(255,255,255,0.07);
}
.cine-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.6));
  width: 0%;
}

/* Character actor button */
.cine-actor {
  position: absolute;
  bottom: 12%;
  z-index: 15;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  outline-offset: 4px;
}
.cine-actor:focus-visible {
  outline: 2px solid hsl(var(--primary));
  border-radius: 4px;
}
.cine-contact-shadow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px; height: 14px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%);
  pointer-events: none;
}
.cine-char-img {
  display: block;
  height: 150px;
  width: auto;
  image-rendering: pixelated;
  pointer-events: none;
}
.cine-char-reaction {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 150px;
  width: auto;
  image-rendering: pixelated;
  z-index: 2;
  pointer-events: none;
}

/* Plane */
.cine-plane-img {
  position: absolute;
  image-rendering: pixelated;
  z-index: 12;
  pointer-events: none;
}

/* Route arc SVG */
.cine-route-svg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 11;
  pointer-events: none;
  overflow: visible;
}

/* Route pins */
.cine-pin {
  position: absolute;
  image-rendering: pixelated;
  z-index: 13;
  pointer-events: none;
}

/* ORD label */
.cine-ord-label {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 9px;
  color: rgba(245,245,247,0.9);
  text-shadow: 0 1px 6px rgba(0,0,0,0.8);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  pointer-events: none;
  z-index: 14;
  white-space: nowrap;
}

/* IU props */
.cine-prop {
  position: absolute;
  image-rendering: pixelated;
  pointer-events: none;
  z-index: 11;
}
.cine-iu-mark {
  position: absolute;
  image-rendering: pixelated;
  pointer-events: none;
  z-index: 20;
  filter: drop-shadow(0 0 18px hsl(var(--primary) / 0.5));
}

/* Education cards */
.cine-card {
  position: absolute;
  width: 280px;
  border-radius: 16px;
  background: hsl(var(--card) / 0.96);
  border: 1px solid hsl(var(--border));
  border-left: 3px solid hsl(var(--primary));
  box-shadow: var(--shadow-lg, 0 4px 24px rgba(0,0,0,0.4)), 0 8px 40px rgba(0,0,0,0.45);
  backdrop-filter: blur(10px);
  padding: 20px 22px;
  z-index: 20;
  pointer-events: none;
}
.cine-card-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: hsl(var(--primary));
  margin: 0 0 6px;
}
.cine-card-title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: hsl(var(--foreground));
  margin: 0 0 4px;
  line-height: var(--leading-tight);
}
.cine-card-sub {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: hsl(var(--muted-foreground));
  margin: 0 0 2px;
  line-height: var(--leading-relaxed);
}
.cine-card-years {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: hsl(var(--muted-foreground));
  margin: 6px 0 0;
}

/* Scroll hint */
.cine-scroll-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(245,245,247,0.6);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  pointer-events: none;
  z-index: 30;
  text-shadow: 0 1px 6px rgba(0,0,0,0.6);
  white-space: nowrap;
  animation: cine-bounce 1.8s ease-in-out infinite;
}
@keyframes cine-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(-5px); }
}

/* Screen-reader accessible text */
.cine-sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* Static fallback */
.cine-static {
  background: hsl(220,25%,7%);
  padding: 40px 24px 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.cine-static-row {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}
.cine-static-img {
  image-rendering: pixelated;
  height: 130px;
  width: auto;
  flex-shrink: 0;
}
.cine-static-card {
  border-radius: 16px;
  background: hsl(var(--card) / 0.92);
  border: 1px solid hsl(var(--border));
  border-left: 3px solid hsl(var(--primary));
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  padding: 20px 22px;
  width: 280px;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .cine-header { padding-left: 28px; }
  .cine-dot-label { display: none; }
  .cine-card { width: min(240px, 88vw); }
  .cine-static-row { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .cine-scroll-hint { animation: none; }
}
`;

// ── Utility: lerp & clamp01 ───────────────────────────────────────────────────
function clamp01(v) { return Math.min(1, Math.max(0, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
// Remap progress p from [inA..inB] → [0..1], clamped
function remap(p, inA, inB) { return clamp01((p - inA) / (inB - inA)); }
// Ease in-out cubic
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
// Ease out cubic
function easeOut(t) { const u = 1 - t; return 1 - u * u * u; }

// ── Static fallback ───────────────────────────────────────────────────────────
function EducationStatic() {
  const walkSrc    = frameSrc(SEQS.walk, 0.5);
  const waveSrc    = frameSrc(SEQS.wave, 0.5);
  const planeSrc   = frameSrc(SEQS.plane, 0.0);
  const certSrc    = frameSrc(SEQS.certIdle, 0.0);

  return (
    <div className="cine-static">
      <div className="cine-static-row">
        <img src={walkSrc}  alt="Student walking" className="cine-static-img" />
        <div className="cine-static-card">
          <p className="cine-card-label">{BACHELOR.label}</p>
          <p className="cine-card-title">{BACHELOR.institution}</p>
          <p className="cine-card-sub">{BACHELOR.field}</p>
          <p className="cine-card-years">{BACHELOR.years}</p>
        </div>
      </div>
      <div className="cine-static-row">
        <img src={planeSrc} alt="Plane in flight" className="cine-static-img" />
        <img src={ORIGIN_PIN} alt="Origin: India" style={{ height: 60, width: "auto", imageRendering: "pixelated" }} />
        <img src={ORD_PIN}    alt="Chicago O'Hare (ORD)" style={{ height: 44, width: "auto", imageRendering: "pixelated" }} />
      </div>
      <div className="cine-static-row">
        <img src={waveSrc}  alt="Student waving at IU" className="cine-static-img" />
        <div className="cine-static-card">
          <p className="cine-card-label">{MASTER.label}</p>
          <p className="cine-card-title">{MASTER.institution}</p>
          <p className="cine-card-sub">{MASTER.field}</p>
          <p className="cine-card-years">{MASTER.years}</p>
        </div>
        <img src={IU_MARK} alt="Indiana University" style={{ height: 70, width: "auto", imageRendering: "pixelated" }} />
      </div>
      <div className="cine-static-row">
        <img src={certSrc}  alt="Graduate with certificate" className="cine-static-img" />
      </div>
    </div>
  );
}

// ── Animated component ────────────────────────────────────────────────────────
function EducationAnimated() {
  const sectionRef      = React.useRef(null);
  const stRef           = React.useRef(null);   // ScrollTrigger instance
  const mountedRef      = React.useRef(false);
  const rafRef          = React.useRef(null);    // reaction rAF
  const reactingRef     = React.useRef(false);

  // DOM refs for render(p) imperative updates — NO state for per-frame data
  const actorRef        = React.useRef(null);
  const charImgRef      = React.useRef(null);    // main character <img>
  const reactionImgRef  = React.useRef(null);    // click reaction overlay <img>
  const planeImgRef     = React.useRef(null);    // plane <img>
  const planeSvgRef     = React.useRef(null);    // route arc SVG
  const originPinRef    = React.useRef(null);
  const ordPinRef       = React.useRef(null);
  const ordLabelRef     = React.useRef(null);
  const flightLayerRef  = React.useRef(null);    // flight act wrapper
  const card1Ref        = React.useRef(null);
  const card2Ref        = React.useRef(null);
  const gateLeftRef     = React.useRef(null);
  const gateRightRef    = React.useRef(null);
  const bannerRef       = React.useRef(null);
  const iuMarkRef       = React.useRef(null);
  const progressBarRef  = React.useRef(null);
  const dotsRef         = React.useRef([]);
  const scrollHintRef   = React.useRef(null);

  // One-shot fired flags (refs, not state)
  const sparkFiredRef   = React.useRef(false);
  const confettiFiredRef= React.useRef(false);

  // React state only for bubble visibility (minimal re-render surface)
  const [bubbleVisible, setBubbleVisible] = React.useState(false);
  const [bubblePos,     setBubblePos]     = React.useState({ x: 0, y: 0 });

  // ── Preload all frames once ───────────────────────────────────────────────
  React.useEffect(() => {
    const paths = allFramePaths();
    paths.forEach((p) => { const img = new Image(); img.src = p; });
  }, []);

  // ── render(p): pure imperative function, no setState ─────────────────────
  function render(p) {
    if (!mountedRef.current) return;

    // -- Chapter dots + progress bar --
    if (progressBarRef.current) {
      progressBarRef.current.style.width = (p * 100) + "%";
    }
    dotsRef.current.forEach((el, i) => {
      if (!el) return;
      const ch = CHAPTERS[i];
      const active = p >= ch.start && (i < CHAPTERS.length - 1 ? p < ch.end : p <= 1.0);
      if (active) el.classList.add("cine-dot--active");
      else        el.classList.remove("cine-dot--active");
    });

    // -- Scroll hint --
    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = p < 0.02 ? "1" : String(Math.max(0, 1 - (p - 0.02) / 0.04));
    }

    // ── ACT 1: DEPARTURE (0.00 – 0.20) ──────────────────────────────────
    if (p < ACTS.A1_END) {
      const local = remap(p, ACTS.A1_START, ACTS.A1_END); // 0..1

      // Character sequence: homeExit 0–0.25, walk 0.25–1.0
      let seq, seqLocal;
      if (local < 0.25) {
        seq = SEQS.homeExit;
        seqLocal = remap(local, 0, 0.25);
      } else {
        seq = SEQS.walk;
        seqLocal = remap(local, 0.25, 1.0);
      }

      if (charImgRef.current) {
        charImgRef.current.src = frameSrc(seq, seqLocal);
        charImgRef.current.style.opacity = "1";
      }

      // Actor translateX: ~14% → ~42% of stage (character to left, card to right)
      if (actorRef.current) {
        const xPct = lerp(14, 42, easeInOut(local));
        actorRef.current.style.transform = `translateX(${xPct}vw)`;
        actorRef.current.style.left = "0";
        actorRef.current.style.opacity = "1";
        actorRef.current.style.display = "";
      }

      // Hide flight layer
      if (flightLayerRef.current) flightLayerRef.current.style.opacity = "0";

      // Bachelor card: opacity 0→1 over local 0.04→0.12 (p~0.008..0.024),
      // then hold, then fade out local 0.90→1.0
      if (card1Ref.current) {
        let cardAlpha;
        if (local < 0.04) cardAlpha = 0;
        else if (local < 0.12) cardAlpha = easeOut(remap(local, 0.04, 0.12));
        else if (local < 0.88) cardAlpha = 1;
        else cardAlpha = 1 - remap(local, 0.88, 1.0);
        const cardY = lerp(18, 0, easeOut(Math.min(1, remap(local, 0.04, 0.14))));
        card1Ref.current.style.opacity = String(cardAlpha);
        card1Ref.current.style.transform = `translateY(${cardY}px)`;
        card1Ref.current.style.display = "";
      }
      if (card2Ref.current) { card2Ref.current.style.opacity = "0"; }

      // IU props hidden
      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = "0";
      if (gateRightRef.current) gateRightRef.current.style.opacity = "0";
      if (bannerRef.current)    bannerRef.current.style.opacity    = "0";
      if (iuMarkRef.current)    iuMarkRef.current.style.opacity    = "0";

      // One-shot sparkle at p~0.16
      const SPARK_THRESH = 0.16;
      if (!sparkFiredRef.current && p >= SPARK_THRESH) {
        sparkFiredRef.current = true;
        if (window.JourneyFX && card1Ref.current) {
          const r = card1Ref.current.getBoundingClientRect();
          window.JourneyFX.sparkleBurst(r.right, r.top + r.height * 0.5);
        }
      }
      if (p < SPARK_THRESH - 0.06) sparkFiredRef.current = false;

      return;
    }

    // ── ACT 2: FLIGHT (0.20 – 0.46) ──────────────────────────────────────
    if (p < ACTS.A2_END) {
      const local = remap(p, ACTS.A2_START, ACTS.A2_END); // 0..1

      // Hide character
      if (actorRef.current) actorRef.current.style.display = "none";

      // Cards hidden
      if (card1Ref.current) card1Ref.current.style.opacity = "0";
      if (card2Ref.current) card2Ref.current.style.opacity = "0";
      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = "0";
      if (gateRightRef.current) gateRightRef.current.style.opacity = "0";
      if (bannerRef.current)    bannerRef.current.style.opacity    = "0";
      if (iuMarkRef.current)    iuMarkRef.current.style.opacity    = "0";

      // Flight layer: fade in at start, hold, fade out near end
      if (flightLayerRef.current) {
        let flAlpha;
        if (local < 0.06) flAlpha = easeOut(remap(local, 0, 0.06));
        else if (local < 0.88) flAlpha = 1;
        else flAlpha = 1 - remap(local, 0.88, 1.0);
        flightLayerRef.current.style.opacity = String(flAlpha);
      }

      // Plane: cycles frames by local progress + arc path
      // Arc: origin pin ~18% from left, ~60% from bottom; ORD pin ~78% from left, ~62% from bottom
      // Stage coords (% of 100vw x 100vh):
      const originX = 18;  // vw %
      const originY = 62;  // vh % from bottom → top = 38vh %
      const ordX    = 78;
      const ordY    = 62;
      // Arc midpoint peaks up at 30vh % from bottom (top=30%)
      const midX    = 48;
      const midY    = 70;  // peak height from bottom

      // Quadratic bezier at t=local: P = (1-t)^2*P0 + 2t(1-t)*P1 + t^2*P2
      const t       = local;
      const planeX  = (1 - t) * (1 - t) * originX + 2 * t * (1 - t) * midX + t * t * ordX;
      const planeY  = (1 - t) * (1 - t) * originY + 2 * t * (1 - t) * midY + t * t * ordY;
      // Convert to actual CSS: left=planeX vw, bottom=planeY vh

      if (planeImgRef.current) {
        planeImgRef.current.src = frameSrc(SEQS.plane, local);
        planeImgRef.current.style.left   = planeX + "vw";
        planeImgRef.current.style.bottom = planeY + "vh";
        planeImgRef.current.style.transform = "translate(-50%, 50%)";
      }

      // Pins: fade in at local 0.02, hold, fade out at 0.88
      const pinAlpha = local < 0.06 ? easeOut(remap(local, 0.02, 0.06))
        : local > 0.88 ? 1 - remap(local, 0.88, 1.0)
        : 1;

      if (originPinRef.current) {
        originPinRef.current.style.opacity = String(pinAlpha);
        originPinRef.current.style.left   = originX + "vw";
        originPinRef.current.style.bottom = (originY - 10) + "vh"; // pin base a bit below plane origin
      }
      if (ordPinRef.current) {
        ordPinRef.current.style.opacity = String(pinAlpha);
        ordPinRef.current.style.left   = ordX + "vw";
        ordPinRef.current.style.bottom = (ordY - 10) + "vh";
      }
      if (ordLabelRef.current) {
        ordLabelRef.current.style.opacity = String(pinAlpha);
        ordLabelRef.current.style.left    = (ordX + 2) + "vw";
        ordLabelRef.current.style.bottom  = (ordY - 5) + "vh";
      }

      // Arc SVG: draw dotted arc only while act is visible
      if (planeSvgRef.current) {
        planeSvgRef.current.style.opacity = String(pinAlpha);
        // SVG path using viewBox 0 0 100 100 (maps to vw x vh proportions via preserveAspectRatio none)
        const d = `M ${originX} ${100 - originY} Q ${midX} ${100 - midY} ${ordX} ${100 - ordY}`;
        const pathEl = planeSvgRef.current.querySelector(".cine-arc-path");
        if (pathEl) pathEl.setAttribute("d", d);
      }

      return;
    }

    // ── ACT 3: ARRIVAL (0.46 – 0.70) ─────────────────────────────────────
    if (p < ACTS.A3_END) {
      const local = remap(p, ACTS.A3_START, ACTS.A3_END); // 0..1

      // Bring back character
      if (actorRef.current) {
        actorRef.current.style.display = "";
        actorRef.current.style.opacity = "1";
        const xPct = lerp(30, 38, easeInOut(Math.min(1, remap(local, 0, 0.5))));
        actorRef.current.style.transform = `translateX(${xPct}vw)`;
        actorRef.current.style.left = "0";
      }

      // Character: arrival 0–0.4, wave 0.4–1.0
      let seq2, seqLocal2;
      if (local < 0.4) {
        seq2 = SEQS.arrival;
        seqLocal2 = remap(local, 0, 0.4);
      } else {
        seq2 = SEQS.wave;
        seqLocal2 = remap(local, 0.4, 1.0);
      }
      if (charImgRef.current) {
        charImgRef.current.src = frameSrc(seq2, seqLocal2);
        charImgRef.current.style.opacity = "1";
      }

      // Hide flight layer
      if (flightLayerRef.current) flightLayerRef.current.style.opacity = "0";

      // IU gate pillars + banner: fade in at local 0.05→0.15
      const iuPropAlpha = local < 0.05 ? 0
        : local < 0.15 ? easeOut(remap(local, 0.05, 0.15))
        : local < 0.85 ? 1
        : 1 - remap(local, 0.85, 1.0);

      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = String(iuPropAlpha);
      if (gateRightRef.current) gateRightRef.current.style.opacity = String(iuPropAlpha);
      if (bannerRef.current)    bannerRef.current.style.opacity    = String(iuPropAlpha);

      // IU mark hidden in act 3
      if (iuMarkRef.current) iuMarkRef.current.style.opacity = "0";

      // Hide bachelor card
      if (card1Ref.current) card1Ref.current.style.opacity = "0";

      // Master card: fade in at local 0.08→0.20, hold, fade out 0.88→1.0
      if (card2Ref.current) {
        let card2Alpha;
        if (local < 0.08) card2Alpha = 0;
        else if (local < 0.20) card2Alpha = easeOut(remap(local, 0.08, 0.20));
        else if (local < 0.86) card2Alpha = 1;
        else card2Alpha = 1 - remap(local, 0.86, 1.0);
        const card2Y = lerp(18, 0, easeOut(Math.min(1, remap(local, 0.08, 0.22))));
        card2Ref.current.style.opacity = String(card2Alpha);
        card2Ref.current.style.transform = `translateY(${card2Y}px)`;
        card2Ref.current.style.display = "";
      }

      // One-shot confetti at p~0.64 (local ~0.69)
      const CONF_THRESH = 0.64;
      if (!confettiFiredRef.current && p >= CONF_THRESH) {
        confettiFiredRef.current = true;
        if (window.JourneyFX && card2Ref.current) {
          const r = card2Ref.current.getBoundingClientRect();
          window.JourneyFX.confettiBurst(r.right, r.top);
        }
      }
      if (p < CONF_THRESH - 0.06) confettiFiredRef.current = false;

      return;
    }

    // ── ACT 4: GRADUATION (0.70 – 1.00) ──────────────────────────────────
    {
      const local = remap(p, ACTS.A4_START, ACTS.A4_END); // 0..1

      if (actorRef.current) {
        actorRef.current.style.display = "";
        actorRef.current.style.opacity = "1";
        // Hold at center, slight drift right
        const xPct = lerp(42, 46, local);
        actorRef.current.style.transform = `translateX(${xPct}vw)`;
        actorRef.current.style.left = "0";
      }

      // Character sequence: toGrad 0–0.45, certRaise 0.45–0.70, celebrate 0.70–0.90, certIdle 0.90–1.0
      let seq4, seqLocal4;
      if (local < 0.45) {
        seq4 = SEQS.toGrad;
        seqLocal4 = remap(local, 0, 0.45);
      } else if (local < 0.70) {
        seq4 = SEQS.certRaise;
        seqLocal4 = remap(local, 0.45, 0.70);
      } else if (local < 0.90) {
        seq4 = SEQS.celebrate;
        seqLocal4 = remap(local, 0.70, 0.90);
      } else {
        seq4 = SEQS.certIdle;
        seqLocal4 = remap(local, 0.90, 1.0);
      }
      if (charImgRef.current) {
        charImgRef.current.src = frameSrc(seq4, seqLocal4);
        charImgRef.current.style.opacity = "1";
      }

      // Hide flight layer
      if (flightLayerRef.current) flightLayerRef.current.style.opacity = "0";

      // Gate/banner hidden
      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = "0";
      if (gateRightRef.current) gateRightRef.current.style.opacity = "0";
      if (bannerRef.current)    bannerRef.current.style.opacity    = "0";

      // Cards hidden
      if (card1Ref.current) card1Ref.current.style.opacity = "0";
      if (card2Ref.current) card2Ref.current.style.opacity = "0";

      // IU mark: scale+brightens from local 0.10 onward
      if (iuMarkRef.current) {
        const markAlpha = local < 0.10 ? 0 : easeOut(remap(local, 0.10, 0.28));
        const markScale = lerp(0.7, 1.0, easeOut(clamp01(remap(local, 0.10, 0.30))));
        iuMarkRef.current.style.opacity = String(markAlpha);
        iuMarkRef.current.style.transform = `scale(${markScale})`;
      }
    }
  }

  // ── Mount: create ScrollTrigger, call render(0) ──────────────────────────
  React.useEffect(() => {
    mountedRef.current = true;

    if (!window.gsap || !window.ScrollTrigger) {
      console.warn("Education: GSAP/ScrollTrigger not loaded.");
      return;
    }
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Initial render at p=0
    render(0);

    const st = window.ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=600%",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        render(self.progress);
      },
    });
    stRef.current = st;

    return () => {
      mountedRef.current = false;
      if (stRef.current) { stRef.current.kill(); stRef.current = null; }
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
  }, []);

  // ── Click reaction (the ONE allowed non-scroll animation) ────────────────
  function handleCharClick(e) {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    if (e.type === "keydown") e.preventDefault();
    if (reactingRef.current) return;
    reactingRef.current = true;

    // Compute head position for comic bubble
    if (actorRef.current) {
      const r = actorRef.current.getBoundingClientRect();
      setBubblePos({ x: r.left + r.width / 2, y: r.top });
    }
    setBubbleVisible(true);

    // rAF loop for annoyed frames (~1.4s at 60fps = ~84 frames over 6 frames)
    const ANNOYED_DURATION = 1400;
    const DISMISS_DURATION = 800;
    const startTime = performance.now();
    let phase = "annoyed";

    function tick(now) {
      if (!mountedRef.current) return;
      const elapsed = now - startTime;

      if (phase === "annoyed") {
        const local = clamp01(elapsed / ANNOYED_DURATION);
        if (reactionImgRef.current) {
          reactionImgRef.current.src = frameSrc(SEQS.annoyed, local);
          reactionImgRef.current.style.display = "";
        }
        if (elapsed < ANNOYED_DURATION) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          phase = "dismiss";
          const dismissStart = now;
          function dismissTick(now2) {
            if (!mountedRef.current) return;
            const elapsed2 = now2 - dismissStart;
            const local2 = clamp01(elapsed2 / DISMISS_DURATION);
            if (reactionImgRef.current) {
              reactionImgRef.current.src = frameSrc(SEQS.dismiss, local2);
            }
            if (elapsed2 < DISMISS_DURATION) {
              rafRef.current = requestAnimationFrame(dismissTick);
            } else {
              // Cleanup
              if (reactionImgRef.current) reactionImgRef.current.style.display = "none";
              reactingRef.current = false;
              setBubbleVisible(false);
            }
          }
          rafRef.current = requestAnimationFrame(dismissTick);
        }
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="cine"
      aria-labelledby="cine-heading"
    >
      <style>{CINE_STYLES}</style>

      {/* Screen-reader accessible education facts (always readable) */}
      <div className="cine-sr-only">
        <h2>Education</h2>
        <section>
          <h3>{BACHELOR.label}</h3>
          <p>{BACHELOR.institution}</p>
          <p>{BACHELOR.field}</p>
          <p>{BACHELOR.years}</p>
        </section>
        <section>
          <h3>{MASTER.label}</h3>
          <p>{MASTER.institution}</p>
          <p>{MASTER.field}</p>
          <p>{MASTER.years}</p>
        </section>
      </div>

      <div className="cine-stage">

        {/* Dark brand backdrop (always dark, both themes) */}
        <div className="cine-backdrop" aria-hidden="true" />

        {/* Ground line */}
        <div className="cine-ground" aria-hidden="true" />

        {/* ── Act 2: Flight layer (pins, arc, plane) ── */}
        <div
          ref={flightLayerRef}
          style={{ position: "absolute", inset: 0, zIndex: 11, opacity: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
          {/* SVG arc overlay */}
          <svg
            ref={planeSvgRef}
            className="cine-route-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              className="cine-arc-path"
              d="M 18 38 Q 48 30 78 38"
              fill="none"
              stroke="rgba(245,245,247,0.35)"
              strokeWidth="0.5"
              strokeDasharray="2 3"
            />
          </svg>

          {/* Origin pin */}
          <img
            ref={originPinRef}
            src={ORIGIN_PIN}
            alt=""
            className="cine-pin"
            style={{ width: 38, height: "auto", opacity: 0 }}
          />

          {/* ORD pin */}
          <img
            ref={ordPinRef}
            src={ORD_PIN}
            alt=""
            className="cine-pin"
            style={{ width: 26, height: "auto", opacity: 0 }}
          />

          {/* ORD label */}
          <span
            ref={ordLabelRef}
            className="cine-ord-label"
            style={{ opacity: 0 }}
          >
            Chicago O'Hare (ORD)
          </span>

          {/* Plane */}
          <img
            ref={planeImgRef}
            src={frameSrc(SEQS.plane, 0)}
            alt=""
            className="cine-plane-img"
            style={{ width: 72, height: "auto", opacity: 1 }}
          />
        </div>

        {/* ── IU props (gate pillars, banner) ── */}
        <img
          ref={gateLeftRef}
          src={GATE_LEFT}
          alt=""
          aria-hidden="true"
          className="cine-prop"
          style={{ width: 60, left: "54%", bottom: "12%", opacity: 0 }}
        />
        <img
          ref={gateRightRef}
          src={GATE_RIGHT}
          alt=""
          aria-hidden="true"
          className="cine-prop"
          style={{ width: 60, right: "8%", bottom: "12%", opacity: 0 }}
        />
        <img
          ref={bannerRef}
          src={BANNER}
          alt=""
          aria-hidden="true"
          className="cine-prop"
          style={{ width: 50, right: "22%", top: "18%", opacity: 0 }}
        />

        {/* ── IU mark (graduation) ── */}
        <img
          ref={iuMarkRef}
          src={IU_MARK}
          alt="Indiana University"
          className="cine-iu-mark"
          style={{ width: 90, right: "12%", bottom: "24%", opacity: 0, transformOrigin: "center bottom" }}
        />

        {/* ── Education cards ── */}
        <div
          ref={card1Ref}
          className="cine-card"
          aria-hidden="true"
          style={{ bottom: "22%", left: "54%", opacity: 0 }}
        >
          <p className="cine-card-label">{BACHELOR.label}</p>
          <p className="cine-card-title">{BACHELOR.institution}</p>
          <p className="cine-card-sub">{BACHELOR.field}</p>
          <p className="cine-card-years">{BACHELOR.years}</p>
        </div>

        <div
          ref={card2Ref}
          className="cine-card"
          aria-hidden="true"
          style={{ bottom: "22%", left: "54%", opacity: 0 }}
        >
          <p className="cine-card-label">{MASTER.label}</p>
          <p className="cine-card-title">{MASTER.institution}</p>
          <p className="cine-card-sub">{MASTER.field}</p>
          <p className="cine-card-years">{MASTER.years}</p>
        </div>

        {/* ── Character actor (focusable button) ── */}
        <button
          ref={actorRef}
          className="cine-actor"
          aria-label="Talk to the character"
          onClick={handleCharClick}
          onKeyDown={handleCharClick}
          style={{ left: 0, transform: "translateX(14vw)" }}
        >
          <div className="cine-contact-shadow" />

          {/* Main character frame */}
          <img
            ref={charImgRef}
            src={frameSrc(SEQS.homeExit, 0)}
            alt="Student character"
            className="cine-char-img"
          />

          {/* Click-reaction overlay (hidden by default) */}
          <img
            ref={reactionImgRef}
            src={frameSrc(SEQS.annoyed, 0)}
            alt=""
            aria-hidden="true"
            className="cine-char-reaction"
            style={{ display: "none" }}
          />
        </button>

        {/* ── Comic bubble (click interruption) ── */}
        {window.ComicBubble && bubbleVisible && (
          <window.ComicBubble
            visible={true}
            text="Let me go and complete this journey. I'll be back."
            x={bubblePos.x}
            y={bubblePos.y}
          />
        )}

        {/* ── HUD ── */}
        <div className="cine-header">
          <div>
            <h2 className="cine-heading" id="cine-heading">Education</h2>
            <p className="cine-subheading">scroll to journey through the academic path</p>
          </div>
          <div className="cine-chapters" aria-hidden="true">
            {CHAPTERS.map((ch, i) => (
              <React.Fragment key={ch.label}>
                <span
                  ref={(el) => { dotsRef.current[i] = el; }}
                  className={"cine-dot" + (i === 0 ? " cine-dot--active" : "")}
                  title={ch.label}
                />
                <span className="cine-dot-label">{ch.label}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="cine-progress-bar-wrap" aria-hidden="true">
          <div ref={progressBarRef} className="cine-progress-bar" />
        </div>

        {/* Scroll hint */}
        <p ref={scrollHintRef} className="cine-scroll-hint" aria-hidden="true">
          scroll to explore ↓
        </p>

      </div>{/* /cine-stage */}
    </section>
  );
}

// ── Reduced-motion listener hook ─────────────────────────────────────────────
function useReducedMotion() {
  const mq = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  const [reduced, setReduced] = React.useState(mq ? mq.matches : false);

  React.useEffect(() => {
    if (!mq) return;
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ── Main export ───────────────────────────────────────────────────────────────
function Education() {
  const reduced = useReducedMotion();
  const noGsap  = typeof window !== "undefined" && !window.gsap;

  if (reduced || noGsap) {
    return (
      <>
        <style>{CINE_STYLES}</style>
        <section
          className="cine"
          aria-labelledby="cine-heading-static"
          style={{ background: "hsl(220,25%,7%)", borderTop: "1px solid hsl(var(--border))", padding: "40px 0 0" }}
        >
          <div style={{ padding: "0 28px 8px" }}>
            <h2
              id="cine-heading-static"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-2xl)",
                fontWeight: "var(--weight-semibold)",
                color: "#f5f5f7",
                letterSpacing: "var(--tracking-tight)",
                margin: 0,
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              Education
            </h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "rgba(245,245,247,0.7)", textTransform: "uppercase", letterSpacing: "var(--tracking-wider)", margin: "4px 0 0" }}>
              academic journey
            </p>
          </div>
          <EducationStatic />
        </section>
      </>
    );
  }

  return <EducationAnimated />;
}

window.Education = Education;
