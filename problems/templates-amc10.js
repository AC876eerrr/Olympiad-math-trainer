// AMC 10 problem templates — difficulty 12-15.
// Each template: { difficulty, topic, gen(rng) } where gen returns
// { statement, choices, answer, hint, solution }.
// gen MUST be pure: only rng.f(), rng.int(min,max), rng.pick(arr), rng.shuffle(arr).

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { const t = a % b; a = b; b = t; }
  return a;
}
function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }
function powmod(base, exp, mod) {
  let r = 1 % mod; base = ((base % mod) + mod) % mod;
  while (exp > 0) {
    if (exp & 1) r = (r * base) % mod;
    base = (base * base) % mod;
    exp >>= 1;
  }
  return r;
}
function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
function comb(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;
  return Math.round(r);
}
function frac(num, den) {
  const g = gcd(num, den); num /= g; den /= g;
  return den === 1 ? String(num) : num + '/' + den;
}
function tau(n) {
  let c = 1, d = n, p = 2;
  while (p * p <= d) {
    let e = 0;
    while (d % p === 0) { d /= p; e++; }
    if (e) c *= (e + 1);
    p++;
  }
  if (d > 1) c *= 2;
  return c;
}
// Build exactly 5 unique string choices containing the answer exactly once.
function mkChoices(answer, cands, rng) {
  const ans = String(answer);
  const seen = new Set([ans]);
  const out = [ans];
  for (const c of cands) {
    const s = String(c);
    if (!seen.has(s)) { seen.add(s); out.push(s); }
    if (out.length >= 5) break;
  }
  let j = 2;
  while (out.length < 5) {
    const s = ans + '#' + j;
    if (!seen.has(s)) { seen.add(s); out.push(s); }
    j++;
  }
  return rng.shuffle(out);
}

const T = [];

// ---------- 1. algebra 12: Vieta roots ----------
T.push({
  difficulty: 12, topic: 'algebra',
  gen(rng) {
    let r1 = rng.int(1, 9), r2 = rng.int(1, 9);
    if (r2 === r1) r2 = (r2 % 9) + 1;
    const b = -(r1 + r2), c = r1 * r2, ans = b + c;
    const statement = `The quadratic equation x² + bx + c = 0 has roots ${r1} and ${r2}. What is the value of b + c?`;
    const choices = mkChoices(ans, [ans + 2, ans - 2, -ans, ans + 1, r1 + r2 + c, b - c, r1 * r2], rng);
    const hint = `Use Vieta's formulas: for x² + bx + c = 0, the sum of the roots is −b and the product is c.`;
    const solution = `By Vieta's formulas, r1 + r2 = −b, so b = −(${r1} + ${r2}) = ${b}. Also r1 × r2 = c, so c = ${r1} × ${r2} = ${c}. Therefore b + c = ${b} + ${c} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 2. geometry 12: Pythagorean hypotenuse ----------
T.push({
  difficulty: 12, topic: 'geometry',
  gen(rng) {
    const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15]];
    const tr = rng.pick(triples);
    const k = rng.int(1, 3);
    const a = tr[0] * k, b = tr[1] * k, ans = tr[2] * k;
    const statement = `A right triangle has legs of lengths ${a} and ${b}. What is the length of the hypotenuse?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, a + b, Math.round(Math.sqrt(a * a + b * b)) + 1, a + b - 2], rng);
    const hint = `For a right triangle, (hypotenuse)² = (leg1)² + (leg2)².`;
    const solution = `By the Pythagorean theorem, hypotenuse² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}. Taking the square root gives √${a * a + b * b} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 3. number_theory 12: GCD ----------
T.push({
  difficulty: 12, topic: 'number_theory',
  gen(rng) {
    let a = rng.int(6, 60), b = rng.int(6, 60);
    if (b === a) b = (b % 60) + 1;
    const ans = gcd(a, b);
    const statement = `What is the greatest common divisor of ${a} and ${b}?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, Math.min(a, b), gcd(a, b) + 3, 1], rng);
    const hint = `List the divisors of the smaller number, or use the Euclidean algorithm.`;
    const solution = `Using the Euclidean algorithm: gcd(${a}, ${b}) = ${ans}, since ${ans} is the largest integer dividing both ${a} and ${b}. Indeed ${a} = ${ans} × ${a / ans} and ${b} = ${ans} × ${b / ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 4. combinatorics 12: handshakes C(n,2) ----------
T.push({
  difficulty: 12, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(5, 12);
    const ans = n * (n - 1) / 2;
    const statement = `There are ${n} people at a party. Each person shakes hands with every other person exactly once. How many handshakes occur in total?`;
    const choices = mkChoices(ans, [ans + n, ans - n, n * (n - 1), n * n, ans + 1, 2 * n], rng);
    const hint = `Each handshake involves 2 people. Count ordered pairs, then correct for double-counting.`;
    const solution = `There are ${n} choices for the first person and ${n - 1} for the second, giving ${n} × ${n - 1} = ${n * (n - 1)} ordered pairs. Each handshake is counted twice (A–B and B–A), so divide by 2: ${n * (n - 1)}/2 = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 5. algebra 12: exponential equation ----------
T.push({
  difficulty: 12, topic: 'algebra',
  gen(rng) {
    const b = rng.pick([2, 3]);
    const k = rng.pick([1, 2]);
    const m = Math.pow(b, k);
    const e = rng.int(6, 10);
    const x = e - k;
    const terms = new Array(m).fill(`${b}^x`).join(' + ');
    const statement = `If ${terms} = ${b}^${e}, what is the value of x?`;
    const choices = mkChoices(x, [x + 1, x - 1, x + 2, e, k, e + k], rng);
    const hint = `Combine the ${m} identical terms on the left into a single power of ${b}.`;
    const solution = `The left side is ${m} copies of ${b}^x, so it equals ${m} × ${b}^x = ${b}^${k} × ${b}^x = ${b}^(x+${k}). Setting ${b}^(x+${k}) = ${b}^${e} gives x + ${k} = ${e}, so x = ${x}.`;
    return { statement, choices, answer: String(x), hint, solution };
  }
});

