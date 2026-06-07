// DhanushOS — Projects app + animated data-flow pipeline diagram.
(function () {
  const { useState } = React;
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

  function PipelineDiagram({ stages }) {
    return (
      <div className="pipeline" role="img" aria-label={"Data flow: " + stages.join(" to ")}>
        {stages.map((s, i) => {
          const Glyph = stageIcon(s);
          return (
            <React.Fragment key={i}>
              <div className="pl-node">
                <div className="box"><span className="nio"><Glyph size={16} /></span>{s}</div>
              </div>
              {i < stages.length - 1 && (
                <div className="pl-edge">
                  <span className="flow" style={{ animationDelay: (i * 0.32) + "s" }} />
                  <span className="flow" style={{ animationDelay: (i * 0.32 + 1.1) + "s" }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  function Projects() {
    const [open, setOpen] = useState(D.projects[0].id);
    return (
      <div className="app">
        <h1>Projects</h1>
        <p className="sub">~/projects — click a pipeline to expand the build</p>
        <div className="proj-list">
          {D.projects.map((p) => {
            const isOpen = open === p.id;
            return (
              <div className={"proj-card" + (isOpen ? " open" : "")} key={p.id}>
                <div className="proj-head" onClick={() => setOpen(isOpen ? null : p.id)}>
                  <div className="meta">
                    <div className="ptitle">{p.name}</div>
                    <div className="pblurb">{p.blurb}</div>
                    <div className="proj-tags">
                      {p.tags.map((t) => <span className="chip tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                  <span className="caret"><I.ChevronRight size={18} /></span>
                </div>
                <div className="proj-detail">
                  <div className="inner">
                    <div className="pad">
                      <PipelineDiagram stages={p.pipeline} />
                      <dl>
                        <div><dt>Problem</dt><dd>{p.problem}</dd></div>
                        <div><dt>Approach</dt><dd>{p.approach}</dd></div>
                        <div><dt>Outcome</dt><dd>{p.outcome}</dd></div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  window.Apps = Object.assign(window.Apps || {}, { Projects, PipelineDiagram });
})();
