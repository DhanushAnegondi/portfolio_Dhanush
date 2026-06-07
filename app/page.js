import ChatWidget from "@/components/ChatWidget";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROFILE } from "@/data/about";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {PROFILE.skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors duration-150 hover:bg-primary/20"
            >
              {s}
            </span>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-semibold">Projects</h2>
        <div className="mt-4 grid gap-4">
          {PROFILE.projects.map((p) => (
            <Card
              key={p.name}
              className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-black/30"
            >
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ChatWidget />
    </main>
  );
}
