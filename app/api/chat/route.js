import { buildSystemPrompt } from "../../../data/about";

// This route runs ON THE SERVER. Your API key stays here and is never sent to
// the browser. This is the secure boundary that protects your key + bill.

export const runtime = "edge"; // fast, free serverless on Vercel

// ---------------------------------------------------------------------------
//  PROVIDER: Google Gemini (free tier). To swap to Claude or OpenAI, replace
//  the callModel function below — the rest of the app doesn't change.
// ---------------------------------------------------------------------------
async function callModel(systemPrompt, messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local");
  }

  // Gemini takes the system prompt separately and a list of user/model turns.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${detail}`);
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Sorry, I couldn't generate a response. Try rephrasing?";
  return text;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    // Basic guardrail: cap conversation length to control cost / abuse.
    const trimmed = messages.slice(-10);

    const reply = await callModel(buildSystemPrompt(), trimmed);
    return Response.json({ reply });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
