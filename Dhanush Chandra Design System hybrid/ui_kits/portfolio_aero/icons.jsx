// DhanushOS — icon set. Lucide-style (1.5px stroke, round caps), matching the
// real portfolio's lucide-react iconography. Self-contained inline SVG so it
// never depends on a CDN load racing React.
(function () {
  function Icon({ d, paths, size = 20, fill = false, style, ...rest }) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={fill ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
        {...rest}
      >
        {paths ? paths : <path d={d} />}
      </svg>
    );
  }

  const P = (d) => (props) => <Icon d={d} {...props} />;
  const M = (els) => (props) => <Icon paths={els} {...props} />;

  window.Icons = {
    Terminal: M(<g><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></g>),
    User: M(<g><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></g>),
    Folder: M(<g><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /></g>),
    Layers: M(<g><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 12.18-9.17 4.16a2 2 0 0 1-1.66 0L2 12.18" /><path d="m22 17.18-9.17 4.16a2 2 0 0 1-1.66 0L2 17.18" /></g>),
    History: M(<g><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></g>),
    Pen: M(<g><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></g>),
    FileDown: M(<g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M12 12v6" /><path d="m9 15 3 3 3-3" /></g>),
    Mail: M(<g><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></g>),
    Database: M(<g><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></g>),
    GitBranch: M(<g><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></g>),
    Activity: P("M22 12h-4l-3 9L9 3l-3 9H2"),
    Zap: P("M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"),
    Cloud: P("M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"),
    Wind: M(<g><path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" /></g>),
    ArrowRight: M(<g><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></g>),
    ChevronRight: P("m9 18 6-6-6-6"),
    ChevronLeft: P("m15 18-6-6 6-6"),
    Sparkles: M(<g><path d="M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-2.06L8 4l1.94 5.94L16 12Z" transform="translate(2 0)" /><path d="M18 5v4" /><path d="M16 7h4" /></g>),
    Sun: M(<g><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></g>),
    Moon: P("M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"),
    Send: M(<g><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></g>),
    Github: P("M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"),
    Linkedin: M(<g><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></g>),
    MapPin: M(<g><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></g>),
    Power: M(<g><path d="M12 2v10" /><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /></g>),
    Box: M(<g><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></g>),
    BarChart: M(<g><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></g>),
    Code: M(<g><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></g>),
    Minus: P("M5 12h14"),
    Square: M(<g><rect x="4" y="4" width="16" height="16" rx="1.5" /></g>),
    X: M(<g><path d="M18 6 6 18" /><path d="m6 6 12 12" /></g>),
    FileText: M(<g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></g>),
    FolderPlus: M(<g><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></g>),
    Gamepad: M(<g><line x1="6" y1="11" x2="10" y2="11" /><line x1="8" y1="9" x2="8" y2="13" /><line x1="15" y1="12" x2="15.01" y2="12" /><line x1="18" y1="10" x2="18.01" y2="10" /><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" /></g>),
  };

  // ---- Windows-7-style glossy "Aero" object icons ----------------------------
  // Each app icon is rendered as a dimensional, saturated gel badge (top sheen +
  // inner bevel + soft contact shadow) — the Win7 icon language, recreated.
  window.IconColors = {
    Folder:   ["#f8d05a", "#e3a226", "#b9781a"], // manila-yellow folder
    User:     ["#69b0ec", "#2f74c6", "#1f5599"], // user account blue
    Layers:   ["#57ccb9", "#1f9b88", "#147567"], // skills teal
    History:  ["#a48fe8", "#6a4fc2", "#4d3897"], // experience violet
    Pen:      ["#86d176", "#3f9c3a", "#2b7a2b"], // writing green
    FileDown: ["#f6976d", "#d6512f", "#b23b20"], // résumé / PDF red-orange
    Terminal: ["#6e8090", "#33424f", "#1b242c"], // console graphite
    Mail:     ["#5ebef1", "#2a85ca", "#1b639f"], // contact azure
    FileText: ["#ffffff", "#eef3f8", "#ccd6e2"], // text document — white page
    Gamepad:  ["#ff8fc4", "#ec3f8f", "#bb2a68"], // Snake / game — arcade magenta
  };
  // icons that want a dark glyph on a light badge (paper-style)
  const GLYPH_DARK = { FileText: "#5b6b7b" };
  const AERO_FALLBACK = ["#84b6ea", "#2f74c6", "#1f5599"];

  window.AeroIcon = function AeroIcon({ name, size = 46, glyph = 23, className = "" }) {
    const G = window.Icons[name] || window.Icons.Box;
    const c = window.IconColors[name] || AERO_FALLBACK;
    const gc = GLYPH_DARK[name];
    return (
      <span
        className={"aero-ic " + className}
        style={{ width: size, height: size, "--c1": c[0], "--c2": c[1], "--c3": c[2] }}
      >
        <span className="aero-ic-face" style={gc ? { color: gc } : undefined}><G size={glyph} /></span>
      </span>
    );
  };
})();
