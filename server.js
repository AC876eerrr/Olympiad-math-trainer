// server.js — Olympiad Math Trainer backend.
// Express + SQLite (better-sqlite3) + cookie sessions + optional Stripe.
// Serves the vanilla frontend from ./public and exposes /api/* endpoints.
// Pro-tier gating is ENFORCED HERE, server-side — never trust the UI.
require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');

const db = require('./db');
const gen = require('./problems/generator');
const toolkit = require('./content/toolkit');
const { CHAPTERS, getChapter } = require('./content/adventure');

// ---------- config ----------
const PORT = Number(process.env.PORT) || 3000;
const BASE_URL = (process.env.BASE_URL || `http://localhost:${PORT}`).replace(/\/+$/, '');
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'app.db');
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-only-secret-change-me-in-production';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const PRICE_MONTHLY = process.env.STRIPE_PRICE_MONTHLY || '';
const PRICE_ANNUAL = process.env.STRIPE_PRICE_ANNUAL || '';

let stripe = null;
if (STRIPE_SECRET_KEY) {
  stripe = require('stripe')(STRIPE_SECRET_KEY);
}
const billingConfigured = Boolean(stripe && PRICE_MONTHLY && PRICE_ANNUAL);

db.init(DB_PATH);

// ---------- app ----------
const app = express();
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false })); // vanilla inline scripts; CSP off

// Stripe webhook needs the RAW body — mount before express.json()
app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!STRIPE_WEBHOOK_SECRET || !stripe) {
    return res.status(400).json({ error: 'webhook_not_configured', message: 'Stripe webhook is not configured.' });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).json({ error: 'bad_signature', message: 'Invalid webhook signature.' });
  }
  try {
    if (event.type === 'checkout.session.completed') {
      const s = event.data.object;
      const userId = Number(s.metadata && s.metadata.userId);
      const plan = (s.metadata && s.metadata.plan) || 'monthly';
      if (userId) db.setPro(userId, plan, (s.customer && String(s.customer)) || null);
    } else if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      const customerId = sub.customer && String(sub.customer);
      if (customerId) {
        const row = db.conn().prepare('SELECT id FROM users WHERE stripe_customer_id = ?').get(customerId);
        if (row) db.revokePro(row.id);
      }
    }
  } catch (e) {
    console.error('webhook handler error:', e.message);
  }
  res.json({ received: true });
});

app.use(express.json({ limit: '256kb' }));

// ---------- sessions (SQLite store — never MemoryStore) ----------
const SqliteStore = require('better-sqlite3-session-store')(session);
app.use(session({
  store: new SqliteStore({ client: db.conn(), expired: { clear: true, intervalMs: 15 * 60 * 1000 } }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    sameSite: 'lax',
    secure: BASE_URL.startsWith('https://'),
  },
}));

// ---------- rate limiting ----------
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false });
const generalLimiter = rateLimit({ windowMs: 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false });
app.use('/api/auth/', authLimiter);
app.use('/api/', generalLimiter);

