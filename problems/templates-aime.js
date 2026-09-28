'use strict';
// AIME problem templates (difficulty 15-18).
// Each template's gen(rng) builds a problem BACKWARDS: the answer is chosen
// first (or derived from chosen parameters) and the statement is constructed
// around it, so the reported answer is always mathematically correct.
// The engine supplies rng = { f(), int(min,max), pick(arr), shuffle(arr) }.

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) { const t = a % b; a = b; b = t; }
  return a;
}

function comb(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;
  return Math.round(r);
}

function modpow(base, exp, mod) {
  let r = 1 % mod;
  let b = ((base % mod) + mod) % mod;
  let e = exp;
  while (e > 0) {
    if (e % 2 === 1) r = (r * b) % mod;
    b = (b * b) % mod;
    e = Math.floor(e / 2);
  }
  return r;
}

function factorialBig(n) {
  let r = 1n;
  for (let i = 2n; i <= BigInt(n); i++) r *= i;
  return r;
}

function primeFactorization(n) {
  const f = [];
  let d = 2, m = n;
  while (d * d <= m) {
    let e = 0;
    while (m % d === 0) { m /= d; e++; }
    if (e > 0) f.push([d, e]);
    d += (d === 2 ? 1 : 2);
  }
  if (m > 1) f.push([m, 1]);
  return f;
}

function fmtLinear(c) {
  return c < 0 ? `x - ${-c}` : `x + ${c}`;
}

