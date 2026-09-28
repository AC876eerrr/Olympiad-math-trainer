# Olympiad Math Trainer

A production competition-math training platform: 12,000 deterministic problems
(AMC 8 → USAJMO), drills, timed mock contests, a 50-method Strategy Toolkit,
per-user analytics, an adventure RPG mode, and a Free/Pro subscription tier
with Stripe checkout.

**Live site:** https://olympiadmath.xyz

## Tech stack

- **Backend:** Node.js + Express (vanilla, no framework magic)
- **Frontend:** vanilla HTML/CSS/JS in `public/` (no build step — what you see is what ships)
- **Database:** SQLite via `better-sqlite3` (single file; sessions stored in SQLite too — never the in-memory store)
- **Auth:** bcryptjs password hashing, 30-day persistent cookie sessions
- **Payments:** Stripe Checkout + webhooks (optional; the app runs fine without keys)

## Run locally

```bash
npm install
npm start
# → http://localhost:3000
```

Copy `.env.example` to `.env` to customize (`BASE_URL`, `DB_PATH`,
`SESSION_SECRET`, Stripe keys). Without Stripe keys, Pro checkout shows a
"coming soon" state instead of crashing.

## Project structure

```
server.js               Express app: auth, problems API, gating, billing, static files
db.js                   SQLite schema + data-access helpers
problems/generator.js   Deterministic engine: 240 templates × 50 variants = 12,000 problems
problems/templates-*.js  Per-contest problem templates (pure functions of a seeded PRNG)
content/toolkit.js      50 strategy methods (first 10 free, rest Pro)
content/adventure.js    Adventure-mode chapter definitions (Ch.1 playable)
public/                 Frontend: landing, auth, trainer, toolkit, analytics, adventure, billing
Dockerfile              Container build (persistent volume at /data)
render.yaml             Render hosting blueprint (primary host)
DEPLOY.md               Click-by-click deploy guide for the site owner
```

## Key design decisions

- **Deterministic problems:** `getProblem(id)` re-seeds its PRNG from the id on
  every call, so the same id returns byte-identical JSON across restarts. No
  database needed for the problem bank.
- **Server-side Pro gating:** free accounts are blocked at the API level —
  problems ≥ id 500, difficulty > 14, toolkit methods ≥ 10, and later adventure
  chapters all return `403 pro_locked`. The UI merely reflects what the API allows.
- **Free tier:** 500 problems, difficulty ≤ 14, 10 toolkit methods, RPG Chapter 1.
- **Pro:** $8/month or $60/year — everything unlocked.

## Known limitations (documented, not bugs)

- No password-reset email flow (no email service configured). The login page says
  so and directs users to contact the site owner.
- Adventure chapters 2–6 are defined as locked metadata; only Chapter 1 is playable.
- Stripe is optional: without keys, checkout endpoints return a clean "coming soon"
  response. Flip to live by adding live keys + price IDs + webhook secret.
