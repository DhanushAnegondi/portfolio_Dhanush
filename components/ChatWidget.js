"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Why should we hire Dhanush?",
  "What are his strongest skills?",
  "Tell me about his projects.",
  "Is he a fit for a Data Engineering role?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Dhanush's AI assistant. Ask me anything about his skills, projects, or why he'd be a great hire.",
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  // Let other components (e.g. the hero "Ask my AI" button) open the widget.
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content: data.reply ?? data.error ?? "Something went wrong.",
        },
      ]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <Button
        aria-label="Open chat"
        onClick={() => setOpen((o) => !o)}
        size="lg"
        className="btn-motion fixed bottom-6 right-6 z-50 rounded-full shadow-lg h-12 px-5"
      >
        {open ? (
          <>
            <X /> Close
          </>
        ) : (
          <>
            <MessageCircle /> Ask AI
          </>
        )}
      </Button>

      {open && (
        <div className="animate-pop fixed bottom-24 right-6 z-50 flex h-[520px] max-h-[calc(100vh-120px)] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <span className="font-semibold">Ask about Dhanush</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              AI
            </span>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "self-end bg-primary text-primary-foreground"
                    : "self-start bg-muted text-foreground"
                )}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="self-start rounded-2xl bg-muted px-3.5 py-2.5 text-sm italic text-muted-foreground">
                typing…
              </div>
            )}

            {messages.length === 1 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border bg-background px-3 py-1.5 text-xs transition-colors hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-2 border-t p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <Input
              value={input}
              placeholder="Type a question…"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" size="icon" disabled={loading}>
              <Send />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
