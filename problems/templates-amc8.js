'use strict';
// AMC 8 problem templates (difficulty 11-13).
// Interface: module.exports = [ { difficulty, topic, gen(rng) }, ... ]
// gen(rng) is pure: uses only rng.f(), rng.int(min,max), rng.pick(arr), rng.shuffle(arr).

function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; }
function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
function C(n, k) { if (k < 0 || k > n) return 0; return fact(n) / (fact(k) * fact(n - k)); }

// Build exactly 5 unique string choices containing String(ans) exactly once.
function numChoices(rng, ans, cands) {
  const seen = new Set([ans]); const out = [];
  for (const c of cands) {
    if (Number.isInteger(c) && !seen.has(c)) { seen.add(c); out.push(c); }
    if (out.length === 4) break;
  }
  let k = 10;
  while (out.length < 4) { const c = ans + k; if (!seen.has(c)) { seen.add(c); out.push(c); } k += 10; }
  return rng.shuffle([ans, ...out].map(String));
}
function strChoices(rng, ans, cands) {
  const seen = new Set([ans]); const out = [];
  for (const c of cands) {
    if (typeof c === 'string' && c !== ans && !seen.has(c)) { seen.add(c); out.push(c); }
    if (out.length === 4) break;
  }
  let k = 1;
  while (out.length < 4) { const c = ans + ' (' + k + ')'; if (!seen.has(c)) { seen.add(c); out.push(c); } k++; }
  return rng.shuffle([ans, ...out]);
}