// ---------- helpers ----------
function currentUser(req) {
  const id = req.session && req.session.userId;
  if (!id) return null;
  return db.findUserById(id);
}
function publicUser(u) {
  if (!u) return null;
  return { id: u.id, email: u.email, isPro: !!u.is_pro, proPlan: u.pro_plan, xp: u.xp, mathCash: u.math_cash };
}
function requireLogin(req, res, next) {
  const user = currentUser(req);
  if (!user) return res.status(401).json({ error: 'auth_required', message: 'Please log in first.' });
  req.user = user;
  next();
}
// Server-side Pro gating. Free tier: first 500 problems (ids 0–499) AND difficulty ≤ 14.
function canSeeProblem(user, meta) {
  if (user.is_pro) return true;
  return meta.id < 500 && meta.difficulty <= 14;
}
function proLocked(res, what) {
  return res.status(403).json({ error: 'pro_locked', message: `${what} requires a Pro account. Upgrade to unlock everything.` });
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validProblemId(v) {
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 && n < gen.TOTAL_PROBLEMS ? n : null;
}

// ---------- health ----------
app.get('/api/health', (req, res) => res.json({ ok: true, problems: gen.TOTAL_PROBLEMS }));

// ---------- auth ----------
app.post('/api/auth/signup', async (req, res) => {
  const email = String(req.body && req.body.email || '').trim().toLowerCase();
  const password = String(req.body && req.body.password || '');
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'validation', message: 'Enter a valid email address.' });
  if (password.length < 8) return res.status(400).json({ error: 'validation', message: 'Password must be at least 8 characters.' });
  if (db.findUserByEmail(email)) return res.status(400).json({ error: 'validation', message: 'An account with this email already exists. Try logging in.' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = db.createUser(email, hash);
    await new Promise((resolve, reject) => req.session.regenerate((e) => (e ? reject(e) : resolve())));
    req.session.userId = user.id;
    res.json({ ok: true, user: publicUser(user) });
  } catch (e) {
    console.error('signup error:', e.message);
    res.status(500).json({ error: 'server_error', message: 'Could not create the account. Try again.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body && req.body.email || '').trim().toLowerCase();
  const password = String(req.body && req.body.password || '');
  const user = db.findUserByEmail(email);
  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) return res.status(401).json({ error: 'invalid_credentials', message: 'Wrong email or password.' });
  await new Promise((resolve, reject) => req.session.regenerate((e) => (e ? reject(e) : resolve())));
  req.session.userId = user.id;
  res.json({ ok: true, user: publicUser(db.findUserById(user.id)) });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({ user: publicUser(currentUser(req)) });
});

// ---------- problems (gated) ----------
app.get('/api/problem/:id', requireLogin, (req, res) => {
  const id = validProblemId(req.params.id);
  if (id === null) return res.status(404).json({ error: 'not_found', message: 'Problem not found.' });
  let meta;
  try { meta = gen.getMeta(id); } catch (e) { return res.status(404).json({ error: 'not_found' }); }
  if (!canSeeProblem(req.user, meta)) return proLocked(res, 'This problem');
  res.json({ problem: gen.getProblem(id) });
});

app.get('/api/problems', requireLogin, (req, res) => {
  const contest = req.query.contest ? String(req.query.contest) : null;
  const topic = req.query.topic ? String(req.query.topic) : null;
  if (contest && !gen.CONTESTS.includes(contest)) return res.status(400).json({ error: 'validation', message: 'Unknown contest.' });
  if (topic && !gen.TOPICS.includes(topic)) return res.status(400).json({ error: 'validation', message: 'Unknown topic.' });
  const clampD = (v, d) => { const n = parseInt(v, 10); return Number.isInteger(n) ? Math.max(11, Math.min(20, n)) : d; };
  const minDiff = clampD(req.query.minDiff, 11);
  const maxDiff = clampD(req.query.maxDiff, 20);
  if (!req.user.is_pro && minDiff > 14) return proLocked(res, 'Difficulty above 14');
  const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 20));
  const matches = [];
  for (let id = 0; id < gen.TOTAL_PROBLEMS; id++) {
    const m = gen.getMeta(id);
    if (contest && m.contest !== contest) continue;
    if (topic && m.topic !== topic) continue;
    if (m.difficulty < minDiff || m.difficulty > maxDiff) continue;
    if (!canSeeProblem(req.user, m)) continue;
    matches.push({ id: m.id, contest: m.contest, difficulty: m.difficulty, topic: m.topic });
  }
  res.json({ problems: matches.slice(offset, offset + limit), total: matches.length });
});

// ---------- attempts & analytics ----------
app.post('/api/attempt', requireLogin, (req, res) => {
  const problemId = validProblemId(req.body && req.body.problemId);
  const correct = !!(req.body && req.body.correct);
  if (problemId === null) return res.status(400).json({ error: 'validation', message: 'Invalid problem id.' });
  if (!canSeeProblem(req.user, gen.getMeta(problemId))) return proLocked(res, 'This problem');
  db.recordAttempt(req.user.id, problemId, correct);
  const fresh = correct ? db.addRewards(req.user.id, 10, 2) : db.findUserById(req.user.id);
  res.json({ ok: true, xp: fresh.xp, mathCash: fresh.math_cash });
});

