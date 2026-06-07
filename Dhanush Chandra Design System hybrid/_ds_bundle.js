/* @ds-bundle: {"format":3,"namespace":"DhanushChandraDesignSystem_2b4e61","components":[{"name":"ChatWidget","sourcePath":"components/chat/ChatWidget.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"TerminalPanel","sourcePath":"components/terminal/TerminalPanel.jsx"}],"sourceHashes":{"components/chat/ChatWidget.jsx":"5edd3f92f80f","components/core/Badge.jsx":"854b6f629b8f","components/core/Button.jsx":"294e72f3ef01","components/core/Card.jsx":"40f04b64bdaa","components/core/Input.jsx":"f5672a17b3b3","components/terminal/TerminalPanel.jsx":"50710150b3a0","ui_kits/portfolio/Content.jsx":"7bba4dfc70bc","ui_kits/portfolio/Hero.jsx":"91d7f5c4d9c0","ui_kits/portfolio_aero/apps.jsx":"8e8e646b04ab","ui_kits/portfolio_aero/data.js":"05d28985fe8c","ui_kits/portfolio_aero/icons.jsx":"68a526c9b824","ui_kits/portfolio_aero/projects.jsx":"9d0a4cab802d","ui_kits/portfolio_aero/shell.jsx":"af900e953bf2","ui_kits/portfolio_aero/terminal.jsx":"35171c408aa6","ui_kits/portfolio_os/apps.jsx":"8e8e646b04ab","ui_kits/portfolio_os/data.js":"05d28985fe8c","ui_kits/portfolio_os/desktop.jsx":"ba05cdd6dd4b","ui_kits/portfolio_os/icons.jsx":"821f786e3312","ui_kits/portfolio_os/projects.jsx":"9d0a4cab802d","ui_kits/portfolio_os/terminal.jsx":"35171c408aa6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DhanushChandraDesignSystem_2b4e61 = window.DhanushChandraDesignSystem_2b4e61 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/chat/ChatWidget.jsx
try { (() => {
/**
 * ChatWidget — the portfolio's signature "Ask my AI" feature, recreated as a
 * self-contained, fake-interactive primitive. A floating ember launcher opens
 * a popover with an assistant greeting, suggestion chips, a message thread, a
 * "typing…" state, and a composer. Replies are canned (no network) so it works
 * anywhere. Swap `getReply` for a real endpoint in production.
 */

