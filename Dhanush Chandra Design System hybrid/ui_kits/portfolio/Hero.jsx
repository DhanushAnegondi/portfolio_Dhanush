// Portfolio UI kit — Hero. Faithful recreation of the live portfolio hero:
// status eyebrow, wiped headline with ember span, lead copy, two CTAs, and the
// signature TerminalPanel as the right-hand "imagery". The live site renders a
// WebGL CRT shader behind this; here we use the brand's authentic layered
// backdrop (glow → blueprint grid → grain → vignette) as a static stand-in.

const { Button, TerminalPanel } = window.DhanushChandraDesignSystem_2b4e61;

function Hero({ onAskAI }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid hsl(var(--border))" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div className="ds-glow" style={{ position: "absolute", inset: 0 }} />
        <div className="ds-grid" style={{ position: "absolute", inset: 0 }} />
        <div className="ds-grain" style={{ position: "absolute", inset: 0 }} />
        <div className="ds-vignette" style={{ position: "absolute", inset: 0 }} />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1024,
          margin: "0 auto",
          padding: "96px 24px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <p
            className="ds-animate-rise"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wider)",
              color: "hsl(var(--muted-foreground))",
              margin: 0,
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "hsl(var(--primary) / 0.7)", animation: "ds-ping 1.4s var(--ease-out-quint) infinite" }} />
              <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "hsl(var(--primary))" }} />
            </span>
            Data Engineer · India · open to work
          </p>

          <h1
            className="ds-animate-wipe"
            style={{
              marginTop: 24,
              fontFamily: "var(--font-sans)",
              fontSize: "3.5rem",
              fontWeight: "var(--weight-extrabold)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-tighter)",
              color: "hsl(var(--foreground))",
              textWrap: "balance",
            }}
          >
            Reliable data pipelines, from messy source to{" "}
            <span style={{ color: "hsl(var(--primary))" }}>trusted dataset</span>.
          </h1>

          <p
            className="ds-animate-rise"
            style={{
              marginTop: 24,
              maxWidth: "36rem",
              fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-relaxed)",
              color: "hsl(var(--muted-foreground))",
              textWrap: "pretty",
            }}
          >
            I'm Dhanush Chandra, a Data Engineer who turns raw, messy data into
            datasets teams can actually trust. Strong in Python and SQL,
            comfortable across batch and streaming, and obsessed with data
            quality and observability.
          </p>

          <div className="ds-animate-rise" style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <Button size="lg">Get in touch</Button>
            <Button size="lg" variant="outline" onClick={onAskAI}>Ask my AI ↗</Button>
          </div>

          <p className="ds-animate-rise" style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "hsl(var(--muted-foreground))" }}>
            try asking it &ldquo;why should we hire Dhanush?&rdquo;
          </p>
        </div>

        <div className="ds-animate-rise" style={{ animationDelay: "0.18s" }}>
          <TerminalPanel
            lines={[
              { prompt: true, dim: true, text: "whoami" },
              { text: "Data Engineer · India" },
              { prompt: true, dim: true, text: "cat core-stack.txt" },
              { text: "› Python   › SQL" },
              { text: "› Spark    › Airflow" },
              { prompt: true, dim: true, text: "status" },
              { text: "● pipelines: green · data quality: enforced" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
