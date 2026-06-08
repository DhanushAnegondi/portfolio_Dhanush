// Portfolio UI kit — Education Journey (scroll-driven PNG-frame render).
// Requires: React 18 UMD, GSAP 3.12.5 + ScrollTrigger (globals), loaded before this file.
// Assumes window.JourneyFX and window.ComicBubble may be present (guarded).
//
// Compact, contained stage (no full-viewport takeover). All positioning is in
// percent of the stage box, so nothing overflows the layout horizontally and the
// section never overlaps the sections above/below it.

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
  arrival:  { dir: "journey/cine/frames/arrival-look/", prefix: "student-arrival-look-",         n: 4  },
  wave:     { dir: "journey/cine/frames/wave/",         prefix: "student-iu-arrival-wave-",      n: 4  },
  toGrad:   { dir: "journey/cine/frames/to-graduate/",  prefix: "student-to-graduate-",          n: 6  },
  celebrate:{ dir: "journey/cine/frames/celebrate/",    prefix: "graduate-celebrate-",           n: 4  },
  certRaise:{ dir: "journey/cine/frames/cert-raise/",   prefix: "graduate-certificate-raise-",  n: 4  },
  certIdle: { dir: "journey/cine/frames/cert-idle/",    prefix: "graduate-certificate-idle-",   n: 4  },
  annoyed:  { dir: "journey/cine/frames/annoyed/",      prefix: "click-annoyed-",               n: 6  },
  dismiss:  { dir: "journey/cine/frames/dismiss/",      prefix: "dismissive-recovery-",         n: 4  },
  plane:    { dir: "journey/cine/frames/plane/",        prefix: "plane-flight-",                n: 6  },
  swoosh:   { dir: "journey/cine/fx/swoosh/",           prefix: "swoosh-wipe-",                  n: 6  },
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
// The "right pillar" source sprite has a stray second-pillar sliver baked into it,
// so reuse the clean left-pillar art for both gates (they're symmetric anyway).
const GATE_LEFT  = "journey/cine/iu/sample-gates-left-pillar.png";
const GATE_RIGHT = "journey/cine/iu/sample-gates-left-pillar.png";

// ── Stage layout anchors (percent of the stage box) ───────────────────────────
const GROUND_BOTTOM = 14;   // ground line / where characters stand
const CHAR_START_X  = 6;    // departure start (left edge of actor)
const CHAR_WALK_END = 28;   // end of the departure walk
const ARRIVE_X      = 28;   // arrival + graduation spot (kept identical → "same spot")
const CARD_LEFT     = 56;   // education card left edge
const CARD_BOTTOM   = 30;
const PILLAR_L_X    = 15;   // IU gate pillars frame the arrival/graduation spot
const PILLAR_R_X    = 42;

// ── Act bands (progress 0..1) ─────────────────────────────────────────────────
const ACTS = {
  A1_START: 0.00, A1_END: 0.24,  // DEPARTURE
  A2_START: 0.24, A2_END: 0.48,  // FLIGHT
  A3_START: 0.48, A3_END: 0.72,  // ARRIVAL
  A4_START: 0.72, A4_END: 1.00,  // GRADUATION
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
/* Section wrapper — full width backdrop, contained stage */
.cine {
  position: relative;
  width: 100%;
  overflow: hidden;
  font-family: var(--font-sans);
  border-top: 1px solid hsl(var(--border));
}

/* Dark brand backdrop — always dark in both themes, full-bleed behind stage */
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

/* Stage — compact + horizontally contained */
.cine-stage {
  position: relative;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  height: min(72vh, 600px);
  min-height: 480px;
  overflow: hidden;
}

/* Ground line */
.cine-ground {
  position: absolute;
  bottom: ${GROUND_BOTTOM}%;
  left: 4%; right: 4%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 18%, rgba(255,255,255,0.08) 82%, transparent 100%);
  z-index: 5;
  pointer-events: none;
}

