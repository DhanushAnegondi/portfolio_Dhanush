// Portfolio UI kit — Education Journey.
// Scroll-scrubbed GSAP timeline: a 4-beat pixel journey through the academic path.
// Requires GSAP + ScrollTrigger CDN scripts loaded before this file.

// ─── EDIT: real values ───────────────────────────────────────────────────────
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

// ── style block ──────────────────────────────────────────────────────────────
const EDU_STYLES = `
/* ── Education section ── */
.edu-section {
  position: relative;
  background: hsl(var(--background));
  overflow: hidden;
}

.edu-label-row {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 24px 24px 0;
  position: relative;
  z-index: 10;
}

.edu-label-item {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: hsl(var(--muted-foreground));
  display: flex;
  align-items: center;
  gap: 6px;
}

.edu-label-item .edu-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: hsl(var(--primary) / 0.4);
  transition: background 0.3s;
}

.edu-label-item.edu-active .edu-dot {
  background: hsl(var(--primary));
  box-shadow: 0 0 8px hsl(var(--primary));
}

/* ── Stage (the viewport window into the world) ── */
.edu-stage {
  position: relative;
  width: 100%;
  height: 72vh;
  min-height: 420px;
  max-height: 640px;
  overflow: hidden;
  background: hsl(var(--background));
}

/* ── Sky gradient layer ── */
.edu-sky {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    hsl(220 25% 8%) 0%,
    hsl(220 20% 12%) 40%,
    hsl(var(--background)) 100%
  );
  z-index: 0;
}

/* ── Horizontal world strip (3× viewport wide) ── */
.edu-world {
  position: absolute;
  top: 0;
  left: 0;
  width: 300%;
  height: 100%;
  will-change: transform;
  z-index: 1;
}

/* ── Ground strip tiled at the bottom ── */
.edu-ground {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 167px;
  background-image: url('journey/walking-path.png');
  background-repeat: repeat-x;
  background-position: bottom left;
  background-size: auto 167px;
  image-rendering: pixelated;
  z-index: 2;
}

/* ── Cloud layer (parallax, inside world) ── */
.edu-cloud {
  position: absolute;
  image-rendering: pixelated;
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

/* ── Milestone card ── */
.edu-card {
  position: absolute;
  bottom: 190px;
  width: 260px;
  background: hsl(var(--card) / 0.85);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(12px);
  padding: 18px 20px;
  opacity: 0;
  transform: translateY(16px);
  will-change: opacity, transform;
  z-index: 5;
}

.edu-card-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: hsl(var(--primary));
  margin: 0 0 6px;
}

.edu-card-title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: hsl(var(--foreground));
  margin: 0 0 4px;
  line-height: var(--leading-tight);
}

.edu-card-sub {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: hsl(var(--muted-foreground));
  margin: 0 0 2px;
  line-height: var(--leading-relaxed);
}

.edu-card-years {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: hsl(var(--muted-foreground) / 0.7);
  margin: 6px 0 0;
}

/* ── IU milestone block ── */
.edu-iu-block {
  position: absolute;
  bottom: 167px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transform: scale(0.85);
  will-change: opacity, transform;
  z-index: 5;
}

.edu-iu-mark {
  width: 120px;
  height: auto;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 16px hsl(var(--primary) / 0.5));
}

.edu-iu-pennant {
  width: 80px;
  height: auto;
  image-rendering: pixelated;
}

/* ── Actor layer (sprites, pinned to stage center) ── */
.edu-actor {
  position: absolute;
  bottom: 167px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: none;
}

.edu-sprite {
  position: absolute;
  bottom: 0;
  /* sit the character left-of-centre so it walks BESIDE the screen-centred cards */
  left: calc(50% - 150px);
  transform: translateX(-50%);
  image-rendering: pixelated;
  opacity: 0;
  will-change: opacity, transform;
}

.edu-sprite-walk    { width: auto; height: 160px; animation: edu-walkbob 0.5s steps(2, end) infinite; }

@keyframes edu-walkbob {
  0%, 100% { transform: translate(-50%, 0); }
  50%      { transform: translate(-50%, -5px); }
}
@media (prefers-reduced-motion: reduce) {
  .edu-sprite-walk { animation: none; }
}
.edu-sprite-idle    { width: auto; height: 155px; }
.edu-sprite-stoplook{ width: auto; height: 155px; }
.edu-sprite-plane   { width: auto; height: 100px; }
.edu-sprite-trail   { width: auto; height: 70px; }
.edu-sprite-transform { width: auto; height: 160px; }
.edu-sprite-celebrate { width: auto; height: 170px; }

/* ── Arrival rings ── */
.edu-arrival-rings {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: auto;
  image-rendering: pixelated;
  opacity: 0;
  pointer-events: none;
  z-index: 5;
}

/* ── Sparkles ── */
.edu-sparkle {
  position: absolute;
  image-rendering: pixelated;
  pointer-events: none;
  opacity: 0;
  z-index: 7;
}

/* ── Section heading ── */
.edu-heading-row {
  padding: 64px 24px 0;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.edu-heading {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  color: hsl(var(--foreground));
  letter-spacing: var(--tracking-tight);
  margin: 0 0 4px;
}

.edu-subheading {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin: 0 0 32px;
}

/* ── Scroll hint ── */
.edu-scroll-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 10px;
  color: hsl(var(--muted-foreground) / 0.5);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  pointer-events: none;
  z-index: 10;
  animation: edu-bounce 1.8s ease-in-out infinite;
}

@keyframes edu-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(-4px); }
}

/* ── Signpost dressing ── */
.edu-signpost {
  position: absolute;
  bottom: 167px;
  image-rendering: pixelated;
  z-index: 4;
}

/* ── Static fallback (prefers-reduced-motion) ── */
.edu--static .edu-static-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.edu--static .edu-static-row {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}

.edu--static .edu-static-sprite {
  flex-shrink: 0;
  image-rendering: pixelated;
  height: 130px;
  width: auto;
}

.edu--static .edu-card {
  position: static;
  opacity: 1;
  transform: none;
  width: 280px;
  flex-shrink: 0;
}

.edu--static .edu-static-iu {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.edu--static .edu-iu-block {
  position: static;
  opacity: 1;
  transform: none;
}

@media (max-width: 600px) {
  .edu--static .edu-static-row { flex-direction: column; align-items: flex-start; }
  .edu-label-row { gap: 20px; }
}
`;

