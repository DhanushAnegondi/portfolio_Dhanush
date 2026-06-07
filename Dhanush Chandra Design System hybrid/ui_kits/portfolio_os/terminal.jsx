// DhanushOS — interactive Terminal app + floating AI assistant.
(function () {
  const { useState, useRef, useEffect } = React;
  const I = window.Icons;
  const D = window.DATA;

  const APP_ALIASES = {
    about: "about", projects: "projects", skills: "skills", stack: "skills",
    experience: "experience", history: "experience", writing: "writing",
    notes: "writing", resume: "resume", cv: "resume", contact: "contact",
  };

  function Terminal({ onOpen }) {
    const [lines, setLines] = useState([
      { html: <span><span className="dim">Last login on DhanushOS. Type </span><span className="p">help</span><span className="dim"> to begin.</span></span> },
    ]);
    const [val, setVal] = useState("");
    const bodyRef = useRef(null);
    const inRef = useRef(null);

    useEffect(() => { bodyRef.current && bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight); }, [lines]);

    function push(node) { setLines((l) => [...l, { html: node }]); }

    function run(raw) {
      const cmd = raw.trim();
      push(<span><span className="p">dhanush@os</span> <span className="dim">~ %</span> {cmd}</span>);
      const [c, ...args] = cmd.toLowerCase().split(/\s+/);
      const arg = args.join(" ");

      if (!c) return;
      switch (c) {
        case "help":
          push(<span className="dim">commands: <span className="ok">about</span>, <span className="ok">projects</span>, <span className="ok">skills</span>, <span className="ok">experience</span>, <span className="ok">writing</span>, <span className="ok">resume</span>, <span className="ok">contact</span> · <span className="ok">open</span> &lt;app&gt; · <span className="ok">ls</span> · <span className="ok">whoami</span> · <span className="ok">clear</span></span>);
          break;
        case "whoami":
          push(<span>{D.profile.name} — {D.profile.role} · {D.profile.location}</span>);
          break;
        case "ls":
          push(<span className="ok">about  projects  skills  experience  writing  resume  contact</span>);
          break;
        case "open": {
          const target = APP_ALIASES[arg];
          if (target) { push(<span className="dim">opening {target}.app…</span>); onOpen(target); }
          else push(<span className="dim">no such app: {arg || "(none)"} — try </span>);
          break;
        }
        case "skills":
          push(<span>{D.skills.map((g) => g.items.join(", ")).join(" · ")}</span>);
          break;
        case "about":
          push(<span>{D.about[0]}</span>); onOpen("about"); break;
        case "projects":
          push(<span className="dim">{D.projects.length} pipelines shipped — opening projects.app…</span>); onOpen("projects"); break;
        case "contact":
          push(<span>{D.profile.email}</span>); onOpen("contact"); break;
        case "sudo":
          push(<span className="dim">nice try. data quality is enforced for everyone 🙂</span>); break;
        case "clear":
          setLines([]); return;
        case "echo":
          push(<span>{args.join(" ")}</span>); break;
        default:
          push(<span className="dim">command not found: {c}. type <span className="p">help</span></span>);
      }
    }

    return (
      <div className="term" ref={bodyRef} onClick={() => inRef.current && inRef.current.focus()}>
        {lines.map((l, i) => <div className="line" key={i}>{l.html}</div>)}
        <div className="term-input-row">
          <span className="p">dhanush@os</span><span className="dim">~ %</span>
          <input
            ref={inRef}
            className="term-input"
            value={val}
            autoFocus
            spellCheck={false}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { run(val); setVal(""); } }}
          />
        </div>
      </div>
    );
  }

  // ---------- Floating AI assistant ----------
  const SUGGESTIONS = ["Why hire Dhanush?", "Strongest skills?", "Tell me about a project"];
  function reply(text) {
    const t = text.toLowerCase();
    if (t.includes("hire")) return "Because he turns messy source data into datasets teams trust — owning pipelines end-to-end with data quality enforced as a contract. Open Projects.app to see how.";
    if (t.includes("skill")) return "Strongest in Python, SQL, Spark and Airflow — plus streaming with Kafka, modeling in dbt, and observability tooling. The Skills app has the full stack.";
    if (t.includes("project")) return "Try the real-time ingestion pipeline: CDC → Kafka → Spark → Delta Lake, taking latency from overnight to minutes. Open Projects.app and expand it for the architecture.";
    return "I'm Dhanush's assistant — ask about his skills, projects, or fit for a data-engineering role. (Replies are canned in this demo.)";
  }

  function Assistant() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([{ role: "a", c: "Hi! I'm Dhanush's assistant. Ask me anything about his work." }]);
    const [val, setVal] = useState("");
    const [typing, setTyping] = useState(false);
    const sref = useRef(null);
    useEffect(() => { sref.current && sref.current.scrollTo(0, sref.current.scrollHeight); }, [msgs, typing, open]);

    function send(text) {
      const c = (text ?? val).trim(); if (!c || typing) return;
      setMsgs((m) => [...m, { role: "u", c }]); setVal(""); setTyping(true);
      setTimeout(() => { setMsgs((m) => [...m, { role: "a", c: reply(c) }]); setTyping(false); }, 720);
    }

    return (
      <div className="assistant-anchor">
        {open && (
          <div className="dos-pop" style={panel}>
            <div style={pHead}>
              <span style={{ fontWeight: 600, color: "hsl(var(--foreground))", fontSize: 14 }}>Ask about Dhanush</span>
              <span style={aiBadge}>AI</span>
              <span style={{ marginLeft: "auto", cursor: "pointer", color: "hsl(var(--muted-foreground))" }} onClick={() => setOpen(false)}>✕</span>
            </div>
            <div ref={sref} style={pBody}>
              {msgs.map((m, i) => (
                <div key={i} style={m.role === "u" ? bubbleU : bubbleA}>{m.c}</div>
              ))}
              {typing && <div style={{ ...bubbleA, fontStyle: "italic", color: "hsl(var(--muted-foreground))" }}>typing…</div>}
              {msgs.length === 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 2 }}>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} style={sugg}>{s}</button>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(); }} style={pForm}>
              <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Type a question…" style={pInput} />
              <button type="submit" style={pSend} aria-label="send"><I.Send size={15} /></button>
            </form>
          </div>
        )}
        <button onClick={() => setOpen((o) => !o)} className="ds-lift" style={launch}>
          {open ? "✕ Close" : <><I.Sparkles size={16} /> Ask AI</>}
        </button>
      </div>
    );
  }

  const panel = { position: "absolute", bottom: 60, right: 0, width: 340, height: 440, display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: "var(--radius-2xl)", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", boxShadow: "var(--shadow-xl)" };
  const pHead = { display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderBottom: "1px solid hsl(var(--border))" };
  const aiBadge = { borderRadius: 99, background: "hsl(var(--primary) / 0.12)", color: "var(--ember)", padding: "3px 8px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700 };
  const pBody = { display: "flex", flexDirection: "column", gap: 9, overflowY: "auto", padding: 14, flex: 1 };
  const bubbleBase = { maxWidth: "86%", whiteSpace: "pre-wrap", borderRadius: 16, padding: "9px 13px", fontSize: 13.5, lineHeight: 1.55 };
  const bubbleU = { ...bubbleBase, alignSelf: "flex-end", background: "var(--ember)", color: "hsl(var(--primary-foreground))" };
  const bubbleA = { ...bubbleBase, alignSelf: "flex-start", background: "hsl(var(--muted))", color: "hsl(var(--foreground))" };
  const sugg = { borderRadius: 99, border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", padding: "6px 11px", fontSize: 12, cursor: "pointer", fontFamily: "var(--font-sans)" };
  const pForm = { display: "flex", gap: 8, padding: 11, borderTop: "1px solid hsl(var(--border))" };
  const pInput = { flex: 1, height: 36, background: "transparent", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--input))", borderRadius: "var(--radius-md)", padding: "0 12px", fontSize: 13, fontFamily: "var(--font-sans)", outline: "none" };
  const pSend = { height: 36, width: 36, display: "grid", placeItems: "center", borderRadius: "var(--radius-md)", border: "none", background: "var(--ember)", color: "hsl(var(--primary-foreground))", cursor: "pointer" };
  const launch = { display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 18px", borderRadius: 99, border: "none", background: "var(--ember)", color: "hsl(var(--primary-foreground))", fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14, boxShadow: "var(--shadow-lg)", cursor: "pointer" };

  window.Apps = Object.assign(window.Apps || {}, { Terminal });
  window.Assistant = Assistant;
})();
