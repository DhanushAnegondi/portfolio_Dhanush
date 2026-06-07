import React from "react";

/**
 * ChatWidget — the portfolio's signature "Ask my AI" feature, recreated as a
 * self-contained, fake-interactive primitive. A floating ember launcher opens
 * a popover with an assistant greeting, suggestion chips, a message thread, a
 * "typing…" state, and a composer. Replies are canned (no network) so it works
 * anywhere. Swap `getReply` for a real endpoint in production.
 */

const SUGGESTIONS = [
  "Why should we hire Dhanush?",
  "What are his strongest skills?",
  "Tell me about his projects.",
];

const CANNED = {
  default:
    "He's a Data Engineer focused on reliable, observable pipelines — strong in Python and SQL across batch and streaming. Want specifics on his projects or fit for a role?",
  hire: "Because he turns messy source data into datasets teams actually trust — owning pipelines end-to-end and enforcing data quality. Pragmatic, precise, and obsessed with observability.",
  skills: "Strongest in Python, SQL, Apache Spark, and Airflow orchestration — plus data modeling, ELT design, and data-quality/observability tooling.",
  projects: "He builds streaming ingestion pipelines and dimensional analytics warehouses — the kind of work that takes latency from hours to minutes and keeps dashboards trustworthy.",
};

function defaultGetReply(text) {
  const t = text.toLowerCase();
  if (t.includes("hire")) return CANNED.hire;
  if (t.includes("skill")) return CANNED.skills;
  if (t.includes("project")) return CANNED.projects;
  return CANNED.default;
}

function Bubble({ role, children }) {
  const user = role === "user";
  return (
    <div
      style={{
        alignSelf: user ? "flex-end" : "flex-start",
        maxWidth: "85%",
        whiteSpace: "pre-wrap",
        borderRadius: "var(--radius-2xl)",
        padding: "10px 14px",
        fontSize: "var(--text-sm)",
        lineHeight: "var(--leading-relaxed)",
        background: user ? "hsl(var(--primary))" : "hsl(var(--muted))",
        color: user ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
      }}
    >
      {children}
    </div>
  );
}

export function ChatWidget({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  getReply = defaultGetReply,
  style,
}) {
  const controlled = openProp !== undefined;
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = controlled ? openProp : openState;
  const setOpen = (v) => {
    if (!controlled) setOpenState(v);
    onOpenChange && onOpenChange(v);
  };

  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: "assistant", content: "Hi! I'm Dhanush's AI assistant. Ask me anything about his skills, projects, or why he'd be a great hire." },
  ]);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    scrollRef.current && scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading, open]);

  function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: getReply(content) }]);
      setLoading(false);
    }, 750);
  }

  return (
    <div style={{ position: "relative", fontFamily: "var(--font-sans)", ...style }}>
      {open && (
        <div
          className="ds-animate-pop"
          style={{
            position: "absolute",
            bottom: 64,
            right: 0,
            display: "flex",
            flexDirection: "column",
            width: 360,
            height: 460,
            overflow: "hidden",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid hsl(var(--border))",
            background: "hsl(var(--card))",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 16px", borderBottom: "1px solid hsl(var(--border))" }}>
            <span style={{ fontWeight: "var(--weight-semibold)", color: "hsl(var(--foreground))" }}>Ask about Dhanush</span>
            <span style={{ borderRadius: "var(--radius-full)", background: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", padding: "3px 8px", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-bold)" }}>AI</span>
          </div>

          <div ref={scrollRef} style={{ display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", padding: 16, flex: 1 }}>
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>{m.content}</Bubble>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", borderRadius: "var(--radius-2xl)", background: "hsl(var(--muted))", padding: "10px 14px", fontSize: "var(--text-sm)", fontStyle: "italic", color: "hsl(var(--muted-foreground))" }}>
                typing…
              </div>
            )}
            {messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{ borderRadius: "var(--radius-full)", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", padding: "6px 12px", fontSize: "var(--text-xs)", cursor: "pointer", fontFamily: "var(--font-sans)" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid hsl(var(--border))" }}
          >
            <input
              value={input}
              placeholder="Type a question…"
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, height: 36, background: "transparent", color: "hsl(var(--foreground))", border: "1px solid hsl(var(--input))", borderRadius: "var(--radius-md)", padding: "0 12px", fontSize: "var(--text-sm)", fontFamily: "var(--font-sans)", outline: "none" }}
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send"
              style={{ height: 36, width: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-md)", border: "none", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", cursor: "pointer" }}
            >
              ↑
            </button>
          </form>
        </div>
      )}

      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen(!open)}
        className="ds-lift"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 48,
          padding: "0 20px",
          borderRadius: "var(--radius-full)",
          border: "none",
          background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-medium)",
          fontSize: "var(--text-sm)",
          boxShadow: "var(--shadow-lg)",
          cursor: "pointer",
        }}
      >
        {open ? "✕ Close" : "✦ Ask AI"}
      </button>
    </div>
  );
}