// ── helpers ───────────────────────────────────────────────────────────────────
function useReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// ── Static layout (reduced-motion / no-GSAP fallback) ────────────────────────
function EducationStatic() {
  return (
    <div className="edu--static">
      <div className="edu-static-inner">
        {/* Beat 1 – Bachelor's */}
        <div className="edu-static-row">
          <img
            src="journey/student-walk.webp"
            alt="Student walking"
            className="edu-static-sprite"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="edu-card">
            <p className="edu-card-label">{BACHELOR.label}</p>
            <p className="edu-card-title">{BACHELOR.institution}</p>
            <p className="edu-card-sub">{BACHELOR.field}</p>
            <p className="edu-card-years">{BACHELOR.years}</p>
          </div>
        </div>

        {/* Beat 2/3 – Master's with plane overhead */}
        <div className="edu-static-row">
          <img
            src="journey/student-idle.webp"
            alt="Student arrived"
            className="edu-static-sprite"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="edu-card">
            <p className="edu-card-label">{MASTER.label}</p>
            <p className="edu-card-title">{MASTER.institution}</p>
            <p className="edu-card-sub">{MASTER.field}</p>
            <p className="edu-card-years">{MASTER.years}</p>
          </div>
          <img
            src="journey/plane-flight.webp"
            alt="Plane in flight"
            className="edu-static-sprite"
            style={{ height: 70, alignSelf: "flex-start", imageRendering: "pixelated" }}
          />
        </div>

        {/* Beat 4 – IU / graduate */}
        <div className="edu-static-row edu-static-iu">
          <img
            src="journey/graduate-celebrate.webp"
            alt="Graduate celebrating"
            className="edu-static-sprite"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="edu-iu-block">
            <img src="journey/iu-pixel-mark.png" alt="Indiana University" className="edu-iu-mark" />
            <img src="journey/iu-pennant.png" alt="IU pennant" className="edu-iu-pennant" />
          </div>
          <img
            src="journey/success-sparkles-amber.png"
            alt=""
            aria-hidden="true"
            className="edu-static-sprite"
            style={{ height: 80, imageRendering: "pixelated", opacity: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Animated layout ───────────────────────────────────────────────────────────
function EducationAnimated() {
  const sectionRef   = React.useRef(null);
  const stageRef     = React.useRef(null);
  const worldRef     = React.useRef(null);
  const actorRef     = React.useRef(null);
  const tlRef        = React.useRef(null);
  const stRef        = React.useRef(null);

  // sprite refs
  const walkRef      = React.useRef(null);
  const idleRef      = React.useRef(null);
  const stopRef      = React.useRef(null);
  const planeRef     = React.useRef(null);
  const trailRef     = React.useRef(null);
  const transformRef = React.useRef(null);
  const celebRef     = React.useRef(null);

  // card / deco refs
  const card1Ref     = React.useRef(null);
  const card2Ref     = React.useRef(null);
  const iuBlockRef   = React.useRef(null);
  const rings2Ref    = React.useRef(null);
  const sparkle1Ref  = React.useRef(null);
  const sparkle2Ref  = React.useRef(null);
  const sparkle3Ref  = React.useRef(null);

  // cloud refs
  const cL1Ref = React.useRef(null);
  const cM1Ref = React.useRef(null);
  const cS1Ref = React.useRef(null);

  // progress dot refs
  const dot1Ref = React.useRef(null);
  const dot2Ref = React.useRef(null);
  const dot3Ref = React.useRef(null);

  React.useEffect(() => {
    // Guard: GSAP must be available
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn("Education: GSAP/ScrollTrigger not loaded — skipping animation.");
      return;
    }

    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    const section  = sectionRef.current;
    const stage    = stageRef.current;
    const world    = worldRef.current;
    if (!section || !stage || !world) return;

    // One viewport width (the world is 300% = 3 screens)
    const W = stage.offsetWidth;

    // ── Initial states ──
    // Sprites all hidden
    gsap.set([
      walkRef.current, idleRef.current, stopRef.current,
      planeRef.current, trailRef.current,
      transformRef.current, celebRef.current,
    ], { opacity: 0 });

    // Cards hidden
    gsap.set([card1Ref.current, card2Ref.current], { opacity: 0, y: 16 });
    gsap.set(iuBlockRef.current, { opacity: 0, scale: 0.85, transformOrigin: "bottom center" });
    gsap.set(rings2Ref.current, { opacity: 0, scale: 0.5, transformOrigin: "bottom center" });
    gsap.set([sparkle1Ref.current, sparkle2Ref.current, sparkle3Ref.current], { opacity: 0 });

    // Clouds hidden, start off-screen right
    gsap.set(cL1Ref.current, { opacity: 0, x: W * 0.8 });
    gsap.set(cM1Ref.current, { opacity: 0, x: W * 0.3 });
    gsap.set(cS1Ref.current, { opacity: 0, x: W * 0.1 });

    // World at position 0 (center of beat1)
    gsap.set(world, { x: 0 });

    // ── Build timeline ──
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    // Helper: world pan (translateX)
    // screen 0→1 = x: 0 → -W, screen 1→2 = x: -W → -2W
    // We offset by -W/2 at start so beat1 is centered, etc.
    // World has 3 sections each 100vw: centers at W/2, W*1.5, W*2.5 (in world coords)
    // Stage shows W pixels. To center screen 0: x=0 (world[0..W] visible)
    // To center screen 1: x=-W
    // To center screen 2: x=-2W

    // ─ BEAT 1 (0 – 0.22): walk in, bachelor card ─
    // NOTE: never put an infinite (repeat:-1) tween in a scrubbed timeline — it
    // makes totalDuration ~1e10 and the scrub jumps straight to the end. The walk
    // "bob" is a standalone CSS animation instead (see .edu-sprite-walk).
    tl.to(walkRef.current, { opacity: 1, duration: 0.06 }, 0)
      .to(card1Ref.current, { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.06)

    // ─ BEAT 2 (0.22 – 0.55): walk→plane, arc up, pan 0→-W, clouds in ─
      .to(walkRef.current, { opacity: 0, duration: 0.07, ease: "power1.in" }, 0.22)
      .to(planeRef.current, { opacity: 1, duration: 0.07, ease: "power1.out" }, 0.22)
      .to(card1Ref.current, { opacity: 0, y: -8, duration: 0.08, ease: "power1.in" }, 0.22)

      // Plane arc: lift up then back down, positioned via actor translateY
      .fromTo(actorRef.current,
        { y: 0 },
        { y: -160, duration: 0.165, ease: "power2.out" },
        0.23
      )
      .to(actorRef.current, { y: 0, duration: 0.165, ease: "power2.in" }, 0.395)

      // Trail behind plane during arc
      .to(trailRef.current, { opacity: 0.75, duration: 0.07 }, 0.25)
      .to(trailRef.current, { opacity: 0, duration: 0.07 }, 0.50)

      // World pans: beat1 center → beat2 center
      .to(world, { x: -W, duration: 0.33, ease: "power2.inOut" }, 0.22)

      // Clouds drift in during flight
      .to(cL1Ref.current, { opacity: 0.6, x: -W * 0.3, duration: 0.33, ease: "power1.inOut" }, 0.23)
      .to(cM1Ref.current, { opacity: 0.4, x: -W * 0.5, duration: 0.33, ease: "power1.inOut" }, 0.26)
      .to(cS1Ref.current, { opacity: 0.3, x: -W * 0.2, duration: 0.28, ease: "power1.inOut" }, 0.29)

    // ─ BEAT 3 (0.55 – 0.74): plane lands, idle/stop-look, master card ─
      .to(planeRef.current, { opacity: 0, duration: 0.08, ease: "power1.in" }, 0.55)
      .to(stopRef.current,  { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.55)

      // Clouds fade out
      .to([cL1Ref.current, cM1Ref.current, cS1Ref.current], { opacity: 0, duration: 0.12 }, 0.56)

      // Arrival rings pulse
      .to(rings2Ref.current, { opacity: 0.9, scale: 1.2, duration: 0.10, ease: "power2.out" }, 0.56)
      .to(rings2Ref.current, { opacity: 0, scale: 1.6, duration: 0.10, ease: "power1.in" }, 0.66)

      .to(card2Ref.current, { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.60)

    // ─ BEAT 4 (0.74 – 1.0): pan -W → -2W, transform→graduate, IU reveal ─
      .to(card2Ref.current, { opacity: 0, y: -8, duration: 0.08, ease: "power1.in" }, 0.74)
      .to(stopRef.current,  { opacity: 0, duration: 0.07, ease: "power1.in" }, 0.74)

      // World pans: beat2 center → beat3 center
      .to(world, { x: -W * 2, duration: 0.26, ease: "power2.inOut" }, 0.74)

      // Morph: student → graduate
      .to(transformRef.current, { opacity: 1, duration: 0.07, ease: "power1.out" }, 0.77)
      .to(transformRef.current, { opacity: 0, duration: 0.07, ease: "power1.in" }, 0.86)
      .to(celebRef.current,     { opacity: 1, duration: 0.07, ease: "power1.out" }, 0.86)

      // IU logo scales in
      .to(iuBlockRef.current, { opacity: 1, scale: 1, duration: 0.14, ease: "back.out(1.5)" }, 0.80)

      // Sparkles
      .to(sparkle1Ref.current, { opacity: 1, duration: 0.06 }, 0.83)
      .to(sparkle1Ref.current, { opacity: 0, duration: 0.06 }, 0.89)
      .to(sparkle2Ref.current, { opacity: 1, duration: 0.06 }, 0.86)
      .to(sparkle2Ref.current, { opacity: 0, duration: 0.06 }, 0.92)
      .to(sparkle3Ref.current, { opacity: 0.8, duration: 0.05 }, 0.90)
      .to(sparkle3Ref.current, { opacity: 0.5, duration: 0.05 }, 0.96);
      // (cap-toss removed — the final beat rests on the standing graduate beside IU)

    // Progress dots driven by the real scroll progress, aligned to the beats:
    // beat1 walk 0–0.28 · flight/master 0.28–0.74 · IU/graduate 0.74–1.
    const setDots = (p) => {
      if (dot1Ref.current) dot1Ref.current.classList.toggle("edu-active", p < 0.28);
      if (dot2Ref.current) dot2Ref.current.classList.toggle("edu-active", p >= 0.28 && p < 0.74);
      if (dot3Ref.current) dot3Ref.current.classList.toggle("edu-active", p >= 0.74);
    };

    // ── ScrollTrigger ──
    const st = window.ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300%",   // 3× viewport of scroll travel through the pinned journey
      pin: true,
      scrub: 1,
      animation: tl,
      anticipatePin: 1,
      onUpdate: (self) => setDots(self.progress),
    });
    stRef.current = st;
    setDots(0);

    return () => {
      if (stRef.current) { stRef.current.kill(); stRef.current = null; }
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
    };
  }, []);

  // ── Card x-positions inside world (each "screen" = 33.33% of world = 1 viewport wide)
  // Center of screen 0 = 50% of screen 0 = 16.67% of world
  // Center of screen 1 = 1.5 screens = 50% of world
  // Center of screen 2 = 2.5 screens = 83.33% of world
  // Cards are anchored in the world — they move with it via world translateX.
  // We position them at the approximate center of each screen section.

  const cardStyle = (screenIndex) => ({
    // card sits right-of-centre so the left-of-centre character stands beside it
    left: `calc(${screenIndex * 33.333}% + 50% * 0.3333 - 40px)`,
  });

  const iuStyle = {
    left: `calc(${2 * 33.333}% + 50% * 0.3333 - 60px)`,
  };

  // Signpost positions
  const signpostLeft = { left: `calc(${0 * 33.333}% + 50% * 0.3333 + 120px)`, bottom: 167 };
  const signpostRight = { left: `calc(${1 * 33.333}% + 50% * 0.3333 + 120px)`, bottom: 167 };

  // Campus arch behind IU
  const archStyle = {
    position: "absolute",
    bottom: 167,
    left: `calc(${2 * 33.333}% + 50% * 0.3333 - 100px)`,
    width: 200,
    imageRendering: "pixelated",
    opacity: 0.55,
    zIndex: 3,
  };

  // Cloud positions (inside world, in sky region)
  const cloudBase = { position: "absolute", imageRendering: "pixelated", pointerEvents: "none", zIndex: 3 };

  return (
    <section ref={sectionRef} className="edu-section" aria-labelledby="edu-heading" style={{ borderTop: "1px solid hsl(var(--border))" }}>
      {/* Section heading */}
      <div className="edu-heading-row">
        <h2 className="edu-heading" id="edu-heading">Education</h2>
        <p className="edu-subheading">scroll to journey through the academic path</p>
      </div>

      {/* Progress labels */}
      <div className="edu-label-row">
        <span ref={dot1Ref} className="edu-label-item edu-active">
          <span className="edu-dot" />Bachelor's
        </span>
        <span ref={dot2Ref} className="edu-label-item">
          <span className="edu-dot" />Master's
        </span>
        <span ref={dot3Ref} className="edu-label-item">
          <span className="edu-dot" />IU
        </span>
      </div>

      {/* Stage */}
      <div ref={stageRef} className="edu-stage">
        {/* Sky backdrop */}
        <div className="edu-sky" />

        {/* World strip */}
        <div ref={worldRef} className="edu-world">
          {/* Ground */}
          <div className="edu-ground" />

          {/* Campus arch dressing behind IU */}
          <img src="journey/campus-arch.png" alt="" aria-hidden="true" style={archStyle} />

          {/* Signpost dressings */}
          <img
            src="journey/signpost.png"
            alt=""
            aria-hidden="true"
            className="edu-signpost"
            style={{ ...signpostLeft, width: 70, imageRendering: "pixelated" }}
          />
          <img
            src="journey/signpost.png"
            alt=""
            aria-hidden="true"
            className="edu-signpost"
            style={{ ...signpostRight, width: 70, imageRendering: "pixelated", transform: "scaleX(-1)" }}
          />

          {/* Clouds (also inside world so they pan — but slower via GSAP separate tween) */}
          <img
            ref={cL1Ref}
            src="journey/cloud-large.png"
            alt=""
            aria-hidden="true"
            className="edu-cloud"
            style={{ top: "8%", width: 180 }}
          />
          <img
            ref={cM1Ref}
            src="journey/cloud-medium.png"
            alt=""
            aria-hidden="true"
            className="edu-cloud"
            style={{ top: "14%", width: 120 }}
          />
          <img
            ref={cS1Ref}
            src="journey/cloud-small.png"
            alt=""
            aria-hidden="true"
            className="edu-cloud"
            style={{ top: "20%", width: 80 }}
          />

          {/* Bachelor's card */}
          <div ref={card1Ref} className="edu-card" style={cardStyle(0)}>
            <p className="edu-card-label">{BACHELOR.label}</p>
            <p className="edu-card-title">{BACHELOR.institution}</p>
            <p className="edu-card-sub">{BACHELOR.field}</p>
            <p className="edu-card-years">{BACHELOR.years}</p>
          </div>

          {/* Master's card */}
          <div ref={card2Ref} className="edu-card" style={cardStyle(1)}>
            <p className="edu-card-label">{MASTER.label}</p>
            <p className="edu-card-title">{MASTER.institution}</p>
            <p className="edu-card-sub">{MASTER.field}</p>
            <p className="edu-card-years">{MASTER.years}</p>
          </div>

          {/* IU milestone block */}
          <div ref={iuBlockRef} className="edu-iu-block" style={{ left: `calc(${2 * 33.333}% + 50% * 0.3333 - 60px)` }}>
            <img src="journey/iu-pixel-mark.png" alt="Indiana University" className="edu-iu-mark" />
            <img src="journey/iu-pennant.png" alt="IU pennant" className="edu-iu-pennant" />
          </div>

          {/* Sparkles at IU */}
          <img
            ref={sparkle1Ref}
            src="journey/success-sparkles-cyan.png"
            alt=""
            aria-hidden="true"
            className="edu-sparkle"
            style={{ bottom: 240, left: `calc(${2 * 33.333}% + 50% * 0.3333 - 120px)`, width: 80 }}
          />
          <img
            ref={sparkle2Ref}
            src="journey/success-sparkles-mint.png"
            alt=""
            aria-hidden="true"
            className="edu-sparkle"
            style={{ bottom: 300, left: `calc(${2 * 33.333}% + 50% * 0.3333 + 50px)`, width: 70 }}
          />
          <img
            ref={sparkle3Ref}
            src="journey/success-sparkles-amber.png"
            alt=""
            aria-hidden="true"
            className="edu-sparkle"
            style={{ bottom: 260, left: `calc(${2 * 33.333}% + 50% * 0.3333 - 40px)`, width: 90 }}
          />

          {/* Arrival ring at master's */}
          <img
            ref={rings2Ref}
            src="journey/arrival-rings.png"
            alt=""
            aria-hidden="true"
            className="edu-arrival-rings"
            style={{ bottom: 145, left: `calc(${1 * 33.333}% + 50% * 0.3333 - 230px)` }}
          />

        </div>{/* /world */}

        {/* Actor layer — fixed to stage, not world */}
        <div ref={actorRef} className="edu-actor" style={{ width: "100%" }}>
          <img
            ref={walkRef}
            src="journey/student-walk.webp"
            alt="Student walking"
            className="edu-sprite edu-sprite-walk"
          />
          <img
            ref={stopRef}
            src="journey/student-stop-look.webp"
            alt="Student looking"
            className="edu-sprite edu-sprite-stoplook"
          />
          <img
            ref={idleRef}
            src="journey/student-idle.webp"
            alt="Student idle"
            className="edu-sprite edu-sprite-idle"
          />
          {/* Plane — centered, slightly above actor base */}
          <img
            ref={planeRef}
            src="journey/plane-flight.webp"
            alt="Plane in flight"
            className="edu-sprite edu-sprite-plane"
          />
          <img
            ref={trailRef}
            src="journey/motion-trail.webp"
            alt=""
            aria-hidden="true"
            className="edu-sprite edu-sprite-trail"
            style={{ left: "calc(50% - 290px)", transform: "none" }}
          />
          <img
            ref={transformRef}
            src="journey/student-to-graduate.webp"
            alt="Student becoming graduate"
            className="edu-sprite edu-sprite-transform"
          />
          <img
            ref={celebRef}
            src="journey/graduate-celebrate.webp"
            alt="Graduate celebrating"
            className="edu-sprite edu-sprite-celebrate"
          />
        </div>

        {/* Scroll hint */}
        <p className="edu-scroll-hint" aria-hidden="true">scroll to explore ↓</p>
      </div>{/* /stage */}
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
function Education() {
  const reduced = useReducedMotion();
  const noGsap  = typeof window !== "undefined" && !window.gsap;

  return (
    <>
      <style>{EDU_STYLES}</style>
      {(reduced || noGsap) ? (
        <section className="edu-section edu--static" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <div className="edu-heading-row">
            <h2 className="edu-heading">Education</h2>
            <p className="edu-subheading">academic journey</p>
          </div>
          <EducationStatic />
        </section>
      ) : (
        <EducationAnimated />
      )}
    </>
  );
}

window.Education = Education;
