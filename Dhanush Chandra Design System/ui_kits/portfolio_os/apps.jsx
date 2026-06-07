// DhanushOS — app window contents (About, Skills, Experience, Writing, Resume, Contact).
(function () {
  const { useState } = React;
  const I = window.Icons;
  const D = window.DATA;

  function About() {
    const p = D.profile;
    return (
      <div className="app">
        <h1>About</h1>
        <p className="sub">~/about — whoami, the long version</p>
        {D.about.map((para, i) => <p key={i} style={{ marginTop: i ? 14 : 0 }}>{para}</p>)}
        <h2>At a glance</h2>
        <div className="skill-row">
          <span className="chip"><I.MapPin size={13} /> {p.location}</span>
          <span className="chip"><I.Database size={13} /> {p.role}</span>
          <span className="chip"><I.Activity size={13} /> open to work</span>
        </div>
      </div>
    );
  }

  function Skills() {
    return (
      <div className="app">
        <h1>Skills</h1>
        <p className="sub">~/stack — the tools I reach for</p>
        {D.skills.map((g) => (
          <div className="skill-group" key={g.group}>
            <div className="gname">{g.group}</div>
            <div className="skill-row">
              {g.items.map((s) => <span className="chip tag" key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function Experience() {
    return (
      <div className="app">
        <h1>Experience</h1>
        <p className="sub">~/history — where I've shipped pipelines</p>
        <div className="timeline">
          {D.experience.map((e, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-period">{e.period}</div>
              <div className="tl-role">{e.role}</div>
              <div className="tl-org">{e.org}</div>
              <div className="tl-notes">{e.notes}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Writing() {
    const [active, setActive] = useState(null);
    const post = D.writing.find((p) => p.id === active);
    if (post) {
      return (
        <div className="app">
          <div className="post-back" onClick={() => setActive(null)}><I.ChevronLeft size={14} /> all posts</div>
          <h1>{post.title}</h1>
          <p className="sub">{post.date} · {post.read} read</p>
          {post.body.map((para, i) => <p key={i} style={{ marginTop: i ? 14 : 0 }}>{para}</p>)}
        </div>
      );
    }
    return (
      <div className="app">
        <h1>Writing</h1>
        <p className="sub">~/notes — thinking out loud about data</p>
        {D.writing.map((p) => (
          <div className="post" key={p.id} onClick={() => setActive(p.id)}>
            <div className="post-title">{p.title}</div>
            <div className="post-meta">{p.date} · {p.read} read</div>
            <div className="post-excerpt">{p.excerpt}</div>
          </div>
        ))}
      </div>
    );
  }

  function Resume() {
    const p = D.profile;
    return (
      <div className="app">
        <h1>Résumé</h1>
        <p className="sub">~/cv — the one-pager</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          <button className="btn" onClick={() => alert("Placeholder — wire this to your real PDF.")}><I.FileDown size={16} /> Download PDF</button>
          <a className="btn ghost" href={"https://" + p.github} target="_blank" rel="noreferrer"><I.Github size={16} /> GitHub</a>
        </div>
        <h2>Summary</h2>
        <p>Data Engineer focused on reliable, observable pipelines — batch and streaming. I turn messy source data into datasets teams trust, with quality enforced as a contract.</p>
        <h2>Core stack</h2>
        <div className="skill-row">
          {["Python", "SQL", "Spark", "Airflow", "Kafka", "dbt", "Snowflake", "AWS"].map((s) => (
            <span className="chip tag" key={s}>{s}</span>
          ))}
        </div>
        <h2>Selected work</h2>
        {D.projects.slice(0, 3).map((pr) => (
          <p key={pr.id} style={{ marginTop: 8 }}><strong style={{ color: "hsl(var(--foreground))" }}>{pr.name}</strong> — {pr.blurb}</p>
        ))}
      </div>
    );
  }

  function Contact() {
    const [sent, setSent] = useState(false);
    return (
      <div className="app">
        <h1>Contact</h1>
        <p className="sub">~/connect — let's talk data</p>
        <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
          {D.contactLinks.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
               style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-md)", color: "hsl(var(--foreground))" }}>
              <span style={{ color: "var(--ember)", display: "inline-flex" }}>
                {l.label === "Email" ? <I.Mail size={18} /> : l.label === "GitHub" ? <I.Github size={18} /> : <I.Linkedin size={18} />}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>{l.value}</span>
              <span style={{ marginLeft: "auto", color: "hsl(var(--muted-foreground))" }}><I.ArrowRight size={15} /></span>
            </a>
          ))}
        </div>
        <h2>Send a message</h2>
        {sent ? (
          <p style={{ color: "hsl(var(--success))" }}>Thanks — this is a placeholder form. Wire it to your inbox and it's live.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gap: 10 }}>
            <input placeholder="your email" required style={inp} />
            <textarea placeholder="what are you building?" rows={3} required style={{ ...inp, resize: "vertical", fontFamily: "var(--font-sans)" }} />
            <button className="btn" type="submit" style={{ justifySelf: "start" }}><I.Send size={15} /> Send</button>
          </form>
        )}
      </div>
    );
  }

  const inp = {
    height: 38, background: "transparent", color: "hsl(var(--foreground))",
    border: "1px solid hsl(var(--input))", borderRadius: "var(--radius-md)",
    padding: "9px 12px", fontSize: 13, fontFamily: "var(--font-mono)", outline: "none",
  };

  window.Apps = { About, Skills, Experience, Writing, Resume, Contact };
})();
