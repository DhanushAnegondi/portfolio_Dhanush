import React from "react";

/**
 * Input — single-line text field. Transparent fill, hairline border that
 * warms to the ember ring on focus. Pairs with Button in forms and the chat
 * composer.
 */

export function Input({ style, ...props }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
      onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
      style={{
        height: 36,
        width: "100%",
        background: "transparent",
        color: "hsl(var(--foreground))",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        padding: "0 12px",
        border: `1px solid ${focus ? "hsl(var(--ring))" : "hsl(var(--input))"}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focus ? "0 0 0 2px hsl(var(--ring) / 0.25)" : "var(--shadow-sm)",
        outline: "none",
        transition: "border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease",
        ...style,
      }}
      {...props}
    />
  );
}