const SUGGESTIONS = ["Why should we hire Dhanush?", "What are his strongest skills?", "Tell me about his projects."];
const CANNED = {
  default: "He's a Data Engineer focused on reliable, observable pipelines — strong in Python and SQL across batch and streaming. Want specifics on his projects or fit for a role?",
  hire: "Because he turns messy source data into datasets teams actually trust — owning pipelines end-to-end and enforcing data quality. Pragmatic, precise, and obsessed with observability.",
  skills: "Strongest in Python, SQL, Apache Spark, and Airflow orchestration — plus data modeling, ELT design, and data-quality/observability tooling.",
  projects: "He builds streaming ingestion pipelines and dimensional analytics warehouses — the kind of work that takes latency from hours to minutes and keeps dashboards trustworthy."
};
function defaultGetReply(text) {
  const t = text.toLowerCase();
  if (t.includes("hire")) return CANNED.hire;
  if (t.includes("skill")) return CANNED.skills;
  if (t.includes("project")) return CANNED.projects;
  return CANNED.default;
}
function Bubble({
  role,
  children
}) {
  const user = role === "user";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: user ? "flex-end" : "flex-start",
      maxWidth: "85%",
      whiteSpace: "pre-wrap",
      borderRadius: "var(--radius-2xl)",
      padding: "10px 14px",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-relaxed)",
      background: user ? "hsl(var(--primary))" : "hsl(var(--muted))",
      color: user ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"
    }
  }, children);
}
function ChatWidget({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  getReply = defaultGetReply,
  style
}) {
  const controlled = openProp !== undefined;
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = controlled ? openProp : openState;
  const setOpen = v => {
    if (!controlled) setOpenState(v);
    onOpenChange && onOpenChange(v);
  };
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([{
    role: "assistant",
    content: "Hi! I'm Dhanush's AI assistant. Ask me anything about his skills, projects, or why he'd be a great hire."
  }]);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    scrollRef.current && scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading, open]);
  function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setMessages(m => [...m, {
      role: "user",
      content
    }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: "assistant",
        content: getReply(content)
      }]);
      setLoading(false);
    }, 750);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, open && /*#__PURE__*/React.createElement("div", {
    className: "ds-animate-pop",
    style: {
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
      boxShadow: "var(--shadow-xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "13px 16px",
      borderBottom: "1px solid hsl(var(--border))"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--weight-semibold)",
      color: "hsl(var(--foreground))"
    }
  }, "Ask about Dhanush"), /*#__PURE__*/React.createElement("span", {
    style: {
      borderRadius: "var(--radius-full)",
      background: "hsl(var(--primary) / 0.12)",
      color: "hsl(var(--primary))",
      padding: "3px 8px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)"
    }
  }, "AI")), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      overflowY: "auto",
      padding: 16,
      flex: 1
    }
  }, messages.map((m, i) => /*#__PURE__*/React.createElement(Bubble, {
    key: i,
    role: m.role
  }, m.content)), loading && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "flex-start",
      borderRadius: "var(--radius-2xl)",
      background: "hsl(var(--muted))",
      padding: "10px 14px",
      fontSize: "var(--text-sm)",
      fontStyle: "italic",
      color: "hsl(var(--muted-foreground))"
    }
  }, "typing\u2026"), messages.length === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 2
    }
  }, SUGGESTIONS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => send(s),
    style: {
      borderRadius: "var(--radius-full)",
      border: "1px solid hsl(var(--border))",
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      padding: "6px 12px",
      fontSize: "var(--text-xs)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)"
    }
  }, s)))), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      send();
    },
    style: {
      display: "flex",
      gap: 8,
      padding: 12,
      borderTop: "1px solid hsl(var(--border))"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: input,
    placeholder: "Type a question\u2026",
    onChange: e => setInput(e.target.value),
    style: {
      flex: 1,
      height: 36,
      background: "transparent",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--input))",
      borderRadius: "var(--radius-md)",
      padding: "0 12px",
      fontSize: "var(--text-sm)",
      fontFamily: "var(--font-sans)",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: loading,
    "aria-label": "Send",
    style: {
      height: 36,
      width: 36,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      border: "none",
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      cursor: "pointer"
    }
  }, "\u2191"))), /*#__PURE__*/React.createElement("button", {
    "aria-label": open ? "Close chat" : "Open chat",
    onClick: () => setOpen(!open),
    className: "ds-lift",
    style: {
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
      cursor: "pointer"
    }
  }, open ? "✕ Close" : "✦ Ask AI"));
}
Object.assign(__ds_scope, { ChatWidget });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/ChatWidget.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  danger: "hsl(var(--destructive))"
};
function Badge({
  variant = "tag",
  tone = "ember",
  style,
  children,
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontFamily: variant === "tag" || variant === "ai" ? "var(--font-mono)" : "var(--font-sans)",
    whiteSpace: "nowrap",
    lineHeight: 1
  };
  let look = {};
  if (variant === "skill") {
    look = {
      padding: "7px 14px",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      background: "hsl(var(--primary) / 0.1)",
      color: "hsl(var(--primary))"
    };
  } else if (variant === "tag") {
    look = {
      padding: "4px 9px",
      borderRadius: "var(--radius-sm)",
      fontSize: "var(--text-xs)",
      background: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))"
    };
  } else if (variant === "ai") {
    look = {
      padding: "3px 8px",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-wide)",
      background: "hsl(var(--primary) / 0.12)",
      color: "hsl(var(--primary))"
    };
  } else if (variant === "status") {
    const c = DOT_COLORS[tone] || DOT_COLORS.ember;
    look = {
      padding: "6px 13px",
      borderRadius: "var(--radius-full)",
      fontSize: "var(--text-sm)",
      color: c,
      background: `color-mix(in srgb, ${c} 13%, transparent)`,
      border: `1px solid color-mix(in srgb, ${c} 35%, transparent)`
    };
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...look,
      ...style
    }
  }, props), variant === "status" && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: DOT_COLORS[tone] || DOT_COLORS.ember,
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    boxShadow: "var(--shadow-sm)"
  },
  outline: {
    background: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--input))",
    boxShadow: "var(--shadow-sm)"
  },
  secondary: {
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)"
  },
  ghost: {
    background: "transparent",
    color: "hsl(var(--foreground))",
    border: "1px solid transparent",
    boxShadow: "none"
  },
  link: {
    background: "transparent",
    color: "hsl(var(--primary))",
    border: "1px solid transparent",
    boxShadow: "none",
    textUnderlineOffset: "4px"
  },
  destructive: {
    background: "hsl(var(--destructive))",
    color: "hsl(var(--destructive-foreground))",
    border: "1px solid transparent",
    boxShadow: "var(--shadow-sm)"
  }
};
const SIZES = {
  sm: {
    height: 32,
    padding: "0 12px",
    fontSize: "var(--text-xs)",
    borderRadius: "var(--radius-md)"
  },
  default: {
    height: 36,
    padding: "0 16px",
    fontSize: "var(--text-sm)",
    borderRadius: "var(--radius-md)"
  },
  lg: {
    height: 44,
    padding: "0 24px",
    fontSize: "var(--text-sm)",
    borderRadius: "var(--radius-md)"
  },
  icon: {
    height: 36,
    width: 36,
    padding: 0,
    fontSize: "var(--text-sm)",
    borderRadius: "var(--radius-md)"
  }
};
function Button({
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
  const hoverBg = hover && !disabled ? {
    default: {
      filter: "brightness(0.92)"
    },
    outline: {
      background: "hsl(var(--accent))"
    },
    secondary: {
      filter: "brightness(1.08)"
    },
    ghost: {
      background: "hsl(var(--accent))"
    },
    link: {
      textDecoration: "underline"
    },
    destructive: {
      filter: "brightness(0.92)"
    }
  }[variant] || {} : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
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
      transition: "transform var(--duration-fast) var(--ease-out-quint), box-shadow var(--duration-fast) var(--ease-out-quint), background-color var(--duration-fast) ease, filter var(--duration-fast) ease",
      outline: "none",
      ...v,
      ...s,
      ...hoverBg,
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — raised surface on the ink-900 panel color, 12px radius, hairline
 * border. Hovering lifts it slightly and warms the border toward ember.
 * Compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter.
 */

function Card({
  interactive = false,
  style,
  children,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      border: `1px solid ${hover ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border))"}`,
      borderRadius: "var(--radius-lg)",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "transform var(--duration-base) var(--ease-out-quint), box-shadow var(--duration-base) var(--ease-out-quint), border-color var(--duration-base) ease",
      ...style
    }
  }, props), children);
}
function CardHeader({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      padding: 24,
      ...style
    }
  }, props), children);
}
function CardTitle({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-semibold)",
      fontSize: "var(--text-lg)",
      lineHeight: 1.1,
      letterSpacing: "var(--tracking-tight)",
      color: "hsl(var(--foreground))",
      ...style
    }
  }, props), children);
}
function CardDescription({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-relaxed)",
      color: "hsl(var(--muted-foreground))",
      ...style
    }
  }, props), children);
}
function CardContent({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: "0 24px 24px",
      color: "hsl(var(--muted-foreground))",
      ...style
    }
  }, props), children);
}
function CardFooter({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      padding: "0 24px 24px",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field. Transparent fill, hairline border that
 * warms to the ember ring on focus. Pairs with Button in forms and the chat
 * composer.
 */

function Input({
  style,
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocus(true);
      props.onFocus && props.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur && props.onBlur(e);
    },
    style: {
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
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/terminal/TerminalPanel.jsx
try { (() => {
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

function TerminalPanel({
  title = "~/dhanush — stack",
  lines = [],
  cursor = true,
  animate = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderRadius: "var(--radius-xl)",
      border: "1px solid hsl(var(--border))",
      background: "hsl(var(--card) / 0.8)",
      boxShadow: "var(--shadow-xl)",
      backdropFilter: "blur(6px)",
      fontFamily: "var(--font-mono)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "11px 16px",
      borderBottom: "1px solid hsl(var(--border))"
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "hsl(var(--muted-foreground) / 0.25)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontSize: "var(--text-xs)",
      color: "hsl(var(--muted-foreground))"
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      fontSize: "var(--text-sm)",
      lineHeight: 1.85
    }
  }, lines.map((ln, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: animate ? "ds-boot-line" : undefined,
    style: {
      color: ln.dim ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
      animationDelay: animate ? `${0.15 + i * 0.12}s` : undefined
    }
  }, ln.prompt && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "hsl(var(--primary))"
    }
  }, "$ "), ln.text)), cursor && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "hsl(var(--muted-foreground))"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "hsl(var(--primary))"
    }
  }, "$ "), /*#__PURE__*/React.createElement("span", {
    className: "ds-cursor-blink",
    style: {
      display: "inline-block",
      width: 8,
      height: 15,
      background: "hsl(var(--primary))",
      transform: "translateY(2px)"
    }
  }))));
}
Object.assign(__ds_scope, { TerminalPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/terminal/TerminalPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Content.jsx
try { (() => {
// Portfolio UI kit — Skills + Projects. Mirrors the live page.js layout: a
// max-w-3xl column with a skills cloud (ember-tint pills) and project cards.
// Content uses the real skills list; project copy is kept concrete but free of
// invented metrics, per the brand's "honest content" principle.

const {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} = window.DhanushChandraDesignSystem_2b4e61;
const SKILLS = ["Python", "SQL", "Apache Spark", "Airflow / orchestration", "Data modeling & warehousing", "ETL / ELT pipeline design", "Cloud (AWS / GCP / Azure)", "Data quality & observability"];
const PROJECTS = [{
  name: "Real-time ingestion pipeline",
  description: "A streaming pipeline that ingests events continuously and lands them analytics-ready, cutting data latency from hours to minutes.",
  stack: ["Kafka", "Spark", "Python"]
}, {
  name: "Analytics data warehouse",
  description: "A dimensional model and ELT pipelines feeding the dashboards stakeholders rely on, with tests guarding data quality at each layer.",
  stack: ["SQL", "Airflow", "dbt"]
}];
function Content() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 768,
      margin: "0 auto",
      padding: "80px 24px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-semibold)",
      color: "hsl(var(--foreground))",
      letterSpacing: "var(--tracking-tight)",
      margin: 0
    }
  }, "Skills"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, SKILLS.map(s => /*#__PURE__*/React.createElement(Badge, {
    key: s,
    variant: "skill"
  }, s))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-semibold)",
      color: "hsl(var(--foreground))",
      letterSpacing: "var(--tracking-tight)",
      margin: "48px 0 0"
    }
  }, "Projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "grid",
      gap: 16
    }
  }, PROJECTS.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    interactive: true
  }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, p.name)), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      lineHeight: "var(--leading-relaxed)"
    }
  }, p.description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, p.stack.map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    variant: "tag"
  }, t))))))));
}
window.Content = Content;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Content.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Hero.jsx
try { (() => {
// Portfolio UI kit — Hero. Faithful recreation of the live portfolio hero:
// status eyebrow, wiped headline with ember span, lead copy, two CTAs, and the
// signature TerminalPanel as the right-hand "imagery". The live site renders a
// WebGL CRT shader behind this; here we use the brand's authentic layered
// backdrop (glow → blueprint grid → grain → vignette) as a static stand-in.

const {
  Button,
  TerminalPanel
} = window.DhanushChandraDesignSystem_2b4e61;
function Hero({
  onAskAI
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderBottom: "1px solid hsl(var(--border))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-glow",
    style: {
      position: "absolute",
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-grid",
    style: {
      position: "absolute",
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-grain",
    style: {
      position: "absolute",
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ds-vignette",
    style: {
      position: "absolute",
      inset: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: 1024,
      margin: "0 auto",
      padding: "96px 24px",
      display: "grid",
      gridTemplateColumns: "1.15fr 0.85fr",
      gap: 64,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ds-animate-rise",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)",
      color: "hsl(var(--muted-foreground))",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: 8,
      height: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background: "hsl(var(--primary) / 0.7)",
      animation: "ds-ping 1.4s var(--ease-out-quint) infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "hsl(var(--primary))"
    }
  })), "Data Engineer \xB7 India \xB7 open to work"), /*#__PURE__*/React.createElement("h1", {
    className: "ds-animate-wipe",
    style: {
      marginTop: 24,
      fontFamily: "var(--font-sans)",
      fontSize: "3.5rem",
      fontWeight: "var(--weight-extrabold)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tighter)",
      color: "hsl(var(--foreground))",
      textWrap: "balance"
    }
  }, "Reliable data pipelines, from messy source to", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "hsl(var(--primary))"
    }
  }, "trusted dataset"), "."), /*#__PURE__*/React.createElement("p", {
    className: "ds-animate-rise",
    style: {
      marginTop: 24,
      maxWidth: "36rem",
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-relaxed)",
      color: "hsl(var(--muted-foreground))",
      textWrap: "pretty"
    }
  }, "I'm Dhanush Chandra, a Data Engineer who turns raw, messy data into datasets teams can actually trust. Strong in Python and SQL, comfortable across batch and streaming, and obsessed with data quality and observability."), /*#__PURE__*/React.createElement("div", {
    className: "ds-animate-rise",
    style: {
      marginTop: 36,
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, "Get in touch"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    onClick: onAskAI
  }, "Ask my AI \u2197")), /*#__PURE__*/React.createElement("p", {
    className: "ds-animate-rise",
    style: {
      marginTop: 16,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      color: "hsl(var(--muted-foreground))"
    }
  }, "try asking it \u201Cwhy should we hire Dhanush?\u201D")), /*#__PURE__*/React.createElement("div", {
    className: "ds-animate-rise",
    style: {
      animationDelay: "0.18s"
    }
  }, /*#__PURE__*/React.createElement(TerminalPanel, {
    lines: [{
      prompt: true,
      dim: true,
      text: "whoami"
    }, {
      text: "Data Engineer · India"
    }, {
      prompt: true,
      dim: true,
      text: "cat core-stack.txt"
    }, {
      text: "› Python   › SQL"
    }, {
      text: "› Spark    › Airflow"
    }, {
      prompt: true,
      dim: true,
      text: "status"
    }, {
      text: "● pipelines: green · data quality: enforced"
    }]
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_aero/apps.jsx
try { (() => {
// DhanushOS — app window contents (About, Skills, Experience, Writing, Resume, Contact).
(function () {
  const {
    useState
  } = React;
  const I = window.Icons;
  const D = window.DATA;
  function About() {
    const p = D.profile;
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "About"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/about \u2014 whoami, the long version"), D.about.map((para, i) => /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        marginTop: i ? 14 : 0
      }
    }, para)), /*#__PURE__*/React.createElement("h2", null, "At a glance"), /*#__PURE__*/React.createElement("div", {
      className: "skill-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, /*#__PURE__*/React.createElement(I.MapPin, {
      size: 13
    }), " ", p.location), /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, /*#__PURE__*/React.createElement(I.Database, {
      size: 13
    }), " ", p.role), /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, /*#__PURE__*/React.createElement(I.Activity, {
      size: 13
    }), " open to work")));
  }
  function Skills() {
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Skills"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/stack \u2014 the tools I reach for"), D.skills.map(g => /*#__PURE__*/React.createElement("div", {
      className: "skill-group",
      key: g.group
    }, /*#__PURE__*/React.createElement("div", {
      className: "gname"
    }, g.group), /*#__PURE__*/React.createElement("div", {
      className: "skill-row"
    }, g.items.map(s => /*#__PURE__*/React.createElement("span", {
      className: "chip tag",
      key: s
    }, s))))));
  }
  function Experience() {
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Experience"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/history \u2014 where I've shipped pipelines"), /*#__PURE__*/React.createElement("div", {
      className: "timeline"
    }, D.experience.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "tl-item",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "tl-period"
    }, e.period), /*#__PURE__*/React.createElement("div", {
      className: "tl-role"
    }, e.role), /*#__PURE__*/React.createElement("div", {
      className: "tl-org"
    }, e.org), /*#__PURE__*/React.createElement("div", {
      className: "tl-notes"
    }, e.notes)))));
  }
  function Writing() {
    const [active, setActive] = useState(null);
    const post = D.writing.find(p => p.id === active);
    if (post) {
      return /*#__PURE__*/React.createElement("div", {
        className: "app"
      }, /*#__PURE__*/React.createElement("div", {
        className: "post-back",
        onClick: () => setActive(null)
      }, /*#__PURE__*/React.createElement(I.ChevronLeft, {
        size: 14
      }), " all posts"), /*#__PURE__*/React.createElement("h1", null, post.title), /*#__PURE__*/React.createElement("p", {
        className: "sub"
      }, post.date, " \xB7 ", post.read, " read"), post.body.map((para, i) => /*#__PURE__*/React.createElement("p", {
        key: i,
        style: {
          marginTop: i ? 14 : 0
        }
      }, para)));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Writing"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/notes \u2014 thinking out loud about data"), D.writing.map(p => /*#__PURE__*/React.createElement("div", {
      className: "post",
      key: p.id,
      onClick: () => setActive(p.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "post-title"
    }, p.title), /*#__PURE__*/React.createElement("div", {
      className: "post-meta"
    }, p.date, " \xB7 ", p.read, " read"), /*#__PURE__*/React.createElement("div", {
      className: "post-excerpt"
    }, p.excerpt))));
  }
  function Resume() {
    const p = D.profile;
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "R\xE9sum\xE9"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/cv \u2014 the one-pager"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => alert("Placeholder — wire this to your real PDF.")
    }, /*#__PURE__*/React.createElement(I.FileDown, {
      size: 16
    }), " Download PDF"), /*#__PURE__*/React.createElement("a", {
      className: "btn ghost",
      href: "https://" + p.github,
      target: "_blank",
      rel: "noreferrer"
    }, /*#__PURE__*/React.createElement(I.Github, {
      size: 16
    }), " GitHub")), /*#__PURE__*/React.createElement("h2", null, "Summary"), /*#__PURE__*/React.createElement("p", null, "Data Engineer focused on reliable, observable pipelines \u2014 batch and streaming. I turn messy source data into datasets teams trust, with quality enforced as a contract."), /*#__PURE__*/React.createElement("h2", null, "Core stack"), /*#__PURE__*/React.createElement("div", {
      className: "skill-row"
    }, ["Python", "SQL", "Spark", "Airflow", "Kafka", "dbt", "Snowflake", "AWS"].map(s => /*#__PURE__*/React.createElement("span", {
      className: "chip tag",
      key: s
    }, s))), /*#__PURE__*/React.createElement("h2", null, "Selected work"), D.projects.slice(0, 3).map(pr => /*#__PURE__*/React.createElement("p", {
      key: pr.id,
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "hsl(var(--foreground))"
      }
    }, pr.name), " \u2014 ", pr.blurb)));
  }
  function Contact() {
    const [sent, setSent] = useState(false);
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Contact"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/connect \u2014 let's talk data"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 10,
        marginBottom: 22
      }
    }, D.contactLinks.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.label,
      href: l.href,
      target: "_blank",
      rel: "noreferrer",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius-md)",
        color: "hsl(var(--foreground))"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ember)",
        display: "inline-flex"
      }
    }, l.label === "Email" ? /*#__PURE__*/React.createElement(I.Mail, {
      size: 18
    }) : l.label === "GitHub" ? /*#__PURE__*/React.createElement(I.Github, {
      size: 18
    }) : /*#__PURE__*/React.createElement(I.Linkedin, {
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13
      }
    }, l.value), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        color: "hsl(var(--muted-foreground))"
      }
    }, /*#__PURE__*/React.createElement(I.ArrowRight, {
      size: 15
    }))))), /*#__PURE__*/React.createElement("h2", null, "Send a message"), sent ? /*#__PURE__*/React.createElement("p", {
      style: {
        color: "hsl(var(--success))"
      }
    }, "Thanks \u2014 this is a placeholder form. Wire it to your inbox and it's live.") : /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: "grid",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("input", {
      placeholder: "your email",
      required: true,
      style: inp
    }), /*#__PURE__*/React.createElement("textarea", {
      placeholder: "what are you building?",
      rows: 3,
      required: true,
      style: {
        ...inp,
        resize: "vertical",
        fontFamily: "var(--font-sans)"
      }
    }), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      type: "submit",
      style: {
        justifySelf: "start"
      }
    }, /*#__PURE__*/React.createElement(I.Send, {
      size: 15
    }), " Send")));
  }
  const inp = {
    height: 38,
    background: "transparent",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--input))",
    borderRadius: "var(--radius-md)",
    padding: "9px 12px",
    fontSize: 13,
    fontFamily: "var(--font-mono)",
    outline: "none"
  };
  window.Apps = {
    About,
    Skills,
    Experience,
    Writing,
    Resume,
    Contact
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_aero/apps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_aero/data.js
try { (() => {
// ============================================================
//  DhanushOS — placeholder content. Swap these strings for real
//  material later; no invented metrics are presented as fact.
// ============================================================
window.DATA = {
  profile: {
    name: "Dhanush Chandra",
    handle: "dhanush",
    role: "Data Engineer",
    location: "India",
    email: "dhanushchandra.raju@outlook.com",
    github: "github.com/DhanushAnegondi",
    linkedin: "linkedin.com/in/dhanush",
    tagline: "Reliable data pipelines, from messy source to trusted dataset."
  },
  about: ["Hi — I'm Dhanush. I build the unglamorous plumbing that lets teams trust their data.", "My happy place is the messy middle: a flaky source feed, a schema that drifts overnight, a dashboard that quietly went wrong three weeks ago. I like turning that chaos into pipelines that are observable, tested, and boring in the best way.", "I think a lot about data quality and developer experience — the difference between a pipeline that runs and one a team actually believes. Outside work I read about distributed systems, tinker with side projects, and occasionally lose an evening to a good CRT-terminal rabbit hole."],
  skills: [{
    group: "Languages",
    items: ["Python", "SQL", "Scala", "Bash"]
  }, {
    group: "Processing",
    items: ["Apache Spark", "Apache Flink", "dbt", "pandas"]
  }, {
    group: "Orchestration",
    items: ["Airflow", "Dagster", "Prefect"]
  }, {
    group: "Streaming",
    items: ["Kafka", "Kinesis", "Debezium / CDC"]
  }, {
    group: "Storage & Warehouse",
    items: ["Snowflake", "BigQuery", "Redshift", "Delta Lake", "Postgres"]
  }, {
    group: "Cloud & Infra",
    items: ["AWS", "GCP", "Azure", "Docker", "Terraform"]
  }, {
    group: "Quality & Observability",
    items: ["Great Expectations", "dbt tests", "OpenTelemetry", "Grafana"]
  }],
  // Each project's `pipeline` drives the animated data-flow diagram.
  projects: [{
    id: "rt-ingest",
    name: "Real-time ingestion pipeline",
    tags: ["Kafka", "Spark", "Python"],
    blurb: "Streaming CDC pipeline landing events analytics-ready in minutes, not hours.",
    problem: "Nightly batch loads meant dashboards were always a day stale and backfills were painful. Stakeholders wanted near-real-time without a brittle, hand-rolled mess.",
    approach: "Captured row-level changes off the operational DB with CDC, streamed them through Kafka, and used structured streaming to dedupe, conform, and upsert into the warehouse. Idempotent writes and a replayable log made backfills a non-event.",
    outcome: "Latency dropped from overnight to a few minutes; backfills became a single replay command instead of a weekend.",
    pipeline: ["Postgres", "Debezium CDC", "Kafka", "Spark Streaming", "Delta Lake", "Dashboards"]
  }, {
    id: "warehouse",
    name: "Analytics data warehouse",
    tags: ["SQL", "dbt", "Airflow"],
    blurb: "A dimensional model + tested ELT that stakeholders actually trust.",
    problem: "Every team had its own definition of 'active user'. Numbers never matched across reports and nobody trusted the dashboards.",
    approach: "Designed a star schema with conformed dimensions, rebuilt transformations in dbt with tests and documentation, and orchestrated incremental runs in Airflow with freshness checks and alerting.",
    outcome: "One source of truth with tested metrics; data quality moved from 'hope' to enforced contracts.",
    pipeline: ["Sources", "Airbyte", "Snowflake (raw)", "dbt", "Marts", "BI"]
  }, {
    id: "quality",
    name: "Data quality & observability platform",
    tags: ["Great Expectations", "OpenTelemetry", "Grafana"],
    blurb: "Catch bad data before the dashboard does.",
    problem: "Silent data incidents — a dropped partition, a null spike — surfaced days later via an angry Slack message.",
    approach: "Wrapped critical tables with expectation suites, emitted freshness, volume, and schema metrics as OpenTelemetry signals, and built Grafana dashboards plus paging on anomalies.",
    outcome: "Mean time-to-detect for data incidents dropped sharply; most issues now caught upstream of consumers.",
    pipeline: ["Pipelines", "Expectations", "OTel metrics", "Grafana", "Alerting"]
  }, {
    id: "lakehouse",
    name: "Batch → lakehouse migration",
    tags: ["Spark", "Delta Lake", "Terraform"],
    blurb: "Lifted a tangle of cron jobs into a governed lakehouse.",
    problem: "A decade of cron-driven scripts wrote CSVs nobody could lineage. Storage costs and confusion grew every quarter.",
    approach: "Modeled bronze/silver/gold layers on Delta Lake, ported jobs to Spark with schema enforcement, and codified the whole platform in Terraform for reproducible environments.",
    outcome: "Queryable, governed, lineage-aware data with reproducible infra and lower storage spend.",
    pipeline: ["Cron / CSV", "Spark", "Bronze", "Silver", "Gold", "Query engine"]
  }],
  experience: [{
    period: "2023 — now",
    role: "Data Engineer",
    org: "Placeholder Co.",
    notes: "Own streaming + batch pipelines end-to-end; introduced data-quality contracts and observability."
  }, {
    period: "2021 — 2023",
    role: "Data Engineer",
    org: "Placeholder Labs",
    notes: "Built the analytics warehouse and dbt modeling layer powering company dashboards."
  }, {
    period: "2020 — 2021",
    role: "Data Analyst → Engineer",
    org: "Placeholder Inc.",
    notes: "Started in analytics, automated the reporting stack, fell for pipelines."
  }],
  writing: [{
    id: "trust",
    title: "What makes a pipeline trustworthy",
    date: "Mar 2025",
    read: "6 min",
    excerpt: "A pipeline that runs and a pipeline a team believes are two different things. Here's the gap, and how tests, contracts, and observability close it.",
    body: ["Reliability isn't a feature you add at the end — it's a property of how you model the whole flow.", "I break trust into three layers: freshness (is it current?), correctness (does it mean what we think?), and lineage (can we explain it?). Each needs its own signals.", "The teams with the most-trusted data aren't the ones with the fanciest stack. They're the ones who made data quality a contract, not a hope."]
  }, {
    id: "cdc",
    title: "CDC without the foot-guns",
    date: "Jan 2025",
    read: "8 min",
    excerpt: "Change-data-capture is the cleanest way to stream a database — and a great way to create silent duplicates if you're not careful.",
    body: ["CDC feels like magic until your first replay creates duplicate rows in production.", "The fix is boring and essential: idempotent, upsert-based writes keyed on the primary key plus an ordering column.", "Treat the log as the source of truth and your sink as a materialized projection of it. Backfills stop being scary."]
  }, {
    id: "dx",
    title: "Developer experience for data teams",
    date: "Nov 2024",
    read: "5 min",
    excerpt: "If shipping a pipeline change takes a day and a prayer, people stop improving them. DX is a data-quality issue.",
    body: ["Slow, scary deploys are why pipelines rot.", "Local dev parity, fast tests, and good error messages do more for data quality than any dashboard.", "Make the right thing the easy thing and quality follows."]
  }],
  contactLinks: [{
    label: "Email",
    value: "dhanushchandra.raju@outlook.com",
    href: "mailto:dhanushchandra.raju@outlook.com"
  }, {
    label: "GitHub",
    value: "DhanushAnegondi",
    href: "https://github.com/DhanushAnegondi"
  }, {
    label: "LinkedIn",
    value: "in/dhanush",
    href: "#"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_aero/data.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_aero/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// DhanushOS — icon set. Lucide-style (1.5px stroke, round caps), matching the
// real portfolio's lucide-react iconography. Self-contained inline SVG so it
// never depends on a CDN load racing React.
(function () {
  function Icon({
    d,
    paths,
    size = 20,
    fill = false,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: fill ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: style
    }, rest), paths ? paths : /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const P = d => props => /*#__PURE__*/React.createElement(Icon, _extends({
    d: d
  }, props));
  const M = els => props => /*#__PURE__*/React.createElement(Icon, _extends({
    paths: els
  }, props));
  window.Icons = {
    Terminal: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polyline", {
      points: "4 17 10 11 4 5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "19",
      x2: "20",
      y2: "19"
    }))),
    User: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    }))),
    Folder: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
    }))),
    Layers: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m22 12.18-9.17 4.16a2 2 0 0 1-1.66 0L2 12.18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m22 17.18-9.17 4.16a2 2 0 0 1-1.66 0L2 17.18"
    }))),
    History: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 3v5h5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l4 2"
    }))),
    Pen: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 20h9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
    }))),
    FileDown: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2v6h6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 12v6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m9 15 3 3 3-3"
    }))),
    Mail: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      width: "20",
      height: "16",
      x: "2",
      y: "4",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
    }))),
    Database: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("ellipse", {
      cx: "12",
      cy: "5",
      rx: "9",
      ry: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 5v14a9 3 0 0 0 18 0V5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 12a9 3 0 0 0 18 0"
    }))),
    GitBranch: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "3",
      x2: "6",
      y2: "15"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "6",
      r: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "18",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 9a9 9 0 0 1-9 9"
    }))),
    Activity: P("M22 12h-4l-3 9L9 3l-3 9H2"),
    Zap: P("M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"),
    Cloud: P("M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"),
    Wind: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12.8 19.6A2 2 0 1 0 14 16H2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17.5 8a2.5 2.5 0 1 1 2 4H2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.8 4.4A2 2 0 1 1 11 8H2"
    }))),
    ArrowRight: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 5 19 12 12 19"
    }))),
    ChevronRight: P("m9 18 6-6-6-6"),
    ChevronLeft: P("m15 18-6-6 6-6"),
    Sparkles: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-2.06L8 4l1.94 5.94L16 12Z",
      transform: "translate(2 0)"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 5v4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 7h4"
    }))),
    Sun: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
    }))),
    Moon: P("M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"),
    Send: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M22 2 11 13"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 2 15 22l-4-9-9-4Z"
    }))),
    Github: P("M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"),
    Linkedin: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
    }), /*#__PURE__*/React.createElement("rect", {
      width: "4",
      height: "12",
      x: "2",
      y: "9"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "4",
      cy: "4",
      r: "2"
    }))),
    MapPin: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    }))),
    Power: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 2v10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.36 6.64a9 9 0 1 1-12.73 0"
    }))),
    Box: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m3.3 7 8.7 5 8.7-5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 22V12"
    }))),
    BarChart: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "20",
      x2: "12",
      y2: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "20",
      x2: "18",
      y2: "4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "20",
      x2: "6",
      y2: "16"
    }))),
    Code: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polyline", {
      points: "16 18 22 12 16 6"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "8 6 2 12 8 18"
    }))),
    Minus: P("M5 12h14"),
    Square: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "4",
      width: "16",
      height: "16",
      rx: "1.5"
    }))),
    X: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M18 6 6 18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m6 6 12 12"
    }))),
    FileText: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2v6h6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "13",
      x2: "15",
      y2: "13"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "17",
      x2: "13",
      y2: "17"
    }))),
    FolderPlus: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "11",
      x2: "12",
      y2: "17"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "14",
      x2: "15",
      y2: "14"
    })))
  };

  // ---- Windows-7-style glossy "Aero" object icons ----------------------------
  // Each app icon is rendered as a dimensional, saturated gel badge (top sheen +
  // inner bevel + soft contact shadow) — the Win7 icon language, recreated.
  window.IconColors = {
    Folder: ["#f8d05a", "#e3a226", "#b9781a"],
    // manila-yellow folder
    User: ["#69b0ec", "#2f74c6", "#1f5599"],
    // user account blue
    Layers: ["#57ccb9", "#1f9b88", "#147567"],
    // skills teal
    History: ["#a48fe8", "#6a4fc2", "#4d3897"],
    // experience violet
    Pen: ["#86d176", "#3f9c3a", "#2b7a2b"],
    // writing green
    FileDown: ["#f6976d", "#d6512f", "#b23b20"],
    // résumé / PDF red-orange
    Terminal: ["#6e8090", "#33424f", "#1b242c"],
    // console graphite
    Mail: ["#5ebef1", "#2a85ca", "#1b639f"],
    // contact azure
    FileText: ["#ffffff", "#eef3f8", "#ccd6e2"] // text document — white page
  };
  // icons that want a dark glyph on a light badge (paper-style)
  const GLYPH_DARK = {
    FileText: "#5b6b7b"
  };
  const AERO_FALLBACK = ["#84b6ea", "#2f74c6", "#1f5599"];
  window.AeroIcon = function AeroIcon({
    name,
    size = 46,
    glyph = 23,
    className = ""
  }) {
    const G = window.Icons[name] || window.Icons.Box;
    const c = window.IconColors[name] || AERO_FALLBACK;
    const gc = GLYPH_DARK[name];
    return /*#__PURE__*/React.createElement("span", {
      className: "aero-ic " + className,
      style: {
        width: size,
        height: size,
        "--c1": c[0],
        "--c2": c[1],
        "--c3": c[2]
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "aero-ic-face",
      style: gc ? {
        color: gc
      } : undefined
    }, /*#__PURE__*/React.createElement(G, {
      size: glyph
    })));
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_aero/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_aero/projects.jsx
try { (() => {
// DhanushOS — Projects app + animated data-flow pipeline diagram.
(function () {
  const {
    useState
  } = React;
  const I = window.Icons;
  const D = window.DATA;

  // Map a pipeline stage name to a fitting icon.
  function stageIcon(name) {
    const n = name.toLowerCase();
    if (/postgres|warehouse|snowflake|redshift|bigquery|lake|delta|raw|bronze|silver|gold|storage|db/.test(n)) return I.Database;
    if (/kafka|stream|kinesis|cdc|debezium/.test(n)) return I.Wind;
    if (/spark|flink|dbt|transform|expectation|airbyte|process/.test(n)) return I.Zap;
    if (/dashboard|bi|grafana|report|query|alert/.test(n)) return I.BarChart;
    if (/otel|metric|observ/.test(n)) return I.Activity;
    if (/cron|csv|source|pipeline/.test(n)) return I.Box;
    return I.GitBranch;
  }
  function PipelineDiagram({
    stages
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pipeline",
      role: "img",
      "aria-label": "Data flow: " + stages.join(" to ")
    }, stages.map((s, i) => {
      const Glyph = stageIcon(s);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "pl-node"
      }, /*#__PURE__*/React.createElement("div", {
        className: "box"
      }, /*#__PURE__*/React.createElement("span", {
        className: "nio"
      }, /*#__PURE__*/React.createElement(Glyph, {
        size: 16
      })), s)), i < stages.length - 1 && /*#__PURE__*/React.createElement("div", {
        className: "pl-edge"
      }, /*#__PURE__*/React.createElement("span", {
        className: "flow",
        style: {
          animationDelay: i * 0.32 + "s"
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "flow",
        style: {
          animationDelay: i * 0.32 + 1.1 + "s"
        }
      })));
    }));
  }
  function Projects() {
    const [open, setOpen] = useState(D.projects[0].id);
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Projects"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/projects \u2014 click a pipeline to expand the build"), /*#__PURE__*/React.createElement("div", {
      className: "proj-list"
    }, D.projects.map(p => {
      const isOpen = open === p.id;
      return /*#__PURE__*/React.createElement("div", {
        className: "proj-card" + (isOpen ? " open" : ""),
        key: p.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "proj-head",
        onClick: () => setOpen(isOpen ? null : p.id)
      }, /*#__PURE__*/React.createElement("div", {
        className: "meta"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ptitle"
      }, p.name), /*#__PURE__*/React.createElement("div", {
        className: "pblurb"
      }, p.blurb), /*#__PURE__*/React.createElement("div", {
        className: "proj-tags"
      }, p.tags.map(t => /*#__PURE__*/React.createElement("span", {
        className: "chip tag",
        key: t
      }, t)))), /*#__PURE__*/React.createElement("span", {
        className: "caret"
      }, /*#__PURE__*/React.createElement(I.ChevronRight, {
        size: 18
      }))), /*#__PURE__*/React.createElement("div", {
        className: "proj-detail"
      }, /*#__PURE__*/React.createElement("div", {
        className: "inner"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pad"
      }, /*#__PURE__*/React.createElement(PipelineDiagram, {
        stages: p.pipeline
      }), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Problem"), /*#__PURE__*/React.createElement("dd", null, p.problem)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Approach"), /*#__PURE__*/React.createElement("dd", null, p.approach)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Outcome"), /*#__PURE__*/React.createElement("dd", null, p.outcome)))))));
    })));
  }
  window.Apps = Object.assign(window.Apps || {}, {
    Projects,
    PipelineDiagram
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_aero/projects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_aero/shell.jsx
try { (() => {
// DhanushOS Aero — shell: boot, taskbar + Start orb, Start menu, glass windows.
(function () {
  const {
    useState,
    useEffect,
    useRef,
    useCallback
  } = React;
  const I = window.Icons;
  const D = window.DATA;

  // ---------- CRT bootloader / shutdown sequences ----------
  // line: { t: text, c: class (head|dim|ok|warn|err), d: ms before NEXT line }
  const BOOT_LINES = [{
    t: "DhanushOS Aero — Bootloader v7.4",
    c: "head",
    d: 240
  }, {
    t: "(c) Dhanush Chandra · Data Platform Division",
    c: "dim",
    d: 420
  }, {
    t: "",
    d: 90
  }, {
    t: "Beginning Boot Sequence...",
    d: 160
  }, {
    t: "Connecting to DHOS01/13:2000...",
    d: 520
  }, {
    t: "",
    d: 90
  }, {
    t: "Established connection to DHOS01/13:2000, mounting volumes.",
    d: 460
  }, {
    t: "",
    d: 90
  }, {
    t: "Mounting  /dev/pipelines  ............... [ OK ]",
    c: "ok",
    d: 150
  }, {
    t: "Mounting  /dev/warehouse  .............. [ OK ]",
    c: "ok",
    d: 150
  }, {
    t: "Loading   user profile: dhanush  ....... [ OK ]",
    c: "ok",
    d: 260
  }, {
    t: "",
    d: 90
  }, {
    t: "Starting services:",
    d: 130
  }, {
    t: "  > airflow-scheduler  ................. [ OK ]",
    c: "ok",
    d: 150
  }, {
    t: "  > dbt-runtime  ....................... [ OK ]",
    c: "ok",
    d: 150
  }, {
    t: "  > spark-session  ..................... [ OK ]",
    c: "ok",
    d: 150
  }, {
    t: "  > metrics-layer  ..................... [ OK ]",
    c: "ok",
    d: 300
  }, {
    t: "",
    d: 90
  }, {
    t: "[14:58:35 START] ........................ [ Handoff Complete ]",
    c: "ok",
    d: 460
  }, {
    t: "",
    d: 120
  }, {
    t: "Welcome back, Dhanush.",
    c: "head",
    d: 360
  }, {
    t: "Launching DhanushOS Aero desktop...",
    c: "dim",
    d: 700
  }];
  const SHUTDOWN_LINES = [{
    t: "Beginning Pre-Shutdown Sequence...",
    d: 200
  }, {
    t: "Connecting to DHOS01/13:2000...",
    d: 560
  }, {
    t: "",
    d: 110
  }, {
    t: "Established connection to DHOS01/13:2000, attempting state transfer.",
    d: 520
  }, {
    t: "",
    d: 130
  }, {
    t: "Analyzing session... Done.",
    d: 230
  }, {
    t: "Packing transfer... Done.",
    d: 230
  }, {
    t: "Beginning transfer...",
    d: 200
  }, {
    t: "[14:58:35 START] ........................ [ Transfer Complete ]",
    c: "ok",
    d: 480
  }, {
    t: "",
    d: 130
  }, {
    t: "(DHOS01/13:200:60099) Flushing write-ahead log... committed.   [14:58:35:01]",
    c: "dim",
    d: 220
  }, {
    t: "(DHOS01/13:200:60099) Closing 4 active sockets...              [14:58:35:03]",
    c: "dim",
    d: 220
  }, {
    t: "(DHOS01/13:200:60099) Persisting workspace layout...           [14:58:35:06]",
    c: "dim",
    d: 300
  }, {
    t: "",
    d: 100
  }, {
    t: "Stopping services:",
    d: 130
  }, {
    t: "  metrics-layer  ....................... [ stopped ]",
    c: "warn",
    d: 150
  }, {
    t: "  spark-session  ....................... [ stopped ]",
    c: "warn",
    d: 150
  }, {
    t: "  dbt-runtime  ......................... [ stopped ]",
    c: "warn",
    d: 150
  }, {
    t: "  airflow-scheduler  ................... [ stopped ]",
    c: "warn",
    d: 320
  }, {
    t: "",
    d: 120
  }, {
    t: "Session saved. It is now safe to power off.",
    c: "head",
    d: 420
  }, {
    t: "Powering down DhanushOS...",
    c: "dim",
    d: 850
  }];
  function CrtTerminal({
    mode,
    onDone
  }) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = mode === "boot" ? BOOT_LINES : SHUTDOWN_LINES;
    const [n, setN] = useState(0);
    const [phase, setPhase] = useState("stream"); // stream → (shutdown) blank → done
    const logRef = useRef(null);

    // stream lines one at a time
    useEffect(() => {
      if (phase !== "stream") return;
      if (n >= lines.length) {
        const hold = reduce ? 100 : mode === "boot" ? 650 : 750;
        const id = setTimeout(() => {
          if (mode === "boot") onDone();else setPhase("blank");
        }, hold);
        return () => clearTimeout(id);
      }
      const prev = n > 0 ? lines[n - 1].d ?? 140 : 0;
      const id = setTimeout(() => setN(c => c + 1), reduce ? 0 : n === 0 ? 200 : prev);
      return () => clearTimeout(id);
    }, [n, phase]);

    // powered-off blank phase (shutdown only): blinking cursor for ~5s, then reboot
    useEffect(() => {
      if (phase !== "blank") return;
      const id = setTimeout(() => onDone(), reduce ? 400 : 5000);
      return () => clearTimeout(id);
    }, [phase]);
    useEffect(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [n]);
    function skip() {
      if (phase !== "stream") return;
      if (n < lines.length) setN(lines.length);
    }
    if (phase === "blank") {
      return /*#__PURE__*/React.createElement("div", {
        className: "crt-screen blank"
      }, /*#__PURE__*/React.createElement("div", {
        className: "crt-frame"
      }, /*#__PURE__*/React.createElement("span", {
        className: "blank-cursor"
      })));
    }
    const streaming = n < lines.length;
    return /*#__PURE__*/React.createElement("div", {
      className: "crt-screen",
      onClick: skip,
      title: streaming ? "Click to skip" : ""
    }, /*#__PURE__*/React.createElement("div", {
      className: "crt-frame"
    }, /*#__PURE__*/React.createElement("div", {
      className: "crt-log",
      ref: logRef
    }, lines.slice(0, n).map((l, i) => /*#__PURE__*/React.createElement("div", {
      className: "crt-line " + (l.c || ""),
      key: i
    }, l.t || "\u00a0")), streaming && /*#__PURE__*/React.createElement("span", {
      className: "crt-caret"
    })), /*#__PURE__*/React.createElement("div", {
      className: "crt-leak"
    }), /*#__PURE__*/React.createElement("div", {
      className: "crt-scan"
    }), /*#__PURE__*/React.createElement("div", {
      className: "crt-vign"
    }), /*#__PURE__*/React.createElement("span", {
      className: "crt-mouse"
    })));
  }

  // ---------- Clock ----------
  function Clock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
      const id = setInterval(() => setNow(new Date()), 20000);
      return () => clearInterval(id);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "clock"
    }, /*#__PURE__*/React.createElement("div", {
      className: "t"
    }, now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })), /*#__PURE__*/React.createElement("div", {
      className: "d"
    }, now.toLocaleDateString([], {
      month: "short",
      day: "numeric"
    })));
  }

  // ---------- Start menu ----------
  function StartMenu({
    apps,
    onOpen,
    onClose,
    onShutdown
  }) {
    const ref = useRef(null);
    const inputRef = useRef(null);
    const [q, setQ] = useState("");
    useEffect(() => {
      const h = e => {
        if (ref.current && !ref.current.contains(e.target) && !e.target.closest(".start-orb")) onClose();
      };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, []);
    const places = [{
      label: "Résumé",
      icon: "FileDown",
      id: "resume"
    }, {
      label: "Writing",
      icon: "Pen",
      id: "writing"
    }, {
      label: "Experience",
      icon: "History",
      id: "experience"
    }, {
      label: "Contact",
      icon: "Mail",
      id: "contact"
    }];
    const name = a => a.title.replace(".app", "");
    // live, incremental filter — matches anywhere; prefers prefix matches first.
    const query = q.trim().toLowerCase();
    const results = query ? apps.map(a => ({
      a,
      nm: name(a).toLowerCase()
    })).filter(({
      nm
    }) => nm.includes(query)).sort((x, y) => y.nm.startsWith(query) - x.nm.startsWith(query)).map(({
      a
    }) => a) : null;
    const openFirst = () => {
      if (results && results[0]) {
        onOpen(results[0].id);
        onClose();
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "startmenu",
      ref: ref
    }, /*#__PURE__*/React.createElement("div", {
      className: "sm-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sm-avatar"
    }, "D"), /*#__PURE__*/React.createElement("div", {
      className: "who"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, D.profile.name), /*#__PURE__*/React.createElement("div", {
      className: "r"
    }, D.profile.role))), results ? /*#__PURE__*/React.createElement("div", {
      className: "sm-results"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sm-res-head"
    }, results.length, " ", results.length === 1 ? "result" : "results", " for \u201C", q.trim(), "\u201D"), results.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "sm-res-empty"
    }, "No programs match your search."), results.map(a => /*#__PURE__*/React.createElement("div", {
      className: "sm-item",
      key: a.id,
      onClick: () => {
        onOpen(a.id);
        onClose();
      }
    }, /*#__PURE__*/React.createElement(window.AeroIcon, {
      name: a.icon,
      size: 26,
      glyph: 15
    }), /*#__PURE__*/React.createElement("span", {
      className: "sm-res-meta"
    }, /*#__PURE__*/React.createElement("b", null, name(a)), /*#__PURE__*/React.createElement("i", null, a.title))))) : /*#__PURE__*/React.createElement("div", {
      className: "sm-cols"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sm-left"
    }, apps.filter(a => a.id !== "resume").map(a => /*#__PURE__*/React.createElement("div", {
      className: "sm-item",
      key: a.id,
      onClick: () => {
        onOpen(a.id);
        onClose();
      }
    }, /*#__PURE__*/React.createElement(window.AeroIcon, {
      name: a.icon,
      size: 26,
      glyph: 15
    }), name(a)))), /*#__PURE__*/React.createElement("div", {
      className: "sm-right"
    }, places.map(p => /*#__PURE__*/React.createElement("div", {
      className: "sm-item",
      key: p.label,
      onClick: () => {
        onOpen(p.id);
        onClose();
      }
    }, /*#__PURE__*/React.createElement(window.AeroIcon, {
      name: p.icon,
      size: 24,
      glyph: 14
    }), p.label)), /*#__PURE__*/React.createElement("div", {
      className: "sm-item plain",
      onClick: () => {
        window.location.href = "../portfolio/index.html";
      }
    }, /*#__PURE__*/React.createElement(I.Power, null), "Exit to classic site"))), /*#__PURE__*/React.createElement("div", {
      className: "sm-search"
    }, /*#__PURE__*/React.createElement("input", {
      ref: inputRef,
      value: q,
      autoFocus: true,
      placeholder: "Search programs\u2026",
      onChange: e => setQ(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") openFirst();
        if (e.key === "Escape") {
          if (q) setQ("");else onClose();
        }
      }
    }), /*#__PURE__*/React.createElement("button", {
      className: "sm-power",
      title: "Shut down",
      onClick: () => {
        onClose();
        onShutdown();
      }
    }, /*#__PURE__*/React.createElement(I.Power, null), "Shut down")));
  }

  // ---------- Taskbar ----------
  function Taskbar({
    apps,
    wins,
    onOpen,
    focused,
    startOpen,
    onToggleStart
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "taskbar"
    }, /*#__PURE__*/React.createElement("button", {
      className: "start-orb",
      onClick: onToggleStart,
      title: "Start"
    }, /*#__PURE__*/React.createElement("span", {
      className: "orb-d"
    }, "D")), /*#__PURE__*/React.createElement("span", {
      className: "tdivider"
    }), wins.map(w => {
      return /*#__PURE__*/React.createElement("button", {
        key: w.id,
        className: "task-btn" + (focused === w.id && !w.min ? " active" : ""),
        onClick: () => onOpen(w.id),
        title: w.title
      }, /*#__PURE__*/React.createElement(window.AeroIcon, {
        name: w.icon,
        size: 26,
        glyph: 15
      }), /*#__PURE__*/React.createElement("span", {
        className: "tlabel"
      }, w.title.replace(".app", "")));
    }), /*#__PURE__*/React.createElement("div", {
      className: "tray"
    }, /*#__PURE__*/React.createElement("a", {
      className: "tray-exit",
      href: "../portfolio/index.html",
      title: "Exit to the classic site"
    }, /*#__PURE__*/React.createElement("span", null, "\u25C4"), " Classic site"), /*#__PURE__*/React.createElement(Clock, null)), /*#__PURE__*/React.createElement("div", {
      className: "show-desktop",
      title: "Show desktop"
    }));
  }

  // ---------- Desktop icons (apps + session-only user items) ----------
  function DeskItem({
    item,
    onOpen,
    onRename,
    onContext
  }) {
    const iconName = item.type === "folder" ? "Folder" : "FileText";
    const commit = e => {
      const v = e.target.value.trim();
      onRename(item.id, v || item.name);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "aicon",
      onContextMenu: onContext,
      onDoubleClick: () => !item.renaming && onOpen(),
      onClick: e => e.detail === 0 && !item.renaming && onOpen()
    }, /*#__PURE__*/React.createElement(window.AeroIcon, {
      name: iconName,
      size: 46,
      glyph: 23
    }), item.renaming ? /*#__PURE__*/React.createElement("input", {
      className: "rename-input",
      defaultValue: item.name,
      autoFocus: true,
      onFocus: e => {
        const dot = e.target.value.lastIndexOf(".");
        e.target.setSelectionRange(0, dot > 0 ? dot : e.target.value.length);
      },
      onKeyDown: e => {
        if (e.key === "Enter") commit(e);
        if (e.key === "Escape") onRename(item.id, item.name);
      },
      onBlur: commit
    }) : /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, item.name));
  }
  function DesktopIcons({
    apps,
    items,
    onOpen,
    onOpenItem,
    onRename,
    onContextItem
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "aero-icons"
    }, apps.map(a => /*#__PURE__*/React.createElement("div", {
      className: "aicon",
      key: a.id,
      onDoubleClick: () => onOpen(a.id),
      onClick: e => e.detail === 0 && onOpen(a.id)
    }, /*#__PURE__*/React.createElement(window.AeroIcon, {
      name: a.icon,
      size: 46,
      glyph: 23
    }), /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, a.title))), items.filter(i => i.parent == null).map(it => /*#__PURE__*/React.createElement(DeskItem, {
      key: it.id,
      item: it,
      onOpen: () => onOpenItem(it),
      onRename: onRename,
      onContext: e => onContextItem(e, it)
    })));
  }

  // ---------- Right-click context menu (Win7 flyout) ----------
  function ContextMenu({
    x,
    y,
    items,
    onClose
  }) {
    const ref = useRef(null);
    const [pos, setPos] = useState({
      left: x,
      top: y
    });
    useEffect(() => {
      const h = e => {
        if (ref.current && !ref.current.contains(e.target)) onClose();
      };
      const k = e => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("mousedown", h);
      window.addEventListener("keydown", k);
      return () => {
        document.removeEventListener("mousedown", h);
        window.removeEventListener("keydown", k);
      };
    }, []);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      let left = x,
        top = y;
      if (left + r.width > window.innerWidth - 8) left = window.innerWidth - r.width - 8;
      if (top + r.height > window.innerHeight - 8) top = window.innerHeight - r.height - 8;
      setPos({
        left,
        top
      });
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "ctxmenu",
      ref: ref,
      style: pos
    }, items.map((it, i) => it.sep ? /*#__PURE__*/React.createElement("div", {
      className: "ctx-sep",
      key: i
    }) : /*#__PURE__*/React.createElement("div", {
      className: "ctx-item" + (it.danger ? " danger" : ""),
      key: i,
      onClick: () => {
        it.onClick && it.onClick();
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ctx-ic"
    }, it.icon || null), /*#__PURE__*/React.createElement("span", {
      className: "ctx-label"
    }, it.label))));
  }

  // ---------- Notepad (text document) ----------
  function Notepad({
    item,
    onChange
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "notepad"
    }, /*#__PURE__*/React.createElement("div", {
      className: "np-menubar"
    }, /*#__PURE__*/React.createElement("span", null, "File"), /*#__PURE__*/React.createElement("span", null, "Edit"), /*#__PURE__*/React.createElement("span", null, "Format"), /*#__PURE__*/React.createElement("span", null, "View"), /*#__PURE__*/React.createElement("span", null, "Help")), /*#__PURE__*/React.createElement("textarea", {
      className: "np-area",
      value: item.content,
      spellCheck: false,
      autoFocus: true,
      placeholder: "",
      onChange: e => onChange(item.id, e.target.value)
    }));
  }

  // ---------- Folder window (mini Explorer) ----------
  function FolderView({
    folder,
    items,
    onOpenItem,
    onNewFile,
    onRename,
    onContextItem,
    onContextEmpty
  }) {
    const children = items.filter(i => i.parent === folder.id);
    return /*#__PURE__*/React.createElement("div", {
      className: "explorer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "exp-toolbar"
    }, /*#__PURE__*/React.createElement("button", {
      className: "exp-btn",
      onClick: () => onNewFile(folder.id)
    }, /*#__PURE__*/React.createElement(I.FileText, {
      size: 14
    }), " New Text Document"), /*#__PURE__*/React.createElement("span", {
      className: "exp-count"
    }, children.length, " item", children.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
      className: "exp-grid",
      onContextMenu: e => {
        if (e.target.closest(".aicon")) return;
        onContextEmpty && onContextEmpty(e, folder.id);
      }
    }, children.length === 0 && /*#__PURE__*/React.createElement("div", {
      className: "exp-empty"
    }, "This folder is empty.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Use \u201CNew Text Document\u201D to add a file.")), children.map(it => /*#__PURE__*/React.createElement(DeskItem, {
      key: it.id,
      item: it,
      onOpen: () => onOpenItem(it),
      onRename: onRename,
      onContext: e => onContextItem(e, it)
    }))));
  }

  // ---------- Glass window ----------
  function Window({
    win,
    focused,
    onFocus,
    onClose,
    onMinimize,
    onMove,
    children
  }) {
    const drag = useRef(null);
    const G = I[win.icon];
    const onDown = useCallback(e => {
      if (e.target.closest(".wctl")) return;
      onFocus(win.id);
      drag.current = {
        x0: win.x,
        y0: win.y,
        sx: e.clientX,
        sy: e.clientY
      };
      const move = ev => {
        if (!drag.current) return;
        const nx = drag.current.x0 + (ev.clientX - drag.current.sx);
        const ny = Math.max(0, drag.current.y0 + (ev.clientY - drag.current.sy));
        onMove(win.id, nx, ny);
      };
      const up = () => {
        drag.current = null;
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }, [win.id, win.x, win.y, onFocus, onMove]);
    return /*#__PURE__*/React.createElement("div", {
      className: "awindow" + (focused ? " focused" : "") + (win.anim ? " " + win.anim : ""),
      style: {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z
      },
      onMouseDown: () => onFocus(win.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "atitlebar",
      onMouseDown: onDown
    }, /*#__PURE__*/React.createElement("span", {
      className: "ticn"
    }, /*#__PURE__*/React.createElement(G, {
      size: 15
    })), /*#__PURE__*/React.createElement("span", {
      className: "ttl"
    }, win.title), /*#__PURE__*/React.createElement("div", {
      className: "awin-ctrls"
    }, /*#__PURE__*/React.createElement("button", {
      className: "wctl",
      title: "Minimize",
      onClick: () => onMinimize(win.id)
    }, /*#__PURE__*/React.createElement(I.Minus, {
      size: 13
    })), /*#__PURE__*/React.createElement("button", {
      className: "wctl",
      title: "Maximize"
    }, /*#__PURE__*/React.createElement(I.Square, {
      size: 11
    })), /*#__PURE__*/React.createElement("button", {
      className: "wctl close",
      title: "Close",
      onClick: () => onClose(win.id)
    }, /*#__PURE__*/React.createElement(I.X, {
      size: 13
    })))), /*#__PURE__*/React.createElement("div", {
      className: "awin-body"
    }, children));
  }
  window.AeroOS = {
    CrtTerminal,
    Taskbar,
    StartMenu,
    DesktopIcons,
    Window,
    ContextMenu,
    Notepad,
    FolderView
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_aero/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_aero/terminal.jsx
try { (() => {
// DhanushOS — interactive Terminal app + floating AI assistant.
(function () {
  const {
    useState,
    useRef,
    useEffect
  } = React;
  const I = window.Icons;
  const D = window.DATA;
  const APP_ALIASES = {
    about: "about",
    projects: "projects",
    skills: "skills",
    stack: "skills",
    experience: "experience",
    history: "experience",
    writing: "writing",
    notes: "writing",
    resume: "resume",
    cv: "resume",
    contact: "contact"
  };
  function Terminal({
    onOpen
  }) {
    const [lines, setLines] = useState([{
      html: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "dim"
      }, "Last login on DhanushOS. Type "), /*#__PURE__*/React.createElement("span", {
        className: "p"
      }, "help"), /*#__PURE__*/React.createElement("span", {
        className: "dim"
      }, " to begin."))
    }]);
    const [val, setVal] = useState("");
    const bodyRef = useRef(null);
    const inRef = useRef(null);
    useEffect(() => {
      bodyRef.current && bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
    }, [lines]);
    function push(node) {
      setLines(l => [...l, {
        html: node
      }]);
    }
    function run(raw) {
      const cmd = raw.trim();
      push(/*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "p"
      }, "dhanush@os"), " ", /*#__PURE__*/React.createElement("span", {
        className: "dim"
      }, "~ %"), " ", cmd));
      const [c, ...args] = cmd.toLowerCase().split(/\s+/);
      const arg = args.join(" ");
      if (!c) return;
      switch (c) {
        case "help":
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, "commands: ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "about"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "projects"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "skills"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "experience"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "writing"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "resume"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "contact"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "open"), " <app> \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "ls"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "whoami"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "clear")));
          break;
        case "whoami":
          push(/*#__PURE__*/React.createElement("span", null, D.profile.name, " \u2014 ", D.profile.role, " \xB7 ", D.profile.location));
          break;
        case "ls":
          push(/*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "about  projects  skills  experience  writing  resume  contact"));
          break;
        case "open":
          {
            const target = APP_ALIASES[arg];
            if (target) {
              push(/*#__PURE__*/React.createElement("span", {
                className: "dim"
              }, "opening ", target, ".app\u2026"));
              onOpen(target);
            } else push(/*#__PURE__*/React.createElement("span", {
              className: "dim"
            }, "no such app: ", arg || "(none)", " \u2014 try "));
            break;
          }
        case "skills":
          push(/*#__PURE__*/React.createElement("span", null, D.skills.map(g => g.items.join(", ")).join(" · ")));
          break;
        case "about":
          push(/*#__PURE__*/React.createElement("span", null, D.about[0]));
          onOpen("about");
          break;
        case "projects":
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, D.projects.length, " pipelines shipped \u2014 opening projects.app\u2026"));
          onOpen("projects");
          break;
        case "contact":
          push(/*#__PURE__*/React.createElement("span", null, D.profile.email));
          onOpen("contact");
          break;
        case "sudo":
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, "nice try. data quality is enforced for everyone \uD83D\uDE42"));
          break;
        case "clear":
          setLines([]);
          return;
        case "echo":
          push(/*#__PURE__*/React.createElement("span", null, args.join(" ")));
          break;
        default:
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, "command not found: ", c, ". type ", /*#__PURE__*/React.createElement("span", {
            className: "p"
          }, "help")));
      }
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "term",
      ref: bodyRef,
      onClick: () => inRef.current && inRef.current.focus()
    }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
      className: "line",
      key: i
    }, l.html)), /*#__PURE__*/React.createElement("div", {
      className: "term-input-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "p"
    }, "dhanush@os"), /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "~ %"), /*#__PURE__*/React.createElement("input", {
      ref: inRef,
      className: "term-input",
      value: val,
      autoFocus: true,
      spellCheck: false,
      onChange: e => setVal(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") {
          run(val);
          setVal("");
        }
      }
    })));
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
    const [msgs, setMsgs] = useState([{
      role: "a",
      c: "Hi! I'm Dhanush's assistant. Ask me anything about his work."
    }]);
    const [val, setVal] = useState("");
    const [typing, setTyping] = useState(false);
    const sref = useRef(null);
    useEffect(() => {
      sref.current && sref.current.scrollTo(0, sref.current.scrollHeight);
    }, [msgs, typing, open]);
    function send(text) {
      const c = (text ?? val).trim();
      if (!c || typing) return;
      setMsgs(m => [...m, {
        role: "u",
        c
      }]);
      setVal("");
      setTyping(true);
      setTimeout(() => {
        setMsgs(m => [...m, {
          role: "a",
          c: reply(c)
        }]);
        setTyping(false);
      }, 720);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "assistant-anchor"
    }, open && /*#__PURE__*/React.createElement("div", {
      className: "dos-pop",
      style: panel
    }, /*#__PURE__*/React.createElement("div", {
      style: pHead
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: "hsl(var(--foreground))",
        fontSize: 14
      }
    }, "Ask about Dhanush"), /*#__PURE__*/React.createElement("span", {
      style: aiBadge
    }, "AI"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        cursor: "pointer",
        color: "hsl(var(--muted-foreground))"
      },
      onClick: () => setOpen(false)
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      ref: sref,
      style: pBody
    }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: m.role === "u" ? bubbleU : bubbleA
    }, m.c)), typing && /*#__PURE__*/React.createElement("div", {
      style: {
        ...bubbleA,
        fontStyle: "italic",
        color: "hsl(var(--muted-foreground))"
      }
    }, "typing\u2026"), msgs.length === 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 7,
        marginTop: 2
      }
    }, SUGGESTIONS.map(s => /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => send(s),
      style: sugg
    }, s)))), /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        send();
      },
      style: pForm
    }, /*#__PURE__*/React.createElement("input", {
      value: val,
      onChange: e => setVal(e.target.value),
      placeholder: "Type a question\u2026",
      style: pInput
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: pSend,
      "aria-label": "send"
    }, /*#__PURE__*/React.createElement(I.Send, {
      size: 15
    })))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "ds-lift",
      style: launch
    }, open ? "✕ Close" : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(I.Sparkles, {
      size: 16
    }), " Ask AI")));
  }
  const panel = {
    position: "absolute",
    bottom: 60,
    right: 0,
    width: 340,
    height: 440,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "var(--radius-2xl)",
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--card))",
    boxShadow: "var(--shadow-xl)"
  };
  const pHead = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 14px",
    borderBottom: "1px solid hsl(var(--border))"
  };
  const aiBadge = {
    borderRadius: 99,
    background: "hsl(var(--primary) / 0.12)",
    color: "var(--ember)",
    padding: "3px 8px",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 700
  };
  const pBody = {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    overflowY: "auto",
    padding: 14,
    flex: 1
  };
  const bubbleBase = {
    maxWidth: "86%",
    whiteSpace: "pre-wrap",
    borderRadius: 16,
    padding: "9px 13px",
    fontSize: 13.5,
    lineHeight: 1.55
  };
  const bubbleU = {
    ...bubbleBase,
    alignSelf: "flex-end",
    background: "var(--ember)",
    color: "hsl(var(--primary-foreground))"
  };
  const bubbleA = {
    ...bubbleBase,
    alignSelf: "flex-start",
    background: "hsl(var(--muted))",
    color: "hsl(var(--foreground))"
  };
  const sugg = {
    borderRadius: 99,
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    padding: "6px 11px",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "var(--font-sans)"
  };
  const pForm = {
    display: "flex",
    gap: 8,
    padding: 11,
    borderTop: "1px solid hsl(var(--border))"
  };
  const pInput = {
    flex: 1,
    height: 36,
    background: "transparent",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--input))",
    borderRadius: "var(--radius-md)",
    padding: "0 12px",
    fontSize: 13,
    fontFamily: "var(--font-sans)",
    outline: "none"
  };
  const pSend = {
    height: 36,
    width: 36,
    display: "grid",
    placeItems: "center",
    borderRadius: "var(--radius-md)",
    border: "none",
    background: "var(--ember)",
    color: "hsl(var(--primary-foreground))",
    cursor: "pointer"
  };
  const launch = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 46,
    padding: "0 18px",
    borderRadius: 99,
    border: "none",
    background: "var(--ember)",
    color: "hsl(var(--primary-foreground))",
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: 14,
    boxShadow: "var(--shadow-lg)",
    cursor: "pointer"
  };
  window.Apps = Object.assign(window.Apps || {}, {
    Terminal
  });
  window.Assistant = Assistant;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_aero/terminal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_os/apps.jsx
