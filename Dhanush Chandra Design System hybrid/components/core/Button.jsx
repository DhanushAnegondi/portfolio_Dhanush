import React from "react";

/**
 * Button — the primary interactive primitive.
 * Ember-filled by default; outline / secondary / ghost / link / destructive
 * variants. Lifts 1px on hover, settles on press (no bounce). All styling is
 * driven by design-system CSS custom properties.
 */

const VARIANTS = {
  default: {
    background: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)",
  },
  outline: {
    background: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--input))",
    boxShadow: "var(--shadow-sm)",
  },
  secondary: {
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)",
  },
  ghost: {
    background: "transparent",
    color: "hsl(var(--foreground))",
    border: "1px solid transparent",
    boxShadow: "none",
  },
  link: {
    background: "transparent",
    color: "hsl(var(--primary))",
    border: "1px solid transparent",
    boxShadow: "none",
    textUnderlineOffset: "4px",
  },
  destructive: {
    background: "hsl(var(--destructive))",
    color: "hsl(var(--destructive-foreground))",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)",
  },
};

const SIZES = {
  sm: { height: 32, padding: "0 12px", fontSize: "var(--text-xs)", borderRadius: "var(--radius-md)" },
  default: { height: 36, padding: "0 16px", fontSize: "var(--text-sm)", borderRadius: "var(--radius-md)" },
  lg: { height: 44, padding: "0 24px", fontSize: "var(--text-sm)", borderRadius: "var(--radius-md)" },
  icon: { height: 36, width: 36, padding: 0, fontSize: "var(--text-sm)", borderRadius: "var(--radius-md)" },
};

export function Button({
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
  style,
  children,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.default;
  const s = SIZES[size] || SIZES.default;

  const lift = active ? "translateY(0)" : hover ? "translateY(-1px)" : "translateY(0)";
  const hoverBg =
    hover && !disabled
      ? {
          default: { filter: "brightness(0.92)" },
          outline: { background: "hsl(var(--accent))" },
          secondary: { filter: "brightness(1.08)" },
          ghost: { background: "hsl(var(--accent))" },
          link: { textDecoration: "underline" },
          destructive: { filter: "brightness(0.92)" },
        }[variant] || {}
      : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        whiteSpace: "nowrap",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-medium)",
        lineHeight: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: lift,
        transition:
          "transform var(--duration-fast) var(--ease-out-quint), box-shadow var(--duration-fast) var(--ease-out-quint), background-color var(--duration-fast) ease, filter var(--duration-fast) ease",
        outline: "none",
        ...v,
        ...s,
        ...hoverBg,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
