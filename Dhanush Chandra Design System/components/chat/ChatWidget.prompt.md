The signature product feature — a self-contained "Ask my AI" launcher and chat popover. Drop it bottom-right; it opens, greets, offers suggestion chips, and answers with a typing delay.

```jsx
<div style={{ position: "fixed", bottom: 24, right: 24 }}>
  <ChatWidget defaultOpen />
</div>
```

Uncontrolled by default. Replies are canned profile answers; pass `getReply={async-ish sync fn}` to map a question to your own copy, or replace with a real `/api/chat` call. The launcher sits at the anchor's bottom-right and the panel floats above it — give the anchor `position: fixed` for the real product placement.
