// Portfolio UI kit — Skills + Projects. Mirrors the live page.js layout: a
// max-w-3xl column with a skills cloud (ember-tint pills) and project cards.
// Content uses the real skills list; project copy is kept concrete but free of
// invented metrics, per the brand's "honest content" principle.

const { Badge, Card, CardHeader, CardTitle, CardContent } = window.DhanushChandraDesignSystem_2b4e61;

const SKILLS = [
  "Python", "SQL", "Apache Spark", "Airflow / orchestration",
  "Data modeling & warehousing", "ETL / ELT pipeline design",
  "Cloud (AWS / GCP / Azure)", "Data quality & observability",
];

const PROJECTS = [
  {
    name: "Real-time ingestion pipeline",
    description: "A streaming pipeline that ingests events continuously and lands them analytics-ready, cutting data latency from hours to minutes.",
    stack: ["Kafka", "Spark", "Python"],
  },
  {
    name: "Analytics data warehouse",
    description: "A dimensional model and ELT pipelines feeding the dashboards stakeholders rely on, with tests guarding data quality at each layer.",
    stack: ["SQL", "Airflow", "dbt"],
  },
];

function Content() {
  return (
    <div style={{ maxWidth: 768, margin: "0 auto", padding: "80px 24px" }}>
      <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-semibold)", color: "hsl(var(--foreground))", letterSpacing: "var(--tracking-tight)", margin: 0 }}>
        Skills
      </h2>
      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SKILLS.map((s) => (
          <Badge key={s} variant="skill">{s}</Badge>
        ))}
      </div>

      <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-semibold)", color: "hsl(var(--foreground))", letterSpacing: "var(--tracking-tight)", margin: "48px 0 0" }}>
        Projects
      </h2>
      <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
        {PROJECTS.map((p) => (
          <Card key={p.name} interactive>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, lineHeight: "var(--leading-relaxed)" }}>{p.description}</p>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.stack.map((t) => (
                  <Badge key={t} variant="tag">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

window.Content = Content;
