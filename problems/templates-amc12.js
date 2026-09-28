"use strict";
// AMC 12 problem templates, difficulty 13-16.
// Interface: module.exports = [t1, ..., t40], each { difficulty, topic, gen(rng) }.
// gen(rng) is pure: uses only rng.f(), rng.int(min,max), rng.pick(arr), rng.shuffle(arr).

// ---------- pure helpers (no dependencies) ----------
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { const t = a % b; a = b; b = t; }
  return a;
}
function frac(p, q) { // reduced fraction string, e.g. "7/4" or "5"
  if (q < 0) { p = -p; q = -q; }
  const g = gcd(p, q) || 1; p /= g; q /= g;
  return q === 1 ? String(p) : p + "/" + q;
}
function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
function comb(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;
  return Math.round(r);
}
function perm(n, k) { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r; }
function modpow(b, e, m) {
  let r = 1 % m; b = ((b % m) + m) % m;
  while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e >>= 1; }
  return r;
}
function largestPrimeFactor(n) {
  let x = n, last = 1, p = 2;
  while (p * p <= x) {
    if (x % p === 0) { last = p; while (x % p === 0) x /= p; }
    p += (p === 2 ? 1 : 2);
  }
  if (x > 1) last = x;
  return last;
}
function primeFactorStr(n) {
  const parts = []; let x = n, p = 2;
  while (p * p <= x) {
    let c = 0;
    while (x % p === 0) { x /= p; c++; }
    if (c) parts.push(c === 1 ? String(p) : p + "^" + c);
    p += (p === 2 ? 1 : 2);
  }
  if (x > 1) parts.push(String(x));
  return parts.join(" × ");
}
// Build exactly 5 unique choice strings containing ans exactly once.
function finalize(ans, wrongs, rng) {
  ans = String(ans);
  const seen = new Set([ans]);
  const picks = [];
  for (const w of wrongs) {
    const s = String(w);
    if (!seen.has(s)) { seen.add(s); picks.push(s); }
    if (picks.length === 4) break;
  }
  let d = 1;
  while (picks.length < 4) {
    const num = Number(ans);
    const s = (Number.isFinite(num) && String(num) === ans.trim())
      ? String(num + d) : ans + " (" + d + ")";
    d++;
    if (!seen.has(s)) { seen.add(s); picks.push(s); }
  }
  return rng.shuffle([ans].concat(picks));
}
// Signed term for polynomial display, e.g. term(-6,"x") -> " − 6x"
function term(n, v) {
  if (n === 0) return "";
  const sign = n > 0 ? " + " : " − ";
  const abs = Math.abs(n);
  if (v === "") return sign + abs;
  return sign + (abs === 1 ? "" : abs) + v;
}

// ================= DIFFICULTY 13 =================