/* HUD */
.cine-header {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 30;
  padding: 16px 24px 0;
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
/* Chapter indicator — pinned to the bottom-left so it never collides with the
   fixed theme toggle / "experience mode" buttons at the top of the page. */
.cine-chapters {
  position: absolute;
  bottom: 14px;
  left: 24px;
  z-index: 30;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 4px 0;
  pointer-events: none;
}
.cine-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  flex-shrink: 0;
  transition: transform .2s ease, background .2s ease;
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
  bottom: ${GROUND_BOTTOM}%;
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
  width: 70px; height: 12px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%);
  pointer-events: none;
}
.cine-char-img {
  display: block;
  height: 130px;
  width: auto;
  image-rendering: pixelated;
  pointer-events: none;
}

/* Plane */
.cine-plane-img {
  position: absolute;
  image-rendering: pixelated;
  z-index: 12;
  pointer-events: none;
}

/* Swoosh wipe overlay (full stage, sits over the plane just before arrival) */
.cine-swoosh {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
  z-index: 13;
  opacity: 0;
  pointer-events: none;
}

/* IU props */
.cine-prop {
  position: absolute;
  image-rendering: pixelated;
  pointer-events: none;
  z-index: 11;
}

/* Education cards */
.cine-card {
  position: absolute;
  width: 270px;
  border-radius: 16px;
  background: hsl(var(--card) / 0.96);
  border: 1px solid hsl(var(--border));
  border-left: 3px solid hsl(var(--primary));
  box-shadow: var(--shadow-lg, 0 4px 24px rgba(0,0,0,0.4)), 0 8px 40px rgba(0,0,0,0.45);
  backdrop-filter: blur(10px);
  padding: 18px 20px;
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
  bottom: 20px;
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
  height: 120px;
  width: auto;
  flex-shrink: 0;
}
.cine-static-card {
  border-radius: 16px;
  background: hsl(var(--card) / 0.92);
  border: 1px solid hsl(var(--border));
  border-left: 3px solid hsl(var(--primary));
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  padding: 18px 20px;
  width: 270px;
  flex-shrink: 0;
}

