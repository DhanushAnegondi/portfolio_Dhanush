// DhanushOS — Snake.app. A self-contained canvas game in the brand's terminal
// idiom: an ember "stream" you grow by ingesting data packets without dropping
// one (hitting a wall or yourself). Keyboard or on-screen controls; session best
// persists via localStorage. No dependencies beyond React (already loaded).
(function () {
  const { useRef, useEffect, useState, useCallback } = React;

  const COLS = 19, ROWS = 19, CELL = 20;
  const BOARD = COLS * CELL;               // 380px square play-field
  const BG = "#0b1016";                    // matches Terminal.app substrate
  const HI_KEY = "dhanushos_snake_best";

  function readEmber() {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary").trim();
    return raw || "16 92% 58%";            // brand ember fallback
  }

  function Snake() {
    const canvasRef = useRef(null);

    // --- game state lives in refs (the rAF loop reads these every frame) ---
    const snakeRef = useRef([]);
    const dirRef = useRef({ x: 1, y: 0 });
    const pendingRef = useRef({ x: 1, y: 0 });
    const foodRef = useRef({ x: 0, y: 0 });
    const runningRef = useRef(false);
    const pausedRef = useRef(false);
    const overRef = useRef(false);
    const scoreRef = useRef(0);
    const lastRef = useRef(0);
    const intervalRef = useRef(140);

    // --- HUD mirrors (drive React re-render only on meaningful change) ---
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(() => {
      const v = parseInt(window.localStorage.getItem(HI_KEY) || "0", 10);
      return isNaN(v) ? 0 : v;
    });
    const [status, setStatus] = useState("idle"); // idle | running | paused | over

    const placeFood = useCallback(() => {
      const occupied = new Set(snakeRef.current.map((s) => s.x + "," + s.y));
      let cell;
      do {
        cell = { x: (Math.random() * COLS) | 0, y: (Math.random() * ROWS) | 0 };
      } while (occupied.has(cell.x + "," + cell.y));
      foodRef.current = cell;
    }, []);

    const start = useCallback(() => {
      const midY = (ROWS / 2) | 0;
      snakeRef.current = [
        { x: 5, y: midY }, { x: 4, y: midY }, { x: 3, y: midY },
      ];
      dirRef.current = { x: 1, y: 0 };
      pendingRef.current = { x: 1, y: 0 };
      scoreRef.current = 0;
      intervalRef.current = 140;
      lastRef.current = 0;
      overRef.current = false;
      pausedRef.current = false;
      runningRef.current = true;
      placeFood();
      setScore(0);
      setStatus("running");
    }, [placeFood]);

    const togglePause = useCallback(() => {
      if (!runningRef.current || overRef.current) return;
      pausedRef.current = !pausedRef.current;
      setStatus(pausedRef.current ? "paused" : "running");
    }, []);

    const setDir = useCallback((x, y) => {
      const d = dirRef.current;
      if (snakeRef.current.length > 1 && x === -d.x && y === -d.y) return; // no 180°
      pendingRef.current = { x, y };
    }, []);

    const step = useCallback(() => {
      dirRef.current = pendingRef.current;
      const d = dirRef.current;
      const snake = snakeRef.current;
      const head = { x: snake[0].x + d.x, y: snake[0].y + d.y };

      const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const hitSelf = snake.some((s, i) => i < snake.length - 1 && s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        runningRef.current = false;
        overRef.current = true;
        setStatus("over");
        const sc = scoreRef.current;
        setBest((b) => {
          if (sc > b) { window.localStorage.setItem(HI_KEY, String(sc)); return sc; }
          return b;
        });
        return;
      }

      snake.unshift(head);
      const f = foodRef.current;
      if (head.x === f.x && head.y === f.y) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        // speed up gently: every 4 packets shave 8ms, floor at 70ms
        intervalRef.current = Math.max(70, 140 - Math.floor(scoreRef.current / 4) * 8);
        placeFood();
      } else {
        snake.pop();
      }
    }, [placeFood]);

    // --- render + game loop ---
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      canvas.width = BOARD * dpr;
      canvas.height = BOARD * dpr;
      ctx.scale(dpr, dpr);
      const emberHsl = readEmber();
      const ember = "hsl(" + emberHsl + ")";

      const rrect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      };

      const draw = (t) => {
        // substrate
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, BOARD, BOARD);
        // faint grid
        ctx.strokeStyle = "rgba(255,255,255,0.045)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 1; i < COLS; i++) {
          ctx.moveTo(i * CELL + 0.5, 0); ctx.lineTo(i * CELL + 0.5, BOARD);
          ctx.moveTo(0, i * CELL + 0.5); ctx.lineTo(BOARD, i * CELL + 0.5);
        }
        ctx.stroke();

        // food — pulsing ember packet with glow
        const f = foodRef.current;
        const pulse = 1 + Math.sin(t / 240) * 0.12;
        const fs = CELL * 0.62 * pulse;
        const fx = f.x * CELL + CELL / 2, fy = f.y * CELL + CELL / 2;
        ctx.save();
        ctx.shadowColor = ember;
        ctx.shadowBlur = 14;
        ctx.fillStyle = ember;
        rrect(fx - fs / 2, fy - fs / 2, fs, fs, 4);
        ctx.fill();
        ctx.restore();

        // snake — ember body fading toward the tail, brighter head
        const snake = snakeRef.current;
        for (let i = snake.length - 1; i >= 0; i--) {
          const s = snake[i];
          const pad = 2;
          ctx.globalAlpha = 0.55 + 0.45 * (1 - i / Math.max(1, snake.length));
          ctx.fillStyle = ember;
          rrect(s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 5);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        // head sheen + eyes
        if (snake.length) {
          const h = snake[0], pad = 2;
          ctx.fillStyle = "rgba(255,255,255,0.22)";
          rrect(h.x * CELL + pad, h.y * CELL + pad, CELL - pad * 2, (CELL - pad * 2) / 2, 5);
          ctx.fill();
          const d = dirRef.current;
          ctx.fillStyle = "#0b1016";
          const cx = h.x * CELL + CELL / 2, cy = h.y * CELL + CELL / 2;
          const ox = d.y !== 0 ? 4 : 3, oy = d.x !== 0 ? 4 : 3;
          [[cx - ox, cy - oy], [cx + ox, cy + oy]].forEach(([ex, ey]) => {
            // place both eyes perpendicular to travel
          });
          const perp = { x: d.y, y: d.x };
          [-1, 1].forEach((sgn) => {
            ctx.beginPath();
            ctx.arc(cx + perp.x * 3.2 * sgn + d.x * 2.5, cy + perp.y * 3.2 * sgn + d.y * 2.5, 1.7, 0, 7);
            ctx.fill();
          });
        }

        // overlays
        if (status !== "running") {
          ctx.fillStyle = "rgba(7,11,16,0.74)";
          ctx.fillRect(0, 0, BOARD, BOARD);
          ctx.textAlign = "center";
          ctx.fillStyle = ember;
          ctx.font = "700 19px 'JetBrains Mono', ui-monospace, monospace";
          const title = status === "over" ? "pipeline crashed" : status === "paused" ? "paused" : "Snake";
          ctx.fillText(title, BOARD / 2, BOARD / 2 - 12);
          ctx.fillStyle = "#aebdcb";
          ctx.font = "400 12.5px 'JetBrains Mono', ui-monospace, monospace";
          const sub = status === "over"
            ? "ingested " + scoreRef.current + " — press ↵ to redeploy"
            : status === "paused" ? "press space to resume" : "press ↵ or click to start ingesting";
          ctx.fillText(sub, BOARD / 2, BOARD / 2 + 14);
        }
      };

      let raf;
      const loop = (t) => {
        raf = requestAnimationFrame(loop);
        if (runningRef.current && !pausedRef.current && !overRef.current) {
          if (!lastRef.current) lastRef.current = t;
          if (t - lastRef.current >= intervalRef.current) {
            lastRef.current = t;
            step();
          }
        }
        draw(t);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [status, step]);

    // --- keyboard (ignored while typing in another app's input) ---
    useEffect(() => {
      const onKey = (e) => {
        const ae = document.activeElement;
        if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA")) return;
        const k = e.key;
        let handled = true;
        if (k === "ArrowUp" || k === "w" || k === "W") setDir(0, -1);
        else if (k === "ArrowDown" || k === "s" || k === "S") setDir(0, 1);
        else if (k === "ArrowLeft" || k === "a" || k === "A") setDir(-1, 0);
        else if (k === "ArrowRight" || k === "d" || k === "D") setDir(1, 0);
        else if (k === " ") togglePause();
        else if (k === "Enter") { if (!runningRef.current || overRef.current) start(); }
        else handled = false;
        if (handled) e.preventDefault();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [setDir, togglePause, start]);

    const onStage = () => { if (!runningRef.current || overRef.current) start(); };

    const hud = (label, value) => (
      <span style={{ display: "inline-flex", gap: 6, alignItems: "baseline" }}>
        <span style={{ color: "hsl(var(--muted-foreground))" }}>{label}</span>
        <b style={{ color: "hsl(var(--foreground))", fontVariantNumeric: "tabular-nums" }}>{value}</b>
      </span>
    );

    return (
      <div className="app">
        <h1>Snake</h1>
        <p className="sub">~/snake — ingest the stream, don't drop a packet</p>

        <div style={{
          display: "flex", gap: 18, alignItems: "center", marginBottom: 14,
          fontFamily: "var(--font-mono)", fontSize: 12.5,
        }}>
          {hud("records", score)}
          {hud("best", best)}
          <span style={{
            marginLeft: "auto", color: "hsl(var(--primary))",
            display: "inline-flex", alignItems: "center", gap: 7,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: status === "over" ? "hsl(var(--destructive, 0 72% 51%))" : "hsl(var(--primary))",
              boxShadow: "0 0 8px currentColor",
              opacity: status === "running" ? 1 : 0.5,
            }} />
            {status === "over" ? "crashed" : status === "paused" ? "paused"
              : status === "running" ? "ingesting" : "ready"}
          </span>
        </div>

        <div
          onClick={onStage}
          style={{
            position: "relative", width: BOARD, maxWidth: "100%", margin: "0 auto",
            borderRadius: "var(--radius-md)", overflow: "hidden",
            border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-md)",
            cursor: status === "running" ? "default" : "pointer", lineHeight: 0,
          }}
        >
          <canvas ref={canvasRef} style={{ width: BOARD, height: BOARD, maxWidth: "100%", display: "block" }} />
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginTop: 16,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11.5,
            color: "hsl(var(--muted-foreground))", lineHeight: 1.5,
          }}>
            ↑ ↓ ← → / WASD&nbsp;move · space&nbsp;pause · ↵&nbsp;restart
          </span>
          <button className="btn" style={{ marginLeft: "auto" }} onClick={start}>
            {status === "idle" ? "Start" : "Restart"}
          </button>
        </div>
      </div>
    );
  }

  window.Apps = Object.assign(window.Apps || {}, { Snake });
})();
