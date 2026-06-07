# Portfolio + AI Assistant

A Next.js portfolio with a built-in AI agent. Visitors can ask things like
**"Why should we hire Dhanush?"** and get an answer generated live from your
background.

## How it works

```
Visitor → ChatWidget (browser) → /api/chat (server, holds the API key) → Gemini → reply
```

Your API key lives **only on the server** (`app/api/chat/route.js`), so it's
never exposed to visitors.

## Run it locally

1. **Install Node.js** (v18+) if you don't have it: https://nodejs.org
2. **Get a free API key** (no credit card): https://aistudio.google.com/apikey
3. In this folder:
   ```bash
   npm install
   cp .env.local.example .env.local   # then paste your key into .env.local
   npm run dev
   ```
4. Open http://localhost:3000 and click **"Ask AI"** (bottom-right).

## Make it about you

Edit **`data/about.js`** — that's your entire knowledge base (summary, skills,
projects, highlights). No other file needs changing. The AI only knows what's
in there, so be specific and honest.

## Deploy (free)

Push to GitHub and import into [Vercel](https://vercel.com). Add `GEMINI_API_KEY`
in Vercel's **Environment Variables** settings. Done — it's live.

## Switch model provider later

Only one function changes: `callModel` in `app/api/chat/route.js`.
- **Claude:** call `https://api.anthropic.com/v1/messages` with an
  `ANTHROPIC_API_KEY`.
- **OpenAI:** call the Chat Completions endpoint with an `OPENAI_API_KEY`.

The frontend and knowledge base stay identical.

## Cost & safety notes

- Gemini's free tier is plenty for portfolio traffic.
- The server caps each conversation to the last 10 messages to limit abuse.
- For production, consider adding rate limiting (e.g. by IP) on `/api/chat`.
