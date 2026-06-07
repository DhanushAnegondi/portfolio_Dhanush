// DhanushOS Aero — shell: boot, taskbar + Start orb, Start menu, glass windows.
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const I = window.Icons;
  const D = window.DATA;

  // ---------- Boot ("Starting DhanushOS") ----------
  function BootSequence({ onDone }) {
    const [done, setDone] = useState(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    useEffect(() => {
      const id = setTimeout(() => setDone(true), reduce ? 0 : 2200);
      return () => clearTimeout(id);
    }, []);
    useEffect(() => {
      if (!done) return;
      const id = setTimeout(() => onDone(), reduce ? 0 : 900);
      return () => clearTimeout(id);
    }, [done]);
    return (
      <div className="aero-boot" onClick={() => done && onDone()}>
        <div className="boot-orbs"><span /><span /><span /><span /></div>
        <div className="b-title">Starting <b>DhanushOS</b></div>
        <div className="b-sub">aero edition · data platform</div>
        {done && <div className="b-hint">▸ click to continue</div>}
      </div>
    );
  }

  // ---------- Clock ----------
  function Clock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => { const id = setInterval(() => setNow(new Date()), 20000); return () => clearInterval(id); }, []);
    return (
      <div className="clock">
        <div className="t">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="d">{now.toLocaleDateString([], { month: "short", day: "numeric" })}</div>
      </div>
    );
  }

  // ---------- Start menu ----------
  function StartMenu({ apps, onOpen, onClose }) {
    const ref = useRef(null);
    useEffect(() => {
      const h = (e) => { if (ref.current && !ref.current.contains(e.target) && !e.target.closest(".start-orb")) onClose(); };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, []);
    const places = [
      { label: "Résumé", icon: "FileDown", id: "resume" },
      { label: "Writing", icon: "Pen", id: "writing" },
      { label: "Experience", icon: "History", id: "experience" },
      { label: "Contact", icon: "Mail", id: "contact" },
    ];
    return (
      <div className="startmenu" ref={ref}>
        <div className="sm-head">
          <div className="sm-avatar">D</div>
          <div className="who"><div className="n">{D.profile.name}</div><div className="r">{D.profile.role}</div></div>
        </div>
        <div className="sm-cols">
          <div className="sm-left">
            {apps.filter((a) => a.id !== "resume").map((a) => {
              const G = I[a.icon];
              return <div className="sm-item" key={a.id} onClick={() => { onOpen(a.id); onClose(); }}><G />{a.title.replace(".app", "")}</div>;
            })}
          </div>
          <div className="sm-right">
            {places.map((p) => {
              const G = I[p.icon];
              return <div className="sm-item" key={p.label} onClick={() => { onOpen(p.id); onClose(); }}><G />{p.label}</div>;
            })}
            <div className="sm-item" onClick={() => { window.location.href = "../portfolio/index.html"; }}><I.Power />Exit to classic site</div>
          </div>
        </div>
        <div className="sm-search"><input placeholder="Search programs…" onKeyDown={(e) => { if (e.key === "Enter") { const q = e.target.value.toLowerCase(); const hit = apps.find((a) => a.title.toLowerCase().includes(q)); if (hit) { onOpen(hit.id); onClose(); } } }} /></div>
      </div>
    );
  }

  // ---------- Taskbar ----------
  function Taskbar({ apps, wins, onOpen, focused, startOpen, onToggleStart }) {
    return (
      <div className="taskbar">
        <button className="start-orb" onClick={onToggleStart} title="Start"><span className="orb-d">D</span></button>
        <span className="tdivider" />
        {wins.map((w) => {
          const G = I[w.icon];
          return (
            <button key={w.id} className={"task-btn" + (focused === w.id && !w.min ? " active" : "")} onClick={() => onOpen(w.id)} title={w.title}>
              <G /><span className="tlabel">{w.title.replace(".app", "")}</span>
            </button>
          );
        })}
        <div className="tray">
          <a className="tray-exit" href="../portfolio/index.html" title="Exit to the classic site"><span>◄</span> Classic site</a>
          <Clock />
        </div>
        <div className="show-desktop" title="Show desktop" />
      </div>
    );
  }

  // ---------- Desktop icons ----------
  function DesktopIcons({ apps, onOpen }) {
    return (
      <div className="aero-icons">
        {apps.map((a) => {
          const G = I[a.icon];
          return (
            <div className="aicon" key={a.id} onDoubleClick={() => onOpen(a.id)} onClick={(e) => e.detail === 0 && onOpen(a.id)}>
              <span className="glyph"><G /></span>
              <span className="label">{a.title}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // ---------- Glass window ----------
  function Window({ win, focused, onFocus, onClose, onMinimize, onMove, children }) {
    const drag = useRef(null);
    const G = I[win.icon];
    const onDown = useCallback((e) => {
      if (e.target.closest(".wctl")) return;
      onFocus(win.id);
      drag.current = { x0: win.x, y0: win.y, sx: e.clientX, sy: e.clientY };
      const move = (ev) => {
        if (!drag.current) return;
        const nx = drag.current.x0 + (ev.clientX - drag.current.sx);
        const ny = Math.max(0, drag.current.y0 + (ev.clientY - drag.current.sy));
        onMove(win.id, nx, ny);
      };
      const up = () => { drag.current = null; window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }, [win.id, win.x, win.y, onFocus, onMove]);

    return (
      <div className={"awindow" + (focused ? " focused" : "") + (win.anim ? " " + win.anim : "")}
        style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
        onMouseDown={() => onFocus(win.id)}>
        <div className="atitlebar" onMouseDown={onDown}>
          <span className="ticn"><G size={15} /></span>
          <span className="ttl">{win.title}</span>
          <div className="awin-ctrls">
            <button className="wctl" title="Minimize" onClick={() => onMinimize(win.id)}><I.Minus size={13} /></button>
            <button className="wctl" title="Maximize"><I.Square size={11} /></button>
            <button className="wctl close" title="Close" onClick={() => onClose(win.id)}><I.X size={13} /></button>
          </div>
        </div>
        <div className="awin-body">{children}</div>
      </div>
    );
  }

  window.AeroOS = { BootSequence, Taskbar, StartMenu, DesktopIcons, Window };
})();