const templates = [
/* ================= DIFFICULTY 11 ================= */
// ---- algebra ----
{ difficulty: 11, topic: 'algebra', gen(rng) {
    const a = rng.int(11, 99), b = rng.int(11, 99);
    const ans = a + b;
    const choices = numChoices(rng, ans, [ans + 10, ans - 10, ans + 1, ans - 1, ans + 2, ans - 2]);
    return { statement: `What is ${a} + ${b}?`, choices, answer: String(ans),
      hint: 'Add the ones digits first, then the tens digits, carrying if needed.',
      solution: `Add the ones: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Add the tens (plus any carry): ${Math.floor(a / 10)} + ${Math.floor(b / 10)} = ${Math.floor(a / 10) + Math.floor(b / 10)}. Altogether, ${a} + ${b} = ${ans}.` };
} },
{ difficulty: 11, topic: 'algebra', gen(rng) {
    const p = rng.pick([10, 20, 25, 50, 75]);
    const n = 20 * rng.int(1, 8);
    const ans = p * n / 100;
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, ans + 5]);
    return { statement: `What is ${p}% of ${n}?`, choices, answer: String(ans),
      hint: `${p}% means ${p} out of every 100. Try finding 10% first, then scale.`,
      solution: `${p}% of ${n} = (${p}/100) × ${n} = ${p * n}/100 = ${ans}.` };
} },
{ difficulty: 11, topic: 'algebra', gen(rng) {
    const a = rng.int(3, 20), b = rng.int(a + 3, 50);
    const ans = b - a;
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, a + b]);
    return { statement: `If x + ${a} = ${b}, what is the value of x?`, choices, answer: String(ans),
      hint: 'To undo adding, subtract the same number from both sides.',
      solution: `Subtract ${a} from both sides: x = ${b} − ${a} = ${ans}.` };
} },
{ difficulty: 11, topic: 'algebra', gen(rng) {
    const b = rng.int(3, 9);
    const a = rng.int(1, b - 2);
    const cc = rng.int(1, b - a - 1);
    const s = a + cc;
    const ansStr = `${s}/${b}`;
    const choices = strChoices(rng, ansStr, [`${s - 1}/${b}`, `${s + 1}/${b}`, `${a}/${b + cc}`, `${cc}/${b + a}`, `${s + 2}/${b}`, `${a + cc}/${b - 1}`]);
    return { statement: `What is ${a}/${b} + ${cc}/${b}?`, choices, answer: ansStr,
      hint: 'The denominators are already the same, so just add the numerators.',
      solution: `With a common denominator of ${b}, add the numerators: ${a} + ${cc} = ${s}. So the sum is ${ansStr}.` };
} },
{ difficulty: 11, topic: 'algebra', gen(rng) {
    const a = rng.int(2, 6), x = rng.int(2, 12), b = rng.int(1, 15);
    const c = a * x + b;
    const choices = numChoices(rng, x, [x + 1, x - 1, x + 2, x - 2, (c - b) / a + 1]);
    return { statement: `If ${a}x + ${b} = ${c}, what is the value of x?`, choices, answer: String(x),
      hint: 'First subtract, then divide — undo the operations in reverse order.',
      solution: `Subtract ${b} from both sides: ${a}x = ${c} − ${b} = ${c - b}. Then divide by ${a}: x = ${c - b}/${a} = ${x}.` };
} },
// ---- geometry ----
{ difficulty: 11, topic: 'geometry', gen(rng) {
    const l = rng.int(3, 15), w = rng.int(3, 15);
    const ans = l * w;
    const choices = numChoices(rng, ans, [l + w, 2 * (l + w), ans + 1, ans - 1, l * w + l]);
    return { statement: `A rectangle has length ${l} cm and width ${w} cm. What is its area in square centimeters?`, choices, answer: String(ans),
      hint: 'Area of a rectangle = length × width.',
      solution: `Area = length × width = ${l} × ${w} = ${ans} square centimeters.` };
} },
{ difficulty: 11, topic: 'geometry', gen(rng) {
    const s = rng.int(3, 14);
    const ans = 4 * s;
    const choices = numChoices(rng, ans, [s * s, 3 * s, 5 * s, ans + 2, ans - 2, 2 * s]);
    return { statement: `A square has side length ${s} inches. What is its perimeter in inches?`, choices, answer: String(ans),
      hint: 'A square has 4 equal sides — add them all up.',
      solution: `Perimeter = 4 × side = 4 × ${s} = ${ans} inches.` };
} },
{ difficulty: 11, topic: 'geometry', gen(rng) {
    const b = rng.int(2, 12), h = 2 * rng.int(1, 8);
    const ans = b * h / 2;
    const choices = numChoices(rng, ans, [b * h, 2 * (b + h), ans + 1, ans - 1, b * h / 2 + b]);
    return { statement: `A triangle has base ${b} cm and height ${h} cm. What is its area in square centimeters?`, choices, answer: String(ans),
      hint: 'Area of a triangle is half of base × height.',
      solution: `Area = (1/2) × base × height = (1/2) × ${b} × ${h} = ${b * h}/2 = ${ans} square centimeters.` };
} },
{ difficulty: 11, topic: 'geometry', gen(rng) {
    const r = rng.int(3, 8);
    const ansStr = `${r * r}π`;
    const choices = strChoices(rng, ansStr, [`${2 * r}π`, `${2 * r * r}π`, `${(r + 1) * (r + 1)}π`, `${r}π`, `${r * r + r}π`]);
    return { statement: `A circle has radius ${r} cm. What is its area?`, choices, answer: ansStr,
      hint: 'Area of a circle = πr².',
      solution: `Area = πr² = π × ${r}² = ${r * r}π square centimeters.` };
} },
{ difficulty: 11, topic: 'geometry', gen(rng) {
    const l = rng.int(2, 9), w = rng.int(2, 9), h = rng.int(2, 9);
    const ans = l * w * h;
    const choices = numChoices(rng, ans, [l + w + h, 2 * (l * w + w * h + l * h), ans + 1, ans - 1, l * w * h + l]);
    return { statement: `A rectangular box measures ${l} cm by ${w} cm by ${h} cm. What is its volume in cubic centimeters?`, choices, answer: String(ans),
      hint: 'Volume of a box = length × width × height.',
      solution: `Volume = ${l} × ${w} × ${h} = ${ans} cubic centimeters.` };
} },
// ---- number theory ----
{ difficulty: 11, topic: 'number_theory', gen(rng) {
    const d = rng.int(6, 9), r = rng.int(1, d - 1), q = rng.int(6, 25);
    const N = d * q + r;
    const cands = [];
    for (let i = 0; i < d; i++) if (i !== r) cands.push(i);
    const choices = numChoices(rng, r, cands);
    return { statement: `What is the remainder when ${N} is divided by ${d}?`, choices, answer: String(r),
      hint: `Find the largest multiple of ${d} that is less than or equal to ${N}.`,
      solution: `${d} × ${q} = ${d * q}, and ${N} − ${d * q} = ${r}. Since ${r} < ${d}, the remainder is ${r}.` };
} },
{ difficulty: 11, topic: 'number_theory', gen(rng) {
    const g = rng.int(2, 9);
    let u, v;
    do { u = rng.int(2, 8); v = rng.int(2, 8); } while (u === v || gcd(u, v) !== 1);
    const a = g * u, b = g * v;
    const choices = numChoices(rng, g, [g + 1, g - 1, u, v, g + 2, u * v, g - 2]);
    return { statement: `What is the greatest common divisor (GCD) of ${a} and ${b}?`, choices, answer: String(g),
      hint: 'Factor each number, then multiply the primes they share.',
      solution: `${a} = ${g} × ${u} and ${b} = ${g} × ${v}. Since ${u} and ${v} share no common factor, the GCD is ${g}.` };
} },
{ difficulty: 11, topic: 'number_theory', gen(rng) {
    const primes = ['2', '3', '5', '7', '11', '13', '17', '19', '23', '29', '31', '37'];
    const comps = ['4', '6', '8', '9', '10', '12', '14', '15', '16', '18', '20', '21', '22', '24', '25', '26', '27', '28', '30'];
    const ans = rng.pick(primes);
    const wrongs = rng.shuffle(comps).slice(0, 4);
    const choices = rng.shuffle([ans, ...wrongs]);
    return { statement: 'Which of the following numbers is prime?', choices, answer: ans,
      hint: 'A prime number has exactly two divisors: 1 and itself.',
      solution: `Checking each choice: ${wrongs.join(', ')} are all composite (each has a divisor other than 1 and itself), while ${ans} has no divisors besides 1 and ${ans}. So ${ans} is prime.` };
} },
{ difficulty: 11, topic: 'number_theory', gen(rng) {
    const g = rng.int(2, 6);
    let u, v;
    do { u = rng.int(2, 7); v = rng.int(2, 7); } while (u === v || gcd(u, v) !== 1);
    const a = g * u, b = g * v;
    const ans = u * v * g;
    const choices = numChoices(rng, ans, [a * b, a + b, g, ans + 1, ans - 1, a * b - ans]);
    return { statement: `What is the least common multiple (LCM) of ${a} and ${b}?`, choices, answer: String(ans),
      hint: 'LCM × GCD = product of the two numbers.',
      solution: `GCD(${a}, ${b}) = ${g}, so LCM = (${a} × ${b}) / ${g} = ${a * b}/${g} = ${ans}.` };
} },
{ difficulty: 11, topic: 'number_theory', gen(rng) {
    const N = rng.int(100, 999);
    const ans = String(N).split('').reduce((s, ch) => s + Number(ch), 0);
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, ans + 3, ans + 4, ans + 5].filter(w => w > 0));
    return { statement: `What is the sum of the digits of ${N}?`, choices, answer: String(ans),
      hint: 'Add the hundreds, tens, and ones digits together.',
      solution: `The digits of ${N} are ${String(N).split('').join(', ')}, and ${String(N).split('').join(' + ')} = ${ans}.` };
} },
// ---- combinatorics ----
{ difficulty: 11, topic: 'combinatorics', gen(rng) {
    const k = rng.int(2, 6), q = rng.int(5, 12);
    const N = k * q;
    const choices = numChoices(rng, q, [q + 1, q - 1, q + 2, q - 2, k]);
    return { statement: `How many integers from 1 to ${N}, inclusive, are multiples of ${k}?`, choices, answer: String(q),
      hint: 'List them: the multiples are k, 2k, 3k, ... — how many fit under the limit?',
      solution: `The multiples of ${k} up to ${N} are ${k}, ${2 * k}, ${3 * k}, ..., ${N}. That is ${N}/${k} = ${q} numbers.` };
} },
{ difficulty: 11, topic: 'combinatorics', gen(rng) {
    const n = rng.int(3, 6);
    const ans = 2 ** n;
    const choices = numChoices(rng, ans, [2 * n, n * n, fact(n), ans + 1, ans - 1, n ** n]);
    return { statement: `A fair coin is tossed ${n} times. How many different sequences of heads and tails are possible?`, choices, answer: String(ans),
      hint: 'Each toss doubles the number of possible sequences.',
      solution: `Each of the ${n} tosses has 2 outcomes, and the tosses are independent: 2^${n} = ${ans} possible sequences.` };
} },
{ difficulty: 11, topic: 'combinatorics', gen(rng) {
    const s = rng.int(3, 8), p = rng.int(2, 6);
    const ans = s * p;
    const choices = numChoices(rng, ans, [s + p, s ** p, ans + 1, ans - 1, s * p + s]);
    return { statement: `Maya has ${s} different shirts and ${p} different pairs of pants. How many different shirt-and-pants outfits can she make?`, choices, answer: String(ans),
      hint: 'For each shirt, how many pants choices are there?',
      solution: `Each of the ${s} shirts can be paired with any of the ${p} pairs of pants: ${s} × ${p} = ${ans} outfits.` };
} },
{ difficulty: 11, topic: 'combinatorics', gen(rng) {
    const choices = rng.shuffle(['1/2', '1/3', '1/6', '2/3', '3/4']);
    return { statement: 'A standard 6-sided die is rolled once. What is the probability that the result is an even number? Express your answer as a fraction.', choices, answer: '1/2',
      hint: 'How many of the 6 faces show an even number?',
      solution: 'The even faces are 2, 4, and 6 — that is 3 out of 6 faces. So the probability is 3/6 = 1/2.' };
} },
{ difficulty: 11, topic: 'combinatorics', gen(rng) {
    const n = rng.int(3, 5);
    const ans = fact(n);
    const choices = numChoices(rng, ans, [n ** n, n * n, fact(n + 1), ans + 1, ans - 1, n * (n - 1)]);
    return { statement: `In how many different orders can ${n} different books be arranged on a shelf?`, choices, answer: String(ans),
      hint: 'There are n choices for the first spot, then n−1 for the second, and so on.',
      solution: `There are ${n} choices for the first book, ${n - 1} for the second, ..., giving ${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')} = ${ans} arrangements.` };
} },
/* ================= DIFFICULTY 12 ================= */
// ---- algebra ----
{ difficulty: 12, topic: 'algebra', gen(rng) {
    const s = rng.int(6, 20);
    let d = rng.int(1, 5);
    if ((s - d) % 2 !== 0) d = (d + 1 <= 5) ? d + 1 : d - 1;
    if (d > s - 2) { d = s - 2; if ((s - d) % 2 !== 0) d -= 1; }
    const x = (s + d) / 2, y = (s - d) / 2;
    const choices = numChoices(rng, x, [y, s, d, x + 1, x - 1, x + d]);
    return { statement: `The sum of two numbers is ${s} and their difference is ${d}. What is the larger of the two numbers?`, choices, answer: String(x),
      hint: 'Add the two equations: (larger + smaller) + (larger − smaller) = ?',
      solution: `Let the numbers be L and S. Then L + S = ${s} and L − S = ${d}. Adding: 2L = ${s + d}, so L = ${x}. (Check: the smaller is ${y}, and ${x} + ${y} = ${s}.)` };
} },
{ difficulty: 12, topic: 'algebra', gen(rng) {
    const m = rng.int(8, 25);
    let n1, n2, n3, n4, fifth;
    do {
      n1 = rng.int(2, 30); n2 = rng.int(2, 30); n3 = rng.int(2, 30); n4 = rng.int(2, 30);
      fifth = 5 * m - (n1 + n2 + n3 + n4);
    } while (fifth < 2 || fifth > 40 || [n1, n2, n3, n4].includes(fifth));
    const choices = numChoices(rng, fifth, [fifth + 1, fifth - 1, fifth + 2, fifth - 2, m]);
    return { statement: `The average of five numbers is ${m}. Four of the numbers are ${n1}, ${n2}, ${n3}, and ${n4}. What is the fifth number?`, choices, answer: String(fifth),
      hint: 'If the average of 5 numbers is m, what is their total sum?',
      solution: `The five numbers sum to 5 × ${m} = ${5 * m}. The four known numbers sum to ${n1 + n2 + n3 + n4}, so the fifth is ${5 * m} − ${n1 + n2 + n3 + n4} = ${fifth}.` };
} },
{ difficulty: 12, topic: 'algebra', gen(rng) {
    const a = rng.int(2, 9), b = rng.int(2, 9);
    const ans = a * b;
    const choices = numChoices(rng, ans, [a + b, -(a + b), ans + 1, ans - 1, ans + a, ans + 2, ans - 2]);
    return { statement: `If (x − ${a})(x − ${b}) = x² + px + q, what is the value of q?`, choices, answer: String(ans),
      hint: 'Expand: the constant term comes from multiplying the two constant terms.',
      solution: `Expanding: (x − ${a})(x − ${b}) = x² − ${b}x − ${a}x + ${a * b} = x² − ${a + b}x + ${ans}. The constant term is q = ${ans}.` };
} },
{ difficulty: 12, topic: 'algebra', gen(rng) {
    const a = rng.int(5, 15), b = rng.int(2, 8), y = rng.int(2, 6);
    const s = 2 * a + b + 2 * y;
    const choices = numChoices(rng, a, [a + 1, a - 1, a + 2, a - 2, b, a + b]);
    return { statement: `Bob is ${b} years older than Alice. In ${y} years, the sum of their ages will be ${s}. How old is Alice now?`, choices, answer: String(a),
      hint: 'Let Alice be A years old now. Write both ages in y years in terms of A.',
      solution: `Let Alice's age now be A. Bob is A + ${b}. In ${y} years their ages are A + ${y} and A + ${b + y}, summing to 2A + ${b + 2 * y} = ${s}. So 2A = ${s - b - 2 * y} and A = ${a}.` };
} },
{ difficulty: 12, topic: 'algebra', gen(rng) {
    const m = rng.int(2, 6), k = rng.int(2, 9), h = rng.int(1, 3);
    const p = m * k;
    const ans = 60 * k * h;
    const choices = numChoices(rng, ans, [ans + 60, ans - 60, ans + 10, ans - 10, 60 * k, ans + 120]);
    return { statement: `A printer prints ${p} pages in ${m} minutes. At the same rate, how many pages can it print in ${h} hour${h > 1 ? 's' : ''}?`, choices, answer: String(ans),
      hint: 'First find the printing rate in pages per minute.',
      solution: `Rate = ${p}/${m} = ${k} pages per minute. ${h} hour${h > 1 ? 's' : ''} = ${60 * h} minutes, so pages = ${k} × ${60 * h} = ${ans}.` };
} },
// ---- geometry ----
{ difficulty: 12, topic: 'geometry', gen(rng) {
    const t = rng.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]]);
    const [l1, l2, h] = t;
    const choices = numChoices(rng, h, [l1 + l2, h + 1, h - 1, h + 2, l1 + l2 - 1, 2 * h]);
    return { statement: `A right triangle has legs of length ${l1} and ${l2}. What is the length of the hypotenuse?`, choices, answer: String(h),
      hint: 'Pythagorean theorem: a² + b² = c².',
      solution: `c² = ${l1}² + ${l2}² = ${l1 * l1} + ${l2 * l2} = ${h * h}, so c = ${h}.` };
} },
{ difficulty: 12, topic: 'geometry', gen(rng) {
    const b1 = rng.int(3, 12), b2 = rng.int(3, 12), h = 2 * rng.int(1, 6);
    const ans = (b1 + b2) * h / 2;
    const choices = numChoices(rng, ans, [(b1 + b2) * h, b1 * b2, ans + 1, ans - 1, ans + b1]);
    return { statement: `A trapezoid has bases of length ${b1} and ${b2} and height ${h}. What is its area?`, choices, answer: String(ans),
      hint: 'Area of a trapezoid = (1/2) × (sum of bases) × height.',
      solution: `Area = (1/2) × (${b1} + ${b2}) × ${h} = (1/2) × ${b1 + b2} × ${h} = ${(b1 + b2) * h}/2 = ${ans}.` };
} },
{ difficulty: 12, topic: 'geometry', gen(rng) {
    const a1 = rng.int(20, 70), a2 = rng.int(20, 100 - a1);
    const ans = 180 - a1 - a2;
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, a1 + a2]);
    return { statement: `Two angles of a triangle measure ${a1}° and ${a2}°. What is the measure of the third angle?`, choices, answer: String(ans),
      hint: 'The three angles of a triangle always add up to the same total. What is it?',
      solution: `Angles sum to 180°: third angle = 180° − ${a1}° − ${a2}° = ${ans}°.` };
} },
{ difficulty: 12, topic: 'geometry', gen(rng) {
    const d = 2 * rng.int(2, 7);
    const ansStr = `${d}π`;
    const choices = strChoices(rng, ansStr, [`${2 * d}π`, `${d / 2}π`, `${d + 2}π`, `${d - 2}π`, `${d * d}π`]);
    return { statement: `A circle has diameter ${d} cm. What is its circumference?`, choices, answer: ansStr,
      hint: 'Circumference = π × diameter.',
      solution: `Circumference = πd = π × ${d} = ${ansStr} cm.` };
} },
{ difficulty: 12, topic: 'geometry', gen(rng) {
    const b = rng.int(3, 14), h = rng.int(3, 14);
    const ans = b * h;
    const choices = numChoices(rng, ans, [2 * (b + h), b + h, ans + 1, ans - 1, b * h + b]);
    return { statement: `A parallelogram has base ${b} cm and height ${h} cm. What is its area in square centimeters?`, choices, answer: String(ans),
      hint: 'Area of a parallelogram = base × height (use the height perpendicular to the base).',
      solution: `Area = base × height = ${b} × ${h} = ${ans} square centimeters.` };
} },
// ---- number theory ----
{ difficulty: 12, topic: 'number_theory', gen(rng) {
    const type = rng.pick(['pq', 'p2', 'p3']);
    const primes = [2, 3, 5, 7, 11, 13];
    let n, ans, detail;
    if (type === 'pq') {
      const ps = rng.shuffle(primes).slice(0, 2).sort((x, y) => x - y);
      n = ps[0] * ps[1]; ans = 4;
      detail = `${n} = ${ps[0]} × ${ps[1]}, with divisors 1, ${ps[0]}, ${ps[1]}, ${n}`;
    } else if (type === 'p2') {
      const p = rng.pick([2, 3, 5, 7]);
      n = p * p; ans = 3;
      detail = `${n} = ${p}², with divisors 1, ${p}, ${n}`;
    } else {
      const p = rng.pick([2, 3, 5]);
      n = p * p * p; ans = 4;
      detail = `${n} = ${p}³, with divisors 1, ${p}, ${p * p}, ${n}`;
    }
    const choices = rng.shuffle(['2', '3', '4', '5', '6']);
    return { statement: `How many positive divisors does ${n} have?`, choices, answer: String(ans),
      hint: 'Write the prime factorization first, then count the divisors.',
      solution: `${detail} — that is ${ans} positive divisors.` };
} },
{ difficulty: 12, topic: 'number_theory', gen(rng) {
    const k = rng.int(2, 9);
    const ans = 36 * k;
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, ans + 3, ans - 3]);
    return { statement: 'Which of the following numbers is divisible by both 4 and 9?', choices, answer: String(ans),
      hint: 'A number divisible by both 4 and 9 is divisible by their least common multiple.',
      solution: `LCM(4, 9) = 36. Only ${ans} = 36 × ${k} is a multiple of 36; the others leave nonzero remainders when divided by 36.` };
} },
{ difficulty: 12, topic: 'number_theory', gen(rng) {
    const n = rng.int(2, 60);
    const map = { 0: '1', 1: '7', 2: '9', 3: '3' };
    const ans = map[n % 4];
    const choices = rng.shuffle(['1', '3', '7', '9', '0']);
    return { statement: `What is the units digit of 7^${n}?`, choices, answer: ans,
      hint: 'The units digits of powers of 7 repeat in a cycle. Find the cycle length.',
      solution: `Powers of 7 end in 7, 9, 3, 1, 7, 9, 3, 1, ... — a cycle of length 4. Since ${n} ÷ 4 leaves remainder ${n % 4}, the units digit is ${ans}.` };
} },
{ difficulty: 12, topic: 'number_theory', gen(rng) {
    const g = rng.int(2, 9);
    let u, v;
    do { u = rng.int(2, 8); v = rng.int(2, 8); } while (u === v || gcd(u, v) !== 1);
    const a = g * u, b = g * v;
    const choices = numChoices(rng, g, [g + 1, g - 1, u, v, u * v, g + 2, a + b]);
    return { statement: `Two ribbons of length ${a} cm and ${b} cm are each cut into equal pieces, with no ribbon left over. What is the greatest possible length of each piece?`, choices, answer: String(g),
      hint: 'The piece length must divide both ribbon lengths.',
      solution: `The piece length must be a common divisor of ${a} and ${b}. ${a} = ${g} × ${u} and ${b} = ${g} × ${v} with ${u}, ${v} coprime, so the greatest common divisor — and longest piece — is ${g} cm.` };
} },
{ difficulty: 12, topic: 'number_theory', gen(rng) {
    const n = rng.int(10, 40);
    const ans = n * (n + 1) / 2;
    const choices = numChoices(rng, ans, [n * n, n * (n + 1), ans + 1, ans - 1, (n - 1) * n / 2, ans + n]);
    return { statement: `What is the value of 1 + 2 + 3 + ... + ${n}?`, choices, answer: String(ans),
      hint: 'Pair the first and last terms, the second and second-to-last, and so on.',
      solution: `Pair terms: (1 + ${n}) + (2 + ${n - 1}) + ... = ${n + 1} × ${n / 2} pairs... more precisely, the sum is ${n}(${n} + 1)/2 = ${n * (n + 1)}/2 = ${ans}.` };
} },
// ---- combinatorics ----
{ difficulty: 12, topic: 'combinatorics', gen(rng) {
    const n = rng.int(5, 9), k = rng.int(2, 3);
    const ans = C(n, k);
    const perm = fact(n) / fact(n - k);
    const choices = numChoices(rng, ans, [n * k, n ** k, perm, ans + 1, ans - 1, ans + 2]);
    return { statement: `From a group of ${n} students, a committee of ${k} is chosen. How many different committees are possible?`, choices, answer: String(ans),
      hint: 'Order within the committee does not matter — use combinations, not permutations.',
      solution: `The number of ways to choose ${k} from ${n} is C(${n},${k}) = ${n}!/(${k}! × ${n - k}!) = ${fact(n)}/(${fact(k)} × ${fact(n - k)}) = ${ans}.` };
} },
{ difficulty: 12, topic: 'combinatorics', gen(rng) {
    const r = rng.int(2, 5), b = rng.int(2, 5);
    const num = C(r, 2), den = C(r + b, 2);
    const g = gcd(num, den);
    const ans = `${num / g}/${den / g}`;
    const cands = ['1/2', `${r}/${r + b}`, `${b}/${r + b}`, `${num + 1}/${den}`, `${num}/${den + 1}`, `${2 * num}/${2 * den}`, `${num}/${den}`];
    const choices = strChoices(rng, ans, cands);
    return { statement: `A bag contains ${r} red marbles and ${b} blue marbles. Two marbles are drawn at random without replacement. What is the probability that both are red?`, choices, answer: ans,
      hint: 'Count favorable pairs over total pairs: how many ways to pick 2 red from r? 2 from all?',
      solution: `There are C(${r},2) = ${num} ways to draw 2 red and C(${r + b},2) = ${den} total pairs. Probability = ${num}/${den} = ${ans}.` };
} },
{ difficulty: 12, topic: 'combinatorics', gen(rng) {
    const n = rng.int(4, 6);
    const ans = 2 * fact(n - 1);
    const choices = numChoices(rng, ans, [fact(n), fact(n - 1), 2 * fact(n), ans + 2, ans - 2, fact(n) - 1]);
    return { statement: `In how many ways can ${n} people stand in a row if two particular people must stand next to each other?`, choices, answer: String(ans),
      hint: 'Treat the two people as a single block first, then arrange them within the block.',
      solution: `Glue the pair into one block: ${n - 1} objects arrange in ${n - 1}! = ${fact(n - 1)} ways. The pair can switch order in 2 ways. Total: 2 × ${fact(n - 1)} = ${ans}.` };
} },
{ difficulty: 12, topic: 'combinatorics', gen(rng) {
    const m = rng.int(2, 4), n = rng.int(2, 4);
    const ans = C(m + n, m);
    const choices = numChoices(rng, ans, [m * n, m + n, 2 ** (m + n), fact(m + n), ans + 1, ans - 1]);
    return { statement: `How many shortest paths go from (0,0) to (${m},${n}) moving only right or up?`, choices, answer: String(ans),
      hint: 'Every shortest path uses exactly m rights and n ups in some order.',
      solution: `A shortest path is a sequence of ${m + n} moves with exactly ${m} rights (and ${n} ups): choose which ${m} of the ${m + n} moves are rights: C(${m + n},${m}) = ${ans}.` };
} },
{ difficulty: 12, topic: 'combinatorics', gen(rng) {
    const n = rng.int(6, 10);
    const ans = n * (n - 1) / 2;
    const choices = numChoices(rng, ans, [2 * n, n * n, fact(n), ans + 1, ans - 1, ans + 2]);
    return { statement: `A pizza shop offers ${n} toppings. A small pizza comes with exactly 2 different toppings. How many different small pizzas are possible?`, choices, answer: String(ans),
      hint: 'Choosing toppings A then B is the same pizza as B then A — order does not matter.',
      solution: `Choose 2 toppings from ${n}: C(${n},2) = ${n} × ${n - 1}/2 = ${ans}.` };
} },
/* ================= DIFFICULTY 13 ================= */
// ---- algebra ----
{ difficulty: 13, topic: 'algebra', gen(rng) {
    const a1 = rng.int(1, 10), d = rng.int(2, 9), n = rng.int(8, 15);
    const ans = a1 + (n - 1) * d;
    const choices = numChoices(rng, ans, [a1 + n * d, ans + d, ans - d, ans + 1, ans - 1]);
    return { statement: `An arithmetic sequence starts ${a1}, ${a1 + d}, ${a1 + 2 * d}, ... . What is the ${n}th term?`, choices, answer: String(ans),
      hint: 'Each step adds d. How many steps does it take to reach the nth term?',
      solution: `The nth term is a₁ + (n−1)d = ${a1} + ${n - 1} × ${d} = ${a1} + ${(n - 1) * d} = ${ans}.` };
} },
{ difficulty: 13, topic: 'algebra', gen(rng) {
    const k = rng.int(1, 6);
    const x = 6 * k, s = 5 * k;
    const choices = numChoices(rng, x, [x + 1, x - 1, x + 2, x - 2, s, s + 1]);
    return { statement: `If x/2 + x/3 = ${s}, what is the value of x?`, choices, answer: String(x),
      hint: 'Combine the fractions: x/2 + x/3 = (5/6)x.',
      solution: `x/2 + x/3 = 3x/6 + 2x/6 = 5x/6. So 5x/6 = ${s}, giving 5x = ${6 * s} and x = ${x}.` };
} },
{ difficulty: 13, topic: 'algebra', gen(rng) {
    const base = rng.pick([2, 3]);
    const k = base === 2 ? rng.int(4, 10) : rng.int(3, 6);
    const N = base ** k;
    const choices = numChoices(rng, k, [k + 1, k - 1, k + 2, k - 2, N, k + 3]);
    return { statement: `If ${base}^x = ${N}, what is the value of x?`, choices, answer: String(k),
      hint: 'Write the right side as a power of the same base.',
      solution: `${N} = ${base}^${k}, so ${base}^x = ${base}^${k} and x = ${k}.` };
} },
{ difficulty: 13, topic: 'algebra', gen(rng) {
    const L = rng.int(1, 8), U = rng.int(L + 1, L + 6);
    const a = 3 * L - 1 - rng.int(1, 3);
    const b = 3 * U - 1 + rng.int(1, 3);
    const ans = U - L + 1;
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, U - L]);
    return { statement: `How many integers x satisfy ${a} < 3x − 1 < ${b}?`, choices, answer: String(ans),
      hint: 'Solve the compound inequality for x first.',
      solution: `Adding 1: ${a + 1} < 3x < ${b + 1}. Dividing by 3: ${(a + 1) / 3} < x < ${(b + 1) / 3}. The integers strictly between are ${L}, ${L + 1}, ..., ${U} — that is ${ans} integers.` };
} },
{ difficulty: 13, topic: 'algebra', gen(rng) {
    const M = rng.int(6, 16), m = rng.int(2, M - 2);
    const s = M + m, dd = 2 * M - m;
    const choices = numChoices(rng, m, [M, s, dd, m + 1, m - 1, M - m]);
    return { statement: `The sum of two numbers is ${s}. Twice the larger minus the smaller equals ${dd}. What is the smaller number?`, choices, answer: String(m),
      hint: 'Add the two given equations to eliminate the smaller number.',
      solution: `Let L be the larger and S the smaller: L + S = ${s}, 2L − S = ${dd}. Adding: 3L = ${s + dd}, so L = ${M}. Then S = ${s} − ${M} = ${m}.` };
} },
// ---- geometry ----
{ difficulty: 13, topic: 'geometry', gen(rng) {
    const r = rng.int(2, 6);
    const ansStr = `${4 * r * r} − ${r * r}π`;
    const choices = strChoices(rng, ansStr, [`${4 * r * r} + ${r * r}π`, `${4 * r * r}`, `${r * r}π`, `${2 * r * r}π`, `${4 * r * r} − ${2 * r * r}π`]);
    return { statement: `A circle of radius ${r} cm is inscribed in a square. What is the area of the region inside the square but outside the circle?`, choices, answer: ansStr,
      hint: 'Subtract the circle\'s area from the square\'s area. What is the square\'s side length?',
      solution: `The inscribed circle has diameter ${2 * r}, so the square has side ${2 * r} and area ${2 * r}² = ${4 * r * r}. The circle has area π × ${r}² = ${r * r}π. The shaded region is ${ansStr} square centimeters.` };
} },
{ difficulty: 13, topic: 'geometry', gen(rng) {
    const k = rng.int(2, 5);
    const l1 = 3 * k, l2 = 4 * k, h = 5 * k;
    const choices = numChoices(rng, h, [7 * k, h + 1, h - 1, 12 * k, k, h + 2]);
    return { statement: `A rectangle has length ${l1} and width ${l2}. What is the length of its diagonal?`, choices, answer: String(h),
      hint: 'The diagonal is the hypotenuse of a right triangle with the sides as legs.',
      solution: `d² = ${l1}² + ${l2}² = ${l1 * l1} + ${l2 * l2} = ${h * h}, so d = ${h}.` };
} },
{ difficulty: 13, topic: 'geometry', gen(rng) {
    const e = rng.int(2, 9);
    const ans = 6 * e * e;
    const choices = numChoices(rng, ans, [e ** 3, 4 * e * e, 6 * e, ans + 1, ans - 1, 12 * e]);
    return { statement: `A cube has edge length ${e} cm. What is its total surface area in square centimeters?`, choices, answer: String(ans),
      hint: 'A cube has 6 identical square faces.',
      solution: `Each face has area ${e}² = ${e * e}. With 6 faces, the surface area is 6 × ${e * e} = ${ans} square centimeters.` };
} },
{ difficulty: 13, topic: 'geometry', gen(rng) {
    const a = rng.int(2, 6);
    const b = rng.int(a + 1, a + 3);
    const c = rng.int(b + 1, a + b - 1);
    const k = rng.int(2, 4);
    const A = a * k, ans = c * k;
    const choices = numChoices(rng, ans, [b * k, A, ans + 1, ans - 1, (a + b + c) * k, ans + k]);
    return { statement: `Triangle T1 has side lengths ${a}, ${b}, and ${c}. Triangle T2 is similar to T1, and its shortest side has length ${A}. What is the length of the longest side of T2?`, choices, answer: String(ans),
      hint: 'Find the scale factor from T1\'s shortest side to T2\'s shortest side, then apply it to the longest side.',
      solution: `Scale factor = ${A}/${a} = ${k}. The longest side of T1 is ${c}, so the longest side of T2 is ${k} × ${c} = ${ans}.` };
} },
{ difficulty: 13, topic: 'geometry', gen(rng) {
    const s = rng.int(6, 10);
    const t = 2 * rng.int(1, Math.floor((s - 2) / 2));
    const ans = s * s - t * t / 2;
    const choices = numChoices(rng, ans, [s * s - t * t, s * s + t * t / 2, s * t, ans + 1, ans - 1, ans + 2]);
    return { statement: `A square with side length ${s} has a right isosceles triangle with legs of length ${t} cut out from one corner. What is the area of the remaining region?`, choices, answer: String(ans),
      hint: 'Subtract the triangle\'s area from the square\'s area.',
      solution: `Square area = ${s}² = ${s * s}. Triangle area = (1/2) × ${t} × ${t} = ${t * t / 2}. Remaining area = ${s * s} − ${t * t / 2} = ${ans}.` };
} },
// ---- number theory ----
{ difficulty: 13, topic: 'number_theory', gen(rng) {
    const n = rng.int(2, 60);
    const map = { 0: '1', 1: '3', 2: '9', 3: '7' };
    const ans = map[n % 4];
    const choices = rng.shuffle(['1', '3', '7', '9', '5']);
    return { statement: `What is the units digit of 3^${n}?`, choices, answer: ans,
      hint: 'The units digits of powers of 3 repeat in a cycle. Find the cycle length.',
      solution: `Powers of 3 end in 3, 9, 7, 1, 3, 9, 7, 1, ... — a cycle of length 4. Since ${n} ÷ 4 leaves remainder ${n % 4}, the units digit is ${ans}.` };
} },
{ difficulty: 13, topic: 'number_theory', gen(rng) {
    const a = rng.int(1, 4), b = rng.int(1, 3);
    const n = 2 ** a * 3 ** b;
    const ans = (a + 1) * (b + 1);
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, a + b, a * b]);
    return { statement: `How many positive divisors does ${n} have?`, choices, answer: String(ans),
      hint: 'If n = 2^a × 3^b, the number of divisors is (a+1)(b+1).',
      solution: `${n} = 2^${a} × 3^${b}. Each divisor is 2^i × 3^j with 0 ≤ i ≤ ${a} and 0 ≤ j ≤ ${b}, giving (${a}+1)(${b}+1) = ${a + 1} × ${b + 1} = ${ans} divisors.` };
} },
{ difficulty: 13, topic: 'number_theory', gen(rng) {
    const base = rng.int(2, 5), N = rng.int(20, 60);
    let tmp = N; const digits = [];
    while (tmp > 0) { digits.push(tmp % base); tmp = Math.floor(tmp / base); }
    const ans = digits.reduce((s, d) => s + d, 0);
    const rep = digits.slice().reverse().join('');
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, digits.length, ans + 3]);
    return { statement: `When ${N} is written in base ${base}, what is the sum of its digits?`, choices, answer: String(ans),
      hint: 'Repeatedly divide by the base and record the remainders.',
      solution: `${N} in base ${base} is ${rep} (remainders ${digits.join(', ')} read backwards). The digit sum is ${digits.slice().reverse().join(' + ')} = ${ans}.` };
} },
{ difficulty: 13, topic: 'number_theory', gen(rng) {
    const x = rng.int(4, 14);
    const r1 = x % 3, r2 = x % 5;
    const choices = numChoices(rng, x, [x + 1, x - 1, x + 2, x - 2, x + 3]);
    return { statement: `A positive integer leaves remainder ${r1} when divided by 3 and remainder ${r2} when divided by 5. What is the smallest such integer?`, choices, answer: String(x),
      hint: 'List numbers with the first remainder, then check the second condition.',
      solution: `Numbers leaving remainder ${r1} upon division by 3: ${r1 === 0 ? '3' : r1}, ... Checking each mod 5, the first that leaves remainder ${r2} is ${x}. Since any two solutions differ by a multiple of 15 and ${x} < 15, it is the smallest.` };
} },
{ difficulty: 13, topic: 'number_theory', gen(rng) {
    const ps = rng.shuffle([2, 3, 5, 7]).slice(0, 2);
    const n = ps[0] * ps[1];
    let phi = 0;
    for (let k = 1; k < n; k++) if (gcd(k, n) === 1) phi++;
    const choices = numChoices(rng, phi, [n - 1, phi + 1, phi - 1, phi + 2, phi - 2, n - 2]);
    return { statement: `How many positive integers less than ${n} are relatively prime to ${n}?`, choices, answer: String(phi),
      hint: `Since ${n} = ${ps[0]} × ${ps[1]}, count the numbers below ${n} sharing no prime factor with it.`,
      solution: `${n} = ${ps[0]} × ${ps[1]}. Among 1, ..., ${n - 1}, the integers coprime to ${n} are those divisible by neither ${ps[0]} nor ${ps[1]}. Counting gives ${phi} such integers.` };
} },
// ---- combinatorics ----
{ difficulty: 13, topic: 'combinatorics', gen(rng) {
    const a = rng.int(8, 18), b = rng.int(8, 18);
    const c = rng.int(2, Math.min(a, b) - 2);
    const n = rng.int(a + b - c + 2, a + b - c + 10);
    const ans = n - a - b + c;
    const choices = numChoices(rng, ans, [n - a - b, ans + 1, ans - 1, a + b - c, n - c, ans + 2]);
    return { statement: `In a class of ${n} students, ${a} like math, ${b} like science, and ${c} like both. How many students like neither subject?`, choices, answer: String(ans),
      hint: 'Students who like at least one subject = math + science − both (don\'t double count!).',
      solution: `Students liking at least one subject = ${a} + ${b} − ${c} = ${a + b - c}. Those liking neither = ${n} − ${a + b - c} = ${ans}.` };
} },
{ difficulty: 13, topic: 'combinatorics', gen(rng) {
    const r = rng.int(2, 5), b = rng.int(2, 5);
    const num = C(r, 2) + C(b, 2), den = C(r + b, 2);
    const g = gcd(num, den);
    const ans = `${num / g}/${den / g}`;
    const cands = ['1/2', `${r}/${r + b}`, `${b}/${r + b}`, `${num + 1}/${den}`, `${num}/${den + 1}`, `${2 * num}/${2 * den}`, `${num}/${den}`];
    const choices = strChoices(rng, ans, cands);
    return { statement: `A bag contains ${r} red marbles and ${b} blue marbles. Two marbles are drawn at random without replacement. What is the probability that both marbles are the same color?`, choices, answer: ans,
      hint: 'Add the probability of two reds to the probability of two blues.',
      solution: `Favorable pairs: C(${r},2) + C(${b},2) = ${C(r, 2)} + ${C(b, 2)} = ${num}. Total pairs: C(${r + b},2) = ${den}. Probability = ${num}/${den} = ${ans}.` };
} },
{ difficulty: 13, topic: 'combinatorics', gen(rng) {
    const s = rng.int(4, 12);
    let ans = 0;
    for (let h = 1; h <= 9; h++) for (let t = 0; t <= 9; t++) for (let o = 0; o <= 9; o++) if (h + t + o === s) ans++;
    const choices = numChoices(rng, ans, [ans + 1, ans - 1, ans + 2, ans - 2, ans + 3]);
    return { statement: `How many 3-digit positive integers have digits that sum to ${s}?`, choices, answer: String(ans),
      hint: 'Try cases on the hundreds digit, then count the ways the other two digits can finish the sum.',
      solution: `For each hundreds digit h (1–9), the tens and ones digits must sum to ${s} − h. Counting all possibilities gives ${ans} such numbers.` };
} },
{ difficulty: 13, topic: 'combinatorics', gen(rng) {
    const c = rng.int(3, 7);
    const ans = c + 1;
    const choices = numChoices(rng, ans, [c, c + 2, 2 * c, c - 1, 2 * c + 1]);
    return { statement: `A drawer contains socks in ${c} different colors. In the dark, how many socks must be taken to guarantee at least one matching pair?`, choices, answer: String(ans),
      hint: 'What is the worst case — the most socks you could take without any pair?',
      solution: `In the worst case you take ${c} socks all of different colors with no pair. The next sock (${c + 1}th) must match one of them. So ${ans} socks guarantee a pair.` };
} },
{ difficulty: 13, topic: 'combinatorics', gen(rng) {
    const n = rng.int(4, 7);
    const ans = fact(n - 1);
    const choices = numChoices(rng, ans, [fact(n), fact(n - 2), 2 * ans, ans + 1, ans - 1, 3 * ans]);
    return { statement: `In how many ways can ${n} people sit around a round table? (Rotations of the same seating count as one way.)`, choices, answer: String(ans),
      hint: 'Fix one person\'s seat to remove the rotational symmetry, then arrange the rest.',
      solution: `Fix one person to break the rotation symmetry. The remaining ${n - 1} people arrange in (${n}−1)! = ${n - 1}! = ${ans} ways.` };
} },
];

