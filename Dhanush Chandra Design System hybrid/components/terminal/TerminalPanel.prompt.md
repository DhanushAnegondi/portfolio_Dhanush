The signature "imagery" of the system — a mono terminal card whose lines boot in. Reach for it instead of stock illustration or icon grids; it demonstrates rather than asserts.

```jsx
<TerminalPanel
  title="~/dhanush — stack"
  lines={[
    { prompt: true, dim: true, text: "whoami" },
    { text: "Data Engineer · India" },
    { prompt: true, dim: true, text: "status" },
    { text: "● pipelines: green · data quality: enforced" },
  ]}
/>
```

Lines are data: `prompt` adds the ember `$`, `dim` mutes a command being typed. Keep it to ~6 lines. Set `animate={false}` for static contexts (print/PDF) and `cursor={false}` to drop the blinking caret.