try { (() => {
// DhanushOS — app window contents (About, Skills, Experience, Writing, Resume, Contact).
(function () {
  const {
    useState
  } = React;
  const I = window.Icons;
  const D = window.DATA;
  function About() {
    const p = D.profile;
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "About"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/about \u2014 whoami, the long version"), D.about.map((para, i) => /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        marginTop: i ? 14 : 0
      }
    }, para)), /*#__PURE__*/React.createElement("h2", null, "At a glance"), /*#__PURE__*/React.createElement("div", {
      className: "skill-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, /*#__PURE__*/React.createElement(I.MapPin, {
      size: 13
    }), " ", p.location), /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, /*#__PURE__*/React.createElement(I.Database, {
      size: 13
    }), " ", p.role), /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, /*#__PURE__*/React.createElement(I.Activity, {
      size: 13
    }), " open to work")));
  }
  function Skills() {
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Skills"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/stack \u2014 the tools I reach for"), D.skills.map(g => /*#__PURE__*/React.createElement("div", {
      className: "skill-group",
      key: g.group
    }, /*#__PURE__*/React.createElement("div", {
      className: "gname"
    }, g.group), /*#__PURE__*/React.createElement("div", {
      className: "skill-row"
    }, g.items.map(s => /*#__PURE__*/React.createElement("span", {
      className: "chip tag",
      key: s
    }, s))))));
  }
  function Experience() {
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Experience"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/history \u2014 where I've shipped pipelines"), /*#__PURE__*/React.createElement("div", {
      className: "timeline"
    }, D.experience.map((e, i) => /*#__PURE__*/React.createElement("div", {
      className: "tl-item",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "tl-period"
    }, e.period), /*#__PURE__*/React.createElement("div", {
      className: "tl-role"
    }, e.role), /*#__PURE__*/React.createElement("div", {
      className: "tl-org"
    }, e.org), /*#__PURE__*/React.createElement("div", {
      className: "tl-notes"
    }, e.notes)))));
  }
  function Writing() {
    const [active, setActive] = useState(null);
    const post = D.writing.find(p => p.id === active);
    if (post) {
      return /*#__PURE__*/React.createElement("div", {
        className: "app"
      }, /*#__PURE__*/React.createElement("div", {
        className: "post-back",
        onClick: () => setActive(null)
      }, /*#__PURE__*/React.createElement(I.ChevronLeft, {
        size: 14
      }), " all posts"), /*#__PURE__*/React.createElement("h1", null, post.title), /*#__PURE__*/React.createElement("p", {
        className: "sub"
      }, post.date, " \xB7 ", post.read, " read"), post.body.map((para, i) => /*#__PURE__*/React.createElement("p", {
        key: i,
        style: {
          marginTop: i ? 14 : 0
        }
      }, para)));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Writing"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/notes \u2014 thinking out loud about data"), D.writing.map(p => /*#__PURE__*/React.createElement("div", {
      className: "post",
      key: p.id,
      onClick: () => setActive(p.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "post-title"
    }, p.title), /*#__PURE__*/React.createElement("div", {
      className: "post-meta"
    }, p.date, " \xB7 ", p.read, " read"), /*#__PURE__*/React.createElement("div", {
      className: "post-excerpt"
    }, p.excerpt))));
  }
  function Resume() {
    const p = D.profile;
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "R\xE9sum\xE9"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/cv \u2014 the one-pager"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => alert("Placeholder — wire this to your real PDF.")
    }, /*#__PURE__*/React.createElement(I.FileDown, {
      size: 16
    }), " Download PDF"), /*#__PURE__*/React.createElement("a", {
      className: "btn ghost",
      href: "https://" + p.github,
      target: "_blank",
      rel: "noreferrer"
    }, /*#__PURE__*/React.createElement(I.Github, {
      size: 16
    }), " GitHub")), /*#__PURE__*/React.createElement("h2", null, "Summary"), /*#__PURE__*/React.createElement("p", null, "Data Engineer focused on reliable, observable pipelines \u2014 batch and streaming. I turn messy source data into datasets teams trust, with quality enforced as a contract."), /*#__PURE__*/React.createElement("h2", null, "Core stack"), /*#__PURE__*/React.createElement("div", {
      className: "skill-row"
    }, ["Python", "SQL", "Spark", "Airflow", "Kafka", "dbt", "Snowflake", "AWS"].map(s => /*#__PURE__*/React.createElement("span", {
      className: "chip tag",
      key: s
    }, s))), /*#__PURE__*/React.createElement("h2", null, "Selected work"), D.projects.slice(0, 3).map(pr => /*#__PURE__*/React.createElement("p", {
      key: pr.id,
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "hsl(var(--foreground))"
      }
    }, pr.name), " \u2014 ", pr.blurb)));
  }
  function Contact() {
    const [sent, setSent] = useState(false);
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Contact"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/connect \u2014 let's talk data"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 10,
        marginBottom: 22
      }
    }, D.contactLinks.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.label,
      href: l.href,
      target: "_blank",
      rel: "noreferrer",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius-md)",
        color: "hsl(var(--foreground))"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ember)",
        display: "inline-flex"
      }
    }, l.label === "Email" ? /*#__PURE__*/React.createElement(I.Mail, {
      size: 18
    }) : l.label === "GitHub" ? /*#__PURE__*/React.createElement(I.Github, {
      size: 18
    }) : /*#__PURE__*/React.createElement(I.Linkedin, {
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13
      }
    }, l.value), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        color: "hsl(var(--muted-foreground))"
      }
    }, /*#__PURE__*/React.createElement(I.ArrowRight, {
      size: 15
    }))))), /*#__PURE__*/React.createElement("h2", null, "Send a message"), sent ? /*#__PURE__*/React.createElement("p", {
      style: {
        color: "hsl(var(--success))"
      }
    }, "Thanks \u2014 this is a placeholder form. Wire it to your inbox and it's live.") : /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: "grid",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("input", {
      placeholder: "your email",
      required: true,
      style: inp
    }), /*#__PURE__*/React.createElement("textarea", {
      placeholder: "what are you building?",
      rows: 3,
      required: true,
      style: {
        ...inp,
        resize: "vertical",
        fontFamily: "var(--font-sans)"
      }
    }), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      type: "submit",
      style: {
        justifySelf: "start"
      }
    }, /*#__PURE__*/React.createElement(I.Send, {
      size: 15
    }), " Send")));
  }
  const inp = {
    height: 38,
    background: "transparent",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--input))",
    borderRadius: "var(--radius-md)",
    padding: "9px 12px",
    fontSize: 13,
    fontFamily: "var(--font-mono)",
    outline: "none"
  };
  window.Apps = {
    About,
    Skills,
    Experience,
    Writing,
    Resume,
    Contact
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_os/apps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_os/data.js
try { (() => {
// ============================================================
//  DhanushOS — placeholder content. Swap these strings for real
//  material later; no invented metrics are presented as fact.
// ============================================================
window.DATA = {
  profile: {
    name: "Dhanush Chandra",
    handle: "dhanush",
    role: "Data Engineer",
    location: "India",
    email: "dhanushchandra.raju@outlook.com",
    github: "github.com/DhanushAnegondi",
    linkedin: "linkedin.com/in/dhanush",
    tagline: "Reliable data pipelines, from messy source to trusted dataset."
  },
  about: ["Hi — I'm Dhanush. I build the unglamorous plumbing that lets teams trust their data.", "My happy place is the messy middle: a flaky source feed, a schema that drifts overnight, a dashboard that quietly went wrong three weeks ago. I like turning that chaos into pipelines that are observable, tested, and boring in the best way.", "I think a lot about data quality and developer experience — the difference between a pipeline that runs and one a team actually believes. Outside work I read about distributed systems, tinker with side projects, and occasionally lose an evening to a good CRT-terminal rabbit hole."],
  skills: [{
    group: "Languages",
    items: ["Python", "SQL", "Scala", "Bash"]
  }, {
    group: "Processing",
    items: ["Apache Spark", "Apache Flink", "dbt", "pandas"]
  }, {
    group: "Orchestration",
    items: ["Airflow", "Dagster", "Prefect"]
  }, {
    group: "Streaming",
    items: ["Kafka", "Kinesis", "Debezium / CDC"]
  }, {
    group: "Storage & Warehouse",
    items: ["Snowflake", "BigQuery", "Redshift", "Delta Lake", "Postgres"]
  }, {
    group: "Cloud & Infra",
    items: ["AWS", "GCP", "Azure", "Docker", "Terraform"]
  }, {
    group: "Quality & Observability",
    items: ["Great Expectations", "dbt tests", "OpenTelemetry", "Grafana"]
  }],
  // Each project's `pipeline` drives the animated data-flow diagram.
  projects: [{
    id: "rt-ingest",
    name: "Real-time ingestion pipeline",
    tags: ["Kafka", "Spark", "Python"],
    blurb: "Streaming CDC pipeline landing events analytics-ready in minutes, not hours.",
    problem: "Nightly batch loads meant dashboards were always a day stale and backfills were painful. Stakeholders wanted near-real-time without a brittle, hand-rolled mess.",
    approach: "Captured row-level changes off the operational DB with CDC, streamed them through Kafka, and used structured streaming to dedupe, conform, and upsert into the warehouse. Idempotent writes and a replayable log made backfills a non-event.",
    outcome: "Latency dropped from overnight to a few minutes; backfills became a single replay command instead of a weekend.",
    pipeline: ["Postgres", "Debezium CDC", "Kafka", "Spark Streaming", "Delta Lake", "Dashboards"]
  }, {
    id: "warehouse",
    name: "Analytics data warehouse",
    tags: ["SQL", "dbt", "Airflow"],
    blurb: "A dimensional model + tested ELT that stakeholders actually trust.",
    problem: "Every team had its own definition of 'active user'. Numbers never matched across reports and nobody trusted the dashboards.",
    approach: "Designed a star schema with conformed dimensions, rebuilt transformations in dbt with tests and documentation, and orchestrated incremental runs in Airflow with freshness checks and alerting.",
    outcome: "One source of truth with tested metrics; data quality moved from 'hope' to enforced contracts.",
    pipeline: ["Sources", "Airbyte", "Snowflake (raw)", "dbt", "Marts", "BI"]
  }, {
    id: "quality",
    name: "Data quality & observability platform",
    tags: ["Great Expectations", "OpenTelemetry", "Grafana"],
    blurb: "Catch bad data before the dashboard does.",
    problem: "Silent data incidents — a dropped partition, a null spike — surfaced days later via an angry Slack message.",
    approach: "Wrapped critical tables with expectation suites, emitted freshness, volume, and schema metrics as OpenTelemetry signals, and built Grafana dashboards plus paging on anomalies.",
    outcome: "Mean time-to-detect for data incidents dropped sharply; most issues now caught upstream of consumers.",
    pipeline: ["Pipelines", "Expectations", "OTel metrics", "Grafana", "Alerting"]
  }, {
    id: "lakehouse",
    name: "Batch → lakehouse migration",
    tags: ["Spark", "Delta Lake", "Terraform"],
    blurb: "Lifted a tangle of cron jobs into a governed lakehouse.",
    problem: "A decade of cron-driven scripts wrote CSVs nobody could lineage. Storage costs and confusion grew every quarter.",
    approach: "Modeled bronze/silver/gold layers on Delta Lake, ported jobs to Spark with schema enforcement, and codified the whole platform in Terraform for reproducible environments.",
    outcome: "Queryable, governed, lineage-aware data with reproducible infra and lower storage spend.",
    pipeline: ["Cron / CSV", "Spark", "Bronze", "Silver", "Gold", "Query engine"]
  }],
  experience: [{
    period: "2023 — now",
    role: "Data Engineer",
    org: "Placeholder Co.",
    notes: "Own streaming + batch pipelines end-to-end; introduced data-quality contracts and observability."
  }, {
    period: "2021 — 2023",
    role: "Data Engineer",
    org: "Placeholder Labs",
    notes: "Built the analytics warehouse and dbt modeling layer powering company dashboards."
  }, {
    period: "2020 — 2021",
    role: "Data Analyst → Engineer",
    org: "Placeholder Inc.",
    notes: "Started in analytics, automated the reporting stack, fell for pipelines."
  }],
  writing: [{
    id: "trust",
    title: "What makes a pipeline trustworthy",
    date: "Mar 2025",
    read: "6 min",
    excerpt: "A pipeline that runs and a pipeline a team believes are two different things. Here's the gap, and how tests, contracts, and observability close it.",
    body: ["Reliability isn't a feature you add at the end — it's a property of how you model the whole flow.", "I break trust into three layers: freshness (is it current?), correctness (does it mean what we think?), and lineage (can we explain it?). Each needs its own signals.", "The teams with the most-trusted data aren't the ones with the fanciest stack. They're the ones who made data quality a contract, not a hope."]
  }, {
    id: "cdc",
    title: "CDC without the foot-guns",
    date: "Jan 2025",
    read: "8 min",
    excerpt: "Change-data-capture is the cleanest way to stream a database — and a great way to create silent duplicates if you're not careful.",
    body: ["CDC feels like magic until your first replay creates duplicate rows in production.", "The fix is boring and essential: idempotent, upsert-based writes keyed on the primary key plus an ordering column.", "Treat the log as the source of truth and your sink as a materialized projection of it. Backfills stop being scary."]
  }, {
    id: "dx",
    title: "Developer experience for data teams",
    date: "Nov 2024",
    read: "5 min",
    excerpt: "If shipping a pipeline change takes a day and a prayer, people stop improving them. DX is a data-quality issue.",
    body: ["Slow, scary deploys are why pipelines rot.", "Local dev parity, fast tests, and good error messages do more for data quality than any dashboard.", "Make the right thing the easy thing and quality follows."]
  }],
  contactLinks: [{
    label: "Email",
    value: "dhanushchandra.raju@outlook.com",
    href: "mailto:dhanushchandra.raju@outlook.com"
  }, {
    label: "GitHub",
    value: "DhanushAnegondi",
    href: "https://github.com/DhanushAnegondi"
  }, {
    label: "LinkedIn",
    value: "in/dhanush",
    href: "#"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_os/data.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_os/desktop.jsx
try { (() => {
// DhanushOS — shell: boot sequence, menu bar, desktop, dock, draggable windows.
(function () {
  const {
    useState,
    useEffect,
    useRef,
    useCallback
  } = React;
  const I = window.Icons;

  // ---------- Boot sequence ----------
  const BOOT_LINES = [{
    t: "DhanushOS [Version 1.0.0]  —  data platform edition",
    c: "dim"
  }, {
    t: ""
  }, {
    t: "booting kernel ......................... ",
    ok: true
  }, {
    t: "mounting /pipelines ..................... ",
    ok: true
  }, {
    t: "verifying data-quality contracts ....... ",
    ok: true
  }, {
    t: "starting orchestrator (airflow) ........ ",
    ok: true
  }, {
    t: "connecting warehouse (snowflake) ....... ",
    ok: true
  }, {
    t: "spinning up streaming layer (kafka) .... ",
    ok: true
  }, {
    t: "observability online (otel + grafana) .. ",
    ok: true
  }, {
    t: ""
  }, {
    t: "loading profile: Dhanush Chandra — Data Engineer",
    c: "p"
  }];
  function BootSequence({
    onDone
  }) {
    const [n, setN] = useState(0);
    const [done, setDone] = useState(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    useEffect(() => {
      if (reduce) {
        setN(BOOT_LINES.length);
        setDone(true);
        return;
      }
      if (n < BOOT_LINES.length) {
        const id = setTimeout(() => setN(n + 1), n === 0 ? 240 : 150 + Math.random() * 90);
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => setDone(true), 450);
        return () => clearTimeout(id);
      }
    }, [n]);

    // Auto-enter shortly after boot completes; click anytime to skip/enter.
    useEffect(() => {
      if (!done) return;
      const id = setTimeout(() => onDone(), reduce ? 0 : 1300);
      return () => clearTimeout(id);
    }, [done]);
    const enter = () => done && onDone();
    return /*#__PURE__*/React.createElement("div", {
      className: "boot",
      onClick: enter
    }, BOOT_LINES.slice(0, n).map((l, i) => /*#__PURE__*/React.createElement("div", {
      className: "boot-line",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: l.c ? l.c : ""
    }, l.t), l.ok && /*#__PURE__*/React.createElement("span", {
      className: "ok"
    }, "[ OK ]"))), !done && n >= BOOT_LINES.length && /*#__PURE__*/React.createElement("span", {
      className: "boot-cursor"
    }), done && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "boot-bar"
    }, /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("div", {
      className: "boot-brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "logo"
    }, "Dhanush Chandra", /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }, "."))), /*#__PURE__*/React.createElement("div", {
      className: "boot-hint"
    }, "\u25B8 click anywhere to enter DhanushOS")));
  }

  // ---------- Clock ----------
  function Clock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
      const id = setInterval(() => setNow(new Date()), 1000 * 20);
      return () => clearInterval(id);
    }, []);
    const opts = {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit"
    };
    return /*#__PURE__*/React.createElement("span", null, now.toLocaleString([], opts));
  }

  // ---------- Menu bar ----------
  function MenuBar({
    apps,
    onOpen,
    theme,
    onToggleTheme
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "menubar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "DhanushOS"), apps.slice(0, 5).map(a => /*#__PURE__*/React.createElement("span", {
      key: a.id,
      className: "mitem",
      onClick: () => onOpen(a.id)
    }, a.menu || a.title)), /*#__PURE__*/React.createElement("div", {
      className: "right"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "status-dot"
    }), "pipelines: green"), /*#__PURE__*/React.createElement("button", {
      className: "menu-toggle",
      onClick: onToggleTheme
    }, theme === "dark" ? "◐ light" : "◑ dark"), /*#__PURE__*/React.createElement(Clock, null)));
  }

  // ---------- Desktop icons ----------
  function DesktopIcons({
    apps,
    onOpen
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "icons"
    }, apps.map(a => {
      const Glyph = I[a.icon];
      return /*#__PURE__*/React.createElement("div", {
        className: "dicon",
        key: a.id,
        onDoubleClick: () => onOpen(a.id),
        onClick: e => e.detail === 0 && onOpen(a.id)
      }, /*#__PURE__*/React.createElement("span", {
        className: "glyph"
      }, /*#__PURE__*/React.createElement(Glyph, null)), /*#__PURE__*/React.createElement("span", {
        className: "label"
      }, a.title));
    }));
  }

  // ---------- Dock ----------
  function Dock({
    apps,
    openIds,
    onOpen
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dock"
    }, apps.map((a, i) => {
      const Glyph = I[a.icon];
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: a.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "dock-item",
        title: a.title,
        onClick: () => onOpen(a.id)
      }, /*#__PURE__*/React.createElement(Glyph, null), openIds.includes(a.id) && /*#__PURE__*/React.createElement("span", {
        className: "run"
      })), a.dockSep && /*#__PURE__*/React.createElement("span", {
        className: "sep"
      }));
    }));
  }

  // ---------- Window (draggable) ----------
  function Window({
    win,
    focused,
    onFocus,
    onClose,
    onMinimize,
    onMove,
    children
  }) {
    const ref = useRef(null);
    const drag = useRef(null);
    const Glyph = I[win.icon];
    const onDown = useCallback(e => {
      if (e.target.closest(".light")) return;
      onFocus(win.id);
      const startX = e.clientX,
        startY = e.clientY;
      drag.current = {
        x0: win.x,
        y0: win.y,
        startX,
        startY
      };
      const move = ev => {
        if (!drag.current) return;
        const nx = drag.current.x0 + (ev.clientX - drag.current.startX);
        const ny = Math.max(0, drag.current.y0 + (ev.clientY - drag.current.startY));
        onMove(win.id, nx, ny);
      };
      const up = () => {
        drag.current = null;
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }, [win.id, win.x, win.y, onFocus, onMove]);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: "window" + (focused ? " focused" : "") + (win.anim ? " " + win.anim : ""),
      style: {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z
      },
      onMouseDown: () => onFocus(win.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "titlebar",
      onMouseDown: onDown
    }, /*#__PURE__*/React.createElement("div", {
      className: "lights"
    }, /*#__PURE__*/React.createElement("button", {
      className: "light red",
      title: "close",
      onClick: () => onClose(win.id)
    }), /*#__PURE__*/React.createElement("button", {
      className: "light yellow",
      title: "minimize",
      onClick: () => onMinimize(win.id)
    }), /*#__PURE__*/React.createElement("button", {
      className: "light green",
      title: "zoom"
    })), /*#__PURE__*/React.createElement("span", {
      className: "tt"
    }, /*#__PURE__*/React.createElement("span", {
      className: "icn"
    }, /*#__PURE__*/React.createElement(Glyph, {
      size: 14
    })), win.title)), /*#__PURE__*/React.createElement("div", {
      className: "win-body"
    }, children));
  }
  window.OS = {
    BootSequence,
    MenuBar,
    DesktopIcons,
    Dock,
    Window
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_os/desktop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_os/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// DhanushOS — icon set. Lucide-style (1.5px stroke, round caps), matching the
// real portfolio's lucide-react iconography. Self-contained inline SVG so it
// never depends on a CDN load racing React.
(function () {
  function Icon({
    d,
    paths,
    size = 20,
    fill = false,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: fill ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: style
    }, rest), paths ? paths : /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const P = d => props => /*#__PURE__*/React.createElement(Icon, _extends({
    d: d
  }, props));
  const M = els => props => /*#__PURE__*/React.createElement(Icon, _extends({
    paths: els
  }, props));
  window.Icons = {
    Terminal: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polyline", {
      points: "4 17 10 11 4 5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "19",
      x2: "20",
      y2: "19"
    }))),
    User: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    }))),
    Folder: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
    }))),
    Layers: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m22 12.18-9.17 4.16a2 2 0 0 1-1.66 0L2 12.18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m22 17.18-9.17 4.16a2 2 0 0 1-1.66 0L2 17.18"
    }))),
    History: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 3v5h5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l4 2"
    }))),
    Pen: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 20h9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
    }))),
    FileDown: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2v6h6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 12v6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m9 15 3 3 3-3"
    }))),
    Mail: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      width: "20",
      height: "16",
      x: "2",
      y: "4",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
    }))),
    Database: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("ellipse", {
      cx: "12",
      cy: "5",
      rx: "9",
      ry: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 5v14a9 3 0 0 0 18 0V5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 12a9 3 0 0 0 18 0"
    }))),
    GitBranch: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "3",
      x2: "6",
      y2: "15"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "6",
      r: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "18",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 9a9 9 0 0 1-9 9"
    }))),
    Activity: P("M22 12h-4l-3 9L9 3l-3 9H2"),
    Zap: P("M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"),
    Cloud: P("M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"),
    Wind: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12.8 19.6A2 2 0 1 0 14 16H2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M17.5 8a2.5 2.5 0 1 1 2 4H2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.8 4.4A2 2 0 1 1 11 8H2"
    }))),
    ArrowRight: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 5 19 12 12 19"
    }))),
    ChevronRight: P("m9 18 6-6-6-6"),
    ChevronLeft: P("m15 18-6-6 6-6"),
    Sparkles: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-2.06L8 4l1.94 5.94L16 12Z",
      transform: "translate(2 0)"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 5v4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 7h4"
    }))),
    Sun: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
    }))),
    Moon: P("M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"),
    Send: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M22 2 11 13"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 2 15 22l-4-9-9-4Z"
    }))),
    Github: P("M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"),
    Linkedin: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
    }), /*#__PURE__*/React.createElement("rect", {
      width: "4",
      height: "12",
      x: "2",
      y: "9"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "4",
      cy: "4",
      r: "2"
    }))),
    MapPin: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    }))),
    Power: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 2v10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.36 6.64a9 9 0 1 1-12.73 0"
    }))),
    Box: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m3.3 7 8.7 5 8.7-5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 22V12"
    }))),
    BarChart: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "20",
      x2: "12",
      y2: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "20",
      x2: "18",
      y2: "4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "20",
      x2: "6",
      y2: "16"
    }))),
    Code: M(/*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polyline", {
      points: "16 18 22 12 16 6"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "8 6 2 12 8 18"
    })))
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_os/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_os/projects.jsx
try { (() => {
// DhanushOS — Projects app + animated data-flow pipeline diagram.
(function () {
  const {
    useState
  } = React;
  const I = window.Icons;
  const D = window.DATA;

  // Map a pipeline stage name to a fitting icon.
  function stageIcon(name) {
    const n = name.toLowerCase();
    if (/postgres|warehouse|snowflake|redshift|bigquery|lake|delta|raw|bronze|silver|gold|storage|db/.test(n)) return I.Database;
    if (/kafka|stream|kinesis|cdc|debezium/.test(n)) return I.Wind;
    if (/spark|flink|dbt|transform|expectation|airbyte|process/.test(n)) return I.Zap;
    if (/dashboard|bi|grafana|report|query|alert/.test(n)) return I.BarChart;
    if (/otel|metric|observ/.test(n)) return I.Activity;
    if (/cron|csv|source|pipeline/.test(n)) return I.Box;
    return I.GitBranch;
  }
  function PipelineDiagram({
    stages
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pipeline",
      role: "img",
      "aria-label": "Data flow: " + stages.join(" to ")
    }, stages.map((s, i) => {
      const Glyph = stageIcon(s);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        className: "pl-node"
      }, /*#__PURE__*/React.createElement("div", {
        className: "box"
      }, /*#__PURE__*/React.createElement("span", {
        className: "nio"
      }, /*#__PURE__*/React.createElement(Glyph, {
        size: 16
      })), s)), i < stages.length - 1 && /*#__PURE__*/React.createElement("div", {
        className: "pl-edge"
      }, /*#__PURE__*/React.createElement("span", {
        className: "flow",
        style: {
          animationDelay: i * 0.32 + "s"
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "flow",
        style: {
          animationDelay: i * 0.32 + 1.1 + "s"
        }
      })));
    }));
  }
  function Projects() {
    const [open, setOpen] = useState(D.projects[0].id);
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("h1", null, "Projects"), /*#__PURE__*/React.createElement("p", {
      className: "sub"
    }, "~/projects \u2014 click a pipeline to expand the build"), /*#__PURE__*/React.createElement("div", {
      className: "proj-list"
    }, D.projects.map(p => {
      const isOpen = open === p.id;
      return /*#__PURE__*/React.createElement("div", {
        className: "proj-card" + (isOpen ? " open" : ""),
        key: p.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "proj-head",
        onClick: () => setOpen(isOpen ? null : p.id)
      }, /*#__PURE__*/React.createElement("div", {
        className: "meta"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ptitle"
      }, p.name), /*#__PURE__*/React.createElement("div", {
        className: "pblurb"
      }, p.blurb), /*#__PURE__*/React.createElement("div", {
        className: "proj-tags"
      }, p.tags.map(t => /*#__PURE__*/React.createElement("span", {
        className: "chip tag",
        key: t
      }, t)))), /*#__PURE__*/React.createElement("span", {
        className: "caret"
      }, /*#__PURE__*/React.createElement(I.ChevronRight, {
        size: 18
      }))), /*#__PURE__*/React.createElement("div", {
        className: "proj-detail"
      }, /*#__PURE__*/React.createElement("div", {
        className: "inner"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pad"
      }, /*#__PURE__*/React.createElement(PipelineDiagram, {
        stages: p.pipeline
      }), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Problem"), /*#__PURE__*/React.createElement("dd", null, p.problem)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Approach"), /*#__PURE__*/React.createElement("dd", null, p.approach)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Outcome"), /*#__PURE__*/React.createElement("dd", null, p.outcome)))))));
    })));
  }
  window.Apps = Object.assign(window.Apps || {}, {
    Projects,
    PipelineDiagram
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_os/projects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_os/terminal.jsx
try { (() => {
// DhanushOS — interactive Terminal app + floating AI assistant.
(function () {
  const {
    useState,
    useRef,
    useEffect
  } = React;
  const I = window.Icons;
  const D = window.DATA;
  const APP_ALIASES = {
    about: "about",
    projects: "projects",
    skills: "skills",
    stack: "skills",
    experience: "experience",
    history: "experience",
    writing: "writing",
    notes: "writing",
    resume: "resume",
    cv: "resume",
    contact: "contact"
  };
  function Terminal({
    onOpen
  }) {
    const [lines, setLines] = useState([{
      html: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "dim"
      }, "Last login on DhanushOS. Type "), /*#__PURE__*/React.createElement("span", {
        className: "p"
      }, "help"), /*#__PURE__*/React.createElement("span", {
        className: "dim"
      }, " to begin."))
    }]);
    const [val, setVal] = useState("");
    const bodyRef = useRef(null);
    const inRef = useRef(null);
    useEffect(() => {
      bodyRef.current && bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
    }, [lines]);
    function push(node) {
      setLines(l => [...l, {
        html: node
      }]);
    }
    function run(raw) {
      const cmd = raw.trim();
      push(/*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        className: "p"
      }, "dhanush@os"), " ", /*#__PURE__*/React.createElement("span", {
        className: "dim"
      }, "~ %"), " ", cmd));
      const [c, ...args] = cmd.toLowerCase().split(/\s+/);
      const arg = args.join(" ");
      if (!c) return;
      switch (c) {
        case "help":
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, "commands: ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "about"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "projects"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "skills"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "experience"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "writing"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "resume"), ", ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "contact"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "open"), " <app> \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "ls"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "whoami"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "clear")));
          break;
        case "whoami":
          push(/*#__PURE__*/React.createElement("span", null, D.profile.name, " \u2014 ", D.profile.role, " \xB7 ", D.profile.location));
          break;
        case "ls":
          push(/*#__PURE__*/React.createElement("span", {
            className: "ok"
          }, "about  projects  skills  experience  writing  resume  contact"));
          break;
        case "open":
          {
            const target = APP_ALIASES[arg];
            if (target) {
              push(/*#__PURE__*/React.createElement("span", {
                className: "dim"
              }, "opening ", target, ".app\u2026"));
              onOpen(target);
            } else push(/*#__PURE__*/React.createElement("span", {
              className: "dim"
            }, "no such app: ", arg || "(none)", " \u2014 try "));
            break;
          }
        case "skills":
          push(/*#__PURE__*/React.createElement("span", null, D.skills.map(g => g.items.join(", ")).join(" · ")));
          break;
        case "about":
          push(/*#__PURE__*/React.createElement("span", null, D.about[0]));
          onOpen("about");
          break;
        case "projects":
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, D.projects.length, " pipelines shipped \u2014 opening projects.app\u2026"));
          onOpen("projects");
          break;
        case "contact":
          push(/*#__PURE__*/React.createElement("span", null, D.profile.email));
          onOpen("contact");
          break;
        case "sudo":
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, "nice try. data quality is enforced for everyone \uD83D\uDE42"));
          break;
        case "clear":
          setLines([]);
          return;
        case "echo":
          push(/*#__PURE__*/React.createElement("span", null, args.join(" ")));
          break;
        default:
          push(/*#__PURE__*/React.createElement("span", {
            className: "dim"
          }, "command not found: ", c, ". type ", /*#__PURE__*/React.createElement("span", {
            className: "p"
          }, "help")));
      }
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "term",
      ref: bodyRef,
      onClick: () => inRef.current && inRef.current.focus()
    }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
      className: "line",
      key: i
    }, l.html)), /*#__PURE__*/React.createElement("div", {
      className: "term-input-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "p"
    }, "dhanush@os"), /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "~ %"), /*#__PURE__*/React.createElement("input", {
      ref: inRef,
      className: "term-input",
      value: val,
      autoFocus: true,
      spellCheck: false,
      onChange: e => setVal(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") {
          run(val);
          setVal("");
        }
      }
    })));
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
    const [msgs, setMsgs] = useState([{
      role: "a",
      c: "Hi! I'm Dhanush's assistant. Ask me anything about his work."
    }]);
    const [val, setVal] = useState("");
    const [typing, setTyping] = useState(false);
    const sref = useRef(null);
    useEffect(() => {
      sref.current && sref.current.scrollTo(0, sref.current.scrollHeight);
    }, [msgs, typing, open]);
    function send(text) {
      const c = (text ?? val).trim();
      if (!c || typing) return;
      setMsgs(m => [...m, {
        role: "u",
        c
      }]);
      setVal("");
      setTyping(true);
      setTimeout(() => {
        setMsgs(m => [...m, {
          role: "a",
          c: reply(c)
        }]);
        setTyping(false);
      }, 720);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "assistant-anchor"
    }, open && /*#__PURE__*/React.createElement("div", {
      className: "dos-pop",
      style: panel
    }, /*#__PURE__*/React.createElement("div", {
      style: pHead
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: "hsl(var(--foreground))",
        fontSize: 14
      }
    }, "Ask about Dhanush"), /*#__PURE__*/React.createElement("span", {
      style: aiBadge
    }, "AI"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        cursor: "pointer",
        color: "hsl(var(--muted-foreground))"
      },
      onClick: () => setOpen(false)
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      ref: sref,
      style: pBody
    }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: m.role === "u" ? bubbleU : bubbleA
    }, m.c)), typing && /*#__PURE__*/React.createElement("div", {
      style: {
        ...bubbleA,
        fontStyle: "italic",
        color: "hsl(var(--muted-foreground))"
      }
    }, "typing\u2026"), msgs.length === 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 7,
        marginTop: 2
      }
    }, SUGGESTIONS.map(s => /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => send(s),
      style: sugg
    }, s)))), /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        send();
      },
      style: pForm
    }, /*#__PURE__*/React.createElement("input", {
      value: val,
      onChange: e => setVal(e.target.value),
      placeholder: "Type a question\u2026",
      style: pInput
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: pSend,
      "aria-label": "send"
    }, /*#__PURE__*/React.createElement(I.Send, {
      size: 15
    })))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(o => !o),
      className: "ds-lift",
      style: launch
    }, open ? "✕ Close" : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(I.Sparkles, {
      size: 16
    }), " Ask AI")));
  }
  const panel = {
    position: "absolute",
    bottom: 60,
    right: 0,
    width: 340,
    height: 440,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "var(--radius-2xl)",
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--card))",
    boxShadow: "var(--shadow-xl)"
  };
  const pHead = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 14px",
    borderBottom: "1px solid hsl(var(--border))"
  };
  const aiBadge = {
    borderRadius: 99,
    background: "hsl(var(--primary) / 0.12)",
    color: "var(--ember)",
    padding: "3px 8px",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 700
  };
  const pBody = {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    overflowY: "auto",
    padding: 14,
    flex: 1
  };
  const bubbleBase = {
    maxWidth: "86%",
    whiteSpace: "pre-wrap",
    borderRadius: 16,
    padding: "9px 13px",
    fontSize: 13.5,
    lineHeight: 1.55
  };
  const bubbleU = {
    ...bubbleBase,
    alignSelf: "flex-end",
    background: "var(--ember)",
    color: "hsl(var(--primary-foreground))"
  };
  const bubbleA = {
    ...bubbleBase,
    alignSelf: "flex-start",
    background: "hsl(var(--muted))",
    color: "hsl(var(--foreground))"
  };
  const sugg = {
    borderRadius: 99,
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    padding: "6px 11px",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "var(--font-sans)"
  };
  const pForm = {
    display: "flex",
    gap: 8,
    padding: 11,
    borderTop: "1px solid hsl(var(--border))"
  };
  const pInput = {
    flex: 1,
    height: 36,
    background: "transparent",
    color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--input))",
    borderRadius: "var(--radius-md)",
    padding: "0 12px",
    fontSize: 13,
    fontFamily: "var(--font-sans)",
    outline: "none"
  };
  const pSend = {
    height: 36,
    width: 36,
    display: "grid",
    placeItems: "center",
    borderRadius: "var(--radius-md)",
    border: "none",
    background: "var(--ember)",
    color: "hsl(var(--primary-foreground))",
    cursor: "pointer"
  };
  const launch = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 46,
    padding: "0 18px",
    borderRadius: 99,
    border: "none",
    background: "var(--ember)",
    color: "hsl(var(--primary-foreground))",
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: 14,
    boxShadow: "var(--shadow-lg)",
    cursor: "pointer"
  };
  window.Apps = Object.assign(window.Apps || {}, {
    Terminal
  });
  window.Assistant = Assistant;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_os/terminal.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ChatWidget = __ds_scope.ChatWidget;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.TerminalPanel = __ds_scope.TerminalPanel;

})();
