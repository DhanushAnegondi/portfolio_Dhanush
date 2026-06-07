// DhanushOS — shell: boot sequence, menu bar, desktop, dock, draggable windows.
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const I = window.Icons;

  // ---------- Boot sequence ----------
  const BOOT_LINES = [
    { t: "DhanushOS [Version 1.0.0]  —  data platform edition", c: "dim" },
    { t: "" },
    { t: "booting kernel ......................... ", ok: true },
    { t: "mounting /pipelines ..................... ", ok: true },
    { t: "verifying data-quality contracts ....... ", ok: true },
    { t: "starting orchestrator (airflow) ........ ", ok: true },
    { t: "connecting warehouse (snowflake) ....... ", ok: true },
    { t: "spinning up streaming layer (kafka) .... ", ok: true },
    { t: "observability online (otel + grafana) .. ", ok: true },
    { t: "" },
    { t: "loading profile: Dhanush Chandra — Data Engineer", c: "p" },
  ];

  function BootSequence({ onDone }) {
    const [n, setN] = useState(0);
    const [done, setDone] = useState(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    useEffect(() => {
      if (reduce) { setN(BOOT_LINES.length); setDone(true); return; }
      if (n < BOOT_LINES.length) {
        const id = setTimeout(() => setN(n + 1), n === 0 ? 240 : 150 + Math.random() * 90);
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => setDone(true), 450);
        return () => clearTimeout(id);
      }
    }, [n]);

    // Auto-enter shortly after boot completes; click anytime to skip/enter.
    useEffect(() => {
      if (!done) return;
      const id = setTimeout(() => onDone(), reduce ? 0 : 1300);
      return () => clearTimeout(id);
    }, [done]);

    const enter = () => done && onDone();

    return (
      <div className="boot" onClick={enter}>
        {BOOT_LINES.slice(0, n).map((l, i) => (
          <div className="boot-line" key={i}>
            <span className={l.c ? l.c : ""}>{l.t}</span>
            {l.ok && <span className="ok">[ OK ]</span>}
          </div>
        ))}
        {!done && n >= BOOT_LINES.length && <span className="boot-cursor" />}
        {done && (
          <>
            <div className="boot-bar"><i /></div>
            <div className="boot-brand">
              <span className="logo">Dhanush Chandra<span className="dot">.</span></span>
            </div>
            <div className="boot-hint">▸ click anywhere to enter DhanushOS</div>
          </>
        )}
      </div>
    );
  }

  // ---------- Clock ----------
  function Clock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
      const id = setInterval(() => setNow(new Date()), 1000 * 20);
      return () => clearInterval(id);
    }, []);
    const opts = { weekday: "short", hour: "2-digit", minute: "2-digit" };
    return <span>{now.toLocaleString([], opts)}</span>;
  }

  // ---------- Menu bar ----------
  function MenuBar({ apps, onOpen, theme, onToggleTheme }) {
    return (
      <div className="menubar">
        <span className="brand"><span className="dot" />DhanushOS</span>
        {apps.slice(0, 5).map((a) => (
          <span key={a.id} className="mitem" onClick={() => onOpen(a.id)}>{a.menu || a.title}</span>
        ))}
        <div className="right">
          <span><span className="status-dot" />pipelines: green</span>
          <button className="menu-toggle" onClick={onToggleTheme}>
            {theme === "dark" ? "◐ light" : "◑ dark"}
          </button>
          <Clock />
        </div>
      </div>
    );
  }

  // ---------- Desktop icons ----------
  function DesktopIcons({ apps, onOpen }) {
    return (
      <div className="icons">
        {apps.map((a) => {
          const Glyph = I[a.icon];
          return (
            <div className="dicon" key={a.id} onDoubleClick={() => onOpen(a.id)} onClick={(e) => e.detail === 0 && onOpen(a.id)}>
              <span className="glyph"><Glyph /></span>
              <span className="label">{a.title}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // ---------- Dock ----------
  function Dock({ apps, openIds, onOpen }) {
    return (
      <div className="dock">
        {apps.map((a, i) => {
          const Glyph = I[a.icon];
          return (
            <React.Fragment key={a.id}>
              <div className="dock-item" title={a.title} onClick={() => onOpen(a.id)}>
                <Glyph />
                {openIds.includes(a.id) && <span className="run" />}
              </div>
              {a.dockSep && <span className="sep" />}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // ---------- Window (draggable) ----------
  function Window({ win, focused, onFocus, onClose, onMinimize, onMove, children }) {
    const ref = useRef(null);
    const drag = useRef(null);
    const Glyph = I[win.icon];

    const onDown = useCallback((e) => {
      if (e.target.closest(".light")) return;
      onFocus(win.id);
      const startX = e.clientX, startY = e.clientY;
      drag.current = { x0: win.x, y0: win.y, startX, startY };
      const move = (ev) => {
        if (!drag.current) return;
        const nx = drag.current.x0 + (ev.clientX - drag.current.startX);
        const ny = Math.max(0, drag.current.y0 + (ev.clientY - drag.current.startY));
        onMove(win.id, nx, ny);
      };
      const up = () => {
        drag.current = null;
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }, [win.id, win.x, win.y, onFocus, onMove]);

    return (
      <div
        ref={ref}
        className={"window" + (focused ? " focused" : "") + (win.anim ? " " + win.anim : "")}
        style={{
          left: win.x, top: win.y, width: win.w, height: win.h,
          zIndex: win.z,
        }}
        onMouseDown={() => onFocus(win.id)}
      >
        <div className="titlebar" onMouseDown={onDown}>
          <div className="lights">
            <button className="light red" title="close" onClick={() => onClose(win.id)} />
            <button className="light yellow" title="minimize" onClick={() => onMinimize(win.id)} />
            <button className="light green" title="zoom" />
          </div>
          <span className="tt"><span className="icn"><Glyph size={14} /></span>{win.title}</span>
        </div>
        <div className="win-body">{children}</div>
      </div>
    );
  }

  window.OS = { BootSequence, MenuBar, DesktopIcons, Dock, Window };
})();