// ---------- 6. geometry 12: third angle of triangle ----------
T.push({
  difficulty: 12, topic: 'geometry',
  gen(rng) {
    const a = rng.int(25, 80);
    const b = rng.int(20, 160 - a);
    const ans = 180 - a - b;
    const statement = `Two angles of a triangle measure ${a}° and ${b}°. What is the measure of the third angle?`;
    const choices = mkChoices(ans, [ans + 10, ans - 10, ans + 5, 180 - a, 180 - b, a + b], rng);
    const hint = `The angles of a triangle always add up to the same total. What is it?`;
    const solution = `The three interior angles of a triangle sum to 180°. So the third angle is 180° − ${a}° − ${b}° = ${ans}°.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 7. number_theory 12: units digit of a power ----------
T.push({
  difficulty: 12, topic: 'number_theory',
  gen(rng) {
    const d = rng.int(2, 9);
    const e = rng.int(50, 200);
    const ans = powmod(d, e, 10);
    const statement = `What is the units digit of ${d}^${e}?`;
    const choices = mkChoices(ans, [(ans + 1) % 10, (ans + 9) % 10, (ans + 2) % 10, (ans + 5) % 10, d % 10, (d * d) % 10], rng);
    const hint = `Only the units digit matters. Compute the first few powers of ${d} and look for a repeating cycle.`;
    const solution = `The units digits of powers of ${d} repeat in a cycle. Computing: ${d}^1 ends in ${d % 10}, ${d}^2 ends in ${(d * d) % 10}, ${d}^3 ends in ${powmod(d, 3, 10)}, ${d}^4 ends in ${powmod(d, 4, 10)}, and the pattern repeats every ${(() => { let c = 1, v = d % 10; while ((v * d) % 10 !== d % 10) { v = (v * d) % 10; c++; } return c; })()} powers. Since ${e} mod ${(() => { let c = 1, v = d % 10; while ((v * d) % 10 !== d % 10) { v = (v * d) % 10; c++; } return c; })()} determines the position in the cycle, ${d}^${e} ends in ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 8. combinatorics 12: permutations n! ----------
T.push({
  difficulty: 12, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(4, 7);
    const ans = fact(n);
    const statement = `In how many different orders can ${n} distinct books be arranged on a shelf?`;
    const choices = mkChoices(ans, [ans + n, fact(n - 1), n * n, Math.pow(n, n), ans - n, 2 * ans], rng);
    const hint = `Count choices for the first position, then the second, and so on.`;
    const solution = `There are ${n} choices for the first book, ${n - 1} for the second, down to 1 for the last. Total: ${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 9. algebra 12: system sum/difference ----------
T.push({
  difficulty: 12, topic: 'algebra',
  gen(rng) {
    const s = rng.int(6, 30);
    let d = rng.int(1, 10);
    if ((s + d) % 2 === 1) d = d === 10 ? 9 : d + 1;
    const ans = (s + d) / 2;
    const statement = `Two numbers have a sum of ${s} and a difference of ${d}. What is the larger of the two numbers?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, (s - d) / 2, s - ans, s], rng);
    const hint = `Add the two equations x + y = ${s} and x − y = ${d} together.`;
    const solution = `Let the numbers be x (larger) and y. Then x + y = ${s} and x − y = ${d}. Adding: 2x = ${s + d}, so x = ${(s + d) / 2} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 10. geometry 12: rectangle area ----------
T.push({
  difficulty: 12, topic: 'geometry',
  gen(rng) {
    const l = rng.int(3, 15), w = rng.int(2, 12);
    const ans = l * w;
    const statement = `A rectangle has length ${l} and width ${w}. What is its area?`;
    const choices = mkChoices(ans, [ans + l, ans - w, 2 * (l + w), l + w, ans + 2, l * l], rng);
    const hint = `Area of a rectangle = length × width.`;
    const solution = `Area = length × width = ${l} × ${w} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 11. number_theory 12: counting multiples ----------
T.push({
  difficulty: 12, topic: 'number_theory',
  gen(rng) {
    const k = rng.int(3, 12);
    const N = rng.int(50, 300);
    const ans = Math.floor(N / k);
    const statement = `How many positive integers from 1 to ${N} are divisible by ${k}?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, Math.floor(N / (k + 1)), Math.ceil(N / k), N - ans], rng);
    const hint = `The multiples of ${k} are ${k}, ${2 * k}, ${3 * k}, … — how many fit below ${N}?`;
    const solution = `The multiples of ${k} up to ${N} are ${k} × 1, ${k} × 2, …, ${k} × m where ${k}m ≤ ${N}. The largest such m is ⌊${N}/${k}⌋ = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 12. combinatorics 12: coin flip probability ----------
T.push({
  difficulty: 12, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(2, 5);
    const ans = frac(1, Math.pow(2, n));
    const statement = `A fair coin is flipped ${n} times. What is the probability that all ${n} flips land heads?`;
    const choices = mkChoices(ans, [frac(1, Math.pow(2, n - 1)), frac(1, Math.pow(2, n + 1)), frac(n, Math.pow(2, n)), '1/2', frac(1, n), '1/3'], rng);
    const hint = `Each flip is independent with probability 1/2 of heads. Multiply.`;
    const solution = `Each flip lands heads with probability 1/2, independently. So P(all heads) = (1/2)^${n} = 1/${Math.pow(2, n)}.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 13. algebra 12: arithmetic series sum ----------
T.push({
  difficulty: 12, topic: 'algebra',
  gen(rng) {
    const a1 = rng.int(1, 10), d = rng.int(2, 9), n = rng.int(5, 12);
    const ans = n * (2 * a1 + (n - 1) * d) / 2;
    const statement = `An arithmetic sequence starts with ${a1} and has common difference ${d}. What is the sum of its first ${n} terms?`;
    const choices = mkChoices(ans, [ans + d, ans - d, n * a1, ans + n, n * (a1 + d), ans * 2 - n], rng);
    const hint = `Pair the first and last terms: each pair sums to the same value. Use S = n/2 × (first + last).`;
    const solution = `The ${n}th term is ${a1} + ${n - 1} × ${d} = ${a1 + (n - 1) * d}. Sum = ${n}/2 × (first + last) = ${n}/2 × (${a1} + ${a1 + (n - 1) * d}) = ${n}/2 × ${2 * a1 + (n - 1) * d} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 14. geometry 12: circle area ----------
T.push({
  difficulty: 12, topic: 'geometry',
  gen(rng) {
    const r = rng.int(2, 10);
    const ans = `${r * r}π`;
    const statement = `A circle has radius ${r}. What is its area?`;
    const choices = mkChoices(ans, [`${2 * r}π`, `${r * r + 1}π`, `${r * r - 1}π`, `${4 * r}π`, `${r}π`, `${(r + 1) * (r + 1)}π`], rng);
    const hint = `Area of a circle = πr².`;
    const solution = `Area = πr² = π × ${r}² = ${r * r}π.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 15. number_theory 12: next multiple ----------
T.push({
  difficulty: 12, topic: 'number_theory',
  gen(rng) {
    const N = rng.int(20, 200);
    const k = rng.int(3, 11);
    const q = Math.floor(N / k) + 1;
    const ans = q * k;
    const statement = `What is the smallest integer greater than ${N} that is divisible by ${k}?`;
    const choices = mkChoices(ans, [ans + k, ans - k, ans + 1, ans - 1, N + k, q * k + 2], rng);
    const hint = `Divide ${N} by ${k}, round up to the next whole multiple.`;
    const solution = `${N} ÷ ${k} = ${(N / k).toFixed(2)}, so the next whole multiple uses quotient ${q}: ${q} × ${k} = ${ans}, which is greater than ${N} and divisible by ${k}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 16. algebra 13: sum of squares from sum and product ----------
T.push({
  difficulty: 13, topic: 'algebra',
  gen(rng) {
    const s = rng.int(4, 14);
    const pmax = Math.max(2, Math.floor(s * s / 4));
    const p = rng.int(1, pmax);
    const ans = s * s - 2 * p;
    const statement = `Two numbers have a sum of ${s} and a product of ${p}. What is the sum of their squares?`;
    const choices = mkChoices(ans, [ans + 2, ans - 2, ans + p, s * s, s * s + 2 * p, 2 * p], rng);
    const hint = `Square the sum: (x + y)² expands to something involving x² + y² and xy.`;
    const solution = `Let the numbers be x and y. Then (x + y)² = x² + 2xy + y², so x² + y² = (x + y)² − 2xy = ${s}² − 2 × ${p} = ${s * s} − ${2 * p} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 17. geometry 13: similar triangle perimeter ----------
T.push({
  difficulty: 13, topic: 'geometry',
  gen(rng) {
    const t = rng.pick([2, 3, 4]);
    const a = rng.int(2, 9);
    const P = rng.int(10, 30);
    const ans = P * t;
    const statement = `Two similar triangles have a pair of corresponding sides of lengths ${a} and ${a * t}. If the smaller triangle has perimeter ${P}, what is the perimeter of the larger triangle?`;
    const choices = mkChoices(ans, [ans + t, ans - t, P + a * t, P * (t + 1), P * P, ans + P], rng);
    const hint = `In similar figures, every length scales by the same factor. Find that factor from the given sides.`;
    const solution = `The scale factor from the smaller to the larger triangle is ${a * t}/${a} = ${t}. All lengths scale by ${t}, so the larger perimeter is ${P} × ${t} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 18. number_theory 13: LCM ----------
T.push({
  difficulty: 13, topic: 'number_theory',
  gen(rng) {
    let a = rng.int(4, 20), b = rng.int(4, 20);
    if (b === a) b = (b % 20) + 1;
    const ans = lcm(a, b);
    const statement = `What is the least common multiple of ${a} and ${b}?`;
    const choices = mkChoices(ans, [ans + a, ans - b, a * b, Math.max(a, b), ans + 2, a + b], rng);
    const hint = `Try lcm(a,b) = a × b / gcd(a,b), or list multiples of the larger number.`;
    const solution = `gcd(${a}, ${b}) = ${gcd(a, b)}, so lcm(${a}, ${b}) = ${a} × ${b} / ${gcd(a, b)} = ${a * b / gcd(a, b)} = ${ans}. Check: ${ans} ÷ ${a} = ${ans / a} and ${ans} ÷ ${b} = ${ans / b}, both whole numbers.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 19. combinatorics 13: combinations C(n,k) ----------
T.push({
  difficulty: 13, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(6, 10);
    const k = rng.pick([2, 3]);
    const ans = comb(n, k);
    const statement = `A committee of ${k} students must be chosen from a class of ${n} students. How many different committees are possible?`;
    const choices = mkChoices(ans, [ans + k, ans - k, n * (n - 1), fact(k), n * k, ans + n], rng);
    const hint = `Order doesn't matter here — use combinations C(${n}, ${k}), not permutations.`;
    const solution = `The number of ways to choose ${k} from ${n} is C(${n}, ${k}) = ${n}! / (${k}! × ${n - k}!) = ${Array.from({ length: k }, (_, i) => n - i).join(' × ')} / ${fact(k)} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 20. algebra 13: radical equation ----------
T.push({
  difficulty: 13, topic: 'algebra',
  gen(rng) {
    const a = rng.int(1, 20);
    const b = rng.int(3, 9);
    const x = b * b - a;
    const statement = `If √(x + ${a}) = ${b}, what is the value of x?`;
    const choices = mkChoices(x, [x + 1, x - 1, x + 2, b * b, b * b + a, 2 * b], rng);
    const hint = `Square both sides to remove the square root, then solve for x.`;
    const solution = `Squaring both sides: x + ${a} = ${b}² = ${b * b}. Therefore x = ${b * b} − ${a} = ${x}. Check: √(${x} + ${a}) = √${b * b} = ${b}. ✓`;
    return { statement, choices, answer: String(x), hint, solution };
  }
});

// ---------- 21. geometry 13: distance between lattice points ----------
T.push({
  difficulty: 13, topic: 'geometry',
  gen(rng) {
    const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]];
    const tr = rng.pick(triples);
    const k = rng.int(1, 2);
    const dx = tr[0] * k, dy = tr[1] * k, ans = tr[2] * k;
    const statement = `What is the distance between the points (0, 0) and (${dx}, ${dy})?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, dx + dy, Math.abs(dx - dy), ans + 2, dx + dy - 2], rng);
    const hint = `Use the distance formula: d = √(Δx² + Δy²).`;
    const solution = `Distance = √((${dx} − 0)² + (${dy} − 0)²) = √(${dx * dx} + ${dy * dy}) = √${dx * dx + dy * dy} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 22. number_theory 13: number of divisors ----------
T.push({
  difficulty: 13, topic: 'number_theory',
  gen(rng) {
    const n = rng.int(12, 100);
    const ans = tau(n);
    const statement = `How many positive divisors does ${n} have?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, 2 * ans, n / 2, ans - 2], rng);
    const hint = `Factor ${n} into primes: if n = p^a × q^b × …, the divisor count is (a+1)(b+1)….`;
    const solution = (() => {
      let d = n, p = 2; const fac = [];
      while (p * p <= d) { let e = 0; while (d % p === 0) { d /= p; e++; } if (e) fac.push([p, e]); p++; }
      if (d > 1) fac.push([d, 1]);
      const fs = fac.map(([p, e]) => `${p}^${e}`).join(' × ');
      const cs = fac.map(([p, e]) => `(${e}+1)`).join(' × ');
      return `Prime factorization: ${n} = ${fs}. Number of divisors = ${cs} = ${ans}.`;
    })();
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 23. combinatorics 13: adjacent arrangements ----------
T.push({
  difficulty: 13, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(4, 7);
    const ans = 2 * fact(n - 1);
    const statement = `${n} people stand in a row for a photo. Two particular friends insist on standing next to each other. In how many orders can the row be arranged?`;
    const choices = mkChoices(ans, [fact(n), fact(n - 1), 2 * fact(n), ans + 2, n * fact(n - 1) - 2, ans / 2], rng);
    const hint = `Glue the two friends together into a single "block", arrange the blocks, then arrange within the block.`;
    const solution = `Treat the two friends as one block: then there are ${n - 1} objects to arrange, giving ${n - 1}! = ${fact(n - 1)} orders. The two friends can swap within their block in 2 ways. Total: 2 × ${fact(n - 1)} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 24. algebra 13: evaluating a linear function ----------
T.push({
  difficulty: 13, topic: 'algebra',
  gen(rng) {
    const a = rng.int(2, 5), b = rng.int(1, 9), c = rng.int(3, 9);
    const ans = a * c + b;
    const statement = `If f(x) = ${a}x + ${b}, what is f(${c})?`;
    const choices = mkChoices(ans, [ans + a, ans - a, a * c, c + b, ans + 1, a * (c + b)], rng);
    const hint = `Substitute x = ${c} into the formula and simplify.`;
    const solution = `f(${c}) = ${a} × ${c} + ${b} = ${a * c} + ${b} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 25. geometry 13: trapezoid area ----------
T.push({
  difficulty: 13, topic: 'geometry',
  gen(rng) {
    const b1 = rng.int(4, 14);
    let b2 = rng.int(4, 14);
    if ((b1 + b2) % 2 === 1) b2++;
    const h = rng.int(2, 8);
    const ans = (b1 + b2) / 2 * h;
    const statement = `A trapezoid has bases of lengths ${b1} and ${b2} and height ${h}. What is its area?`;
    const choices = mkChoices(ans, [ans + h, ans - h, b1 * b2, (b1 + b2) * h, ans + 2, b1 * h], rng);
    const hint = `Area of a trapezoid = (average of the bases) × height.`;
    const solution = `Area = ((${b1} + ${b2}) / 2) × ${h} = ${(b1 + b2) / 2} × ${h} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 26. number_theory 13: modular product ----------
T.push({
  difficulty: 13, topic: 'number_theory',
  gen(rng) {
    const a = rng.int(10, 99), b = rng.int(10, 99), m = rng.int(7, 20);
    const ans = (a * b) % m;
    const statement = `What is the remainder when ${a} × ${b} is divided by ${m}?`;
    const choices = mkChoices(ans, [(ans + 1) % m, (ans + m - 1) % m, (ans + 2) % m, m - ans, (a % m) + (b % m), ans === 0 ? 1 : 0], rng);
    const hint = `Reduce each factor modulo ${m} first, then multiply — the numbers stay small.`;
    const solution = `${a} mod ${m} = ${a % m} and ${b} mod ${m} = ${b % m}. So (${a} × ${b}) mod ${m} = (${a % m} × ${b % m}) mod ${m} = ${(a % m) * (b % m)} mod ${m} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 27. combinatorics 13: urn probability without replacement ----------
T.push({
  difficulty: 13, topic: 'combinatorics',
  gen(rng) {
    const R = rng.int(3, 6), B = rng.int(2, 5);
    const ans = frac(comb(R, 2), comb(R + B, 2));
    const statement = `A bag holds ${R} red and ${B} blue marbles. Two marbles are drawn at random without replacement. What is the probability that both are red?`;
    const choices = mkChoices(ans, [frac(R, R + B), frac(comb(R, 2) + 1, comb(R + B, 2)), frac(R - 1, R + B - 1), frac(2, R + B), frac(R, comb(R + B, 2)), '1/2'], rng);
    const hint = `Multiply: P(first red) × P(second red given the first was red).`;
    const solution = `P(first red) = ${R}/${R + B}. After drawing one red, ${R - 1} red remain out of ${R + B - 1}. So P = ${R}/${R + B} × ${R - 1}/${R + B - 1} = ${R * (R - 1)}/${(R + B) * (R + B - 1)} = ${ans}.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 28. algebra 13: average round-trip speed ----------
T.push({
  difficulty: 13, topic: 'algebra',
  gen(rng) {
    const pair = rng.pick([[30, 60], [40, 60], [20, 30], [30, 90], [20, 60], [24, 40]]);
    const a = pair[0], b = pair[1];
    const ans = 2 * a * b / (a + b);
    const statement = `A car drives to a city at ${a} mph and returns by the same route at ${b} mph. What is the average speed for the whole round trip, in mph?`;
    const choices = mkChoices(ans, [(a + b) / 2, ans + 5, ans - 5, 2 * ans, a + b, Math.round((a + b) / 2) + 2], rng);
    const hint = `Average speed = total distance ÷ total time. Pick a convenient distance, like the LCM of the speeds.`;
    const solution = `Let each one-way distance be ${lcm(a, b)} miles. Time going = ${lcm(a, b)}/${a} = ${lcm(a, b) / a} h; returning = ${lcm(a, b)}/${b} = ${lcm(a, b) / b} h. Total distance ${2 * lcm(a, b)} miles in ${lcm(a, b) / a + lcm(a, b) / b} h, so average = ${2 * lcm(a, b)} / ${lcm(a, b) / a + lcm(a, b) / b} = ${ans} mph. (This is the harmonic mean 2ab/(a+b).)`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 29. combinatorics 13: permutations P(n,4) ----------
T.push({
  difficulty: 13, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(5, 9);
    const ans = n * (n - 1) * (n - 2) * (n - 3);
    const statement = `How many 4-letter codes with no repeated letters can be formed from ${n} distinct letters?`;
    const choices = mkChoices(ans, [ans + n, Math.pow(n, 4), comb(n, 4), ans - n, n * (n - 1) * (n - 2), 4 * n], rng);
    const hint = `Order matters for a code, and letters can't repeat — count choices position by position.`;
    const solution = `Choices: ${n} for the first letter, ${n - 1} for the second, ${n - 2} for the third, ${n - 3} for the fourth. Total = ${n} × ${n - 1} × ${n - 2} × ${n - 3} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 30. number_theory 13: inclusion-exclusion counting ----------
T.push({
  difficulty: 13, topic: 'number_theory',
  gen(rng) {
    const N = rng.int(60, 150);
    const a = rng.pick([2, 3]);
    const bChoices = [2, 3, 5, 7].filter(x => x !== a);
    const b = rng.pick(bChoices);
    const l = lcm(a, b);
    const ans = N - Math.floor(N / a) - Math.floor(N / b) + Math.floor(N / l);
    const statement = `How many integers from 1 to ${N} are divisible by neither ${a} nor ${b}?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, N - Math.floor(N / a), Math.floor(N / a) + Math.floor(N / b), ans + a], rng);
    const hint = `Count the complement: subtract multiples of ${a} and multiples of ${b}, then fix the double-subtraction.`;
    const solution = `Multiples of ${a}: ⌊${N}/${a}⌋ = ${Math.floor(N / a)}; multiples of ${b}: ⌊${N}/${b}⌋ = ${Math.floor(N / b)}; multiples of both (i.e. of lcm = ${l}): ⌊${N}/${l}⌋ = ${Math.floor(N / l)}. By inclusion–exclusion, divisible by at least one = ${Math.floor(N / a)} + ${Math.floor(N / b)} − ${Math.floor(N / l)} = ${Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / l)}. So divisible by neither = ${N} − ${Math.floor(N / a) + Math.floor(N / b) - Math.floor(N / l)} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 31. algebra 14: double root discriminant ----------
T.push({
  difficulty: 14, topic: 'algebra',
  gen(rng) {
    const t = rng.int(2, 9);
    const m = t * t, k = 2 * t;
    const statement = `For what positive value of k does the equation x² + kx + ${m} = 0 have exactly one real solution?`;
    const choices = mkChoices(k, [k + 1, k - 1, t, 2 * t + 2, t * t, 4 * t], rng);
    const hint = `A quadratic has exactly one real solution when its discriminant equals zero.`;
    const solution = `Exactly one real solution means discriminant = 0: k² − 4 × 1 × ${m} = 0, so k² = ${4 * m} and k = ±${2 * t}. The positive value is k = ${k}.`;
    return { statement, choices, answer: String(k), hint, solution };
  }
});

// ---------- 32. geometry 14: equilateral triangle area ----------
T.push({
  difficulty: 14, topic: 'geometry',
  gen(rng) {
    const s = rng.int(2, 12);
    const ans = s % 2 === 0 ? `${(s * s) / 4}√3` : `${s * s}√3/4`;
    const statement = `An equilateral triangle has side length ${s}. What is its area?`;
    const cands = s % 2 === 0
      ? [`${(s * s) / 4 + 1}√3`, `${(s * s) / 4 - 1}√3`, `${s * s}√3/2`, `${s * s}√3`, `${s}√3`, `${(s * s) / 2}√3`]
      : [`${s * s + 1}√3/4`, `${s * s - 1}√3/4`, `${s * s}√3/2`, `${s * s}√3`, `${2 * s * s}√3/4`, `${s}√3/4`];
    const choices = mkChoices(ans, cands, rng);
    const hint = `Drop an altitude: it splits the triangle into two 30-60-90 right triangles. Or use area = s²√3/4.`;
    const solution = `The altitude of an equilateral triangle of side ${s} is ${s}√3/2. Area = (1/2) × base × height = (1/2) × ${s} × ${s}√3/2 = ${s * s}√3/4${s % 2 === 0 ? ` = ${(s * s) / 4}√3` : ''}.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 33. number_theory 14: modular exponent ----------
T.push({
  difficulty: 14, topic: 'number_theory',
  gen(rng) {
    const m = rng.pick([7, 9, 11, 13]);
    const n = rng.int(20, 60);
    const ans = powmod(2, n, m);
    const statement = `What is the remainder when 2^${n} is divided by ${m}?`;
    const choices = mkChoices(ans, [(ans + 1) % m, (ans + m - 1) % m, (ans + 2) % m, (ans + 3) % m, m - 1 - ans, powmod(2, n - 1, m)], rng);
    const hint = `Find the cycle length of powers of 2 modulo ${m}, then reduce the exponent.`;
    const solution = (() => {
      let cyc = 1; while (powmod(2, cyc, m) !== 1) cyc++;
      return `Powers of 2 mod ${m} repeat every ${cyc} (since 2^${cyc} ≡ 1 mod ${m}). ${n} = ${cyc} × ${Math.floor(n / cyc)} + ${n % cyc}, so 2^${n} ≡ 2^${n % cyc} ≡ ${ans} (mod ${m}). The remainder is ${ans}.`;
    })();
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 34. combinatorics 14: lattice paths ----------
T.push({
  difficulty: 14, topic: 'combinatorics',
  gen(rng) {
    const r = rng.int(2, 5), c = rng.int(2, 5);
    const ans = comb(r + c, r);
    const statement = `A robot starts at the top-left corner of a ${r} × ${c} grid of squares and must reach the bottom-right corner, moving only right or down along grid lines. How many different paths can it take?`;
    const choices = mkChoices(ans, [ans + r, ans - c, r * c, Math.pow(2, r + c), comb(r + c, r) + 2, r + c], rng);
    const hint = `Every path is a sequence of R and D moves. How many of each, and in how many orders?`;
    const solution = `Each path needs ${r} down-moves and ${c} right-moves, in some order: ${r + c} moves total. Choose which ${r} of the ${r + c} positions are the down-moves: C(${r + c}, ${r}) = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 35. algebra 14: x + 1/x identity ----------
T.push({
  difficulty: 14, topic: 'algebra',
  gen(rng) {
    const t = rng.int(3, 8);
    const ans = t * t - 2;
    const statement = `If x + 1/x = ${t} (with x ≠ 0), what is the value of x² + 1/x²?`;
    const choices = mkChoices(ans, [ans + 2, ans - 2, t * t, t * t + 2, 2 * t, ans + 1], rng);
    const hint = `Square both sides of x + 1/x = ${t} and watch the cross term.`;
    const solution = `Squaring: (x + 1/x)² = x² + 2 × x × (1/x) + 1/x² = x² + 2 + 1/x². So ${t}² = (x² + 1/x²) + 2, giving x² + 1/x² = ${t * t} − 2 = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 36. geometry 14: circle inscribed in square ----------
T.push({
  difficulty: 14, topic: 'geometry',
  gen(rng) {
    const s = rng.pick([4, 6, 8, 10, 12, 14, 16]);
    const r = s / 2;
    const ans = `${r * r}π`;
    const statement = `A circle is inscribed in a square with side length ${s}. What is the area of the circle?`;
    const choices = mkChoices(ans, [`${s * s}π`, `${r * r + 1}π`, `${r * r - 1}π`, `${s}π`, `${2 * r}π`, `${(r + 1) * (r + 1)}π`], rng);
    const hint = `The inscribed circle touches all four sides — what is its diameter?`;
    const solution = `The circle's diameter equals the square's side, ${s}, so its radius is ${r}. Area = π × ${r}² = ${r * r}π.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 37. number_theory 14: Euler totient of semiprime ----------
T.push({
  difficulty: 14, topic: 'number_theory',
  gen(rng) {
    const primes = [2, 3, 5, 7, 11, 13];
    let i = rng.int(0, 5), j = rng.int(0, 5);
    if (j === i) j = (j + 1) % 6;
    const p = primes[i], q = primes[j];
    const n = p * q;
    const ans = (p - 1) * (q - 1);
    const statement = `How many positive integers less than ${n} are relatively prime to ${n}?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, n - 1, n - p - q, ans + p], rng);
    const hint = `Factor ${n} first. For n = p × q with p, q distinct primes, count numbers sharing no factor with n.`;
    const solution = `${n} = ${p} × ${q} with distinct primes. The integers below ${n} NOT coprime to ${n} are the multiples of ${p} (${q - 1} of them) and multiples of ${q} (${p - 1} of them), with no overlap. So count = (${n} − 1) − (${q - 1} + ${p - 1}) = ${ans}. (Equivalently φ(${n}) = (${p}−1)(${q}−1).)`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 38. combinatorics 14: distinct-digit numbers ----------
T.push({
  difficulty: 14, topic: 'combinatorics',
  gen(rng) {
    const len = rng.pick([3, 4]);
    const ans = len === 3 ? 9 * 9 * 8 : 9 * 9 * 8 * 7;
    const statement = `How many ${len}-digit positive integers have all distinct digits?`;
    const choices = mkChoices(ans, [ans + 9, ans - 9, Math.pow(10, len) - Math.pow(10, len - 1), len === 3 ? 9 * 9 * 9 : 9 * 9 * 9 * 8, Math.pow(9, len), ans + 72], rng);
    const hint = `The first digit can't be zero. Count choices digit by digit.`;
    const solution = `First digit: 9 choices (1–9). Second digit: 9 choices (0–9 except the first). Third: 8 choices. ${len === 4 ? 'Fourth: 7 choices. ' : ''}Total = ${len === 3 ? '9 × 9 × 8' : '9 × 9 × 8 × 7'} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 39. algebra 14: geometric sequence term ----------
T.push({
  difficulty: 14, topic: 'algebra',
  gen(rng) {
    const a1 = rng.int(2, 6), r = rng.int(2, 4), n = rng.int(4, 6);
    const ans = a1 * Math.pow(r, n - 1);
    const seq = Array.from({ length: 3 }, (_, i) => a1 * Math.pow(r, i)).join(', ');
    const statement = `A geometric sequence begins ${seq}, … What is the ${n}th term?`;
    const choices = mkChoices(ans, [ans + r, ans - r, a1 * Math.pow(r, n), ans * r + 1, a1 + (n - 1) * r, ans + a1], rng);
    const hint = `Find the common ratio, then use term_n = first × ratio^(n−1).`;
    const solution = `Common ratio = ${a1 * r}/${a1} = ${r}. The ${n}th term is ${a1} × ${r}^${n - 1} = ${a1} × ${Math.pow(r, n - 1)} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 40. geometry 14: sector area ----------
T.push({
  difficulty: 14, topic: 'geometry',
  gen(rng) {
    const r = rng.int(4, 12);
    const th = rng.pick([60, 90, 120, 180, 270]);
    const g = gcd(r * r * th, 360);
    const num = (r * r * th) / g, den = 360 / g;
    const ans = den === 1 ? `${num}π` : `${num}π/${den}`;
    const statement = `A sector of a circle has radius ${r} and central angle ${th}°. What is its area?`;
    const cands = den === 1
      ? [`${num + 1}π`, `${num - 1}π`, `${2 * num}π`, `${r * r}π`, `${num + 2}π`, `${Math.round(num / 2)}π`]
      : [`${num + 1}π/${den}`, `${num - 1}π/${den}`, `${num}π/${den + 1}`, `${2 * num}π/${den}`, `${num}π`, `${r * r}π/${den}`];
    const choices = mkChoices(ans, cands, rng);
    const hint = `A sector is a fraction of the whole circle. What fraction does ${th}° represent?`;
    const solution = `The sector is ${th}/360 = ${den === 1 ? num / (r * r) : num + '/' + den} of the full circle... precisely, area = (${th}/360) × π × ${r}² = ${r * r * th}π/360 = ${ans}.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 41. number_theory 14: trailing zeros of n! ----------
T.push({
  difficulty: 14, topic: 'number_theory',
  gen(rng) {
    const n = rng.int(10, 60);
    let z = 0, p = 5;
    while (p <= n) { z += Math.floor(n / p); p *= 5; }
    const ans = z;
    const statement = `How many zeros are at the end of ${n}! (the product of all integers from 1 to ${n})?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, Math.floor(n / 5), Math.floor(n / 10), ans + 5], rng);
    const hint = `Trailing zeros come from factors of 10 = 2 × 5. Which factor is scarce in n!?`;
    const solution = `Each trailing zero needs a factor 2 and a factor 5; factors of 5 are scarcer. Count multiples of 5, 25, … up to ${n}: ⌊${n}/5⌋ = ${Math.floor(n / 5)}${n >= 25 ? `, ⌊${n}/25⌋ = ${Math.floor(n / 25)}` : ''}${n >= 125 ? `, ⌊${n}/125⌋ = ${Math.floor(n / 125)}` : ''}. Total = ${ans} trailing zeros.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 42. combinatorics 14: at least one six ----------
T.push({
  difficulty: 14, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(2, 4);
    const ans = frac(Math.pow(6, n) - Math.pow(5, n), Math.pow(6, n));
    const statement = `A fair six-sided die is rolled ${n} times. What is the probability that at least one roll shows a 6?`;
    const choices = mkChoices(ans, [frac(1, 6), frac(n, 6), frac(Math.pow(5, n), Math.pow(6, n)), '1/2', frac(n, Math.pow(6, n)), frac(1, Math.pow(6, n))], rng);
    const hint = `"At least one" is easiest via the complement: 1 − P(no sixes at all).`;
    const solution = `P(no 6 in one roll) = 5/6, so P(no 6 in ${n} rolls) = (5/6)^${n} = ${Math.pow(5, n)}/${Math.pow(6, n)}. Therefore P(at least one 6) = 1 − ${Math.pow(5, n)}/${Math.pow(6, n)} = ${ans}.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 43. algebra 14: absolute value equation, sum of solutions ----------
T.push({
  difficulty: 14, topic: 'algebra',
  gen(rng) {
    const p = rng.int(2, 4);
    const kk = rng.int(3, 8);
    const a = p * kk;
    const b = p * rng.int(1, kk - 1);
    const ans = 2 * kk;
    const statement = `What is the sum of all real solutions to |${p}x − ${a}| = ${b}?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, a / p, (a + b) / p, 2 * a], rng);
    const hint = `Split into two cases: ${p}x − ${a} = ${b} and ${p}x − ${a} = −${b}. Notice a shortcut for the sum.`;
    const solution = `Case 1: ${p}x − ${a} = ${b} → x = ${(a + b) / p}. Case 2: ${p}x − ${a} = −${b} → x = ${(a - b) / p}. Sum = ${(a + b) / p} + ${(a - b) / p} = ${2 * a}/${p} = ${ans}. (Shortcut: the two solutions are symmetric about x = ${a}/${p} = ${kk}, so their sum is 2 × ${kk}.)`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 44. geometry 14: isosceles base angles ----------
T.push({
  difficulty: 14, topic: 'geometry',
  gen(rng) {
    const v = rng.pick([20, 40, 60, 80, 100, 120, 140]);
    const ans = (180 - v) / 2;
    const statement = `An isosceles triangle has a vertex angle of ${v}°. What is the measure of each base angle?`;
    const choices = mkChoices(ans, [ans + 5, ans - 5, ans + 10, v / 2, 180 - v, 90 - v / 2 + 5], rng);
    const hint = `The base angles of an isosceles triangle are equal. Use the 180° total.`;
    const solution = `Let each base angle be x. Then x + x + ${v}° = 180°, so 2x = ${180 - v}° and x = ${ans}°.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 45. combinatorics 14: ordered officer selection ----------
T.push({
  difficulty: 14, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(5, 10);
    const ans = n * (n - 1) * (n - 2);
    const statement = `A club has ${n} members. In how many ways can a president, vice-president, and secretary be chosen (no member holds two offices)?`;
    const choices = mkChoices(ans, [comb(n, 3), ans + n, n * n * n, ans - n, n * (n - 1), 3 * n], rng);
    const hint = `The offices are distinct, so order matters — but you can't reuse a member.`;
    const solution = `${n} choices for president, then ${n - 1} remaining for vice-president, then ${n - 2} for secretary: ${n} × ${n - 1} × ${n - 2} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 46. algebra 15: sum of reciprocals ----------
T.push({
  difficulty: 15, topic: 'algebra',
  gen(rng) {
    const s = rng.int(4, 12);
    const pmax = Math.max(1, Math.floor(s * s / 4));
    const p = rng.int(1, pmax);
    const ans = frac(s, p);
    const statement = `Two numbers have a sum of ${s} and a product of ${p}. What is the sum of their reciprocals?`;
    const choices = mkChoices(ans, [frac(s + 1, p), frac(s, p + 1), frac(p, s), frac(2 * s, p), String(s + p), frac(s, 2 * p)], rng);
    const hint = `Write 1/x + 1/y as a single fraction and look for the sum and product you were given.`;
    const solution = `1/x + 1/y = (y + x)/(xy) = (x + y)/(xy) = ${s}/${p} = ${ans}.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

// ---------- 47. geometry 15: circumradius of right triangle ----------
T.push({
  difficulty: 15, topic: 'geometry',
  gen(rng) {
    const m = rng.int(1, 4);
    const a = 6 * m, b = 8 * m, ans = 5 * m;
    const statement = `A right triangle with legs of lengths ${a} and ${b} is inscribed in a circle. What is the radius of the circle?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + m, 2 * ans, a + b, 10 * m - 1], rng);
    const hint = `The hypotenuse of a right triangle inscribed in a circle has a special relationship to the circle.`;
    const solution = `The hypotenuse is a diameter of the circumcircle (Thales' theorem). Hypotenuse = √(${a}² + ${b}²) = √${a * a + b * b} = ${10 * m}. So the radius is half of that: ${10 * m}/2 = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 48. number_theory 15: simultaneous congruences ----------
T.push({
  difficulty: 15, topic: 'number_theory',
  gen(rng) {
    const pair = rng.pick([[3, 5], [3, 7], [4, 5], [3, 4], [4, 7], [5, 7]]);
    const m1 = pair[0], m2 = pair[1];
    const r1 = rng.int(0, m1 - 1), r2 = rng.int(0, m2 - 1);
    let ans = m1 * m2;
    for (let n = 1; n <= m1 * m2; n++) {
      if (n % m1 === r1 && n % m2 === r2) { ans = n; break; }
    }
    const statement = `What is the smallest positive integer that leaves remainder ${r1} when divided by ${m1} and remainder ${r2} when divided by ${m2}?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, ans + m1, ans - m1, m1 * m2], rng);
    const hint = `List numbers giving the first remainder (${r1}, ${r1 + m1}, …) and test them against the second condition.`;
    const solution = `Numbers ≡ ${r1} (mod ${m1}): ${Array.from({ length: 4 }, (_, i) => (r1 === 0 ? m1 : r1) + i * m1).join(', ')}, … Testing each mod ${m2}: the first one leaving remainder ${r2} is ${ans}. (Check: ${ans} ÷ ${m1} = ${Math.floor(ans / m1)} remainder ${ans % m1}; ${ans} ÷ ${m2} = ${Math.floor(ans / m2)} remainder ${ans % m2}.)`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 49. combinatorics 15: stars and bars ----------
T.push({
  difficulty: 15, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(5, 10), k = rng.int(3, 4);
    const ans = comb(n + k - 1, k - 1);
    const statement = `${n} identical candies are to be distributed among ${k} children, where a child may receive no candies. In how many ways can this be done?`;
    const choices = mkChoices(ans, [ans + k, Math.pow(k, n), comb(n, k), ans - k, comb(n + k, k), n * k], rng);
    const hint = `Line up the ${n} candies and insert ${k - 1} dividers — this is stars and bars.`;
    const solution = `Represent the distribution as ${n} stars and ${k - 1} bars in a row; each arrangement gives one distribution. Choose the positions of the ${k - 1} bars among ${n + k - 1} slots: C(${n + k - 1}, ${k - 1}) = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 50. algebra 15: logarithm equation ----------
T.push({
  difficulty: 15, topic: 'algebra',
  gen(rng) {
    const b = rng.int(2, 5), e = rng.int(2, 4);
    const ans = Math.pow(b, e);
    const statement = `If log_${b}(x) = ${e}, what is the value of x?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, b * e, Math.pow(b, e - 1), ans + b, e * e], rng);
    const hint = `log_${b}(x) = ${e} means exactly that ${b} raised to some power equals x. Which power?`;
    const solution = `By the definition of logarithms, log_${b}(x) = ${e} means ${b}^${e} = x. So x = ${b}^${e} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 51. geometry 15: sphere volume to radius ----------
T.push({
  difficulty: 15, topic: 'geometry',
  gen(rng) {
    const r = rng.pick([3, 6, 9]);
    const V = 4 * r * r * r / 3;
    const ans = r;
    const statement = `A sphere has volume ${V}π. What is its radius?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, 2 * ans, V / 4, Math.round(V / 3)], rng);
    const hint = `Volume of a sphere = (4/3)πr³. Set it equal to ${V}π and solve for r.`;
    const solution = `(4/3)πr³ = ${V}π → r³ = ${V} × 3/4 = ${r * r * r} → r = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 52. number_theory 15: nth integer coprime to 10 ----------
T.push({
  difficulty: 15, topic: 'number_theory',
  gen(rng) {
    const m = rng.pick([40, 60, 80, 100, 120]);
    const q = Math.floor((m - 1) / 4);
    const digs = [1, 3, 7, 9];
    const ans = 10 * q + digs[(m - 1) % 4];
    const ord = m === 40 ? '40th' : m === 60 ? '60th' : m === 80 ? '80th' : m === 100 ? '100th' : '120th';
    const statement = `The positive integers not divisible by 2 or 5 are 1, 3, 7, 9, 11, 13, 17, 19, 21, … What is the ${ord} such integer?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, ans + 2, ans - 2, 10 * q + 1, ans + 10], rng);
    const hint = `In every block of 10 consecutive integers, exactly 4 are coprime to 10. Which block holds the ${ord} one?`;
    const solution = `Numbers coprime to 10 end in 1, 3, 7, or 9 — four per block of ten. The ${ord} such number is in block ${q + 1} (blocks 1–${q} hold ${4 * q} of them), at position ${(m - 1) % 4 + 1} within the block: ${10 * q} + ${digs[(m - 1) % 4]} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 53. combinatorics 15: polygon diagonals ----------
T.push({
  difficulty: 15, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(6, 12);
    const ans = n * (n - 3) / 2;
    const statement = `How many diagonals does a convex ${n}-gon have?`;
    const choices = mkChoices(ans, [ans + n, ans - n, n * (n - 1) / 2, n * n, ans + 2, n * (n - 3)], rng);
    const hint = `From each vertex, how many diagonals can be drawn? Then correct for double-counting.`;
    const solution = `From each vertex, diagonals go to all vertices except itself and its 2 neighbors: ${n} − 3 = ${n - 3} diagonals per vertex. That's ${n} × ${n - 3} = ${n * (n - 3)}, but each diagonal is counted twice (once at each end), so divide by 2: ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 54. algebra 15: sum of cubes identity ----------
T.push({
  difficulty: 15, topic: 'algebra',
  gen(rng) {
    const s = rng.int(3, 9);
    let p = rng.int(1, 10);
    if (s * s * s - 3 * p * s <= 0) p = 1;
    const ans = s * s * s - 3 * p * s;
    const statement = `Two numbers x and y satisfy x + y = ${s} and xy = ${p}. What is the value of x³ + y³?`;
    const choices = mkChoices(ans, [ans + s, ans - s, s * s * s, s * s * s - p * s, 3 * p * s, ans + 3], rng);
    const hint = `Expand (x + y)³ and isolate x³ + y³.`;
    const solution = `(x + y)³ = x³ + 3x²y + 3xy² + y³ = x³ + y³ + 3xy(x + y). So x³ + y³ = (x + y)³ − 3xy(x + y) = ${s}³ − 3 × ${p} × ${s} = ${s * s * s} − ${3 * p * s} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 55. geometry 15: similar area ratio ----------
T.push({
  difficulty: 15, topic: 'geometry',
  gen(rng) {
    const pair = rng.pick([[2, 3], [3, 4], [2, 5], [3, 5]]);
    const a = pair[0], b = pair[1];
    const k = rng.int(2, 5);
    const A = a * a * k;
    const ans = b * b * k;
    const statement = `Two similar triangles have corresponding sides in the ratio ${a}:${b}. If the smaller triangle has area ${A}, what is the area of the larger triangle?`;
    const choices = mkChoices(ans, [ans + b, ans - b, A * b / a, A + b * b, Math.round(A * b / a) + 1, ans * 2 - A], rng);
    const hint = `Lengths scale by ${b}/${a}, but areas scale by the square of that.`;
    const solution = `The linear scale factor is ${b}/${a}, so areas scale by (${b}/${a})² = ${b * b}/${a * a}. Larger area = ${A} × ${b * b}/${a * a} = ${A * b * b}/${a * a} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 56. number_theory 15: greatest prime factor ----------
T.push({
  difficulty: 15, topic: 'number_theory',
  gen(rng) {
    const primes = [3, 5, 7, 11, 13, 17, 19, 23];
    const idx = rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7]).slice(0, 3).sort((x, y) => x - y);
    const p = primes[idx[0]], q = primes[idx[1]], r = primes[idx[2]];
    const N = p * q * r;
    const ans = r;
    const statement = `What is the greatest prime factor of ${N}?`;
    const choices = mkChoices(ans, [p, q, p * q, N, q * r - 1, Math.max(p, q) + 2], rng);
    const hint = `Factor ${N} completely — trial-divide by small primes.`;
    const solution = `Trial division: ${N} ÷ ${p} = ${q * r}, and ${q * r} = ${q} × ${r}. So ${N} = ${p} × ${q} × ${r}, all prime. The greatest prime factor is ${r}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 57. combinatorics 15: expected value ----------
T.push({
  difficulty: 15, topic: 'combinatorics',
  gen(rng) {
    const R = rng.int(2, 5), B = rng.int(2, 5);
    const w = R + B;
    const ans = 2 * R;
    const statement = `A bag holds ${R} red and ${B} blue marbles. You draw two marbles without replacement and win $${w} for each red marble drawn. What is the expected value of your winnings, in dollars?`;
    const choices = mkChoices(ans, [ans + 2, ans - 2, w, 2 * w, R + B + R, Math.round(ans / 2)], rng);
    const hint = `Use linearity of expectation: expected reds drawn = 2 × P(a given draw is red).`;
    const solution = `Expected number of red marbles in 2 draws = 2 × ${R}/${R + B} = ${2 * R}/${R + B}. Each red pays $${w}, so expected winnings = (${2 * R}/${R + B}) × ${w} = $${(2 * R * w) / (R + B)}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 58. number_theory 15: units digit of sum of powers ----------
T.push({
  difficulty: 15, topic: 'number_theory',
  gen(rng) {
    const a = rng.int(2, 9), e = rng.int(50, 120);
    let b = rng.int(2, 9);
    if (b === a) b = (b % 9) + 1;
    const f = rng.int(50, 120);
    const ans = (powmod(a, e, 10) + powmod(b, f, 10)) % 10;
    const statement = `What is the units digit of ${a}^${e} + ${b}^${f}?`;
    const choices = mkChoices(ans, [(ans + 1) % 10, (ans + 9) % 10, (ans + 2) % 10, (ans + 5) % 10, powmod(a, e, 10), powmod(b, f, 10)], rng);
    const hint = `Find each term's units digit separately using cycles, then add.`;
    const solution = `${a}^${e} ends in ${powmod(a, e, 10)} (units digits of powers of ${a} cycle) and ${b}^${f} ends in ${powmod(b, f, 10)}. Sum of units digits: ${powmod(a, e, 10)} + ${powmod(b, f, 10)} = ${powmod(a, e, 10) + powmod(b, f, 10)}, whose units digit is ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 59. geometry 15: triangle area from coordinates ----------
T.push({
  difficulty: 15, topic: 'geometry',
  gen(rng) {
    const w = rng.int(2, 10);
    let h = rng.int(2, 10);
    if ((w * h) % 2 === 1) h++;
    const p = rng.int(1, 9);
    const ans = w * h / 2;
    const statement = `A triangle has vertices at (0, 0), (${w}, 0), and (${p}, ${h}). What is its area?`;
    const choices = mkChoices(ans, [ans + 1, ans - 1, w * h, ans + h, Math.round(ans / 2), w * p / 2], rng);
    const hint = `Take the side on the x-axis as the base. What is the height?`;
    const solution = `Base = ${w} (from (0,0) to (${w},0)). Height = vertical distance from (${p}, ${h}) to the x-axis = ${h}. Area = (1/2) × ${w} × ${h} = ${ans}.`;
    return { statement, choices, answer: String(ans), hint, solution };
  }
});

// ---------- 60. combinatorics 15: binomial probability ----------
T.push({
  difficulty: 15, topic: 'combinatorics',
  gen(rng) {
    const n = rng.int(4, 8);
    const k = rng.int(1, n - 1);
    const ans = frac(comb(n, k), Math.pow(2, n));
    const statement = `A fair coin is flipped ${n} times. What is the probability of getting exactly ${k} heads?`;
    const choices = mkChoices(ans, [frac(1, Math.pow(2, n)), frac(k, n), frac(comb(n, k) + 1, Math.pow(2, n)), frac(n, Math.pow(2, n)), frac(1, 2), frac(comb(n, k - 1), Math.pow(2, n))], rng);
    const hint = `Count the favorable sequences with C(${n}, ${k}), then divide by all 2^${n} sequences.`;
    const solution = `Favorable sequences: choose which ${k} of the ${n} flips are heads: C(${n}, ${k}) = ${comb(n, k)}. Total sequences: 2^${n} = ${Math.pow(2, n)}. Probability = ${comb(n, k)}/${Math.pow(2, n)} = ${ans}.`;
    return { statement, choices, answer: ans, hint, solution };
  }
});

module.exports = T;

// ---------------- self-test ----------------
if (require.main === module) {
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeRng(seed) {
    const f = mulberry32(seed);
    return {
      f: () => f(),
      int: (min, max) => min + Math.floor(f() * (max - min + 1)),
      pick: (arr) => arr[Math.floor(f() * arr.length)],
      shuffle: (arr) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(f() * (i + 1));
          const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
      }
    };
  }
  const topics = new Set(['algebra', 'geometry', 'number_theory', 'combinatorics']);
  let fail = null;
  const assert = (cond, msg) => { if (!cond && !fail) fail = msg; };
  assert(Array.isArray(module.exports), 'export is not an array');
  assert(module.exports.length === 60, `expected 60 templates, got ${module.exports.length}`);
  module.exports.forEach((t, i) => {
    assert(t && typeof t.gen === 'function', `template ${i}: missing gen`);
    assert(Number.isInteger(t.difficulty) && t.difficulty >= 12 && t.difficulty <= 15,
      `template ${i}: difficulty ${t && t.difficulty} not in 12-15`);
    assert(topics.has(t.topic), `template ${i}: invalid topic ${t && t.topic}`);
    if (i > 0) assert(t.difficulty >= module.exports[i - 1].difficulty,
      `template ${i}: difficulty not ascending`);
    for (const seed of [11, 222, 3333]) {
      let r;
      try { r = t.gen(makeRng(seed * 7919 + i * 131)); }
      catch (e) { assert(false, `template ${i} seed ${seed}: gen threw: ${e.message}`); continue; }
      assert(r && typeof r.statement === 'string' && r.statement.length > 0 && r.statement.length <= 600,
        `template ${i} seed ${seed}: bad statement`);
      assert(!/[<>]/.test(r.statement), `template ${i} seed ${seed}: statement has angle brackets`);
      assert(typeof r.answer === 'string' && r.answer.length > 0, `template ${i} seed ${seed}: bad answer`);
      assert(typeof r.hint === 'string' && r.hint.length > 0, `template ${i} seed ${seed}: bad hint`);
      assert(typeof r.solution === 'string' && r.solution.length > 0, `template ${i} seed ${seed}: bad solution`);
      assert(Array.isArray(r.choices) && r.choices.length === 5, `template ${i} seed ${seed}: choices not 5`);
      assert(r.choices.every(c => typeof c === 'string'), `template ${i} seed ${seed}: non-string choice`);
      assert(new Set(r.choices).size === 5, `template ${i} seed ${seed}: choices not unique: ${JSON.stringify(r.choices)}`);
      assert(r.choices.filter(c => c === r.answer).length === 1,
        `template ${i} seed ${seed}: answer not exactly once: ${JSON.stringify(r.choices)} vs ${r.answer}`);
    }
  });
  if (fail) { console.error('FAIL: ' + fail); process.exit(1); }
  console.log(`PASS (${module.exports.length} templates)`);
}
