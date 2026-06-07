"use client";

import { Button } from "@/components/ui/button";
import ShaderBackground from "@/components/ShaderBackground";
import { PROFILE } from "@/data/about";

// First six real skills drive the terminal panel. No invented metrics.
const CORE_STACK = PROFILE.skills.slice(0, 6);

// Sequential delays so the terminal panel "boots" line by line after it rises.
const bootDelay = (i) => ({ animationDelay: `${0.5 + i * 0.12}s` });

export default function Hero() {
  function openChat() {
    window.dispatchEvent(new CustomEvent("open-chat"));
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Live shader background with the name baked in (new feature). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <ShaderBackground />
        {/* Legibility scrim so hero copy stays readable over the shader. */}
        <div className="absolute inset-0 bg-background/45" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left: identity + value proposition */}
        <div>
          <p className="animate-rise inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Data Engineer · {PROFILE.location} · open to work
          </p>

          <h1
            className="animate-wipe mt-6 text-balance font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Reliable data pipelines, from messy source to{" "}
            <span className="text-primary">trusted dataset</span>.
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            I&apos;m {PROFILE.name}, a Data Engineer who turns raw, messy data
            into datasets teams can actually trust. Strong in Python and SQL,
            comfortable across batch and streaming, and obsessed with data
            quality and observability.
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "280ms" }}
          >
            <Button
              asChild
              size="lg"
              className="btn-motion h-11 px-6 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <a href={`mailto:${PROFILE.email}`}>Get in touch</a>
            </Button>
            <Button
              type="button"
              onClick={openChat}
              variant="outline"
              size="lg"
              className="btn-motion group h-11 px-6 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ask my AI
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                fill="none"
                className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M5 11.5 11 5.5M11 5.5H5.5M11 5.5V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>

          <p
            className="animate-rise mt-4 font-mono text-xs text-muted-foreground"
            style={{ animationDelay: "340ms" }}
          >
            try asking it &ldquo;why should we hire Dhanush?&rdquo;
          </p>
        </div>

        {/* Right: terminal-style stack panel (the hero's "imagery") */}
        <div className="animate-rise" style={{ animationDelay: "180ms" }}>
          <div className="overflow-hidden rounded-xl border border-border bg-card/80 shadow-2xl shadow-black/40 backdrop-blur-sm transition-colors duration-300 hover:border-primary/35">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/25" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                ~/dhanush — stack
              </span>
            </div>

            <div className="space-y-3 p-5 font-mono text-sm leading-relaxed">
              <p className="boot-line text-muted-foreground" style={bootDelay(0)}>
                <span className="text-primary">$</span> whoami
              </p>
              <p className="boot-line text-foreground" style={bootDelay(1)}>
                {PROFILE.role} · {PROFILE.location}
              </p>

              <p
                className="boot-line pt-1 text-muted-foreground"
                style={bootDelay(2)}
              >
                <span className="text-primary">$</span> cat core-stack.txt
              </p>
              <ul
                className="boot-line grid grid-cols-2 gap-x-4 gap-y-2 text-foreground/90"
                style={bootDelay(3)}
              >
                {CORE_STACK.map((skill) => (
                  <li key={skill} className="flex items-start gap-2">
                    <span aria-hidden className="text-primary">
                      ›
                    </span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              <p
                className="boot-line pt-1 text-muted-foreground"
                style={bootDelay(4)}
              >
                <span className="text-primary">$</span> status
              </p>
              <p
                className="boot-line flex items-center gap-2 text-foreground/90"
                style={bootDelay(5)}
              >
                <span aria-hidden className="text-primary">
                  ●
                </span>
                pipelines: green · data quality: enforced
              </p>

              <p
                className="boot-line flex items-center gap-1.5 pt-1 text-muted-foreground"
                style={bootDelay(6)}
              >
                <span className="text-primary">$</span>
                <span
                  aria-hidden
                  className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-primary"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
