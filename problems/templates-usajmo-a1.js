'use strict';
/* USAJMO Set A1 — 10 problem templates (5 algebra, 5 number theory; five at d17, five at d18).
 * Interface: module.exports = array of { difficulty, topic, gen(rng) }.
 * gen(rng) is pure: only rng.f(), rng.int(min,max), rng.pick(arr), rng.shuffle(arr). */

module.exports = [
  {
    difficulty: 17, topic: 'algebra',
    gen(rng) {
      const k = rng.int(2, 9);
      const c = 2 * k * k * k;
      const ans = 3 * k * k;
      return {
        statement: `Let k = ${k}. For x > 0, determine, with proof, the minimum value of f(x) = x² + ${c}/x.`,
        choices: null,
        answer: `${ans}`,
        hint: 'Split the fractional term into two equal parts, then apply AM–GM to the three resulting terms.',
        solution: `Write f(x) = x² + k³/x + k³/x, where k = ${k} and ${c} = 2k³. Applying AM–GM to the three positive terms gives x² + k³/x + k³/x ≥ 3∛(x² · (k³/x) · (k³/x)). The product inside the cube root is x² · k⁶/x² = k⁶, and ∛(k⁶) = k², so f(x) ≥ 3k² = ${ans} for every x > 0. The point of the split is that the product of the three terms becomes the constant k⁶, so AM–GM yields a constant lower bound. Equality in AM–GM holds exactly when the three terms coincide, i.e. x² = k³/x, which means x³ = k³ and hence x = k (using x > 0). Substituting, f(k) = k² + 2k³/k = k² + 2k² = 3k² = ${ans}. Thus the lower bound is attained at x = k, so ${ans} is not just a lower bound but the minimum value of f on (0, ∞).`
      };
    }
  },
  {
    difficulty: 17, topic: 'number_theory',
    gen(rng) {
      const p = rng.pick([5, 7, 11, 13]);
      const e = rng.int(1, 8);
      const cond = ((p - 1) % e === 0 && e <= p - 1 && (p - 1) % e === 0) ? true : (p - 1) % e !== 0;
      return {
        statement: `Let p = ${p} and e = ${e}. Prove that p divides 1^e + 2^e + ⋯ + (p−1)^e if and only if p − 1 does not divide e.`,
        choices: null,
        answer: `divisible ⟺ ${p - 1} ∤ ${e} (here ${cond ? 'true: it is divisible' : 'false: it is not divisible'})`,
        hint: 'If (p−1) | e, every term is 1 mod p. Otherwise use a primitive root to write the sum as a geometric series.',
        solution: `First suppose (p − 1) | e. By Fermat, j^e ≡ 1 (mod p) for each j = 1, …, p − 1, so the sum is ≡ (p − 1) · 1 ≡ −1 ≢ 0 (mod p); p does not divide it. Now suppose (p − 1) ∤ e. Let g be a primitive root modulo p, so {1, …, p − 1} = {g⁰, g¹, …, g^{p−2}} as residues. Then the sum is ≡ Σ_{j=0}^{p−2} (g^e)^j = ((g^e)^{p−1} − 1)/(g^e − 1) (mod p). Since ord(g) = p − 1 and (p − 1) ∤ e, we have g^e ≢ 1 (mod p), so the denominator is nonzero mod p and the formula applies. By Fermat, (g^e)^{p−1} = (g^{p−1})^e ≡ 1, so the numerator is 0 mod p. Hence the whole sum is ≡ 0 (mod p), i.e. p divides it. The two cases exhaust all e, proving the claimed if-and-only-if.`
      };
    }
  },
  {
    difficulty: 17, topic: 'algebra',
    gen(rng) {
      const n = rng.int(1, 4);
      return {
        statement: `Let a, b, c be positive real numbers with abc = 1, and let n = ${n}. Prove that a^{${2 * n}} + b^{${2 * n}} + c^{${2 * n}} ≥ a^${n} + b^${n} + c^${n}.`,
        choices: null,
        answer: `a^{${2 * n}} + b^{${2 * n}} + c^{${2 * n}} − a^${n} − b^${n} − c^${n} ≥ 0`,
        hint: 'Set x = a^n, y = b^n, z = c^n (so xyz = 1), then chain x²+y²+z² ≥ xy+yz+zx ≥ x+y+z.',
        solution: `Put x = a^${n}, y = b^${n}, z = c^${n}; then x, y, z > 0 and xyz = (abc)^${n} = 1. We prove x² + y² + z² ≥ x + y + z in two steps. First, x² + y² + z² − xy − yz − zx = ½((x−y)² + (y−z)² + (z−x)²) ≥ 0. Second, (xy + yz + zx)² ≥ 3xyz(x + y + z) = 3(x + y + z), since (xy+yz+zx)² − 3xyz(x+y+z) = ½Σ(xy−yz)² ≥ 0. By AM–GM, x + y + z ≥ 3∛(xyz) = 3, so 3(x+y+z) ≥ (x+y+z)². Combining, (xy+yz+zx)² ≥ (x+y+z)², and both sides are positive, so xy + yz + zx ≥ x + y + z. Chaining the two inequalities gives x² + y² + z² ≥ xy + yz + zx ≥ x + y + z, which is exactly a^{${2 * n}} + b^{${2 * n}} + c^{${2 * n}} ≥ a^${n} + b^${n} + c^${n}. Equality holds at a = b = c = 1.`
      };
    }
  },
  {
    difficulty: 17, topic: 'number_theory',
    gen(rng) {
      void rng.f();
      return {
        statement: 'Find all positive integers n such that n divides 2^n + 1.',
        choices: null,
        answer: 'n = 3^k for k ≥ 0 (n ∈ {1, 3, 9, 27, …})',
        hint: 'Such n is odd; look at its smallest prime divisor p and the multiplicative order of 2 mod p.',
        solution: `If n | 2^n + 1 then n is odd, and n = 1 works. Let n > 1 be a solution and let p be its smallest prime divisor (p odd). From 2^n ≡ −1 (mod p) we get 2^{2n} ≡ 1 but 2^n ≢ 1 (mod p). Let d be the order of 2 mod p: then d | 2n and d ∤ n. Since n is odd, v₂(d) = v₂(2n) = 1, so d = 2m with m odd and m | n. Also d | p − 1, so m ≤ (p−1)/2 < p. Any prime divisor q of m divides n and is < p, contradicting minimality of p unless m = 1. Thus d = 2, i.e. 2² ≡ 1 and 2 ≢ 1 (mod p), forcing p = 3. Hence every prime divisor of n is 3, so n = 3^k. Conversely, by LTE, v₃(2^{3^k} + 1) = v₃(2 + 1) + v₃(3^k) = 1 + k ≥ k, so 3^k | 2^{3^k} + 1 for all k ≥ 0. Therefore the solutions are exactly n = 3^k.`
      };
    }
  },
  {
    difficulty: 17, topic: 'algebra',
    gen(rng) {
      const m = rng.pick([1, 2, 3]);
      const rhs = { 1: '9/2', 2: '9/4', 3: '3/2' }[m];
      return {
        statement: `Let x, y, z be positive reals with x + y + z = ${m}. Prove that 1/(${m} − x) + 1/(${m} − y) + 1/(${m} − z) ≥ ${rhs}.`,
        choices: null,
        answer: `${rhs}`,
        hint: 'Note m − x = y + z, then apply Cauchy (Titu’s lemma) to Σ 1/(y+z).',
        solution: `Since x + y + z = ${m}, we have ${m} − x = y + z, and similarly for y, z. The required inequality becomes 1/(y+z) + 1/(z+x) + 1/(x+y) ≥ 9/(2·${m}). By Cauchy–Schwarz in Engel form (Titu’s lemma), Σ 1/(y+z) ≥ (1 + 1 + 1)²/((y+z) + (z+x) + (x+y)) = 9/(2(x+y+z)) = 9/(2·${m}) = ${rhs}. Indeed, Titu’s lemma follows from (Σ 1/(y+z))(Σ (y+z)) ≥ (1+1+1)² = 9 by Cauchy, and Σ (y+z) = 2(x+y+z) = 2·${m}. Equality holds when y + z = z + x = x + y, i.e. x = y = z = ${m}/3, where each term equals 1/(2·${m}/3) and the sum is 3·3/(2·${m}) = ${rhs}. The estimate is sharp, and the constant 9/(2·${m}) cannot be improved. This completes the proof.`
      };
    }
  },
  {
    difficulty: 18, topic: 'number_theory',
    gen(rng) {
      void rng.f();
      return {
        statement: 'Find all pairs (m, n) of positive integers satisfying 2^m − 3^n = 1.',
        choices: null,
        answer: '(m, n) = (2, 1)',
        hint: 'For m ≥ 3, reduce modulo 8 and check the possible residues of powers of 3.',
        solution: `We solve 2^m = 3^n + 1 in positive integers. If m = 1, then 3^n = 1, impossible. If m = 2, then 3^n = 3, giving n = 1; so (2, 1) is a solution. Suppose m ≥ 3. Then 2^m ≡ 0 (mod 8), so 3^n = 2^m − 1 ≡ −1 ≡ 7 (mod 8). But powers of 3 modulo 8 alternate: 3¹ ≡ 3, 3² ≡ 1, 3³ ≡ 3, …, so 3^n (mod 8) is always 1 or 3, never 7 — contradiction. Hence no solutions with m ≥ 3. Alternatively, the same obstruction shows m cannot reach 3, so the only candidate is m = 2. Checking: 2² − 3¹ = 4 − 3 = 1. Therefore (m, n) = (2, 1) is the unique pair of positive integers satisfying the equation.`
      };
    }
  },
  {
    difficulty: 18, topic: 'algebra',
    gen(rng) {
      const c = rng.int(3, 6);
      const disc = c * c - 4;
      return {
        statement: `Let c = ${c} and define a₁ = c, aₙ₊₁ = aₙ² − 2 for n ≥ 1. With u = (c + √${disc})/2, prove that aₙ = u^{2^{n−1}} + u^{−2^{n−1}} for all n ≥ 1.`,
        choices: null,
        answer: `aₙ = u^{2^{n−1}} + u^{−2^{n−1}}, u = (${c} + √${disc})/2`,
        hint: 'Show u + 1/u = c, then induct using (t + 1/t)² − 2 = t² + 1/t².',
        solution: `Let u = (${c} + √${disc})/2. Since c = ${c} > 2, the discriminant ${disc} > 0, so u is real; also u > 1. Note u satisfies u² − c·u + 1 = 0, i.e. u + 1/u = c = a₁, which is the base case n = 1. The key identity is (t + 1/t)² − 2 = t² + 2 + 1/t² − 2 = t² + 1/t² for any nonzero t. Now induct: assume aₙ = u^{2^{n−1}} + u^{−2^{n−1}} and set t = u^{2^{n−1}}. Then aₙ₊₁ = aₙ² − 2 = (t + 1/t)² − 2 = t² + 1/t² = u^{2·2^{n−1}} + u^{−2·2^{n−1}} = u^{2ⁿ} + u^{−2ⁿ}, which is the formula for n + 1. By induction the closed form holds for all n ≥ 1. Since u > 1, the term u^{2^{n−1}} dominates, so aₙ grows doubly exponentially; e.g. a₂ = c² − 2 = ${c * c - 2}.`
      };
    }
  },
  {
    difficulty: 18, topic: 'number_theory',
    gen(rng) {
      void rng.f();
      return {
        statement: 'Let p be a prime with p ≡ 3 (mod 4). Prove that the product of all nonzero quadratic residues modulo p is congruent to 1 modulo p.',
        choices: null,
        answer: '∏ residues ≡ (((p−1)/2)!)² ≡ 1 (mod p)',
        hint: 'The residues are exactly 1², 2², …, ((p−1)/2)² mod p; relate (((p−1)/2)!)² to Wilson’s theorem.',
        solution: `Let R be the product of the (p−1)/2 nonzero quadratic residues mod p. Every nonzero residue is represented exactly twice among 1², 2², …, (p−1)² (since x² ≡ (p−x)²), and the distinct values are 1², …, ((p−1)/2)². Hence R ≡ ∏_{j=1}^{(p−1)/2} j² = (((p−1)/2)!)² (mod p). Now Wilson’s theorem: (p−1)! = ∏_{j=1}^{(p−1)/2} j(p−j) ≡ (((p−1)/2)!)² · (−1)^{(p−1)/2} ≡ −1 (mod p). Thus (((p−1)/2)!)² ≡ (−1)^{(p+1)/2} (mod p). Since p ≡ 3 (mod 4), write p = 4k + 3; then (p+1)/2 = 2k + 2 is even, so (−1)^{(p+1)/2} = 1. Therefore R ≡ 1 (mod p), i.e. the product of all nonzero quadratic residues is 1 modulo p. The hypothesis p ≡ 3 (mod 4) is essential: for p ≡ 1 (mod 4) the same computation gives R ≡ −1 (mod p) instead.`
      };
    }
  },
  {
    difficulty: 18, topic: 'algebra',
    gen(rng) {
      void rng.f();
      return {
        statement: 'Find all real polynomials P satisfying P(x²) = P(x)² − 2 for all real x.',
        choices: null,
        answer: 'P ≡ 2 and P ≡ −1',
        hint: 'Constants satisfy c = c² − 2. For nonconstant P, compare the coefficient of x^{d+k} on both sides, where d = deg P.',
        solution: `Constant solutions: c = c² − 2 gives c² − c − 2 = 0, so c = 2 or c = −1; both check out. Suppose deg P = d ≥ 1. Comparing leading terms, ax^{2d} = a²x^{2d}, so a = a² and a ≠ 0, hence a = 1: P is monic. Suppose some lower coefficient is nonzero, and let k < d be the largest exponent with nonzero coefficient a_k. In P(x)² − 2, the coefficient of x^{d+k} is 2a_k (from 2·x^d·a_kx^k; lower products give smaller exponents). In P(x²), every exponent is even, and x^{d+k} would come from x^{(d+k)/2} in P. If d + k is odd, this coefficient is 0. If d + k is even, then k < (d+k)/2 < d, so by maximality of k the coefficient of x^{(d+k)/2} in P is 0, again giving 0. Hence 2a_k = 0, contradiction. So P(x) = x^d, but then x^{2d} = x^{2d} − 2 is impossible. Thus no nonconstant solutions exist, and the only solutions are P ≡ 2 and P ≡ −1.`
      };
    }
  },
  {
    difficulty: 18, topic: 'number_theory',
    gen(rng) {
      const m = rng.int(2, 4);
      const ans = 6 * Math.pow(7, m - 1);
      return {
        statement: `Let m = ${m}. Find, with proof, the least positive integer k such that 7^${m} divides 10^k − 1.`,
        choices: null,
        answer: `${ans}`,
        hint: 'First find the order of 10 mod 7, then use LTE to lift to 7^m.',
        solution: `First find ord₇(10). Since 10 ≡ 3 (mod 7), test divisors of 6: 10¹ − 1 = 9, 10² − 1 = 99 = 9·11, 10³ − 1 = 999 = 27·37, none divisible by 7, while 10⁶ − 1 = 999999 = 7·142857 is. Hence ord₇(10) = 6, so 7 | 10^k − 1 forces 6 | k; write k = 6t. By LTE for the odd prime 7 dividing 10⁶ − 1: v₇(10^{6t} − 1) = v₇(10⁶ − 1) + v₇(t). Since 999999 = 3³·7·11·13·37, v₇(10⁶−1) = 1, so v₇(10^k − 1) = 1 + v₇(t). We need 7^${m} | 10^k − 1, i.e. 1 + v₇(t) ≥ ${m}, i.e. v₇(t) ≥ ${m - 1}. The least such t is 7^{${m - 1}} = ${Math.pow(7, m - 1)}, giving least k = 6·7^{${m - 1}} = ${ans}. Any smaller k fails either the order condition or the valuation bound.`
      };
    }
  }
];

