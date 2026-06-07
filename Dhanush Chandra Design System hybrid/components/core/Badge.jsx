import React from "react";

/**
 * Badge — compact label. Covers the system's three real chip styles:
 *  - "skill"   ember-tint pill used for the skills cloud
 *  - "tag"     neutral secondary chip used for tech-stack tokens
 *  - "status"  pill with a leading dot (success / danger / ember)
 *  - "ai"      tiny bold ember badge used beside the assistant title
 * Status color is always paired with the dot + text, never color alone.
 */

const DOT_COLORS = {
  ember: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  danger: "hsl(var(--destructive))",
};

export function Badge({ variant = "tag", tone = "ember", style, children, ...props }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontFamily: variant === "tag" || variant === "ai" ? "var(--font-mono)" : "var(--font-sans)",
    whiteSpace: "nowrap",
    lineHeight: 1,
  };

  let look = {};
  if (variant === "skill") {
    look = {
      padding: "7px 14px",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      background: "hsl(var(--primary) / 0.1)",
      color: "hsl(var(--primary))",
    };
  } else if (variant === "tag") {
    look = {
      padding: "4px 9px",
      borderRadius: "var(--radius-sm)",
      fontSize: "var(--text-xs)",
      background: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
    };
  } else if (variant === "ai") {
    look = {
      padding: "3px 8px",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-wide)",
      background: "hsl(var(--primary) / 0.12)",
      color: "hsl(var(--primary))",
    };
  } else if (variant === "status") {
    const c = DOT_COLORS[tone] || DOT_COLORS.ember;
    look = {
      padding: "6px 13px",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--text-sm)",
      color: c,
      background: `color-mix(in srgb, ${c} 13%, transparent)`,
      border: `1px solid color-mix(in srgb, ${c} 35%, transparent)`,
    };
  }

  return (
    <span style={{ ...base, ...look, ...style }} {...props}>
      {variant === "status" && (
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: DOT_COLORS[tone] || DOT_COLORS.ember,
            flex: "none",
          }}
        />
      )}
      {children}
    </span>
  );
}
