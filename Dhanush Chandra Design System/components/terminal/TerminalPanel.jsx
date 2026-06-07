import React from "react";

/**
 * TerminalPanel — the brand's signature "imagery". A mono terminal card with
 * traffic-light header and a sequence of prompt/output lines that boot in.
 * Use it as a hero side-panel or anywhere you'd "show the work" instead of
 * decorating. Lines are data, not markup.
 *
 * line shape: { prompt?: boolean, text: string, dim?: boolean }
 *   prompt → prefix the line with an ember "$"
 *   dim    → render in muted-foreground (a command being typed)
 */

export function TerminalPanel({
  title = "~/dhanush — stack",
  lines = [],
  cursor = true,
  animate = true,
  style,
}) {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: "var(--radius-xl)",
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--card) / 0.8)",
        boxShadow: "var(--shadow-xl)",
        backdropFilter: "blur(6px)",
        fontFamily: "var(--font-mono)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 16px",
          borderBottom: "1px solid hsl(var(--border))",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ width: 11, height: 11, borderRadius: "50%", background: "hsl(var(--muted-foreground) / 0.25)" }}
          />
        ))}
        <span style={{ marginLeft: 8, fontSize: "var(--text-xs)", color: "hsl(var(--muted-foreground))" }}>
          {title}
        </span>
      </div>

      <div style={{ padding: 18, fontSize: "var(--text-sm)", lineHeight: 1.85 }}>
        {lines.map((ln, i) => (
          <div
            key={i}
            className={animate ? "ds-boot-line" : undefined}
            style={{
              color: ln.dim ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
              animationDelay: animate ? `${0.15 + i * 0.12}s` : undefined,
            }}
          >
            {ln.prompt && <span style={{ color: "hsl(var(--primary))" }}>$ </span>}
            {ln.text}
          </div>
        ))}
        {cursor && (
          <div style={{ color: "hsl(var(--muted-foreground))" }}>
            <span style={{ color: "hsl(var(--primary))" }}>$ </span>
            <span
              className="ds-cursor-blink"
              style={{ display: "inline-block", width: 8, height: 15, background: "hsl(var(--primary))", transform: "translateY(2px)" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
