Raised surface for grouped content — projects, settings panels, anything that needs a defined edge. Compose the sub-parts; pass `interactive` for clickable cards.

```jsx
<Card interactive>
  <CardHeader>
    <CardTitle>Real-time ingestion pipeline</CardTitle>
    <CardDescription>Kafka → Spark → warehouse, sub-2-min latency.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Built a streaming pipeline ingesting events continuously…</p>
  </CardContent>
</Card>
```

Sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. `interactive` adds the −2px hover lift and warms the border toward ember — use it only when the whole card is a link.