/* Self-test */
if (require.main === module) {
  function mulberry32(seed) {
    let a = seed >>> 0;
    return {
      f() { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; },
      int(min, max) { return min + Math.floor(this.f() * (max - min + 1)); },
      pick(arr) { return arr[this.int(0, arr.length - 1)]; },
      shuffle(arr) { const x = arr.slice(); for (let i = x.length - 1; i > 0; i--) { const j = this.int(0, i); const tmp = x[i]; x[i] = x[j]; x[j] = tmp; } return x; }
    };
  }
  const templates = module.exports;
  const fails = [];
  const ok = (cond, msg) => { if (!cond) fails.push(msg); };
  ok(Array.isArray(templates) && templates.length === 10, `expected 10 templates, got ${templates && templates.length}`);
  const topics = { algebra: 0, number_theory: 0 };
  const diffs = { 17: 0, 18: 0 };
  templates.forEach((t, i) => {
    ok(t && typeof t.gen === 'function', `template ${i}: gen not a function`);
    ok(t.difficulty === 17 || t.difficulty === 18, `template ${i}: difficulty ${t.difficulty} not 17/18`);
    ok(t.topic === 'algebra' || t.topic === 'number_theory', `template ${i}: bad topic ${t.topic}`);
    if (t.topic) topics[t.topic]++;
    if (t.difficulty) diffs[t.difficulty]++;
    for (const seed of [1, 2, 3]) {
      const rng = mulberry32(seed * 7919 + i * 131);
      let r;
      try { r = t.gen(rng); } catch (e) { fails.push(`template ${i} seed ${seed}: gen threw: ${e.message}`); continue; }
      const tag = `template ${i} (d${t.difficulty}/${t.topic}) seed ${seed}`;
      ok(r && typeof r.statement === 'string' && r.statement.length > 0, `${tag}: empty statement`);
      ok(r.statement.length <= 600, `${tag}: statement ${r.statement.length} chars > 600`);
      ok(r.choices === null, `${tag}: choices not null`);
      ok(typeof r.answer === 'string' && r.answer.length > 0, `${tag}: empty answer`);
      ok(typeof r.hint === 'string' && r.hint.length > 0, `${tag}: empty hint`);
      ok(typeof r.solution === 'string' && r.solution.length >= 120, `${tag}: solution ${r.solution ? r.solution.length : 0} chars < 120`);
      const words = r.solution ? r.solution.trim().split(/\s+/).length : 0;
      ok(words >= 120 && words <= 220, `${tag}: solution ${words} words not in 120-220`);
      ok(!/<[a-zA-Z\/!]/.test(r.statement), `${tag}: statement contains raw HTML brackets`);
    }
  });
  ok(topics.algebra === 5 && topics.number_theory === 5, `topic counts ${JSON.stringify(topics)}`);
  ok(diffs[17] === 5 && diffs[18] === 5, `difficulty counts ${JSON.stringify(diffs)}`);
  if (fails.length) { console.log('FAIL'); fails.forEach(f => console.log(' - ' + f)); process.exit(1); }
  console.log('PASS: 10 templates (5 algebra / 5 number_theory, five d17 / five d18), 3 seeds each, all checks green.');
}
