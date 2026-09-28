// db.js — SQLite data layer (better-sqlite3). Single-file database holding
// users, attempts, bookmarks, notes, adventure state, and (via the session
// store) login sessions. All queries are parameterized.
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

let db = null;

function init(dbPath) {
  const resolved = path.resolve(dbPath);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  db = new Database(resolved);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_pro INTEGER NOT NULL DEFAULT 0,
      pro_plan TEXT,
      stripe_customer_id TEXT,
      xp INTEGER NOT NULL DEFAULT 0,
      math_cash INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      problem_id INTEGER NOT NULL,
      correct INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
    CREATE INDEX IF NOT EXISTS idx_attempts_user_date ON attempts(user_id, created_at);
    CREATE TABLE IF NOT EXISTS bookmarks (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      problem_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, problem_id)
    );
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      problem_id INTEGER NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_notes_user ON notes(user_id);
    CREATE TABLE IF NOT EXISTS adventure (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      state_json TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

function conn() {
  if (!db) throw new Error('Database not initialized — call init() first');
  return db;
}

// ---- users ----
function createUser(email, passwordHash) {
  const info = conn().prepare(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)'
  ).run(email, passwordHash);
  return findUserById(info.lastInsertRowid);
}
function findUserByEmail(email) {
  return conn().prepare('SELECT * FROM users WHERE email = ?').get(email) || null;
}
function findUserById(id) {
  return conn().prepare('SELECT * FROM users WHERE id = ?').get(id) || null;
}
function setPro(userId, plan, stripeCustomerId) {
  conn().prepare(
    'UPDATE users SET is_pro = 1, pro_plan = ?, stripe_customer_id = COALESCE(?, stripe_customer_id) WHERE id = ?'
  ).run(plan || 'monthly', stripeCustomerId || null, userId);
}
function revokePro(userId) {
  conn().prepare('UPDATE users SET is_pro = 0, pro_plan = NULL WHERE id = ?').run(userId);
}
function addRewards(userId, xp, cash) {
  const x = Math.max(0, Math.min(1000, Math.floor(Number(xp) || 0)));
  const c = Math.max(0, Math.min(500, Math.floor(Number(cash) || 0)));
  conn().prepare('UPDATE users SET xp = xp + ?, math_cash = math_cash + ? WHERE id = ?').run(x, c, userId);
  return findUserById(userId);
}

// ---- attempts / analytics ----
function recordAttempt(userId, problemId, correct) {
  conn().prepare(
    'INSERT INTO attempts (user_id, problem_id, correct) VALUES (?, ?, ?)'
  ).run(userId, problemId, correct ? 1 : 0);
}
function getAttempts(userId) {
  return conn().prepare(
    "SELECT problem_id AS problemId, correct, date(created_at) AS day, created_at AS createdAt FROM attempts WHERE user_id = ? ORDER BY created_at ASC"
  ).all(userId);
}

// ---- bookmarks ----
function getBookmarks(userId) {
  return conn().prepare(
    'SELECT problem_id AS problemId, created_at AS createdAt FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC'
  ).all(userId);
}
function addBookmark(userId, problemId) {
  conn().prepare('INSERT OR IGNORE INTO bookmarks (user_id, problem_id) VALUES (?, ?)').run(userId, problemId);
}
function removeBookmark(userId, problemId) {
  conn().prepare('DELETE FROM bookmarks WHERE user_id = ? AND problem_id = ?').run(userId, problemId);
}

// ---- notes ----
function getNotes(userId) {
  return conn().prepare(
    'SELECT id, problem_id AS problemId, body, created_at AS createdAt, updated_at AS updatedAt FROM notes WHERE user_id = ? ORDER BY updated_at DESC'
  ).all(userId);
}
function createNote(userId, problemId, body) {
  const info = conn().prepare(
    'INSERT INTO notes (user_id, problem_id, body) VALUES (?, ?, ?)'
  ).run(userId, problemId, body);
  return conn().prepare(
    'SELECT id, problem_id AS problemId, body, created_at AS createdAt, updated_at AS updatedAt FROM notes WHERE id = ?'
  ).get(info.lastInsertRowid);
}
function updateNote(userId, noteId, body) {
  conn().prepare(
    "UPDATE notes SET body = ?, updated_at = datetime('now') WHERE id = ? AND user_id = ?"
  ).run(body, noteId, userId);
  return conn().prepare(
    'SELECT id, problem_id AS problemId, body, created_at AS createdAt, updated_at AS updatedAt FROM notes WHERE id = ? AND user_id = ?'
  ).get(noteId, userId) || null;
}
function deleteNote(userId, noteId) {
  conn().prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').run(noteId, userId);
}

// ---- adventure ----
function getAdventure(userId) {
  return conn().prepare('SELECT state_json AS stateJson, updated_at AS updatedAt FROM adventure WHERE user_id = ?').get(userId) || null;
}
function saveAdventure(userId, stateJson) {
  conn().prepare(
    `INSERT INTO adventure (user_id, state_json, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET state_json = excluded.state_json, updated_at = datetime('now')`
  ).run(userId, stateJson);
}

module.exports = {
  init, conn,
  createUser, findUserByEmail, findUserById, setPro, revokePro, addRewards,
  recordAttempt, getAttempts,
  getBookmarks, addBookmark, removeBookmark,
  getNotes, createNote, updateNote, deleteNote,
  getAdventure, saveAdventure,
};
