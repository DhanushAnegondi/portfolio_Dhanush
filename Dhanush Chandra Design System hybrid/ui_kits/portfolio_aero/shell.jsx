// DhanushOS Aero — shell: boot, taskbar + Start orb, Start menu, glass windows.
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const I = window.Icons;
  const D = window.DATA;

  // ---------- CRT bootloader / shutdown sequences ----------
  // line: { t: text, c: class (head|dim|ok|warn|err), d: ms before NEXT line }
  const BOOT_LINES = [
    { t: "DhanushOS Aero — Bootloader v7.4", c: "head", d: 240 },
    { t: "(c) Dhanush Chandra · Data Platform Division", c: "dim", d: 420 },
    { t: "", d: 90 },
    { t: "Beginning Boot Sequence...", d: 160 },
    { t: "Connecting to DHOS01/13:2000...", d: 520 },
    { t: "", d: 90 },
    { t: "Established connection to DHOS01/13:2000, mounting volumes.", d: 460 },
    { t: "", d: 90 },
    { t: "Mounting  /dev/pipelines  ............... [ OK ]", c: "ok", d: 150 },
    { t: "Mounting  /dev/warehouse  .............. [ OK ]", c: "ok", d: 150 },
    { t: "Loading   user profile: dhanush  ....... [ OK ]", c: "ok", d: 260 },
    { t: "", d: 90 },
    { t: "Starting services:", d: 130 },
    { t: "  > airflow-scheduler  ................. [ OK ]", c: "ok", d: 150 },
    { t: "  > dbt-runtime  ....................... [ OK ]", c: "ok", d: 150 },
    { t: "  > spark-session  ..................... [ OK ]", c: "ok", d: 150 },
    { t: "  > metrics-layer  ..................... [ OK ]", c: "ok", d: 300 },
    { t: "", d: 90 },
    { t: "[14:58:35 START] ........................ [ Handoff Complete ]", c: "ok", d: 460 },
    { t: "", d: 120 },
    { t: "Welcome back, Dhanush.", c: "head", d: 360 },
    { t: "Launching DhanushOS Aero desktop...", c: "dim", d: 700 },
  ];

  const SHUTDOWN_LINES = [
    { t: "Beginning Pre-Shutdown Sequence...", d: 200 },
    { t: "Connecting to DHOS01/13:2000...", d: 560 },
    { t: "", d: 110 },
    { t: "Established connection to DHOS01/13:2000, attempting state transfer.", d: 520 },
    { t: "", d: 130 },
    { t: "Analyzing session... Done.", d: 230 },
    { t: "Packing transfer... Done.", d: 230 },
    { t: "Beginning transfer...", d: 200 },
    { t: "[14:58:35 START] ........................ [ Transfer Complete ]", c: "ok", d: 480 },
    { t: "", d: 130 },
    { t: "(DHOS01/13:200:60099) Flushing write-ahead log... committed.   [14:58:35:01]", c: "dim", d: 220 },
    { t: "(DHOS01/13:200:60099) Closing 4 active sockets...              [14:58:35:03]", c: "dim", d: 220 },
    { t: "(DHOS01/13:200:60099) Persisting workspace layout...           [14:58:35:06]", c: "dim", d: 300 },
    { t: "", d: 100 },
    { t: "Stopping services:", d: 130 },
    { t: "  metrics-layer  ....................... [ stopped ]", c: "warn", d: 150 },
    { t: "  spark-session  ....................... [ stopped ]", c: "warn", d: 150 },
    { t: "  dbt-runtime  ......................... [ stopped ]", c: "warn", d: 150 },
    { t: "  airflow-scheduler  ................... [ stopped ]", c: "warn", d: 320 },
    { t: "", d: 120 },
    { t: "Session saved. It is now safe to power off.", c: "head", d: 420 },
    { t: "Powering down DhanushOS...", c: "dim", d: 850 },
  ];

  function CrtTerminal({ mode, onDone }) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = mode === "boot" ? BOOT_LINES : SHUTDOWN_LINES;
    const [n, setN] = useState(0);
    const [phase, setPhase] = useState("stream"); // stream → (shutdown) blank → done
    const logRef = useRef(null);

    // stream lines one at a time
    useEffect(() => {
      if (phase !== "stream") return;
      if (n >= lines.length) {
        const hold = reduce ? 100 : (mode === "boot" ? 650 : 750);
        const id = setTimeout(() => {
          if (mode === "boot") onDone();
          else setPhase("blank");
        }, hold);
        return () => clearTimeout(id);
      }
      const prev = n > 0 ? (lines[n - 1].d ?? 140) : 0;
      const id = setTimeout(() => setN((c) => c + 1), reduce ? 0 : (n === 0 ? 200 : prev));
      return () => clearTimeout(id);
    }, [n, phase]);

    // powered-off blank phase (shutdown only): blinking cursor for ~5s, then reboot
    useEffect(() => {
      if (phase !== "blank") return;
      const id = setTimeout(() => onDone(), reduce ? 400 : 5000);
      return () => clearTimeout(id);
    }, [phase]);

    useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [n]);

    function skip() {
      if (phase !== "stream") return;
      if (n < lines.length) setN(lines.length);
    }

    if (phase === "blank") {
      return (
        <div className="crt-screen blank">
          <div className="crt-frame"><span className="blank-cursor" /></div>
        </div>
      );
    }
    const streaming = n < lines.length;
    return (
      <div className="crt-screen" onClick={skip} title={streaming ? "Click to skip" : ""}>
        <div className="crt-frame">
          <div className="crt-log" ref={logRef}>
            {lines.slice(0, n).map((l, i) => (
              <div className={"crt-line " + (l.c || "")} key={i}>{l.t || "\u00a0"}</div>
            ))}
            {streaming && <span className="crt-caret" />}
          </div>
          <div className="crt-leak" />
          <div className="crt-scan" />
          <div className="crt-vign" />
          <span className="crt-mouse" />
        </div>
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
  function StartMenu({ apps, onOpen, onClose, onShutdown }) {
    const ref = useRef(null);
    const inputRef = useRef(null);
    const [q, setQ] = useState("");
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
    const name = (a) => a.title.replace(".app", "");
    // live, incremental filter — matches anywhere; prefers prefix matches first.
    const query = q.trim().toLowerCase();
    const results = query
      ? apps
          .map((a) => ({ a, nm: name(a).toLowerCase() }))
          .filter(({ nm }) => nm.includes(query))
          .sort((x, y) => (y.nm.startsWith(query) - x.nm.startsWith(query)))
          .map(({ a }) => a)
      : null;
    const openFirst = () => { if (results && results[0]) { onOpen(results[0].id); onClose(); } };

    return (
      <div className="startmenu" ref={ref}>
        <div className="sm-head">
          <div className="sm-avatar">D</div>
          <div className="who"><div className="n">{D.profile.name}</div><div className="r">{D.profile.role}</div></div>
        </div>
        {results ? (
          <div className="sm-results">
            <div className="sm-res-head">{results.length} {results.length === 1 ? "result" : "results"} for “{q.trim()}”</div>
            {results.length === 0 && <div className="sm-res-empty">No programs match your search.</div>}
            {results.map((a) => (
              <div className="sm-item" key={a.id} onClick={() => { onOpen(a.id); onClose(); }}>
                <window.AeroIcon name={a.icon} size={26} glyph={15} />
                <span className="sm-res-meta"><b>{name(a)}</b><i>{a.title}</i></span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sm-cols">
            <div className="sm-left">
              {apps.filter((a) => a.id !== "resume").map((a) => (
                <div className="sm-item" key={a.id} onClick={() => { onOpen(a.id); onClose(); }}><window.AeroIcon name={a.icon} size={26} glyph={15} />{name(a)}</div>
              ))}
            </div>
            <div className="sm-right">
              {places.map((p) => (
                <div className="sm-item" key={p.label} onClick={() => { onOpen(p.id); onClose(); }}><window.AeroIcon name={p.icon} size={24} glyph={14} />{p.label}</div>
              ))}
              <div className="sm-item plain" onClick={() => { window.location.href = "../portfolio/index.html"; }}><I.Power />Exit to classic site</div>
            </div>
          </div>
        )}
        <div className="sm-search">
          <input
            ref={inputRef}
            value={q}
            autoFocus
            placeholder="Search programs…"
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") openFirst(); if (e.key === "Escape") { if (q) setQ(""); else onClose(); } }}
          />
          <button className="sm-power" title="Shut down" onClick={() => { onClose(); onShutdown(); }}><I.Power />Shut down</button>
        </div>
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
          return (
            <button key={w.id} className={"task-btn" + (focused === w.id && !w.min ? " active" : "")} onClick={() => onOpen(w.id)} title={w.title}>
              <window.AeroIcon name={w.icon} size={26} glyph={15} /><span className="tlabel">{w.title.replace(".app", "")}</span>
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

  // ---------- Desktop icons (apps + session-only user items) ----------
  function DeskItem({ item, onOpen, onRename, onContext }) {
    const iconName = item.type === "folder" ? "Folder" : "FileText";
    const commit = (e) => { const v = e.target.value.trim(); onRename(item.id, v || item.name); };
    return (
      <div className="aicon" onContextMenu={onContext}
        onDoubleClick={() => !item.renaming && onOpen()}
        onClick={(e) => e.detail === 0 && !item.renaming && onOpen()}>
        <window.AeroIcon name={iconName} size={46} glyph={23} />
        {item.renaming ? (
          <input className="rename-input" defaultValue={item.name} autoFocus
            onFocus={(e) => { const dot = e.target.value.lastIndexOf("."); e.target.setSelectionRange(0, dot > 0 ? dot : e.target.value.length); }}
            onKeyDown={(e) => { if (e.key === "Enter") commit(e); if (e.key === "Escape") onRename(item.id, item.name); }}
            onBlur={commit} />
        ) : (
          <span className="label">{item.name}</span>
        )}
      </div>
    );
  }

  function DesktopIcons({ apps, items, onOpen, onOpenItem, onRename, onContextItem }) {
    return (
      <div className="aero-icons">
        {apps.map((a) => (
          <div className="aicon" key={a.id} onDoubleClick={() => onOpen(a.id)} onClick={(e) => e.detail === 0 && onOpen(a.id)}>
            <window.AeroIcon name={a.icon} size={46} glyph={23} />
            <span className="label">{a.title}</span>
          </div>
        ))}
        {items.filter((i) => i.parent == null).map((it) => (
          <DeskItem key={it.id} item={it} onOpen={() => onOpenItem(it)} onRename={onRename} onContext={(e) => onContextItem(e, it)} />
        ))}
      </div>
    );
  }

  // ---------- Right-click context menu (Win7 flyout) ----------
  function ContextMenu({ x, y, items, onClose }) {
    const ref = useRef(null);
    const [pos, setPos] = useState({ left: x, top: y });
    useEffect(() => {
      const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
      const k = (e) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("mousedown", h);
      window.addEventListener("keydown", k);
      return () => { document.removeEventListener("mousedown", h); window.removeEventListener("keydown", k); };
    }, []);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      let left = x, top = y;
      if (left + r.width > window.innerWidth - 8) left = window.innerWidth - r.width - 8;
      if (top + r.height > window.innerHeight - 8) top = window.innerHeight - r.height - 8;
      setPos({ left, top });
    }, []);
    return (
      <div className="ctxmenu" ref={ref} style={pos}>
        {items.map((it, i) => it.sep ? (
          <div className="ctx-sep" key={i} />
        ) : (
          <div className={"ctx-item" + (it.danger ? " danger" : "")} key={i}
            onClick={() => { it.onClick && it.onClick(); onClose(); }}>
            <span className="ctx-ic">{it.icon || null}</span>
            <span className="ctx-label">{it.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // ---------- Notepad (text document) ----------
  function Notepad({ item, onChange }) {
    return (
      <div className="notepad">
        <div className="np-menubar"><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span></div>
        <textarea className="np-area" value={item.content} spellCheck={false} autoFocus
          placeholder="" onChange={(e) => onChange(item.id, e.target.value)} />
      </div>
    );
  }

  // ---------- Folder window (mini Explorer) ----------
  function FolderView({ folder, items, onOpenItem, onNewFile, onRename, onContextItem, onContextEmpty }) {
    const children = items.filter((i) => i.parent === folder.id);
    return (
      <div className="explorer">
        <div className="exp-toolbar">
          <button className="exp-btn" onClick={() => onNewFile(folder.id)}><I.FileText size={14} /> New Text Document</button>
          <span className="exp-count">{children.length} item{children.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="exp-grid" onContextMenu={(e) => { if (e.target.closest(".aicon")) return; onContextEmpty && onContextEmpty(e, folder.id); }}>
          {children.length === 0 && <div className="exp-empty">This folder is empty.<br /><span>Use “New Text Document” to add a file.</span></div>}
          {children.map((it) => (
            <DeskItem key={it.id} item={it} onOpen={() => onOpenItem(it)} onRename={onRename} onContext={(e) => onContextItem(e, it)} />
          ))}
        </div>
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

  window.AeroOS = { CrtTerminal, Taskbar, StartMenu, DesktopIcons, Window, ContextMenu, Notepad, FolderView };
})();