const t1 = { // algebra: finite geometric series sum
  difficulty: 13, topic: "algebra",
  gen(rng) {
    const a = 2 * rng.int(1, 6);
    const n = rng.int(3, 6);
    const ans = frac(a * (Math.pow(2, n) - 1), Math.pow(2, n - 1));
    const statement = "The first term of a geometric sequence is " + a +
      " and the common ratio is 1/2. What is the sum of the first " + n + " terms?";
    const choices = finalize(ans, [
      frac(a * (Math.pow(2, n + 1) - 1), Math.pow(2, n)),
      frac(a * (Math.pow(2, n) - 1), Math.pow(2, n)),
      frac(2 * a * (Math.pow(2, n) - 1), Math.pow(2, n - 1)),
      frac(a * (Math.pow(2, n) - 1) + Math.pow(2, n - 1), Math.pow(2, n - 1)),
      String(2 * a)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Use S_n = a(1 − r^n)/(1 − r) with r = 1/2, then simplify the fraction.",
      solution: "S_" + n + " = " + a + "(1 − (1/2)^" + n + ")/(1 − 1/2) = " + (2 * a) +
        "(1 − 1/" + Math.pow(2, n) + ") = " + ans + "."
    };
  }
};

const t2 = { // algebra: logarithmic equation
  difficulty: 13, topic: "algebra",
  gen(rng) {
    const m = rng.int(2, 4);
    const x = Math.pow(2, m), c = x / 2, k = 2 * m - 1;
    const ans = String(x);
    const statement = "Solve for x: log₂ x + log₂(x − " + c + ") = " + k + ".";
    const choices = finalize(ans, [
      String(Math.pow(2, m - 1)), String(Math.pow(2, m + 1)), String(c),
      String(Math.pow(2, k)), String(x + c)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Combine the two logs into a single log of the product, rewrite in exponential form, and reject any root with x not exceeding " + c + ".",
      solution: "log₂ x + log₂(x − " + c + ") = log₂(x(x − " + c + ")) = " + k +
        ", so x(x − " + c + ") = 2^" + k + " = " + Math.pow(2, k) + ". This gives x² − " + c +
        "x − " + Math.pow(2, k) + " = 0, i.e. (x − " + x + ")(x + " + Math.pow(2, m - 1) +
        ") = 0. The root −" + Math.pow(2, m - 1) + " makes the original logarithms undefined, so x = " + x + "."
    };
  }
};

const t3 = { // algebra: quadratic whose roots differ by d
  difficulty: 13, topic: "algebra",
  gen(rng) {
    const r = rng.int(1, 6), d = rng.int(2, 5);
    const b = -(2 * r + d), cval = r * (r + d);
    const ans = String(cval);
    const statement = "The equation x²" + term(b, "x") + " + c = 0 has two roots that differ by " +
      d + ". What is the value of c?";
    const choices = finalize(ans, [
      String(cval + d), String(2 * r + d), String(r * r),
      String((r + d) * (r + d)), String(cval - d)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "If the roots are r and r + " + d + ", their sum equals −b. Solve for r, then c is the product of the roots.",
      solution: "Let the roots be r and r + " + d + ". Their sum is 2r + " + d + " = −(" + b +
        ") = " + (-b) + ", so r = " + r + ". Then c equals the product of the roots: " +
        r + " × " + (r + d) + " = " + cval + "."
    };
  }
};

const t4 = { // geometry: right-triangle hypotenuse
  difficulty: 13, topic: "geometry",
  gen(rng) {
    const tr = rng.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]);
    const k = rng.int(1, 3);
    const a = tr[0] * k, b = tr[1] * k, c = tr[2] * k;
    const ans = String(c);
    const statement = "A right triangle has legs of length " + a + " and " + b +
      ". What is the length of the hypotenuse?";
    const choices = finalize(ans, [
      String(a + b), String(c + 1), String(c - 1), String(a), String(b)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Apply the Pythagorean theorem: hypotenuse² = leg₁² + leg₂².",
      solution: "By the Pythagorean theorem, the hypotenuse is √(" + a + "² + " + b +
        "²) = √" + (a * a + b * b) + " = " + c + "."
    };
  }
};

const t5 = { // geometry: circle area from circumference
  difficulty: 13, topic: "geometry",
  gen(rng) {
    const r = rng.int(3, 10);
    const ans = (r * r) + "π";
    const statement = "A circle has circumference " + (2 * r) + "π. What is its area?";
    const choices = finalize(ans, [
      (2 * r) + "π", (4 * r * r) + "π", (2 * r * r) + "π", (r + 2) + "π", r + "π"
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "First find the radius from C = 2πr, then use A = πr².",
      solution: "C = 2πr = " + (2 * r) + "π gives r = " + r + ". Hence the area is πr² = " + ans + "."
    };
  }
};

const t6 = { // number theory: units digit of a power
  difficulty: 13, topic: "number_theory",
  gen(rng) {
    const a = rng.int(2, 9), e = rng.int(10, 99);
    const cyc = []; let cur = a % 10;
    do { cyc.push(cur); cur = (cur * a) % 10; } while (cur !== cyc[0]);
    const per = cyc.length;
    const last = cyc[(e - 1) % per];
    const ans = String(last);
    const statement = "What is the units digit of " + a + "^" + e + "?";
    const digits = rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(d => d !== last));
    const choices = finalize(ans, digits.slice(0, 4).map(String), rng);
    const rem = e % per;
    return {
      statement, choices, answer: ans,
      hint: "The units digits of successive powers repeat in a short cycle; reduce the exponent modulo the cycle length.",
      solution: "The units digits of powers of " + a + " cycle with period " + per + ": " +
        cyc.join(", ") + ", then repeat. Since " + e + " mod " + per + " = " + rem +
        ", the units digit matches that of " + a + "^" + (rem === 0 ? per : rem) +
        ", which is " + last + "."
    };
  }
};

const t7 = { // number theory: gcd
  difficulty: 13, topic: "number_theory",
  gen(rng) {
    let a = rng.int(12, 80), b = rng.int(12, 80);
    if (a === b) b = a + 7;
    const g = gcd(a, b);
    const ans = String(g);
    const statement = "What is the greatest common divisor of " + a + " and " + b + "?";
    const choices = finalize(ans, [
      String(g + 2), String(Math.max(1, g - 1)), String(a), String(b), String(2 * g)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Use the Euclidean algorithm: repeatedly replace the larger number by its remainder upon division by the smaller.",
      solution: "By the Euclidean algorithm, gcd(" + a + ", " + b + ") = gcd(" + b + ", " +
        (a % b) + ") = " + g + ", so the greatest common divisor is " + g + "."
    };
  }
};

const t8 = { // combinatorics: permutations
  difficulty: 13, topic: "combinatorics",
  gen(rng) {
    const n = rng.int(5, 9), k = rng.int(2, 3);
    const p = perm(n, k);
    const ans = String(p);
    const statement = "In how many ways can " + k + " different prizes be awarded to " + k +
      " of " + n + " students, if no student receives more than one prize?";
    const factors = [];
    for (let i = 0; i < k; i++) factors.push(n - i);
    const choices = finalize(ans, [
      String(comb(n, k)), String(Math.pow(n, k)), String(p - k),
      String(p + n), String(fact(n))
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Order matters here: count assignments as P(n, k) = n × (n−1) × ⋯.",
      solution: "The first prize has " + n + " choices, the next has " + (n - 1) +
        (k === 3 ? ", the next has " + (n - 2) : "") + ", giving " + factors.join(" × ") +
        " = " + p + " ways."
    };
  }
};

const t9 = { // combinatorics: combinations
  difficulty: 13, topic: "combinatorics",
  gen(rng) {
    const n = rng.int(6, 10), k = rng.int(2, 4);
    const c = comb(n, k);
    const ans = String(c);
    const statement = "How many different " + k + "-person committees can be chosen from a group of " +
      n + " people?";
    const choices = finalize(ans, [
      String(Math.pow(n, k)), String(perm(n, k)), String(c + k),
      String(c - 1), String(comb(n, k - 1))
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Order does not matter within a committee: use C(n, k) = n!/(k!(n−k)!).",
      solution: "C(" + n + ", " + k + ") = " + n + "!/(" + k + "!" + (n - k) + "!) = " + c + "."
    };
  }
};

const t10 = { // number theory: lcm
  difficulty: 13, topic: "number_theory",
  gen(rng) {
    let a = rng.int(6, 25), b = rng.int(6, 25);
    if (a === b) b = a + 3;
    const g = gcd(a, b), l = a * b / g;
    const ans = String(l);
    const statement = "What is the least common multiple of " + a + " and " + b + "?";
    const choices = finalize(ans, [
      String(a * b), String(g), String(l + a), String(l - b), String(Math.max(a, b))
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Use lcm(a, b) = ab / gcd(a, b).",
      solution: "gcd(" + a + ", " + b + ") = " + g + ", so lcm(" + a + ", " + b + ") = " +
        a + " × " + b + " / " + g + " = " + l + "."
    };
  }
};

// ================= DIFFICULTY 14 =================

const t11 = { // algebra: trig, tan from sin
  difficulty: 14, topic: "algebra",
  gen(rng) {
    const tr = rng.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
    const p = tr[0], adj = tr[1], q = tr[2];
    const ans = frac(p, adj);
    const statement = "If θ is an acute angle and sin θ = " + p + "/" + q + ", what is tan θ?";
    const choices = finalize(ans, [
      frac(adj, p), frac(p, q), frac(q, adj), frac(adj, q), "1"
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Draw a right triangle: the side adjacent to θ comes from the Pythagorean theorem, then tan θ = opposite/adjacent.",
      solution: "With hypotenuse " + q + " and opposite side " + p + ", the adjacent side is √(" +
        q + "² − " + p + "²) = " + adj + ". Hence tan θ = " + p + "/" + adj + "."
    };
  }
};

const t12 = { // algebra: modulus of a squared complex number
  difficulty: 14, topic: "algebra",
  gen(rng) {
    const a = rng.int(1, 5), b = rng.int(1, 5);
    const ans = String(a * a + b * b);
    const statement = "Let z = (" + a + " + " + b + "i)². What is |z|, the modulus of z?";
    const choices = finalize(ans, [
      String(2 * a * b), String(Math.abs(a * a - b * b)), String(a + b),
      String(2 * (a * a + b * b)), String(a * a + b * b + 1)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Use |w²| = |w|²: you never need to expand the square.",
      solution: "|" + a + " + " + b + "i| = √(" + a + "² + " + b + "²) = √" + (a * a + b * b) +
        ", and |z| = |" + a + " + " + b + "i|² = " + ans + "."
    };
  }
};

const t13 = { // algebra: symmetric system, x^2 + y^2
  difficulty: 14, topic: "algebra",
  gen(rng) {
    const x = rng.int(2, 9);
    let y = rng.int(2, 9);
    if (y === x) y = x === 9 ? 7 : x + 1;
    const s = x + y, p = x * y, ans = s * s - 2 * p;
    const statement = "If x + y = " + s + " and xy = " + p + ", what is the value of x² + y²?";
    const choices = finalize(String(ans), [
      String(s * s), String(s * s - p), String(2 * p),
      String(s * s + 2 * p), String(ans + s)
    ], rng);
    return {
      statement, choices, answer: String(ans),
      hint: "Express x² + y² in terms of (x + y)² and xy.",
      solution: "x² + y² = (x + y)² − 2xy = " + s + "² − 2(" + p + ") = " + (s * s) +
        " − " + (2 * p) + " = " + ans + "."
    };
  }
};

const t14 = { // geometry: 30-60-90 longer leg
  difficulty: 14, topic: "geometry",
  gen(rng) {
    const h = 2 * rng.int(3, 9);
    const ans = (h / 2) + "√3";
    const statement = "In a 30°–60°–90° triangle, the hypotenuse has length " + h +
      ". What is the length of the longer leg?";
    const choices = finalize(ans, [
      h + "√3", (h / 4) + "√3", String(h / 2), String(h), (h / 2) + "√2"
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "The sides of a 30°–60°–90° triangle are in the ratio 1 : √3 : 2.",
      solution: "Short leg : long leg : hypotenuse = 1 : √3 : 2, so the longer leg is " +
        h + "/2 × √3 = " + ans + "."
    };
  }
};

const t15 = { // geometry: coordinate distance (integer)
  difficulty: 14, topic: "geometry",
  gen(rng) {
    const d = rng.pick([[3, 4], [6, 8], [5, 12], [9, 12]]);
    const dx = d[0], dy = d[1];
    const dist = Math.round(Math.sqrt(dx * dx + dy * dy));
    const x1 = rng.int(0, 5), y1 = rng.int(0, 5);
    const x2 = x1 + dx, y2 = y1 + dy;
    const ans = String(dist);
    const statement = "What is the distance between (" + x1 + ", " + y1 + ") and (" +
      x2 + ", " + y2 + ")?";
    const choices = finalize(ans, [
      String(dx + dy), String(dist + 1), String(dist - 1), String(dx), String(dy)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Use the distance formula: √((Δx)² + (Δy)²).",
      solution: "Δx = " + dx + ", Δy = " + dy + ", so the distance is √(" + dx + "² + " + dy +
        "²) = √" + (dx * dx + dy * dy) + " = " + dist + "."
    };
  }
};

const t16 = { // geometry: rectangle diagonal
  difficulty: 14, topic: "geometry",
  gen(rng) {
    const tr = rng.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
    const k = rng.int(1, 2);
    const a = tr[0] * k, b = tr[1] * k, c = tr[2] * k;
    const ans = String(c);
    const statement = "A rectangle measures " + a + " by " + b + ". What is the length of its diagonal?";
    const choices = finalize(ans, [
      String(a + b), String(c + 2), String(c - 2),
      String(2 * (a + b)), String(a * b)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "The diagonal is the hypotenuse of a right triangle with the sides as legs.",
      solution: "Diagonal = √(" + a + "² + " + b + "²) = √" + (a * a + b * b) + " = " + c + "."
    };
  }
};

const t17 = { // number theory: number of divisors
  difficulty: 14, topic: "number_theory",
  gen(rng) {
    const p = rng.pick([2, 3, 5]);
    const q = rng.pick([3, 5, 7, 11].filter(v => v > p));
    const ea = rng.int(1, 3), eb = rng.int(1, 2);
    const n = Math.pow(p, ea) * Math.pow(q, eb);
    const ans = String((ea + 1) * (eb + 1));
    const statement = "How many positive divisors does " + n + " have?";
    const choices = finalize(ans, [
      String(ea + eb + 1), String(ea * eb), String((ea + 1) * (eb + 1) + 2),
      String((ea + 1) * (eb + 1) - 1), String(n)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Write the prime factorization of " + n + "; add 1 to each exponent and multiply.",
      solution: n + " = " + p + "^" + ea + " × " + q + "^" + eb +
        ", so the number of positive divisors is (" + ea + " + 1)(" + eb + " + 1) = " + ans + "."
    };
  }
};

const t18 = { // number theory: remainder of a power
  difficulty: 14, topic: "number_theory",
  gen(rng) {
    let b = rng.int(2, 9), e = rng.int(15, 60), m = rng.int(6, 12);
    while (gcd(b, m) !== 1) { b = rng.int(2, 9); m = rng.int(6, 12); } // pure cycle
    const r = modpow(b, e, m);
    const ans = String(r);
    const statement = "What is the remainder when " + b + "^" + e + " is divided by " + m + "?";
    const residues = rng.shuffle(
      Array.from({ length: m }, (_, i) => i).filter(v => v !== r)
    );
    const choices = finalize(ans, residues.slice(0, 4).map(String), rng);
    const cyc = []; let cur = b % m;
    do { cyc.push(cur); cur = (cur * b) % m; } while (cur !== cyc[0]);
    const per = cyc.length, rem = e % per;
    return {
      statement, choices, answer: ans,
      hint: "The remainders of successive powers repeat in a cycle; reduce the exponent modulo the cycle length.",
      solution: "Mod " + m + ", the powers of " + b + " cycle with period " + per + ": " +
        cyc.join(", ") + ", then repeat. Since " + e + " mod " + per + " = " + rem +
        ", the remainder equals that of " + b + "^" + (rem === 0 ? per : rem) +
        ", which is " + r + "."
    };
  }
};

const t19 = { // combinatorics: handshakes
  difficulty: 14, topic: "combinatorics",
  gen(rng) {
    const n = rng.int(8, 16);
    const ans = String(n * (n - 1) / 2);
    const statement = "At a party with " + n + " people, every pair of people shakes hands exactly once. " +
      "How many handshakes occur?";
    const choices = finalize(ans, [
      String(n * n), String(n * (n - 1)), String(n * (n - 1) / 2 - n),
      String(2 * n), String(comb(n, 3))
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Each handshake is determined by an unordered pair of people.",
      solution: "Choose the 2 people shaking hands: C(" + n + ", 2) = " + n + " × " + (n - 1) +
        " / 2 = " + ans + "."
    };
  }
};

const t20 = { // combinatorics: dice sum probability
  difficulty: 14, topic: "combinatorics",
  gen(rng) {
    const s = rng.int(4, 10);
    const fav = 6 - Math.abs(s - 7);
    const ans = frac(fav, 36);
    const statement = "Two fair six-sided dice are rolled. What is the probability that the sum is " + s + "?";
    const pairs = [];
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === s) pairs.push("(" + i + "," + j + ")");
    const choices = finalize(ans, [
      frac(fav + 1, 36), fav > 1 ? frac(fav - 1, 36) : "0",
      "1/6", "1/36", frac(fav, 12)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Count the ordered pairs (a, b) with a + b = " + s + ", out of 36 equally likely outcomes.",
      solution: "The ordered pairs summing to " + s + " are " + pairs.join(", ") + ": " + fav +
        " favorable outcomes out of 36, so the probability is " + fav + "/36 = " + ans + "."
    };
  }
};

// ================= DIFFICULTY 15 =================

const t21 = { // algebra: arithmetic sequence, 13th term from 3rd and 8th
  difficulty: 15, topic: "algebra",
  gen(rng) {
    const a1 = rng.int(1, 10), d = rng.int(2, 9);
    const a3 = a1 + 2 * d, a8 = a1 + 7 * d, a13 = a1 + 12 * d;
    const ans = String(a13);
    const statement = "In an arithmetic sequence, the 3rd term is " + a3 +
      " and the 8th term is " + a8 + ". What is the 13th term?";
    const choices = finalize(ans, [
      String(a13 + d), String(a13 - d), String(a8 + 2 * (a8 - a3)),
      String(Math.round((a3 + a8) / 2)), String(2 * a8)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Each block of 5 consecutive terms increases by the same amount.",
      solution: "From term 3 to term 8 is 5 steps, so the common difference is (" + a8 + " − " +
        a3 + ")/5 = " + d + ". From term 8 to term 13 is another 5 steps: " + a8 + " + 5 × " +
        d + " = " + a13 + "."
    };
  }
};

const t22 = { // algebra: change of base chain
  difficulty: 15, topic: "algebra",
  gen(rng) {
    const a = rng.int(2, 4), p = rng.int(1, 2), q = rng.int(1, 3);
    const x = Math.pow(a, p), y = Math.pow(x, q);
    const ans = String(y);
    const statement = "If log_" + a + "(x) = " + p + " and log_" + x + "(y) = " + q +
      ", what is the value of y?";
    const choices = finalize(ans, [
      String(x * q), String(Math.pow(a, p + q)), String(p * q),
      String(y + 1), String(y * a)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Rewrite each logarithmic equation in exponential form and substitute.",
      solution: "log_" + a + "(x) = " + p + " gives x = " + a + "^" + p + " = " + x +
        ". Then log_" + x + "(y) = " + q + " gives y = " + x + "^" + q + " = " + y + "."
    };
  }
};

const t23 = { // geometry: law of cosines with 60 degrees
  difficulty: 15, topic: "geometry",
  gen(rng) {
    const t = rng.pick([[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13]]);
    const a = t[0], b = t[1], c = t[2];
    const ans = String(c);
    const statement = "In △ABC, AB = " + a + ", AC = " + b + ", and ∠A = 60°. What is the length of BC?";
    const choices = finalize(ans, [
      String(a + b), String(Math.abs(a - b)), String(c + 1),
      String(c - 1), String(Math.round(Math.sqrt(a * a + b * b)))
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Use the Law of Cosines with cos 60° = 1/2.",
      solution: "BC² = " + a + "² + " + b + "² − 2(" + a + ")(" + b + ")cos 60° = " +
        (a * a) + " + " + (b * b) + " − " + (a * b) + " = " + (c * c) + ", so BC = " + c + "."
    };
  }
};

const t24 = { // geometry: sector area
  difficulty: 15, topic: "geometry",
  gen(rng) {
    const r = rng.int(3, 8);
    const th = rng.pick([60, 90, 120, 180, 270]);
    const ans = frac(th * r * r, 360) + "π";
    const statement = "A sector of a circle of radius " + r + " has central angle " + th +
      "°. What is the area of the sector?";
    const choices = finalize(ans, [
      frac(th * r, 360) + "π", (r * r) + "π", (2 * r) + "π",
      frac(th * r * r, 180) + "π", frac(th * r * r + 360, 360) + "π"
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "A sector is the fraction θ/360 of the full circle.",
      solution: "Area = (" + th + "/360) × π(" + r + ")² = " + ans + "."
    };
  }
};

const t25 = { // geometry: box space diagonal
  difficulty: 15, topic: "geometry",
  gen(rng) {
    const t = rng.pick([[1, 2, 2, 3], [2, 4, 4, 6], [2, 3, 6, 7], [4, 4, 7, 9], [3, 4, 12, 13]]);
    const l = t[0], w = t[1], h = t[2], d = t[3];
    const ans = String(d);
    const statement = "A rectangular box has dimensions " + l + " × " + w + " × " + h +
      ". What is the length of a space diagonal of the box?";
    const choices = finalize(ans, [
      String(l + w + h), String(d + 1), String(d - 1),
      String(l * w * h), String(Math.round(Math.sqrt(l * l + w * w)))
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Apply the Pythagorean theorem twice: first for a face diagonal, then with the height.",
      solution: "The space diagonal is √(" + l + "² + " + w + "² + " + h + "²) = √" +
        (l * l + w * w + h * h) + " = " + d + "."
    };
  }
};

const t26 = { // number theory: trailing zeros of n!
  difficulty: 15, topic: "number_theory",
  gen(rng) {
    const n = rng.int(12, 75);
    const z = Math.floor(n / 5) + Math.floor(n / 25) + Math.floor(n / 125);
    const ans = String(z);
    const statement = "How many trailing zeros does " + n + "! have?";
    const choices = finalize(ans, [
      String(Math.floor(n / 5)), String(z + 1), String(z - 1),
      String(n), String(2 * z)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Count the factors of 5 in n!: ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ⋯.",
      solution: "Each trailing zero needs a factor 2 × 5, and factors of 5 are scarcer. Counting them: ⌊" +
        n + "/5⌋ + ⌊" + n + "/25⌋ + ⌊" + n + "/125⌋ = " + Math.floor(n / 5) + " + " +
        Math.floor(n / 25) + " + " + Math.floor(n / 125) + " = " + z + "."
    };
  }
};

const t27 = { // number theory: sum of divisors
  difficulty: 15, topic: "number_theory",
  gen(rng) {
    const ea = rng.int(1, 4), eb = rng.int(1, 3);
    const n = Math.pow(2, ea) * Math.pow(3, eb);
    const s1 = Math.pow(2, ea + 1) - 1, s2 = Math.pow(3, eb + 1) - 1;
    const ans = s1 * s2 / 2;
    const statement = "What is the sum of all positive divisors of " + n + "?";
    const choices = finalize(String(ans), [
      String(n), String(ans + 2), String((ea + 1) * (eb + 1)),
      String(ans - n), String(2 * n)
    ], rng);
    return {
      statement, choices, answer: String(ans),
      hint: "Use the prime factorization with the sum-of-divisors formula σ(p^e) = (p^(e+1) − 1)/(p − 1).",
      solution: n + " = 2^" + ea + " × 3^" + eb + ". The sum of divisors is ((2^" + (ea + 1) +
        " − 1)/(2 − 1)) × ((3^" + (eb + 1) + " − 1)/(3 − 1)) = " + s1 + " × " + s2 +
        " / 2 = " + ans + "."
    };
  }
};

const t28 = { // combinatorics: stars and bars
  difficulty: 15, topic: "combinatorics",
  gen(rng) {
    const n = rng.int(5, 12);
    const ans = String(comb(n + 2, 2));
    const statement = "How many nonnegative integer solutions does the equation x + y + z = " + n + " have?";
    const choices = finalize(ans, [
      String(comb(n + 2, 3)), String(Math.pow(n, 3)), String(comb(n + 2, 2) - n),
      String(Math.pow(3, n)), String(comb(n + 1, 2))
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Stars and bars: arrange n stars and 2 bars in a row.",
      solution: "Place " + n + " stars and 2 bars in a sequence; each arrangement gives a solution. " +
        "There are C(" + (n + 2) + ", 2) = " + ans + " arrangements."
    };
  }
};

const t29 = { // combinatorics: urn probability without replacement
  difficulty: 15, topic: "combinatorics",
  gen(rng) {
    const r = rng.int(2, 6), b = rng.int(2, 6);
    const fav = comb(r, 2), tot = comb(r + b, 2);
    const ans = frac(fav, tot);
    const statement = "A bag contains " + r + " red and " + b + " blue marbles. Two marbles are drawn " +
      "without replacement. What is the probability that both are red?";
    const choices = finalize(ans, [
      frac(r, r + b), frac(fav + 1, tot), "1/2",
      frac(1, tot), frac(fav, tot - 1)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Count favorable unordered pairs over all unordered pairs of marbles.",
      solution: "Favorable pairs: C(" + r + ", 2) = " + fav + ". Total pairs: C(" + (r + b) +
        ", 2) = " + tot + ". Probability = " + fav + "/" + tot + " = " + ans + "."
    };
  }
};

const t30 = { // combinatorics: arrangements with repeated letters
  difficulty: 15, topic: "combinatorics",
  gen(rng) {
    const c1 = rng.int(2, 4), c2 = rng.int(2, 3), c3 = rng.int(1, 2);
    const total = c1 + c2 + c3;
    const letters = "A".repeat(c1) + "B".repeat(c2) + "C".repeat(c3);
    const ans = fact(total) / (fact(c1) * fact(c2) * fact(c3));
    const statement = "How many distinct arrangements are there of the letters in \"" + letters + "\"?";
    const choices = finalize(String(ans), [
      String(fact(total)), String(ans * 2), String(ans + total),
      String(comb(total, c1)), String(Math.pow(total, 3))
    ], rng);
    return {
      statement, choices, answer: String(ans),
      hint: "Divide the total permutations by the factorial of each repeated-letter count.",
      solution: "Without repeats there would be " + total + "! = " + fact(total) +
        " arrangements, but the " + c1 + " A's, " + c2 + " B's, and " + c3 +
        " C's are indistinguishable, so divide by " + c1 + "!" + c2 + "!" + c3 + "!: " +
        fact(total) + "/(" + fact(c1) + " × " + fact(c2) + " × " + fact(c3) + ") = " + ans + "."
    };
  }
};

// ================= DIFFICULTY 16 =================

const t31 = { // algebra: functional equation f(x) + 2f(1-x) = ax + b
  difficulty: 16, topic: "algebra",
  gen(rng) {
    const a = rng.int(1, 5), b = rng.int(1, 6), t = rng.int(0, 4);
    const ax = a === 1 ? "" : String(a); // omit coefficient 1
    const ans = frac(-3 * a * t + 2 * a + b, 3);
    const statement = "A function f satisfies f(x) + 2f(1 − x) = " + ax + "x + " + b +
      " for all real x. What is f(" + t + ")?";
    const choices = finalize(ans, [
      frac(3 * a * t + 2 * a + b, 3), frac(-3 * a * t + b, 3),
      frac(-3 * a * t + 2 * a + b, 2), String(a * t + b),
      frac(-3 * a * t + a + b, 3)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Substitute 1 − x for x to get a second equation, then eliminate f(1 − x).",
      solution: "Write P(x): f(x) + 2f(1 − x) = " + ax + "x + " + b + ". Then P(1 − x) gives " +
        "f(1 − x) + 2f(x) = " + ax + "(1 − x) + " + b + ". Doubling P(x) and subtracting P(1 − x): " +
        "3f(1 − x) = " + (3 * a) + "x + " + (b - a) + ", so f(1 − x) = " + ax + "x + " + frac(b - a, 3) +
        " and f(x) = −" + ax + "x + " + frac(2 * a + b, 3) + ". Thus f(" + t + ") = " + ans + "."
    };
  }
};

const t32 = { // algebra: infinite geometric series
  difficulty: 16, topic: "algebra",
  gen(rng) {
    const a = rng.int(2, 9), k = rng.int(2, 6);
    const ans = frac(a * k, k - 1);
    const statement = "What is the sum of the infinite geometric series " + a + " + " + a + "/" + k +
      " + " + a + "/" + k + "² + ⋯?";
    const choices = finalize(ans, [
      frac(a * k, k), frac(a * (k - 1), k), frac(a, k - 1),
      String(a), frac(a * k + 1, k - 1)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "For |r| less than 1, the infinite sum is (first term) ÷ (1 − ratio).",
      solution: "The ratio is 1/" + k + ", so S = " + a + "/(1 − 1/" + k + ") = " + a + "/(" +
        (k - 1) + "/" + k + ") = " + ans + "."
    };
  }
};

const t33 = { // geometry: radius from general circle equation
  difficulty: 16, topic: "geometry",
  gen(rng) {
    const h = rng.int(-4, 4), kc = rng.int(-4, 4), r = rng.int(3, 8);
    const D = -2 * h, E = -2 * kc, F = h * h + kc * kc - r * r;
    const ans = String(r);
    const statement = "What is the radius of the circle with equation x² + y²" +
      term(D, "x") + term(E, "y") + term(F, "") + " = 0?";
    const choices = finalize(ans, [
      String(r + 1), String(r - 1), String(2 * r),
      String(Math.abs(F)), String(h * h + kc * kc)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Complete the square in x and in y to reach center–radius form.",
      solution: "x² + (" + D + ")x + y² + (" + E + ")y + (" + F + ") = 0 becomes " +
        "(x − (" + h + "))² + (y − (" + kc + "))² = " + (h * h + kc * kc) + " − (" + F + ") = " +
        (r * r) + ". Hence the radius is √" + (r * r) + " = " + r + "."
    };
  }
};

const t34 = { // geometry: similar triangles area ratio
  difficulty: 16, topic: "geometry",
  gen(rng) {
    const s = rng.int(2, 4), A = rng.int(5, 15);
    const ans = String(s * s * A);
    const statement = "Two similar triangles have corresponding sides in the ratio 1 : " + s +
      ". If the smaller triangle has area " + A + ", what is the area of the larger triangle?";
    const choices = finalize(ans, [
      String(s * A), String(s * s * A + A), String(A),
      String(2 * s * A), String((s + 1) * (s + 1) * A)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Areas of similar figures scale as the square of the linear scale factor.",
      solution: "The linear ratio is " + s + ", so the area ratio is " + s + "² = " + (s * s) +
        ". The larger area is " + A + " × " + (s * s) + " = " + ans + "."
    };
  }
};

const t35 = { // number theory: linear congruence
  difficulty: 16, topic: "number_theory",
  gen(rng) {
    const m = rng.int(8, 16);
    let a = 2;
    do { a = rng.int(2, m - 1); } while (gcd(a, m) !== 1);
    const x0 = rng.int(1, m - 1);
    const b = (a * x0) % m;
    let inv = 1;
    for (let i = 1; i < m; i++) if ((a * i) % m === 1) { inv = i; break; }
    const ans = String(x0);
    const statement = "What is the smallest positive integer x satisfying " + a + "x ≡ " + b +
      " (mod " + m + ")?";
    const residues = rng.shuffle(
      Array.from({ length: m - 1 }, (_, i) => i + 1).filter(v => v !== x0)
    );
    const choices = finalize(ans, residues.slice(0, 4).map(String), rng);
    return {
      statement, choices, answer: ans,
      hint: "Since gcd(" + a + ", " + m + ") = 1, multiply both sides by the modular inverse of " + a + ".",
      solution: "The inverse of " + a + " mod " + m + " is " + inv + " since " + a + " × " + inv +
        " ≡ 1 (mod " + m + "). Multiplying: x ≡ " + inv + " × " + b + " ≡ " + x0 +
        " (mod " + m + "), so the smallest positive solution is " + x0 + "."
    };
  }
};

const t36 = { // number theory: Euler's totient of pq
  difficulty: 16, topic: "number_theory",
  gen(rng) {
    const primes = [2, 3, 5, 7, 11, 13];
    const p = rng.pick(primes);
    const q = rng.pick(primes.filter(v => v !== p));
    const n = p * q, ans = (p - 1) * (q - 1);
    const statement = "How many positive integers less than or equal to " + n +
      " are relatively prime to " + n + "?";
    const choices = finalize(String(ans), [
      String(n - 1), String((p - 1) + (q - 1)), String(ans + 2),
      String(n), String(Math.floor(n / 2))
    ], rng);
    return {
      statement, choices, answer: String(ans),
      hint: "Use Euler's totient function; " + n + " is a product of two distinct primes.",
      solution: "φ(" + n + ") = φ(" + p + ")φ(" + q + ") = (" + p + " − 1)(" + q +
        " − 1) = " + ans + ", since " + p + " and " + q + " are distinct primes."
    };
  }
};

const t37 = { // number theory: largest prime factor of k^2 - 1
  difficulty: 16, topic: "number_theory",
  gen(rng) {
    const k = rng.int(12, 40);
    const N = k * k - 1;
    const lpf = largestPrimeFactor(N);
    const ans = String(lpf);
    const statement = "What is the largest prime factor of " + N + "?";
    const choices = finalize(ans, [
      String(lpf + 2), String(Math.max(2, lpf - 2)), String(k + 1),
      String(k - 1), String(2 * lpf + 1)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Look for a factorization of " + N + " into two factors close together.",
      solution: N + " = " + k + "² − 1 = (" + (k - 1) + ")(" + (k + 1) + ") = " +
        primeFactorStr(N) + ", so the largest prime factor is " + lpf + "."
    };
  }
};

const t38 = { // combinatorics: inclusion-exclusion
  difficulty: 16, topic: "combinatorics",
  gen(rng) {
    const N = rng.int(60, 150);
    const a = rng.pick([2, 3, 4, 5]);
    let b = rng.pick([3, 4, 5, 6, 7]);
    if (b === a) b = a === 7 ? 5 : 7;
    const l = a * b / gcd(a, b);
    const t1 = Math.floor(N / a), t2 = Math.floor(N / b), t3 = Math.floor(N / l);
    const ans = t1 + t2 - t3;
    const statement = "How many positive integers less than or equal to " + N +
      " are divisible by " + a + " or by " + b + "?";
    const choices = finalize(String(ans), [
      String(t1 + t2), String(ans + t3), String(t3),
      String(ans - a), String(N - ans)
    ], rng);
    return {
      statement, choices, answer: String(ans),
      hint: "Add the two counts, then subtract the numbers counted twice (those divisible by both).",
      solution: "Multiples of " + a + ": ⌊" + N + "/" + a + "⌋ = " + t1 + ". Multiples of " + b +
        ": ⌊" + N + "/" + b + "⌋ = " + t2 + ". Multiples of both (i.e. of lcm = " + l + "): ⌊" +
        N + "/" + l + "⌋ = " + t3 + ". By inclusion–exclusion: " + t1 + " + " + t2 + " − " +
        t3 + " = " + ans + "."
    };
  }
};

const t39 = { // combinatorics: grid paths
  difficulty: 16, topic: "combinatorics",
  gen(rng) {
    const m = rng.int(2, 5), n = rng.int(2, 5);
    const ans = String(comb(m + n, m));
    const statement = "A robot travels from (0, 0) to (" + m + ", " + n + "), moving only right or up " +
      "one unit at a time. How many different paths can it take?";
    const choices = finalize(ans, [
      String(m * n), String(Math.pow(2, m + n)), String(comb(m + n, m) - 1),
      String(comb(m + n, m + 1)), String(m + n)
    ], rng);
    return {
      statement, choices, answer: ans,
      hint: "Every path is a sequence of " + (m + n) + " moves; choose which ones go right.",
      solution: "A path needs " + m + " right moves and " + n + " up moves in some order: " +
        "C(" + (m + n) + ", " + m + ") = " + ans + "."
    };
  }
};

const t40 = { // combinatorics: binomial theorem coefficient
  difficulty: 16, topic: "combinatorics",
  gen(rng) {
    const n = rng.int(4, 7), a = rng.int(1, 3), b = rng.int(1, 4);
    const ans = comb(n, 2) * a * a * Math.pow(b, n - 2);
    const statement = "What is the coefficient of x² in the expansion of (" + a + "x + " + b + ")^" + n + "?";
    const choices = finalize(String(ans), [
      String(comb(n, 2) * a * Math.pow(b, n - 1)),
      String(comb(n, 3) * Math.pow(a, 3) * Math.pow(b, n - 3)),
      String(ans + a), String(n * a * Math.pow(b, n - 1)),
      String(comb(n, 2) * a * a * Math.pow(b, n - 1))
    ], rng);
    return {
      statement, choices, answer: String(ans),
      hint: "By the Binomial Theorem, the x² term comes from choosing the x-term from exactly 2 of the factors.",
      solution: "The x² term is C(" + n + ", 2)(" + a + "x)²(" + b + ")^" + (n - 2) + " = " +
        comb(n, 2) + " × " + (a * a) + "x² × " + Math.pow(b, n - 2) + ", so the coefficient is " + ans + "."
    };
  }
};

module.exports = [
  t1, t2, t3, t4, t5, t6, t7, t8, t9, t10,
  t11, t12, t13, t14, t15, t16, t17, t18, t19, t20,
  t21, t22, t23, t24, t25, t26, t27, t28, t29, t30,
  t31, t32, t33, t34, t35, t36, t37, t38, t39, t40
];

// ---------- self-test ----------
if (require.main === module) {
  function mulberry32(seed) {
    let t = seed >>> 0;
    return {
      f() {
        t += 0x6D2B79F5;
        let z = Math.imul(t ^ (t >>> 15), t | 1);
        z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
        return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
      },
      int(min, max) { return min + Math.floor(this.f() * (max - min + 1)); },
      pick(arr) { return arr[this.int(0, arr.length - 1)]; },
      shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = this.int(0, i);
          const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
      }
    };
  }
  const templates = module.exports;
  const failures = [];
  const topics = ["algebra", "geometry", "number_theory", "combinatorics"];
  const check = (cond, msg) => { if (!cond) failures.push(msg); };
  check(Array.isArray(templates), "export is not an array");
  check(templates.length === 40, "expected 40 templates, got " + templates.length);
  let prevDiff = -Infinity;
  templates.forEach((t, i) => {
    const label = "template[" + i + "]";
    check(t && typeof t.gen === "function", label + ": gen not a function");
    check(Number.isInteger(t.difficulty) && t.difficulty >= 13 && t.difficulty <= 16,
      label + ": difficulty out of range: " + t.difficulty);
    check(topics.includes(t.topic), label + ": invalid topic: " + t.topic);
    check(t.difficulty >= prevDiff, label + ": not ascending (" + prevDiff + " then " + t.difficulty + ")");
    prevDiff = t.difficulty;
    [1, 7, 42].forEach(seed => {
      let r;
      try { r = t.gen(mulberry32(seed)); }
      catch (e) { failures.push(label + " seed " + seed + ": gen threw: " + e.message); return; }
      const tag = label + " seed " + seed;
      ["statement", "answer", "hint", "solution"].forEach(k => {
        check(typeof r[k] === "string" && r[k].length > 0, tag + ": " + k + " not a non-empty string");
      });
      check(r.statement.length <= 600, tag + ": statement exceeds 600 chars");
      check(!/[<>]/.test(r.statement + r.hint + r.solution),
        tag + ": raw angle brackets in text");
      check(Array.isArray(r.choices) && r.choices.length === 5,
        tag + ": choices must be an array of 5");
      check(r.choices.every(c => typeof c === "string" && c.length > 0),
        tag + ": every choice must be a non-empty string");
      check(new Set(r.choices).size === 5, tag + ": choices not unique: " + JSON.stringify(r.choices));
      check(r.choices.filter(c => c === r.answer).length === 1,
        tag + ": answer must appear exactly once in choices");
    });
  });
  if (failures.length) {
    console.error("FAIL (" + failures.length + " problems):");
    failures.slice(0, 20).forEach(f => console.error("  - " + f));
    process.exit(1);
  }
  console.log("PASS (" + templates.length + " templates)");
}