app.get('/api/analytics', requireLogin, (req, res) => {
  const rows = db.getAttempts(req.user.id);
  const totals = { solved: rows.length, correct: 0, accuracy: 0 };
  const byTopic = {};
  const byContest = {};
  for (const t of gen.TOPICS) byTopic[t] = { solved: 0, correct: 0 };
  for (const c of gen.CONTESTS) byContest[c] = { solved: 0, correct: 0 };
  const days = new Set();
  for (const r of rows) {
    if (r.correct) totals.correct++;
    days.add(r.day);
    try {
      const m = gen.getMeta(r.problemId);
      byTopic[m.topic].solved++; byContest[m.contest].solved++;
      if (r.correct) { byTopic[m.topic].correct++; byContest[m.contest].correct++; }
    } catch (e) { /* problem id out of range — ignore */ }
  }
  totals.accuracy = totals.solved ? Math.round((totals.correct / totals.solved) * 100) : 0;
  // streak: consecutive days with activity, counting today or yesterday as day 0
  const dayList = [...days].sort().reverse();
  let streakDays = 0;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (const d of dayList) {
    const dt = new Date(d + 'T00:00:00'); dt.setHours(0, 0, 0, 0);
    const diff = Math.round((today - dt) / 86400000);
    if (diff === streakDays || (streakDays === 0 && diff === 1)) { streakDays++; }
    else break;
  }
  const u = db.findUserById(req.user.id);
  res.json({ totals, byTopic, byContest, streakDays, xp: u.xp, mathCash: u.math_cash });
});

// ---------- bookmarks ----------
app.get('/api/bookmarks', requireLogin, (req, res) => res.json({ bookmarks: db.getBookmarks(req.user.id) }));
app.post('/api/bookmarks', requireLogin, (req, res) => {
  const problemId = validProblemId(req.body && req.body.problemId);
  if (problemId === null) return res.status(400).json({ error: 'validation', message: 'Invalid problem id.' });
  if (!canSeeProblem(req.user, gen.getMeta(problemId))) return proLocked(res, 'This problem');
  db.addBookmark(req.user.id, problemId);
  res.json({ ok: true });
});
app.delete('/api/bookmarks/:problemId', requireLogin, (req, res) => {
  const problemId = validProblemId(req.params.problemId);
  if (problemId === null) return res.status(400).json({ error: 'validation', message: 'Invalid problem id.' });
  db.removeBookmark(req.user.id, problemId);
  res.json({ ok: true });
});

// ---------- notes ----------
app.get('/api/notes', requireLogin, (req, res) => res.json({ notes: db.getNotes(req.user.id) }));
app.post('/api/notes', requireLogin, (req, res) => {
  const problemId = validProblemId(req.body && req.body.problemId);
  const body = String(req.body && req.body.body || '').slice(0, 20000);
  if (problemId === null) return res.status(400).json({ error: 'validation', message: 'Invalid problem id.' });
  if (!body.trim()) return res.status(400).json({ error: 'validation', message: 'Note cannot be empty.' });
  res.json({ note: db.createNote(req.user.id, problemId, body) });
});
app.put('/api/notes/:id', requireLogin, (req, res) => {
  const body = String(req.body && req.body.body || '').slice(0, 20000);
  const note = db.updateNote(req.user.id, Number(req.params.id), body);
  if (!note) return res.status(404).json({ error: 'not_found', message: 'Note not found.' });
  res.json({ note });
});
app.delete('/api/notes/:id', requireLogin, (req, res) => {
  db.deleteNote(req.user.id, Number(req.params.id));
  res.json({ ok: true });
});

// ---------- strategy toolkit (gated: first 10 free) ----------
app.get('/api/toolkit', requireLogin, (req, res) => {
  res.json({
    methods: toolkit.listMethods().map((m) => ({ ...m, locked: !req.user.is_pro && m.id >= 10 })),
  });
});
app.get('/api/toolkit/:id', requireLogin, (req, res) => {
  const id = Number(req.params.id);
  let method;
  try { method = toolkit.getMethod(id); }
  catch (e) { return res.status(404).json({ error: 'not_found', message: 'Method not found.' }); }
  if (!req.user.is_pro && id >= 10) return proLocked(res, 'This strategy method');
  res.json({ method });
});