const TEMPLATES = [
  // ---------------- ALGEBRA (d15) ----------------
  {
    difficulty: 15, topic: 'algebra',
    gen(rng) {
      const r1 = rng.int(2, 9);
      const r2 = rng.int(r1 + 1, r1 + 8);
      const S = r1 + r2, Q = r1 * r1 + r2 * r2, ans = r1 * r2;
      return {
        statement: `Real numbers x and y satisfy x + y = ${S} and x^2 + y^2 = ${Q}. Find the value of xy.`,
        choices: null,
        answer: String(ans),
        hint: `Square the equation x + y = ${S}. How does (x + y)^2 relate to x^2 + y^2 and xy?`,
        solution: `(x + y)^2 = x^2 + 2xy + y^2, so ${S}^2 = ${Q} + 2xy. Thus 2xy = ${S * S} - ${Q} = ${S * S - Q}, giving xy = ${ans}.`
      };
    }
  },
  {
    difficulty: 15, topic: 'algebra',
    gen(rng) {
      const A = rng.int(2, 20), d = rng.int(2, 9);
      const t3 = A + 2 * d, t7 = A + 6 * d, ans = A + 19 * d;
      return {
        statement: `In an arithmetic sequence, the 3rd term is ${t3} and the 7th term is ${t7}. Find the 20th term.`,
        choices: null,
        answer: String(ans),
        hint: `The common difference equals the change from the 3rd to the 7th term, divided by 4.`,
        solution: `Let the common difference be d. From the 3rd to the 7th term is 4 steps, so 4d = ${t7} - ${t3} = ${4 * d}, giving d = ${d}. The 20th term is (3rd term) + 17d = ${t3} + 17(${d}) = ${ans}.`
      };
    }
  },
  // ---------------- ALGEBRA (d16) ----------------
  {
    difficulty: 16, topic: 'algebra',
    gen(rng) {
      const x = rng.int(2, 6);
      const y = rng.int(x + 1, 9);
      const S = x + y, Q = x * x + y * y;
      const xy = (S * S - Q) / 2;
      const ans = x * x * x + y * y * y;
      return {
        statement: `Real numbers x and y satisfy x + y = ${S} and x^2 + y^2 = ${Q}. Find x^3 + y^3.`,
        choices: null,
        answer: String(ans),
        hint: `First find xy from (x + y)^2, then use x^3 + y^3 = (x + y)^3 - 3xy(x + y).`,
        solution: `xy = ((x + y)^2 - (x^2 + y^2))/2 = (${S * S} - ${Q})/2 = ${xy}. Then x^3 + y^3 = (x + y)^3 - 3xy(x + y) = ${S}^3 - 3(${xy})(${S}) = ${S ** 3} - ${3 * xy * S} = ${ans}.`
      };
    }
  },
  {
    difficulty: 16, topic: 'algebra',
    gen(rng) {
      const r1 = rng.int(1, 6), r2 = rng.int(1, 6), r3 = rng.int(1, 6);
      const S = r1 + r2 + r3;
      const SS = r1 * r1 + r2 * r2 + r3 * r3;
      const Q = r1 * r2 + r2 * r3 + r3 * r1;
      const P = r1 * r2 * r3;
      const ans = (S * S - SS) / 2;
      return {
        statement: `The cubic x^3 - ${S}x^2 + ${Q}x - ${P} = 0 has three real roots r, s, t (not necessarily distinct). Given r + s + t = ${S} and r^2 + s^2 + t^2 = ${SS}, find rs + st + tr.`,
        choices: null,
        answer: String(ans),
        hint: `Expand (r + s + t)^2 and compare with r^2 + s^2 + t^2.`,
        solution: `(r + s + t)^2 = r^2 + s^2 + t^2 + 2(rs + st + tr), so ${S * S} = ${SS} + 2(rs + st + tr). Hence rs + st + tr = (${S * S} - ${SS})/2 = ${ans}.`
      };
    }
  },
  {
    difficulty: 16, topic: 'algebra',
    gen(rng) {
      const d0 = rng.pick([2, 3]);
      let k = rng.int(2, 6);
      if (d0 === 3) k *= 2;
      const a = d0 * d0 * k;
      const Sinf = a * d0 / (d0 - 1);
      const S3 = a * (d0 * d0 + d0 + 1) / (d0 * d0);
      const g2 = gcd(S3, Sinf);
      return {
        statement: `An infinite geometric series with positive first term has sum ${Sinf}. The sum of its first three terms is ${S3}. Find the first term.`,
        choices: null,
        answer: String(a),
        hint: `Write the 3-term partial sum in terms of the infinite sum S and the ratio r: S_3 = S(1 - r^3).`,
        solution: `Let the first term be a and ratio r. Then S_3 = a(1 + r + r^2) = a(1 - r^3)/(1 - r) = S(1 - r^3). So 1 - r^3 = ${S3}/${Sinf} = ${S3 / g2}/${Sinf / g2}, giving r^3 = 1/${d0 ** 3} and r = 1/${d0} (all terms positive). Then a = S(1 - r) = ${Sinf}(${d0 - 1}/${d0}) = ${a}.`
      };
    }
  },
  // ---------------- ALGEBRA (d17) ----------------
  {
    difficulty: 17, topic: 'algebra',
    gen(rng) {
      const mode = rng.pick(['two', 'three']);
      const p = mode === 'two' ? 2 : 3;
      const n = mode === 'two' ? 6 : 5;
      const a1 = rng.int(1, 6), q = rng.int(1, 8);
      const terms = [a1];
      for (let i = 1; i < n; i++) terms.push(p * terms[i - 1] + q);
      const steps = terms.map((t, i) => `a${i + 1} = ${t}`).join(', ');
      return {
        statement: `A sequence is defined by a1 = ${a1} and a(n+1) = ${p}*a(n) + ${q} for n >= 1. Find a${n}.`,
        choices: null,
        answer: String(terms[n - 1]),
        hint: `Just iterate the recurrence ${n - 1} times.`,
        solution: `Iterating: ${steps}. Hence a${n} = ${terms[n - 1]}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'algebra',
    gen(rng) {
      const a = rng.int(2, 5), b = rng.int(1, 9);
      const U = 2 * a + b, V = a * U + b, ans = 10 * a + b;
      return {
        statement: `Let f(x) = ax + b, where a and b are constants. If f(2) = ${U} and f(f(2)) = ${V}, find f(10).`,
        choices: null,
        answer: String(ans),
        hint: `f(f(2)) = a*f(2) + b. Combine this with f(2) = 2a + b to solve for a first.`,
        solution: `f(2) = 2a + b = ${U} and f(f(2)) = a(${U}) + b = ${V}. Subtracting: a(${U} - 2) = ${V} - ${U} = ${V - U}, so a = ${a}. Then b = ${U} - 2(${a}) = ${b}, and f(10) = 10(${a}) + ${b} = ${ans}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'algebra',
    gen(rng) {
      let b, c, ans, s2;
      do {
        b = rng.int(2, 7); c = rng.int(1, 6);
        s2 = b * b - 2 * c;
        ans = s2 * s2 - 2 * c * c;
      } while (ans < 1 || ans > 999);
      return {
        statement: `Let r and s be the (possibly complex) roots of x^2 + ${b}x + ${c} = 0. Find r^4 + s^4.`,
        choices: null,
        answer: String(ans),
        hint: `From Vieta, r + s = ${-b} and rs = ${c}. First find r^2 + s^2, then r^4 + s^4.`,
        solution: `r + s = -${b} and rs = ${c}. Then r^2 + s^2 = (r + s)^2 - 2rs = ${b * b} - ${2 * c} = ${s2}. Also r^2 s^2 = (rs)^2 = ${c * c}. Hence r^4 + s^4 = (r^2 + s^2)^2 - 2r^2 s^2 = ${s2 * s2} - ${2 * c * c} = ${ans}.`
      };
    }
  },
  // ---------------- ALGEBRA (d18) ----------------
  {
    difficulty: 18, topic: 'algebra',
    gen(rng) {
      const N = rng.int(6, 12);
      const num = (N + 1) * (N + 2) - 2, den = 4 * (N + 1) * (N + 2);
      const g = gcd(num, den);
      const p = num / g, q = den / g, ans = p + q;
      return {
        statement: `Let S = 1/(1*2*3) + 1/(2*3*4) + ... + 1/(${N}*${N + 1}*${N + 2}). If S = p/q in lowest terms, find p + q.`,
        choices: null,
        answer: String(ans),
        hint: `Split 1/(k(k+1)(k+2)) into a difference of two simpler fractions so the sum telescopes.`,
        solution: `1/(k(k+1)(k+2)) = (1/2)(1/(k(k+1)) - 1/((k+1)(k+2))). Summing k = 1 to ${N} telescopes: S = (1/2)(1/2 - 1/((${(N + 1)})(${(N + 2)}))) = (1/2)(1/2 - 1/${(N + 1) * (N + 2)}) = ${p}/${q}. Thus p + q = ${p} + ${q} = ${ans}.`
      };
    }
  },
  {
    difficulty: 18, topic: 'algebra',
    gen(rng) {
      const x0 = rng.int(8, 40);
      const p = rng.int(2, 5);
      const q = rng.int(p + 1, p + 4);
      const a = p * p - x0, b = q * q - x0;
      const s = p + q;
      return {
        statement: `Find the sum of all real numbers x satisfying sqrt(${fmtLinear(a)}) + sqrt(${fmtLinear(b)}) = ${s}.`,
        choices: null,
        answer: String(x0),
        hint: `The left side is strictly increasing, so there is at most one solution. Isolate one square root and square twice.`,
        solution: `Let f(x) = sqrt(${fmtLinear(a)}) + sqrt(${fmtLinear(b)}), strictly increasing on its domain, so at most one solution exists. Write sqrt(${fmtLinear(a)}) = ${s} - sqrt(${fmtLinear(b)}) and square: ${fmtLinear(a)} = ${s * s} + ${fmtLinear(b)} - 2(${s})sqrt(${fmtLinear(b)}), so 2(${s})sqrt(${fmtLinear(b)}) = ${s * s + b - a}. Hence sqrt(${fmtLinear(b)}) = ${q}, giving ${fmtLinear(b)} = ${q * q} and x = ${x0}, which indeed satisfies the equation. The sum of all (one) solutions is ${x0}.`
      };
    }
  },
  // ---------------- GEOMETRY (d15) ----------------
  {
    difficulty: 15, topic: 'geometry',
    gen(rng) {
      const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [20, 21, 29]];
      const [ta, tb, tc] = rng.pick(triples);
      const k = rng.int(1, 3);
      const ans = k * (ta + tb + tc);
      return {
        statement: `A right triangle has legs of length ${k * ta} and ${k * tb}. Find its perimeter.`,
        choices: null,
        answer: String(ans),
        hint: `First find the hypotenuse with the Pythagorean theorem.`,
        solution: `Hypotenuse = sqrt(${(k * ta) ** 2} + ${(k * tb) ** 2}) = sqrt(${(k * tc) ** 2}) = ${k * tc}. Perimeter = ${k * ta} + ${k * tb} + ${k * tc} = ${ans}.`
      };
    }
  },
  {
    difficulty: 15, topic: 'geometry',
    gen(rng) {
      const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [20, 21, 29]];
      const [ta, tb, tc] = rng.pick(triples);
      const k = rng.int(1, 2);
      const ans = k * tb;
      return {
        statement: `A rectangle has a diagonal of length ${k * tc} and one side of length ${k * ta}. Find the length of the other side.`,
        choices: null,
        answer: String(ans),
        hint: `The diagonal and the two sides form a right triangle.`,
        solution: `Other side = sqrt(${k * tc}^2 - ${k * ta}^2) = sqrt(${(k * tc) ** 2} - ${(k * ta) ** 2}) = sqrt(${(k * tb) ** 2}) = ${ans}.`
      };
    }
  },
  // ---------------- GEOMETRY (d16) ----------------
  {
    difficulty: 16, topic: 'geometry',
    gen(rng) {
      const pts = [[6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20]];
      const [bx, by, hyp] = rng.pick(pts);
      const mx = rng.int(-3, 5), my = rng.int(-3, 5);
      const ax = 2 * mx - bx, ay = 2 * my - by;
      return {
        statement: `Segment AB has midpoint M = (${mx}, ${my}). If A = (${ax}, ${ay}), find the distance from B to the origin.`,
        choices: null,
        answer: String(hyp),
        hint: `Recover B from A and the midpoint, then use the distance formula.`,
        solution: `B = 2M - A = (2(${mx}) - (${ax}), 2(${my}) - (${ay})) = (${bx}, ${by}). Then OB = sqrt((${bx})^2 + (${by})^2) = sqrt(${bx * bx + by * by}) = ${hyp}.`
      };
    }
  },
  {
    difficulty: 16, topic: 'geometry',
    gen(rng) {
      const tris = [[13, 14, 15, 84], [5, 5, 6, 12], [9, 10, 17, 36], [10, 17, 21, 84], [7, 15, 20, 42], [6, 8, 10, 24], [5, 5, 8, 12]];
      const [a, b, c, area] = rng.pick(tris);
      const s = (a + b + c) / 2;
      return {
        statement: `A triangle has side lengths ${a}, ${b}, and ${c}. Find its area.`,
        choices: null,
        answer: String(area),
        hint: `Use Heron's formula with semiperimeter s = (a + b + c)/2.`,
        solution: `s = (${a} + ${b} + ${c})/2 = ${s}. Area = sqrt(s(s - a)(s - b)(s - c)) = sqrt(${s}(${s - a})(${s - b})(${s - c})) = sqrt(${s * (s - a) * (s - b) * (s - c)}) = ${area}.`
      };
    }
  },
  {
    difficulty: 16, topic: 'geometry',
    gen(rng) {
      const m = rng.int(2, 6);
      const P = 8 * m, ans = m * m;
      return {
        statement: `A circle is inscribed in a square with perimeter ${P}. Find the area of the circle, divided by pi.`,
        choices: null,
        answer: String(ans),
        hint: `The circle's diameter equals the square's side length.`,
        solution: `Side of square = ${P}/4 = ${2 * m}, so radius = ${2 * m}/2 = ${m}. Area/pi = r^2 = ${ans}.`
      };
    }
  },
  // ---------------- GEOMETRY (d17) ----------------
  {
    difficulty: 17, topic: 'geometry',
    gen(rng) {
      const boxes = [[3, 4, 12, 13], [2, 3, 6, 7], [1, 4, 8, 9], [6, 8, 24, 26]];
      const [l, w, h, dg] = rng.pick(boxes);
      return {
        statement: `A rectangular box has edge lengths ${l}, ${w}, and ${h}. Find the length of its space diagonal.`,
        choices: null,
        answer: String(dg),
        hint: `Apply the Pythagorean theorem twice: first on the base, then with the height.`,
        solution: `Base diagonal = sqrt(${l}^2 + ${w}^2) = sqrt(${l * l + w * w}); space diagonal = sqrt(base^2 + ${h}^2) = sqrt(${l * l + w * w + h * h}) = ${dg}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'geometry',
    gen(rng) {
      let x1, y1, x2, y2, x3, y3, twice = 0;
      for (let tries = 0; tries < 200; tries++) {
        x1 = rng.int(0, 8); y1 = rng.int(0, 8);
        x2 = rng.int(0, 8); y2 = rng.int(0, 8);
        x3 = rng.int(0, 8); y3 = rng.int(0, 8);
        twice = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
        if (twice > 0 && twice % 2 === 0) break;
      }
      if (!(twice > 0 && twice % 2 === 0)) { x1 = 0; y1 = 0; x2 = 4; y2 = 0; x3 = 0; y3 = 3; twice = 12; }
      const ans = twice / 2;
      return {
        statement: `Find the area of the triangle with vertices (${x1}, ${y1}), (${x2}, ${y2}), and (${x3}, ${y3}).`,
        choices: null,
        answer: String(ans),
        hint: `Use the shoelace formula.`,
        solution: `By shoelace, 2*Area = |${x1}(${y2} - ${y3}) + ${x2}(${y3} - ${y1}) + ${x3}(${y1} - ${y2})| = ${twice}, so Area = ${ans}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'geometry',
    gen(rng) {
      const segs = [[2, 8, 4], [4, 9, 6], [1, 9, 3], [3, 12, 6], [5, 20, 10]];
      const [p, q, h] = rng.pick(segs);
      const ans = (p + q) * h / 2;
      return {
        statement: `The altitude to the hypotenuse of a right triangle divides the hypotenuse into segments of lengths ${p} and ${q}. Find the area of the triangle.`,
        choices: null,
        answer: String(ans),
        hint: `The altitude is the geometric mean of the two segments.`,
        solution: `Altitude = sqrt(${p} * ${q}) = ${h}. Hypotenuse = ${p} + ${q} = ${p + q}. Area = (1/2)(${p + q})(${h}) = ${ans}.`
      };
    }
  },
  // ---------------- GEOMETRY (d18) ----------------
  {
    difficulty: 18, topic: 'geometry',
    gen(rng) {
      const t = rng.pick([6, 8, 9]);
      const t2 = t * t;
      const divisors = [];
      for (let d = 2; d < t; d++) if (t2 % d === 0) divisors.push(d);
      const e = rng.pick(divisors);
      const s = t2 / e, ans = s - e;
      return {
        statement: `From an exterior point P, a tangent segment to a circle has length ${t}. A secant from P meets the circle first at X and then at Y, with PX = ${e}. Find XY.`,
        choices: null,
        answer: String(ans),
        hint: `Use power of a point: (tangent)^2 = (external part)(whole secant).`,
        solution: `By power of a point, ${t}^2 = PX * PY, so PY = ${t2}/${e} = ${s}. Then XY = PY - PX = ${s} - ${e} = ${ans}.`
      };
    }
  },
  {
    difficulty: 18, topic: 'geometry',
    gen(rng) {
      const s = rng.int(2, 9);
      const ans = 6 * s * s;
      return {
        statement: `A cube has space diagonal ${s}*sqrt(3). Find its surface area.`,
        choices: null,
        answer: String(ans),
        hint: `If the edge length is e, the space diagonal is e*sqrt(3).`,
        solution: `e*sqrt(3) = ${s}*sqrt(3) gives e = ${s}. Surface area = 6e^2 = 6(${s * s}) = ${ans}.`
      };
    }
  },
  // ---------------- NUMBER THEORY (d15) ----------------
  {
    difficulty: 15, topic: 'number_theory',
    gen(rng) {
      const a = rng.int(20, 200), b = rng.int(20, 200);
      const ans = gcd(a, b);
      const steps = [];
      let x = a, y = b;
      while (y !== 0) {
        steps.push(`${x} = ${Math.floor(x / y)}*${y} + ${x % y}`);
        const t = x % y; x = y; y = t;
      }
      return {
        statement: `Find the greatest common divisor of ${a} and ${b}.`,
        choices: null,
        answer: String(ans),
        hint: `Apply the Euclidean algorithm.`,
        solution: `Euclidean algorithm: ${steps.join('; ')}. Hence gcd(${a}, ${b}) = ${ans}.`
      };
    }
  },
  {
    difficulty: 15, topic: 'number_theory',
    gen(rng) {
      const n = rng.pick([72, 96, 120, 144, 180, 200, 240, 360]);
      const fac = primeFactorization(n);
      let ans = 1;
      const parts = fac.map(([p, e]) => { ans *= (e + 1); return `${p}^${e}`; });
      const mults = fac.map(([p, e]) => `(${e}+1)`).join('*');
      return {
        statement: `How many positive integers divide ${n}?`,
        choices: null,
        answer: String(ans),
        hint: `Factor ${n} into primes; the divisor count comes from the exponents.`,
        solution: `${n} = ${parts.join(' * ')}. The number of positive divisors is ${mults} = ${ans}.`
      };
    }
  },
  // ---------------- NUMBER THEORY (d16) ----------------
  {
    difficulty: 16, topic: 'number_theory',
    gen(rng) {
      const a = rng.int(2, 9), e = rng.int(50, 500), m = rng.int(7, 30);
      const ans = modpow(a, e, m);
      return {
        statement: `Find the remainder when ${a}^${e} is divided by ${m}.`,
        choices: null,
        answer: String(ans),
        hint: `Reduce the exponent using the repeating cycle of powers modulo ${m} (or repeated squaring).`,
        solution: `Computing powers modulo ${m} (for example by repeated squaring), ${a}^${e} is congruent to ${ans} modulo ${m}, so the remainder is ${ans}.`
      };
    }
  },
  {
    difficulty: 16, topic: 'number_theory',
    gen(rng) {
      const a = rng.int(2, 9);
      const seen = new Map();
      const cyc = [];
      let cur = 1;
      while (!seen.has(cur)) {
        seen.set(cur, cyc.length);
        cur = (cur * a) % 10;
        cyc.push(cur);
      }
      const start = seen.get(cur);
      const period = cyc.length - start;
      const e = rng.int(100, 2000);
      const idx = (e - 1 < start) ? e - 1 : start + ((e - 1 - start) % period);
      const ans = cyc[idx];
      return {
        statement: `Find the units digit of ${a}^${e}.`,
        choices: null,
        answer: String(ans),
        hint: `The units digits of the powers of ${a} repeat in a cycle; find its length.`,
        solution: `The units digits of ${a}^1, ${a}^2, ... are ${cyc.join(', ')}, repeating with period ${period}. The ${e}-th term of this cycle is ${ans}, so the units digit of ${a}^${e} is ${ans}.`
      };
    }
  },
  {
    difficulty: 16, topic: 'number_theory',
    gen(rng) {
      const a = rng.int(2, 9);
      const b = rng.int(3, 11);
      const N = rng.int(40, 150);
      const sols = [];
      for (let x = 1; x * a < N; x++) {
        const rem = N - a * x;
        if (rem % b === 0) sols.push(x);
      }
      const ans = sols.length;
      return {
        statement: `How many pairs (x, y) of positive integers satisfy ${a}x + ${b}y = ${N}?`,
        choices: null,
        answer: String(ans),
        hint: `For each possible x, check whether ${N} - ${a}x is a positive multiple of ${b}.`,
        solution: `y = (${N} - ${a}x)/${b} must be a positive integer, so ${N} - ${a}x must be positive and divisible by ${b}. The values of x that work are ${sols.length ? sols.join(', ') : 'none'}, giving ${ans} pair${ans === 1 ? '' : 's'}.`
      };
    }
  },
  // ---------------- NUMBER THEORY (d17) ----------------
  {
    difficulty: 17, topic: 'number_theory',
    gen(rng) {
      const m = rng.pick([24, 36, 48, 60, 72, 100, 120, 150, 200]);
      const fac = primeFactorization(m);
      const vp = (n, p) => { let s = 0; while (n > 0) { n = Math.floor(n / p); s += n; } return s; };
      let ans = 0;
      const reqs = fac.map(([p, e]) => {
        let n = 1;
        while (vp(n, p) < e) n++;
        if (n > ans) ans = n;
        return `v_${p}(n!) >= ${e} needs n >= ${n}`;
      });
      const parts = fac.map(([p, e]) => `${p}^${e}`).join(' * ');
      return {
        statement: `Find the smallest positive integer n such that ${m} divides n!.`,
        choices: null,
        answer: String(ans),
        hint: `Factor ${m}; n! must supply each prime factor with sufficient multiplicity (Legendre's formula).`,
        solution: `${m} = ${parts}. We need ${reqs.join('; ')}. The binding constraint gives the smallest such n = ${ans}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'number_theory',
    gen(rng) {
      const n = rng.int(10, 16);
      const f = factorialBig(n).toString();
      const digits = f.split('');
      const ans = digits.reduce((s, d) => s + Number(d), 0);
      return {
        statement: `Find the sum of the digits of ${n}!.`,
        choices: null,
        answer: String(ans),
        hint: `Compute ${n}! exactly, then add its digits.`,
        solution: `${n}! = ${f}. Adding the digits: ${digits.join(' + ')} = ${ans}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'number_theory',
    gen(rng) {
      const primes = [2, 3, 5, 7, 11];
      const chosen = rng.shuffle(primes).slice(0, rng.int(2, 3)).sort((x, y) => x - y);
      let n = 1;
      const parts = [];
      for (const p of chosen) {
        const e = rng.int(1, 3);
        n *= Math.pow(p, e);
        parts.push(e > 1 ? `${p}^${e}` : `${p}`);
      }
      const largest = Math.max(...chosen);
      return {
        statement: `Find the largest prime factor of ${n}.`,
        choices: null,
        answer: String(largest),
        hint: `Factor ${n} by trial division with small primes.`,
        solution: `${n} = ${parts.join(' * ')}. The largest prime factor is ${largest}.`
      };
    }
  },
  // ---------------- NUMBER THEORY (d18) ----------------
  {
    difficulty: 18, topic: 'number_theory',
    gen(rng) {
      const [m1, m2] = rng.pick([[4, 7], [5, 8], [5, 9], [7, 9], [8, 11], [9, 10]]);
      const a = rng.int(0, m1 - 1), b = rng.int(0, m2 - 1);
      let ans = 1;
      while (!((ans - a) % m1 === 0 && (ans - b) % m2 === 0)) ans++;
      const first = a === 0 ? m1 : a;
      return {
        statement: `Find the smallest positive integer n such that n is congruent to ${a} modulo ${m1} and n is congruent to ${b} modulo ${m2}.`,
        choices: null,
        answer: String(ans),
        hint: `List the numbers congruent to ${a} mod ${m1} and test each modulo ${m2}.`,
        solution: `The positive integers congruent to ${a} mod ${m1} are ${first}, ${first + m1}, ${first + 2 * m1}, ... Checking each modulo ${m2}, the first with remainder ${b} is ${ans}.`
      };
    }
  },
  {
    difficulty: 18, topic: 'number_theory',
    gen(rng) {
      const M = rng.pick([10, 12, 14, 15, 18, 20, 24, 30]);
      const k = rng.int(3, 12);
      const N = k * M;
      const fac = primeFactorization(M);
      let phi = M;
      for (const [p] of fac) phi = phi / p * (p - 1);
      const ans = k * phi;
      return {
        statement: `How many integers n with 1 <= n <= ${N} are relatively prime to ${M}?`,
        choices: null,
        answer: String(ans),
        hint: `Count them in one complete block of ${M} consecutive integers, then multiply by the number of blocks.`,
        solution: `phi(${M}) = ${phi}, so each block of ${M} consecutive integers contains ${phi} numbers coprime to ${M}. Since ${N} = ${k}*${M}, there are ${k} full blocks, giving ${k}*${phi} = ${ans}.`
      };
    }
  },
  // ---------------- COMBINATORICS (d15) ----------------
  {
    difficulty: 15, topic: 'combinatorics',
    gen(rng) {
      const n = rng.int(4, 8), kk = rng.int(2, n - 1);
      const ans = comb(n, kk);
      return {
        statement: `A club has ${n} members. In how many ways can a committee of ${kk} members be chosen?`,
        choices: null,
        answer: String(ans),
        hint: `Order does not matter: use combinations.`,
        solution: `C(${n}, ${kk}) = ${n}!/(${kk}!(${n - kk})!) = ${ans}.`
      };
    }
  },
  {
    difficulty: 15, topic: 'combinatorics',
    gen(rng) {
      const N = rng.int(80, 200);
      const a = rng.int(2, 6);
      const b = rng.int(3, 9);
      const l = a * b / gcd(a, b);
      const ca = Math.floor(N / a), cb = Math.floor(N / b), cl = Math.floor(N / l);
      const ans = ca + cb - cl;
      return {
        statement: `How many positive integers <= ${N} are divisible by ${a} or ${b}?`,
        choices: null,
        answer: String(ans),
        hint: `Use inclusion-exclusion: count multiples of each, then subtract multiples of both.`,
        solution: `Multiples of ${a} up to ${N}: floor(${N}/${a}) = ${ca}; of ${b}: floor(${N}/${b}) = ${cb}; of both (multiples of lcm = ${l}): floor(${N}/${l}) = ${cl}. Total = ${ca} + ${cb} - ${cl} = ${ans}.`
      };
    }
  },
  // ---------------- COMBINATORICS (d16) ----------------
  {
    difficulty: 16, topic: 'combinatorics',
    gen(rng) {
      const presets = [[6, 2, 2], [6, 3, 2], [7, 2, 2], [7, 3, 2], [6, 4, 3], [7, 4, 2]];
      let n, k, c, ans;
      do {
        [n, k, c] = rng.pick(presets);
        ans = comb(n, k) * Math.pow(c, n - k);
      } while (ans < 1 || ans > 999);
      return {
        statement: `Find the coefficient of x^${k} in the expansion of (x + ${c})^${n}.`,
        choices: null,
        answer: String(ans),
        hint: `By the binomial theorem, which term contains x^${k}?`,
        solution: `The x^${k} term is C(${n}, ${k}) x^${k} (${c})^${n - k} = ${comb(n, k)} * ${Math.pow(c, n - k)} = ${ans}.`
      };
    }
  },
  {
    difficulty: 16, topic: 'combinatorics',
    gen(rng) {
      const n = rng.int(5, 7);
      let f = 1;
      for (let i = 2; i <= n - 1; i++) f *= i;
      return {
        statement: `In how many ways can ${n} people sit around a round table? (Rotations of the same seating count as one way.)`,
        choices: null,
        answer: String(f),
        hint: `Fix one person's seat to break the rotational symmetry.`,
        solution: `Fix one person to eliminate rotations; the remaining ${n - 1} people can be arranged in (${n - 1})! = ${f} ways.`
      };
    }
  },
  {
    difficulty: 16, topic: 'combinatorics',
    gen(rng) {
      const m = rng.int(2, 5), nn = rng.int(2, 5);
      const ans = comb(m + nn, m);
      return {
        statement: `How many shortest paths go from (0, 0) to (${m}, ${nn}) using steps of (1, 0) right and (0, 1) up?`,
        choices: null,
        answer: String(ans),
        hint: `A shortest path is a sequence of ${m + nn} steps; choose which ones go right.`,
        solution: `A shortest path uses ${m} right steps and ${nn} up steps in some order. Choosing the positions of the right steps: C(${m + nn}, ${m}) = ${ans}.`
      };
    }
  },
  // ---------------- COMBINATORICS (d17) ----------------
  {
    difficulty: 17, topic: 'combinatorics',
    gen(rng) {
      const g = rng.int(4, 6), w = rng.int(3, 5);
      const total = comb(g + w, 3), allMen = comb(g, 3);
      const ans = total - allMen;
      return {
        statement: `From ${g} men and ${w} women, a 3-person committee is chosen. In how many ways can it include at least one woman?`,
        choices: null,
        answer: String(ans),
        hint: `Count all committees, then subtract the all-men ones.`,
        solution: `All committees: C(${g + w}, 3) = ${total}. All-men committees: C(${g}, 3) = ${allMen}. With at least one woman: ${total} - ${allMen} = ${ans}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'combinatorics',
    gen(rng) {
      const n = rng.int(8, 14);
      const ans = comb(n - 1, 2);
      return {
        statement: `How many triples (x, y, z) of positive integers satisfy x + y + z = ${n}?`,
        choices: null,
        answer: String(ans),
        hint: `Stars and bars: place 2 dividers into the ${n - 1} gaps between stars.`,
        solution: `Write ${n} as a row of ${n} stars; choose 2 of the ${n - 1} gaps between them for the dividers: C(${n - 1}, 2) = ${ans}.`
      };
    }
  },
  {
    difficulty: 17, topic: 'combinatorics',
    gen(rng) {
      const n = rng.int(8, 12);
      const seq = [1, 2];
      for (let i = 3; i <= n; i++) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
      const ans = seq[n - 1];
      return {
        statement: `A staircase has ${n} steps. In how many ways can it be climbed by taking 1 or 2 steps at a time?`,
        choices: null,
        answer: String(ans),
        hint: `Let w_k be the number of ways for k steps; find a recurrence for w_k.`,
        solution: `w_1 = 1, w_2 = 2, and w_k = w_(k-1) + w_(k-2) (first stride is 1 or 2 steps). Iterating: ${seq.join(', ')}. So w_${n} = ${ans}.`
      };
    }
  },
  // ---------------- COMBINATORICS (d18) ----------------
  {
    difficulty: 18, topic: 'combinatorics',
    gen(rng) {
      const n = rng.pick([5, 6]);
      let d1 = 0, d2 = 1, dcur = 1;
      for (let i = 3; i <= n; i++) { dcur = (i - 1) * (d2 + d1); d1 = d2; d2 = dcur; }
      return {
        statement: `${n} letters addressed to ${n} different people are randomly placed into the ${n} addressed envelopes, one per envelope. In how many permutations does no letter go to the correct person?`,
        choices: null,
        answer: String(dcur),
        hint: `Count derangements: use inclusion-exclusion over the set of fixed points.`,
        solution: `By inclusion-exclusion over letters in the right envelope, the count is ${n}!(1 - 1/1! + 1/2! - ... + (-1)^${n}/${n}!) = ${dcur}.`
      };
    }
  },
  {
    difficulty: 18, topic: 'combinatorics',
    gen(rng) {
      const k = rng.pick([3, 4]);
      const total = comb(10 + k - 1, k);
      const bad = comb(10 + k - 2, k - 1);
      const ans = total - bad;
      return {
        statement: `How many ${k}-digit PINs have digits in nondecreasing order from left to right (each digit >= the one before it)?`,
        choices: null,
        answer: String(ans),
        hint: `Choose a multiset of ${k} digits, then discard the ones starting with 0.`,
        solution: `Nondecreasing PINs correspond to multisets of ${k} digits from 0-9: C(${10 + k - 1}, ${k}) = ${total}. Those starting with 0 leave ${k - 1} free digits: C(${10 + k - 2}, ${k - 1}) = ${bad}. Valid PINs: ${total} - ${bad} = ${ans}.`
      };
    }
  }
];

// Stable sort so the exported array is ordered by difficulty ascending.
TEMPLATES.sort((a, b) => a.difficulty - b.difficulty);
module.exports = TEMPLATES;

// Self-test: run with `node templates-aime.js`.
if (require.main === module) {
  function mulberry32(seed) {
    let t = seed >>> 0;
    return {
      f() {
        t = (t + 0x6D2B79F5) >>> 0;
        let z = t;
        z = Math.imul(z ^ (z >>> 15), z | 1);
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
  const fail = (msg) => { console.error('FAIL: ' + msg); process.exit(1); };
  const templates = module.exports;
  if (!Array.isArray(templates) || templates.length !== 40) {
    fail(`expected 40 templates, got ${templates && templates.length}`);
  }
  const topics = { algebra: 0, geometry: 0, number_theory: 0, combinatorics: 0 };
  let prevDiff = -Infinity;
  const diffs = {};
  templates.forEach((t, i) => {
    if (!t || typeof t.gen !== 'function') fail(`template ${i}: missing gen function`);
    if (!Number.isInteger(t.difficulty) || t.difficulty < 15 || t.difficulty > 18) {
      fail(`template ${i}: difficulty ${t.difficulty} not in 15-18`);
    }
    if (t.difficulty < prevDiff) fail(`template ${i}: difficulties not ascending`);
    prevDiff = t.difficulty;
    diffs[t.difficulty] = (diffs[t.difficulty] || 0) + 1;
    if (!(t.topic in topics)) fail(`template ${i}: invalid topic ${t.topic}`);
    topics[t.topic]++;
    for (const seed of [1, 2, 3]) {
      const rng = mulberry32(seed * 7919 + i * 131);
      let r;
      try {
        r = t.gen(rng);
      } catch (e) {
        fail(`template ${i} seed ${seed}: gen threw: ${e.message}`);
      }
      for (const k of ['statement', 'answer', 'hint', 'solution']) {
        if (typeof r[k] !== 'string' || r[k].length === 0) {
          fail(`template ${i} seed ${seed}: ${k} not a non-empty string`);
        }
      }
      if (r.choices !== null) fail(`template ${i} seed ${seed}: choices must be null`);
      if (!/^\d{1,3}$/.test(r.answer)) fail(`template ${i} seed ${seed}: answer "${r.answer}" not 1-3 digits`);
      const v = Number(r.answer);
      if (v < 0 || v > 999) fail(`template ${i} seed ${seed}: answer ${v} out of 0-999`);
      if (r.statement.length > 600) fail(`template ${i} seed ${seed}: statement > 600 chars`);
      if (/<[a-zA-Z/][^>]*>/.test(r.statement)) fail(`template ${i} seed ${seed}: statement contains HTML-like brackets`);
    }
  });
  console.log(`PASS (40 templates) difficulty=${JSON.stringify(diffs)} topics=${JSON.stringify(topics)}`);
}
