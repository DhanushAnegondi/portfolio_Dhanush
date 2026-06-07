Ember-accented button — use for any primary or secondary action; `default` is the one confident filled action per view, everything else is restrained.

```jsx
<Button onClick={save}>Get in touch</Button>
<Button variant="outline">Ask my AI ↗</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button size="icon" aria-label="Send"><SendIcon /></Button>
```

Variants: `default` (ember fill), `outline`, `secondary`, `ghost`, `link`, `destructive`. Sizes: `sm`, `default`, `lg`, `icon`. Hover lifts 1px and darkens; press settles — no bounce. Keep one filled `default` button per view; pair it with an `outline` at most.
