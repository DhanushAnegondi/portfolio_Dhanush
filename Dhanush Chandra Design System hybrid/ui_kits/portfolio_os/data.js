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
    tagline: "Reliable data pipelines, from messy source to trusted dataset.",
  },

  about: [
    "Hi — I'm Dhanush. I build the unglamorous plumbing that lets teams trust their data.",
    "My happy place is the messy middle: a flaky source feed, a schema that drifts overnight, a dashboard that quietly went wrong three weeks ago. I like turning that chaos into pipelines that are observable, tested, and boring in the best way.",
    "I think a lot about data quality and developer experience — the difference between a pipeline that runs and one a team actually believes. Outside work I read about distributed systems, tinker with side projects, and occasionally lose an evening to a good CRT-terminal rabbit hole.",
  ],

  skills: [
    { group: "Languages", items: ["Python", "SQL", "Scala", "Bash"] },
    { group: "Processing", items: ["Apache Spark", "Apache Flink", "dbt", "pandas"] },
    { group: "Orchestration", items: ["Airflow", "Dagster", "Prefect"] },
    { group: "Streaming", items: ["Kafka", "Kinesis", "Debezium / CDC"] },
    { group: "Storage & Warehouse", items: ["Snowflake", "BigQuery", "Redshift", "Delta Lake", "Postgres"] },
    { group: "Cloud & Infra", items: ["AWS", "GCP", "Azure", "Docker", "Terraform"] },
    { group: "Quality & Observability", items: ["Great Expectations", "dbt tests", "OpenTelemetry", "Grafana"] },
  ],

  // Each project's `pipeline` drives the animated data-flow diagram.
  projects: [
    {
      id: "rt-ingest",
      name: "Real-time ingestion pipeline",
      tags: ["Kafka", "Spark", "Python"],
      blurb: "Streaming CDC pipeline landing events analytics-ready in minutes, not hours.",
      problem: "Nightly batch loads meant dashboards were always a day stale and backfills were painful. Stakeholders wanted near-real-time without a brittle, hand-rolled mess.",
      approach: "Captured row-level changes off the operational DB with CDC, streamed them through Kafka, and used structured streaming to dedupe, conform, and upsert into the warehouse. Idempotent writes and a replayable log made backfills a non-event.",
      outcome: "Latency dropped from overnight to a few minutes; backfills became a single replay command instead of a weekend.",
      pipeline: ["Postgres", "Debezium CDC", "Kafka", "Spark Streaming", "Delta Lake", "Dashboards"],
    },
    {
      id: "warehouse",
      name: "Analytics data warehouse",
      tags: ["SQL", "dbt", "Airflow"],
      blurb: "A dimensional model + tested ELT that stakeholders actually trust.",
      problem: "Every team had its own definition of 'active user'. Numbers never matched across reports and nobody trusted the dashboards.",
      approach: "Designed a star schema with conformed dimensions, rebuilt transformations in dbt with tests and documentation, and orchestrated incremental runs in Airflow with freshness checks and alerting.",
      outcome: "One source of truth with tested metrics; data quality moved from 'hope' to enforced contracts.",
      pipeline: ["Sources", "Airbyte", "Snowflake (raw)", "dbt", "Marts", "BI"],
    },
    {
      id: "quality",
      name: "Data quality & observability platform",
      tags: ["Great Expectations", "OpenTelemetry", "Grafana"],
      blurb: "Catch bad data before the dashboard does.",
      problem: "Silent data incidents — a dropped partition, a null spike — surfaced days later via an angry Slack message.",
      approach: "Wrapped critical tables with expectation suites, emitted freshness, volume, and schema metrics as OpenTelemetry signals, and built Grafana dashboards plus paging on anomalies.",
      outcome: "Mean time-to-detect for data incidents dropped sharply; most issues now caught upstream of consumers.",
      pipeline: ["Pipelines", "Expectations", "OTel metrics", "Grafana", "Alerting"],
    },
    {
      id: "lakehouse",
      name: "Batch → lakehouse migration",
      tags: ["Spark", "Delta Lake", "Terraform"],
      blurb: "Lifted a tangle of cron jobs into a governed lakehouse.",
      problem: "A decade of cron-driven scripts wrote CSVs nobody could lineage. Storage costs and confusion grew every quarter.",
      approach: "Modeled bronze/silver/gold layers on Delta Lake, ported jobs to Spark with schema enforcement, and codified the whole platform in Terraform for reproducible environments.",
      outcome: "Queryable, governed, lineage-aware data with reproducible infra and lower storage spend.",
      pipeline: ["Cron / CSV", "Spark", "Bronze", "Silver", "Gold", "Query engine"],
    },
  ],

  experience: [
    { period: "2023 — now", role: "Data Engineer", org: "Placeholder Co.", notes: "Own streaming + batch pipelines end-to-end; introduced data-quality contracts and observability." },
    { period: "2021 — 2023", role: "Data Engineer", org: "Placeholder Labs", notes: "Built the analytics warehouse and dbt modeling layer powering company dashboards." },
    { period: "2020 — 2021", role: "Data Analyst → Engineer", org: "Placeholder Inc.", notes: "Started in analytics, automated the reporting stack, fell for pipelines." },
  ],

  writing: [
    { id: "trust", title: "What makes a pipeline trustworthy", date: "Mar 2025", read: "6 min", excerpt: "A pipeline that runs and a pipeline a team believes are two different things. Here's the gap, and how tests, contracts, and observability close it.", body: ["Reliability isn't a feature you add at the end — it's a property of how you model the whole flow.", "I break trust into three layers: freshness (is it current?), correctness (does it mean what we think?), and lineage (can we explain it?). Each needs its own signals.", "The teams with the most-trusted data aren't the ones with the fanciest stack. They're the ones who made data quality a contract, not a hope."] },
    { id: "cdc", title: "CDC without the foot-guns", date: "Jan 2025", read: "8 min", excerpt: "Change-data-capture is the cleanest way to stream a database — and a great way to create silent duplicates if you're not careful.", body: ["CDC feels like magic until your first replay creates duplicate rows in production.", "The fix is boring and essential: idempotent, upsert-based writes keyed on the primary key plus an ordering column.", "Treat the log as the source of truth and your sink as a materialized projection of it. Backfills stop being scary."] },
    { id: "dx", title: "Developer experience for data teams", date: "Nov 2024", read: "5 min", excerpt: "If shipping a pipeline change takes a day and a prayer, people stop improving them. DX is a data-quality issue.", body: ["Slow, scary deploys are why pipelines rot.", "Local dev parity, fast tests, and good error messages do more for data quality than any dashboard.", "Make the right thing the easy thing and quality follows."] },
  ],

  contactLinks: [
    { label: "Email", value: "dhanushchandra.raju@outlook.com", href: "mailto:dhanushchandra.raju@outlook.com" },
    { label: "GitHub", value: "DhanushAnegondi", href: "https://github.com/DhanushAnegondi" },
    { label: "LinkedIn", value: "in/dhanush", href: "#" },
  ],
};