// ---------- adventure mode ----------
app.get('/api/adventure', requireLogin, (req, res) => {
  const row = db.getAdventure(req.user.id);
  res.json({
    state: row ? JSON.parse(row.stateJson) : null,
    chapters: CHAPTERS.map((c) => ({
      n: c.n, title: c.title, playable: c.playable,
      locked: c.n > 1, // chapters 2–6 not yet released; will be Pro-only when released
      teaser: c.teaser || null,
    })),
    chapter1: getChapter(1),
  });
});

app.post('/api/adventure', requireLogin, (req, res) => {
  const { state, rewards } = req.body || {};
  if (!state || typeof state !== 'object') return res.status(400).json({ error: 'validation', message: 'Missing adventure state.' });
  const chapter = getChapter(Number(state.chapter));
  if (!chapter) return res.status(400).json({ error: 'validation', message: 'Unknown chapter.' });
  if (!chapter.playable) return res.status(400).json({ error: 'not_released', message: 'This chapter is not released yet.' });
  if (chapter.n > 1 && !req.user.is_pro) return proLocked(res, 'Later chapters');
  // sanitize numeric fields
  const clean = {
    chapter: chapter.n,
    playerHp: Math.max(0, Math.min(chapter.playerMaxHp, Math.floor(Number(state.playerHp) || 0))),
    bossHp: Math.max(0, Math.min(chapter.bossMaxHp, Math.floor(Number(state.bossHp) ?? chapter.bossMaxHp))),
    potions: Math.max(0, Math.min(99, Math.floor(Number(state.potions) || 0))),
    currentProblemId: validProblemId(state.currentProblemId),
    log: Array.isArray(state.log) ? state.log.slice(-50).map(String).slice(0, 50).map((s) => s.slice(0, 300)) : [],
    status: ['fighting', 'victory', 'defeat'].includes(state.status) ? state.status : 'fighting',
  };
  db.saveAdventure(req.user.id, JSON.stringify(clean));
  let fresh = req.user;
  if (rewards && typeof rewards === 'object') {
    fresh = db.addRewards(req.user.id, rewards.xp, rewards.cash);
  }
  res.json({ ok: true, state: clean, xp: fresh.xp, mathCash: fresh.math_cash });
});

// ---------- billing (Stripe; safe when keys absent) ----------
app.get('/api/billing/status', requireLogin, (req, res) => {
  res.json({ isPro: !!req.user.is_pro, plan: req.user.pro_plan, billingConfigured });
});

app.post('/api/billing/checkout', requireLogin, async (req, res) => {
  if (!billingConfigured) {
    return res.status(503).json({
      error: 'billing_not_configured',
      message: 'Online checkout is coming soon — contact the site owner to upgrade to Pro.',
    });
  }
  const plan = req.body && req.body.plan === 'annual' ? 'annual' : 'monthly';
  const price = plan === 'annual' ? PRICE_ANNUAL : PRICE_MONTHLY;
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: req.user.email,
      line_items: [{ price, quantity: 1 }],
      metadata: { userId: String(req.user.id), plan },
      success_url: `${BASE_URL}/billing.html?success=1`,
      cancel_url: `${BASE_URL}/billing.html?canceled=1`,
    });
    res.json({ url: checkoutSession.url });
  } catch (e) {
    console.error('stripe checkout error:', e.message);
    res.status(502).json({ error: 'stripe_error', message: 'Could not start checkout. Please try again later.' });
  }
});

// ---------- static frontend ----------
app.use(express.static(path.join(__dirname, 'public')));

// ---------- 404 + errors ----------
app.use('/api/', (req, res) => res.status(404).json({ error: 'not_found', message: 'Unknown API endpoint.' }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('unhandled error:', err && err.message);
  res.status(500).json({ error: 'server_error', message: 'Something went wrong.' });
});

// ---------- start ----------
app.listen(PORT, () => {
  console.log(`Olympiad Math Trainer listening on ${BASE_URL}`);
  console.log(`Database: ${DB_PATH} | Problems: ${gen.TOTAL_PROBLEMS}`);
  if (SESSION_SECRET.startsWith('dev-only')) console.log('WARNING: using dev SESSION_SECRET — set SESSION_SECRET in production.');
  if (!billingConfigured) console.log('NOTE: Stripe not configured — Pro checkout will show the "coming soon" state.');
});
