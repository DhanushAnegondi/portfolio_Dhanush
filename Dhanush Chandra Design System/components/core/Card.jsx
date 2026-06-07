import React from "react";

/**
 * Card — raised surface on the ink-900 panel color, 12px radius, hairline
 * border. Hovering lifts it slightly and warms the border toward ember.
 * Compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter.
 */

export function Card({ interactive = false, style, children, ...props }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "hsl(var(--card))",
        color: "hsl(var(--card-foreground))",
        border: `1px solid ${hover ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border))"}`,
        borderRadius: "var(--radius-lg)",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition:
          "transform var(--duration-base) var(--ease-out-quint), box-shadow var(--duration-base) var(--ease-out-quint), border-color var(--duration-base) ease",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ style, children, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: 24, ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ style, children, ...props }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-semibold)",
        fontSize: "var(--text-lg)",
        lineHeight: 1.1,
        letterSpacing: "var(--tracking-tight)",
        color: "hsl(var(--foreground))",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardDescription({ style, children, ...props }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        lineHeight: "var(--leading-relaxed)",
        color: "hsl(var(--muted-foreground))",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ style, children, ...props }) {
  return (
    <div style={{ padding: "0 24px 24px", color: "hsl(var(--muted-foreground))", ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ style, children, ...props }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "0 24px 24px", ...style }} {...props}>
      {children}
    </div>
  );
}
