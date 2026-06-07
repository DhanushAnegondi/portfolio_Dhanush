Single-line text field — forms and the chat composer. Border warms to the ember ring on focus.

```jsx
<Input placeholder="Type a question…" value={q} onChange={e => setQ(e.target.value)} />
```

Full-width by default; constrain with a `style={{ maxWidth }}` wrapper. Pair with `<Button size="icon">` for a composer row.
