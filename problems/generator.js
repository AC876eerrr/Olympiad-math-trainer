// problems/generator.js — deterministic problem engine.
// 12,000 problems = 240 templates × 50 variants. Every problem id maps to a
// (contest, template, variant) triple; the PRNG is re-seeded from that triple
// on EVERY call, so getProblem(id) returns byte-identical JSON across server
// restarts (no caching — purity is what guarantees determinism).
//
// Template files (written separately):
//   templates-amc8.js   — 60 templates, difficulty 11–13, ids 0–2999
//   templates-amc10.js  — 60 templates, difficulty 12–15, ids 3000–5999
//   templates-amc12.js  — 40 templates, difficulty 13–16, ids 6000–7999
//   templates-aime.js   — 40 templates, difficulty 15–18, ids 8000–9999
//   templates-usajmo.js — 40 templates, difficulty 17–20, ids 10000–11999
// Within each contest, templates are sorted by difficulty ascending, so the
// lowest ids are the easiest (free tier serves ids 0–499, all difficulty ≤14).

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The rng object every template's gen() receives.
function makeRng(seedStr) {
  const seedFn = xmur3(seedStr);
  const f = mulberry32(seedFn());
  return {
    f: () => f(),
    int: (min, max) => {
      min = Math.ceil(min); max = Math.floor(max);
      return min + Math.floor(f() * (max - min + 1));
    },
    pick: (arr) => arr[Math.floor(f() * arr.length)],
    shuffle: (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(f() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

const CONTESTS = ['AMC 8', 'AMC 10', 'AMC 12', 'AIME', 'USAJMO'];
const TOPICS = ['algebra', 'geometry', 'number_theory', 'combinatorics'];
const VARIANTS = 50;

const BLOCKS = [
  { contest: 'AMC 8', start: 0, file: './templates-amc8', expect: 60, minD: 11, maxD: 13 },
  { contest: 'AMC 10', start: 3000, file: './templates-amc10', expect: 60, minD: 12, maxD: 15 },
  { contest: 'AMC 12', start: 6000, file: './templates-amc12', expect: 40, minD: 13, maxD: 16 },
  { contest: 'AIME', start: 8000, file: './templates-aime', expect: 40, minD: 15, maxD: 18 },
  { contest: 'USAJMO', start: 10000, file: './templates-usajmo', expect: 40, minD: 17, maxD: 20 },
].map((b) => {
  const templates = require(b.file).slice().sort((x, y) => x.difficulty - y.difficulty);
  if (templates.length !== b.expect) {
    throw new Error(`Template count mismatch in ${b.file}: expected ${b.expect}, got ${templates.length}`);
  }
  for (const t of templates) {
    if (!Number.isInteger(t.difficulty) || t.difficulty < b.minD || t.difficulty > b.maxD) {
      throw new Error(`Template difficulty out of band in ${b.file}: ${t.difficulty}`);
    }
    if (!TOPICS.includes(t.topic)) throw new Error(`Bad topic in ${b.file}: ${t.topic}`);
    if (typeof t.gen !== 'function') throw new Error(`Template missing gen() in ${b.file}`);
  }
  return { ...b, templates };
});

const TOTAL_PROBLEMS = 12000;

function blockOf(id) {
  for (const b of BLOCKS) {
    if (id >= b.start && id < b.start + b.expect * VARIANTS) return b;
  }
  return null;
}

// O(1): no problem generation, just id arithmetic + template lookup.
function getMeta(id) {
  if (!Number.isInteger(id) || id < 0 || id >= TOTAL_PROBLEMS) throw new RangeError(`Problem id out of range: ${id}`);
  const b = blockOf(id);
  const local = id - b.start;
  const t = b.templates[Math.floor(local / VARIANTS)];
  return { id, contest: b.contest, difficulty: t.difficulty, topic: t.topic };
}

function getProblem(id) {
  const meta = getMeta(id); // validates range
  const b = blockOf(id);
  const local = id - b.start;
  const templateIdx = Math.floor(local / VARIANTS);
  const variant = local % VARIANTS;
  const rng = makeRng(`${b.contest}|${templateIdx}|${variant}`);
  const p = b.templates[templateIdx].gen(rng);
  return {
    id: meta.id,
    contest: meta.contest,
    difficulty: meta.difficulty,
    topic: meta.topic,
    statement: p.statement,
    choices: p.choices,
    answer: p.answer,
    hint: p.hint,
    solution: p.solution,
  };
}

function countByContest() {
  const out = {};
  for (const b of BLOCKS) out[b.contest] = b.expect * VARIANTS;
  return out;
}

module.exports = { TOTAL_PROBLEMS, CONTESTS, TOPICS, getMeta, getProblem, countByContest };

// ---------- self-test ----------
if (require.main === module) {
  let fail = 0;
  const ok = (cond, msg) => { if (!cond) { fail++; console.error('FAIL:', msg); } };

  // 1. determinism: same id twice → identical JSON
  for (let i = 0; i < 300; i++) {
    const id = (i * 7919) % TOTAL_PROBLEMS;
    const a = JSON.stringify(getProblem(id));
    const b2 = JSON.stringify(getProblem(id));
    ok(a === b2, `non-deterministic problem ${id}`);
  }

  // 2. sanity across 600 sampled problems
  const seenDiff = {};
  for (let i = 0; i < 600; i++) {
    const id = (i * 104729 + 13) % TOTAL_PROBLEMS;
    const p = getProblem(id);
    const m = getMeta(id);
    ok(p.id === id && p.contest === m.contest && p.difficulty === m.difficulty && p.topic === m.topic, `meta mismatch ${id}`);
    ok(typeof p.statement === 'string' && p.statement.length > 10, `bad statement ${id}`);
    ok(typeof p.answer === 'string' && p.answer.length > 0, `bad answer ${id}`);
    ok(typeof p.hint === 'string' && p.hint.length > 0, `bad hint ${id}`);
    ok(typeof p.solution === 'string' && p.solution.length > 0, `bad solution ${id}`);
    ok(!/<[a-zA-Z/!]/.test(p.statement), `HTML-like tag in statement ${id}`);
    if (p.contest.startsWith('AMC')) {
      ok(Array.isArray(p.choices) && p.choices.length === 5, `AMC choices != 5 (${id})`);
      ok(new Set(p.choices).size === 5, `duplicate choices (${id})`);
      ok(p.choices.filter((c) => c === p.answer).length === 1, `answer not exactly once in choices (${id})`);
    } else {
      ok(p.choices === null, `non-AMC should have null choices (${id})`);
    }
    if (p.contest === 'AIME') {
      ok(/^\d{1,3}$/.test(p.answer) && Number(p.answer) <= 999, `bad AIME answer (${id})`);
    }
    seenDiff[p.contest] = seenDiff[p.contest] || new Set();
    seenDiff[p.contest].add(p.difficulty);
  }

  // 3. free-tier layout: ids 0–499 all difficulty ≤ 14
  for (let id = 0; id < 500; id++) {
    ok(getMeta(id).difficulty <= 14, `free-tier id ${id} has difficulty > 14`);
  }

  // 4. contest bands respected
  const bands = { 'AMC 8': [11, 13], 'AMC 10': [12, 15], 'AMC 12': [13, 16], AIME: [15, 18], USAJMO: [17, 20] };
  for (const [c, set] of Object.entries(seenDiff)) {
    for (const d of set) ok(d >= bands[c][0] && d <= bands[c][1], `difficulty ${d} out of band for ${c}`);
  }

  // 5. range errors
  for (const bad of [-1, 12000, 1.5, 'x']) {
    let threw = false;
    try { getMeta(bad); } catch (e) { threw = e instanceof RangeError; }
    ok(threw, `no RangeError for ${bad}`);
  }

  console.log(fail === 0 ? `PASS (determinism, sanity, free-tier layout, bands, range errors)` : `${fail} FAILURES`);
  process.exit(fail === 0 ? 0 : 1);
}
