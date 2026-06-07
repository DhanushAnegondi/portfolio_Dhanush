Compact labels. Pick the variant by job: `skill` for the skills cloud, `tag` for tech-stack tokens, `status` for live state, `ai` for the assistant badge.

```jsx
<Badge variant="skill">Apache Spark</Badge>
<Badge variant="tag">dbt</Badge>
<Badge variant="status" tone="success">pipelines: green</Badge>
<Badge variant="ai">AI</Badge>
```

`status` always renders a leading dot so meaning never rides on color alone — tones: `ember`, `success`, `danger`. `skill`/`tag` are mono-set; reach for `skill` (ember tint) sparingly so the cloud stays calm.