module.exports = templates;

// ---------- self-test ----------
if (require.main === module) {
  function mulberry32(seed) {
    let s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeRng(seed) {
    const r = mulberry32(seed);
    return {
      f: () => r(),
      int: (min, max) => min + Math.floor(r() * (max - min + 1)),
      pick: (arr) => arr[Math.floor(r() * arr.length)],
      shuffle: (arr) => { const b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = b[i]; b[i] = b[j]; b[j] = t; } return b; },
    };
  }
  const fails = [];
  const TOPICS = ['algebra', 'geometry', 'number_theory', 'combinatorics'];
  if (!Array.isArray(templates) || templates.length !== 60) fails.push(`expected 60 templates, got ${templates.length}`);
  templates.forEach((t, i) => {
    const tag = `template[${i}]`;
    if (!Number.isInteger(t.difficulty) || t.difficulty < 11 || t.difficulty > 13) fails.push(`${tag}: bad difficulty ${t.difficulty}`);
    if (!TOPICS.includes(t.topic)) fails.push(`${tag}: bad topic ${t.topic}`);
    if (typeof t.gen !== 'function') { fails.push(`${tag}: gen not a function`); return; }
    [11, 222, 3333].forEach((seed) => {
      let out;
      try { out = t.gen(makeRng(seed)); }
      catch (e) { fails.push(`${tag} seed ${seed}: gen threw: ${e.message}`); return; }
      for (const k of ['statement', 'answer', 'hint', 'solution']) {
        if (typeof out[k] !== 'string' || out[k].length === 0) fails.push(`${tag} seed ${seed}: ${k} not a non-empty string`);
      }
      if (!Array.isArray(out.choices) || out.choices.length !== 5) { fails.push(`${tag} seed ${seed}: choices must be array of 5`); return; }
      if (out.choices.some(c => typeof c !== 'string')) fails.push(`${tag} seed ${seed}: choices must be strings`);
      if (new Set(out.choices).size !== 5) fails.push(`${tag} seed ${seed}: choices not unique: ${JSON.stringify(out.choices)}`);
      const hits = out.choices.filter(c => c === out.answer).length;
      if (hits !== 1) fails.push(`${tag} seed ${seed}: answer appears ${hits} times in choices`);
      if (out.statement.length > 600) fails.push(`${tag} seed ${seed}: statement > 600 chars`);
      if (/<[a-zA-Z/!]/.test(out.statement)) fails.push(`${tag} seed ${seed}: statement contains HTML-like angle brackets`);
    });
  });
  if (fails.length) { console.log('FAIL'); fails.slice(0, 30).forEach(f => console.log(' - ' + f)); process.exit(1); }
  console.log(`PASS (${templates.length} templates)`);
}