@media (max-width: 720px) {
  .cine-header { padding-left: 24px; }
  .cine-dot-label { display: none; }
  .cine-card { width: min(230px, 86vw); }
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
  const walkSrc  = frameSrc(SEQS.walk, 0.5);
  const waveSrc  = frameSrc(SEQS.wave, 0.5);
  const planeSrc = frameSrc(SEQS.plane, 0.0);
  const certSrc  = frameSrc(SEQS.certIdle, 0.0);

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
      </div>
      <div className="cine-static-row">
        <img src={GATE_LEFT} alt="" aria-hidden="true" style={{ height: 110, width: "auto", imageRendering: "pixelated" }} />
        <img src={waveSrc}  alt="Student waving at IU" className="cine-static-img" />
        <img src={GATE_RIGHT} alt="" aria-hidden="true" style={{ height: 110, width: "auto", imageRendering: "pixelated" }} />
        <div className="cine-static-card">
          <p className="cine-card-label">{MASTER.label}</p>
          <p className="cine-card-title">{MASTER.institution}</p>
          <p className="cine-card-sub">{MASTER.field}</p>
          <p className="cine-card-years">{MASTER.years}</p>
        </div>
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
  const charImgRef      = React.useRef(null);    // the ONE character <img>
  const planeImgRef     = React.useRef(null);    // plane <img>
  const swooshRef       = React.useRef(null);    // swoosh wipe overlay
  const flightLayerRef  = React.useRef(null);    // flight act wrapper
  const card1Ref        = React.useRef(null);
  const card2Ref        = React.useRef(null);
  const gateLeftRef     = React.useRef(null);
  const gateRightRef    = React.useRef(null);
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

  // Set the single character frame — but never while a click reaction owns it.
  function setChar(src) {
    if (reactingRef.current) return;
    if (charImgRef.current) charImgRef.current.src = src;
  }

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

    // Swoosh overlay: only visible at the tail of the flight act.
    if (swooshRef.current) {
      const sw = remap(p, 0.40, 0.50);            // active window
      const swAlpha = sw <= 0 || sw >= 1 ? 0 : Math.sin(sw * Math.PI); // ramp up + down
      swooshRef.current.style.opacity = String(swAlpha);
      if (swAlpha > 0) swooshRef.current.src = frameSrc(SEQS.swoosh, sw);
    }

    // ── ACT 1: DEPARTURE (walk effect) ──────────────────────────────────
    if (p < ACTS.A1_END) {
      const local = remap(p, ACTS.A1_START, ACTS.A1_END); // 0..1

      // Character: homeExit 0–0.22, walk 0.22–1.0
      let seq, seqLocal;
      if (local < 0.22) { seq = SEQS.homeExit; seqLocal = remap(local, 0, 0.22); }
      else              { seq = SEQS.walk;     seqLocal = remap(local, 0.22, 1.0); }
      setChar(frameSrc(seq, seqLocal));

      if (actorRef.current) {
        const xPct = lerp(CHAR_START_X, CHAR_WALK_END, easeInOut(local));
        actorRef.current.style.left = xPct + "%";
        actorRef.current.style.transform = "";
        actorRef.current.style.opacity = "1";
        actorRef.current.style.display = "";
        if (charImgRef.current) charImgRef.current.style.opacity = "1";
      }

      if (flightLayerRef.current) flightLayerRef.current.style.opacity = "0";

      // Bachelor card: in 0.06→0.16, hold, out 0.90→1.0
      if (card1Ref.current) {
        let a;
        if (local < 0.06) a = 0;
        else if (local < 0.16) a = easeOut(remap(local, 0.06, 0.16));
        else if (local < 0.90) a = 1;
        else a = 1 - remap(local, 0.90, 1.0);
        const y = lerp(18, 0, easeOut(Math.min(1, remap(local, 0.06, 0.18))));
        card1Ref.current.style.opacity = String(a);
        card1Ref.current.style.transform = `translateY(${y}px)`;
      }
      if (card2Ref.current) card2Ref.current.style.opacity = "0";

      // IU props hidden
      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = "0";
      if (gateRightRef.current) gateRightRef.current.style.opacity = "0";

      // One-shot sparkle as the bachelor milestone passes
      const SPARK = 0.19;
      if (!sparkFiredRef.current && p >= SPARK) {
        sparkFiredRef.current = true;
        if (window.JourneyFX && card1Ref.current) {
          const r = card1Ref.current.getBoundingClientRect();
          window.JourneyFX.sparkleBurst(r.right, r.top + r.height * 0.5);
        }
      }
      if (p < SPARK - 0.06) sparkFiredRef.current = false;
      return;
    }

    // ── ACT 2: FLIGHT (plane fly-through + swoosh, no point-to-point) ─────
    if (p < ACTS.A2_END) {
      const local = remap(p, ACTS.A2_START, ACTS.A2_END); // 0..1

      if (actorRef.current) actorRef.current.style.display = "none";
      if (card1Ref.current) card1Ref.current.style.opacity = "0";
      if (card2Ref.current) card2Ref.current.style.opacity = "0";
      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = "0";
      if (gateRightRef.current) gateRightRef.current.style.opacity = "0";

      if (flightLayerRef.current) {
        let a;
        if (local < 0.06) a = easeOut(remap(local, 0, 0.06));
        else if (local < 0.92) a = 1;
        else a = 1 - remap(local, 0.92, 1.0);
        flightLayerRef.current.style.opacity = String(a);
      }

      // Plane flies left → right with a gentle arc; frames cycle as it travels.
      if (planeImgRef.current) {
        const xPct = lerp(-14, 112, easeInOut(local));
        const yPct = 56 + Math.sin(local * Math.PI) * 8; // gentle hump
        planeImgRef.current.src = frameSrc(SEQS.plane, (local * 2) % 1);
        planeImgRef.current.style.left = xPct + "%";
        planeImgRef.current.style.bottom = yPct + "%";
        planeImgRef.current.style.transform = "translate(-50%, 50%)";
      }
      return;
    }

    // ── ACT 3: ARRIVAL (pillars appear and STAY) ──────────────────────────
    if (p < ACTS.A3_END) {
      const local = remap(p, ACTS.A3_START, ACTS.A3_END); // 0..1

      if (actorRef.current) {
        actorRef.current.style.display = "";
        actorRef.current.style.opacity = "1";
        actorRef.current.style.left = ARRIVE_X + "%";   // arrives at the fixed spot
        actorRef.current.style.transform = "";
        if (charImgRef.current) charImgRef.current.style.opacity = "1";
      }

      // arrival-look 0–0.45, wave 0.45–1.0
      let seq2, seqLocal2;
      if (local < 0.45) { seq2 = SEQS.arrival; seqLocal2 = remap(local, 0, 0.45); }
      else              { seq2 = SEQS.wave;    seqLocal2 = remap(local, 0.45, 1.0); }
      setChar(frameSrc(seq2, seqLocal2));

      if (flightLayerRef.current) flightLayerRef.current.style.opacity = "0";

      // IU gate pillars fade in early and stay full from here on
      const pillarAlpha = easeOut(remap(local, 0.04, 0.16));
      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = String(pillarAlpha);
      if (gateRightRef.current) gateRightRef.current.style.opacity = String(pillarAlpha);

      if (card1Ref.current) card1Ref.current.style.opacity = "0";

      // Master card: in 0.10→0.24, then hold (stays through graduation)
      if (card2Ref.current) {
        const a = easeOut(remap(local, 0.10, 0.24));
        const y = lerp(18, 0, easeOut(remap(local, 0.10, 0.26)));
        card2Ref.current.style.opacity = String(a);
        card2Ref.current.style.transform = `translateY(${y}px)`;
      }

      // One-shot confetti at the master milestone
      const CONF = 0.66;
      if (!confettiFiredRef.current && p >= CONF) {
        confettiFiredRef.current = true;
        if (window.JourneyFX && card2Ref.current) {
          const r = card2Ref.current.getBoundingClientRect();
          window.JourneyFX.confettiBurst(r.right, r.top);
        }
      }
      if (p < CONF - 0.06) confettiFiredRef.current = false;
      return;
    }

    // ── ACT 4: GRADUATION (same spot, pillars stay, no IU logo) ───────────
    {
      const local = remap(p, ACTS.A4_START, ACTS.A4_END); // 0..1

      if (actorRef.current) {
        actorRef.current.style.display = "";
        actorRef.current.style.opacity = "1";
        actorRef.current.style.left = ARRIVE_X + "%";   // identical to arrival spot
        actorRef.current.style.transform = "";
        if (charImgRef.current) charImgRef.current.style.opacity = "1";
      }

      // toGrad 0–0.45, certRaise 0.45–0.70, celebrate 0.70–0.90, certIdle 0.90–1.0
      let seq4, seqLocal4;
      if (local < 0.45)      { seq4 = SEQS.toGrad;    seqLocal4 = remap(local, 0, 0.45); }
      else if (local < 0.70) { seq4 = SEQS.certRaise; seqLocal4 = remap(local, 0.45, 0.70); }
      else if (local < 0.90) { seq4 = SEQS.celebrate; seqLocal4 = remap(local, 0.70, 0.90); }
      else                   { seq4 = SEQS.certIdle;  seqLocal4 = remap(local, 0.90, 1.0); }
      setChar(frameSrc(seq4, seqLocal4));

      if (flightLayerRef.current) flightLayerRef.current.style.opacity = "0";

      // Pillars stay fully visible
      if (gateLeftRef.current)  gateLeftRef.current.style.opacity  = "1";
      if (gateRightRef.current) gateRightRef.current.style.opacity = "1";

      // Cards: bachelor hidden; master card stays (the IU degree, with details)
      if (card1Ref.current) card1Ref.current.style.opacity = "0";
      if (card2Ref.current) {
        card2Ref.current.style.opacity = "1";
        card2Ref.current.style.transform = "translateY(0px)";
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

    render(0);

    const st = window.ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=320%",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => { render(self.progress); },
    });
    stRef.current = st;

    return () => {
      mountedRef.current = false;
      if (stRef.current) { stRef.current.kill(); stRef.current = null; }
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
  }, []);

  // ── Click reaction: ONE character, sequential frames ─────────────────────
  // stop → angry → message (bubble) → forward, then release back to scroll.
  function handleCharClick(e) {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    if (e.type === "keydown") e.preventDefault();
    if (reactingRef.current) return;
    reactingRef.current = true;

    // Phase boundaries (ms, cumulative)
    const T_STOP    = 180;   // halt
    const T_ANGRY   = 980;   // play annoyed 1→6
    const T_MESSAGE = 2780;  // hold + speech bubble
    const T_FORWARD = 3560;  // dismiss/recover, then walk-on
    const start = performance.now();
    let bubbleShown = false;

    function tick(now) {
      if (!mountedRef.current) { reactingRef.current = false; return; }
      const t = now - start;
      const img = charImgRef.current;

      if (t < T_STOP) {
        // Stop frame — character halts (first annoyed frame, standing)
        if (img) img.src = frameSrc(SEQS.annoyed, 0);
      } else if (t < T_ANGRY) {
        // Angry frames, smooth one-after-another
        if (img) img.src = frameSrc(SEQS.annoyed, remap(t, T_STOP, T_ANGRY));
      } else if (t < T_MESSAGE) {
        // Message: hold the pointing/annoyed pose, show the speech bubble
        if (img) img.src = frameSrc(SEQS.annoyed, 1);
        if (!bubbleShown) {
          bubbleShown = true;
          if (actorRef.current) {
            const r = actorRef.current.getBoundingClientRect();
            setBubblePos({ x: r.left + r.width / 2, y: r.top });
          }
          setBubbleVisible(true);
        }
      } else if (t < T_FORWARD) {
        // Forward: recover and step on
        if (bubbleShown) { setBubbleVisible(false); bubbleShown = false; }
        if (img) img.src = frameSrc(SEQS.dismiss, remap(t, T_MESSAGE, T_FORWARD));
      } else {
        // Done — hand the frame back to the scroll renderer
        reactingRef.current = false;
        setBubbleVisible(false);
        if (stRef.current) render(stRef.current.progress);
        else if (img) img.src = frameSrc(SEQS.walk, 0.5);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section ref={sectionRef} className="cine" aria-labelledby="cine-heading">
      <style>{CINE_STYLES}</style>

      {/* Dark brand backdrop (full-bleed, behind the contained stage) */}
      <div className="cine-backdrop" aria-hidden="true" />

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

        {/* Ground line */}
        <div className="cine-ground" aria-hidden="true" />

        {/* ── Flight layer (plane only — no pins / no point-to-point) ── */}
        <div
          ref={flightLayerRef}
          style={{ position: "absolute", inset: 0, zIndex: 11, opacity: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <img
            ref={planeImgRef}
            src={frameSrc(SEQS.plane, 0)}
            alt=""
            className="cine-plane-img"
            style={{ width: 96, height: "auto" }}
          />
        </div>

        {/* Swoosh wipe (before landing) */}
        <img
          ref={swooshRef}
          src={frameSrc(SEQS.swoosh, 0)}
          alt=""
          aria-hidden="true"
          className="cine-swoosh"
        />

        {/* ── IU gate pillars (appear on arrival, stay through graduation) ── */}
        <img
          ref={gateLeftRef}
          src={GATE_LEFT}
          alt=""
          aria-hidden="true"
          className="cine-prop"
          style={{ height: 150, width: "auto", left: PILLAR_L_X + "%", bottom: GROUND_BOTTOM + "%", opacity: 0 }}
        />
        <img
          ref={gateRightRef}
          src={GATE_RIGHT}
          alt=""
          aria-hidden="true"
          className="cine-prop"
          style={{ height: 150, width: "auto", left: PILLAR_R_X + "%", bottom: GROUND_BOTTOM + "%", opacity: 0 }}
        />

        {/* ── Education cards ── */}
        <div
          ref={card1Ref}
          className="cine-card"
          aria-hidden="true"
          style={{ bottom: CARD_BOTTOM + "%", left: CARD_LEFT + "%", opacity: 0 }}
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
          style={{ bottom: CARD_BOTTOM + "%", left: CARD_LEFT + "%", opacity: 0 }}
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
          style={{ left: CHAR_START_X + "%" }}
        >
          <div className="cine-contact-shadow" />
          <img
            ref={charImgRef}
            src={frameSrc(SEQS.homeExit, 0)}
            alt="Student character"
            className="cine-char-img"
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
        </div>

        {/* Chapter indicator (bottom-left, clear of the page's top buttons) */}
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
