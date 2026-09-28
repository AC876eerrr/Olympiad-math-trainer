// USAJMO-tier problem templates (difficulty 19-20).
// Interface: module.exports = [ { difficulty, topic, gen(rng) } x 20 ], ordered by difficulty ascending.
// gen returns { statement, choices: null, answer, hint, solution }.
// rng API only: rng.f(), rng.int(min,max) inclusive, rng.pick(arr), rng.shuffle(arr).

function T(t) { return t; }

module.exports = [

  // ---------------- difficulty 19 ----------------

  { difficulty: 19, topic: 'algebra', gen(rng) {
    const k = rng.pick([1, 2, 3, 4]);
    const rhs = k === 1 ? '3/2' : '3/' + (k + 1);
    return {
      statement: T('Let a, b, c be positive real numbers and let k = ' + k + '. Prove that a/(kb + c) + b/(kc + a) + c/(ka + b) ≥ ' + rhs + ', with equality when a = b = c. (This generalizes Nesbitt\u2019s inequality, the case k = 1.)'),
      choices: null,
      answer: rhs + ' (equality at a = b = c)',
      hint: 'Apply Cauchy\u2019s Engel form (Titu\u2019s lemma) to rewrite each term as a²/(kab + ac), then bound ab + bc + ca against (a + b + c)².',
      solution: 'By Cauchy (Titu\u2019s lemma), ∑ a/(kb+c) = ∑ a²/(kab+ac) ≥ (a+b+c)² / ∑(kab+ac) = (a+b+c)² / ((k+1)(ab+bc+ca)). It remains to show (a+b+c)²/((k+1)(ab+bc+ca)) ≥ 3/(k+1), i.e. (a+b+c)² ≥ 3(ab+bc+ca). This is equivalent to ½∑(a−b)² ≥ 0, which is true. Equality in Titu\u2019s lemma requires (kab+ac)/a equal for all cyclic terms, i.e. kb+c equal for all, and equality in the second step requires a=b=c; both hold at a=b=c. Hence the sum is at least 3/(k+1), as claimed.'
    };
  } },

  { difficulty: 19, topic: 'algebra', gen(rng) {
    const m = rng.pick([2, 3, 4, 5, -2, -3]);
    return {
      statement: T('Find all functions f : ℝ → ℝ such that f(x + y) = f(x) + f(y) for all real x, y, f is bounded on some nontrivial interval, and f(1) = ' + m + '.'),
      choices: null,
      answer: 'f(x) = ' + m + 'x for all real x',
      hint: 'First show f(q) = q·f(1) for every rational q, then use boundedness on an interval to force continuity at 0, hence everywhere.',
      solution: 'Put y = 0 to get f(0) = 0, and induction gives f(nx) = nf(x) for integers n. Also f(x) = f(n·(x/n)) = nf(x/n), so f(qx) = qf(x) for rational q; with x = 1, f(q) = ' + m + 'q for all rational q. Boundedness on an interval implies continuity at 0: if |f| ≤ M on (−δ, δ), then for fixed x, f(x+h) − f(x) = f(h) → 0 as h → 0 follows from the standard estimate using f(h) = n·f(h/n) with h/n in the interval. Precisely, boundedness near 0 plus additivity yields continuity at 0, and f(x+h) = f(x)+f(h) extends this to all x. For real x take rationals qₙ → x; then f(x) = lim f(qₙ) = lim ' + m + 'qₙ = ' + m + 'x. Direct check: f(x) = ' + m + 'x satisfies additivity, boundedness, and f(1) = ' + m + '.'
    };
  } },

  { difficulty: 19, topic: 'algebra', gen(rng) {
    const n = rng.pick([3, 4, 5, 6, 8]);
    const vars = ['x₁', 'x₂', 'x₃', 'x₄', 'x₅', 'x₆', 'x₇', 'x₈'].slice(0, n).join(', ');
    return {
      statement: T('Let ' + vars + ' be real numbers. Prove that (' + vars.replace(/, /g, ' + ') + ')² ≤ ' + n + '·(' + vars.split(', ').map(v => v + '²').join(' + ') + '), and determine when equality holds.'),
      choices: null,
      answer: 'Holds for all reals; equality iff all variables are equal',
      hint: 'Expand 0 ≤ ∑_{i<j} (xᵢ − xⱼ)² and collect terms.',
      solution: 'Consider S = ∑_{1≤i<j≤' + n + '} (xᵢ − xⱼ)² ≥ 0. Expanding, each xᵢ² appears in exactly (' + n + '−1) pairs, so S = (' + n + '−1)∑xᵢ² − 2∑_{i<j} xᵢxⱼ. But (∑xᵢ)² = ∑xᵢ² + 2∑_{i<j}xᵢxⱼ. Adding: S + (∑xᵢ)² = ' + n + '∑xᵢ², hence (∑xᵢ)² = ' + n + '∑xᵢ² − S ≤ ' + n + '∑xᵢ² since S ≥ 0. Equality holds iff S = 0, i.e. every pair difference xᵢ − xⱼ = 0, so all variables are equal. This is the Cauchy–Schwarz (or QM–AM) inequality in disguise.'
    };
  } },

  { difficulty: 19, topic: 'geometry', gen(rng) {
    const alpha = rng.pick([40, 50, 60, 70, 80]);
    let beta = rng.pick([30, 40, 50, 60]);
    if (alpha + beta > 130) beta = 130 - alpha;
    const gamma = 180 - alpha - beta;
    const ans = 90 + alpha / 2;
    return {
      statement: T('In △ABC, ∠BAC = ' + alpha + '° and ∠ABC = ' + beta + '°. Let I be the incenter of △ABC. Find ∠BIC, with proof.'),
      choices: null,
      answer: ans + '°',
      hint: 'I lies at the intersection of the angle bisectors; apply the angle sum in △BIC.',
      solution: 'The incenter I is the intersection of the internal bisectors of the angles of △ABC, so ∠IBC = ∠ABC/2 = ' + beta + '°/2 = ' + (beta / 2) + '° and ∠ICB = ∠ACB/2. Since ∠ACB = 180° − ' + alpha + '° − ' + beta + '° = ' + gamma + '°, we get ∠ICB = ' + (gamma / 2) + '°. In △BIC the angles sum to 180°, so ∠BIC = 180° − ' + (beta / 2) + '° − ' + (gamma / 2) + '° = 180° − (' + beta + '° + ' + gamma + '°)/2 = 180° − ' + ((beta + gamma) / 2) + '° = ' + ans + '°. In general ∠BIC = 90° + ∠A/2, the well-known incenter angle formula.'
    };
  } },

  { difficulty: 19, topic: 'geometry', gen(rng) {
    const p = rng.pick([6, 8, 10, 12]);
    const divs = [];
    for (let d = 1; d < p * p; d++) if ((p * p) % d === 0 && d < p * p) divs.push(d);
    const a = rng.pick(divs.filter(d => d < p * p / 2 && p * p / d > d));
    const PB = (p * p) / a;
    return {
      statement: T('From an exterior point P, a tangent to a circle touches it at T with PT = ' + p + '. A secant through P meets the circle at A (near P) and B (far from P), with PA = ' + a + '. Prove that PT² = PA · PB, and hence find PB.'),
      choices: null,
      answer: 'PB = ' + PB,
      hint: 'Show △PTA ∼ △PBT using the alternate segment theorem, then read off the proportion.',
      solution: 'Join TA, TB. By the alternate segment theorem, ∠PTA (between tangent PT and chord TA) equals the angle in the alternate segment, ∠PBT. The triangles PTA and PBT share ∠TPA, so △PTA ∼ △PBT by AA. Hence PT/PB = PA/PT, i.e. PT² = PA·PB — the power of a point. With PT = ' + p + ' and PA = ' + a + ', we get PB = PT²/PA = ' + (p * p) + '/' + a + ' = ' + PB + '. Indeed PB > PA as required for A between P and B.'
    };
  } },

  { difficulty: 19, topic: 'number_theory', gen(rng) {
    const n = rng.pick([2, 3, 5, 7, 10, 12]);
    return {
      statement: T('Let p be an odd prime divisor of ' + n + '² + 1 = ' + (n * n + 1) + '. Prove that p ≡ 1 (mod 4).'),
      choices: null,
      answer: 'p ≡ 1 (mod 4)',
      hint: 'From n² ≡ −1 (mod p) deduce that n has multiplicative order exactly 4 modulo p, then apply Fermat.',
      solution: 'Since p | n²+1 and p is odd, p ∤ n, so n is invertible mod p and n² ≡ −1 (mod p). Then n⁴ ≡ 1 (mod p) but n² ≢ 1 (mod p) (as n² ≡ −1 ≢ 1 since p > 2). Hence the multiplicative order of n modulo p is exactly 4. By Fermat\u2019s little theorem the order divides p − 1, so 4 | (p − 1), i.e. p ≡ 1 (mod 4). (The hypothesis that p is odd is essential: 2 also divides some n²+1, e.g. 1²+1, but 2 ≢ 1 mod 4.)'
    };
  } },

  { difficulty: 19, topic: 'number_theory', gen(rng) {
    return {
      statement: T('Prove that there are infinitely many primes p with p ≡ 3 (mod 4).'),
      choices: null,
      answer: 'Infinitely many such primes exist',
      hint: 'Mimic Euclid: assume finitely many, multiply them, and consider 4·(product) − 1.',
      solution: 'Suppose only finitely many such primes exist: p₁, …, pₖ. Let N = 4p₁⋯pₖ − 1. Then N ≡ 3 (mod 4), so N > 1 and N is not a product solely of primes ≡ 1 (mod 4) (any such product is ≡ 1 mod 4), nor can all its prime factors be 2 or ≡ 1 mod 4. Hence N has at least one prime factor q ≡ 3 (mod 4). But q cannot equal any pᵢ, since each pᵢ divides 4p₁⋯pₖ while q divides 4p₁⋯pₖ − 1, and a common divisor would divide their difference 1. This contradicts the assumption that p₁, …, pₖ were all such primes. Therefore infinitely many primes ≡ 3 (mod 4) exist.'
    };
  } },

  { difficulty: 19, topic: 'combinatorics', gen(rng) {
    const n = rng.pick([5, 6, 7, 8, 9, 10, 12]);
    return {
      statement: T('Prove that among any ' + (n + 1) + ' integers, there are two distinct ones whose difference is divisible by ' + n + '.'),
      choices: null,
      answer: 'Two such integers always exist',
      hint: 'Consider remainders upon division by ' + n + ': how many possible remainders are there?',
      solution: 'There are exactly ' + n + ' possible remainders modulo ' + n + ': 0, 1, …, ' + (n - 1) + '. We have ' + (n + 1) + ' integers but only ' + n + ' remainder classes, so by the pigeonhole principle two of the integers, say a and b with a > b, share the same remainder r modulo ' + n + '. Then a ≡ r and b ≡ r (mod ' + n + '), so a − b ≡ 0 (mod ' + n + '), i.e. ' + n + ' divides a − b. The bound is sharp: ' + n + ' integers can avoid this, e.g. 0, 1, …, ' + (n - 1) + '.'
    };
  } },

  { difficulty: 19, topic: 'combinatorics', gen(rng) {
    const s = rng.pick([1, 2, 3]);
    const bound = s === 1 ? '√2/2' : (s + '√2/2');
    return {
      statement: T('Five points are placed inside (or on the boundary of) a square of side ' + s + '. Prove that two of the points are at distance at most ' + bound + ' from each other.'),
      choices: null,
      answer: bound,
      hint: 'Split the square into four congruent smaller squares and use the pigeonhole principle; the diameter of each small square is its diagonal.',
      solution: 'Divide the ' + s + ' × ' + s + ' square into four congruent squares of side ' + (s / 2) + ' by joining the midpoints of opposite sides. With five points and four small squares, the pigeonhole principle gives two points in the same small square (boundary points assigned arbitrarily). The greatest distance between two points in a square of side ' + (s / 2) + ' is its diagonal, ' + (s / 2) + '·√2 = ' + bound + '. Hence those two points are at distance at most ' + bound + '. The constant is best possible, attained by four corners plus the center.'
    };
  } },

  { difficulty: 19, topic: 'combinatorics', gen(rng) {
    return {
      statement: T('In any finite graph, prove that the number of vertices with odd degree is even.'),
      choices: null,
      answer: 'The number of odd-degree vertices is even',
      hint: 'Count the edge-endpoints two ways: each edge contributes exactly 2 to the sum of all degrees.',
      solution: 'Let the vertices be v₁, …, vₙ with degrees d₁, …, dₙ. Each edge has two endpoints, so summing degrees counts every edge exactly twice: ∑dᵢ = 2|E|, an even number. Split the sum into odd and even degrees: ∑_{dᵢ odd} dᵢ = 2|E| − ∑_{dᵢ even} dᵢ, which is even minus even, hence even. A sum of odd integers is even only when there are evenly many of them. Therefore the number of vertices of odd degree is even. (In particular it can never be exactly 1.)'
    };
  } },

  // ---------------- difficulty 20 ----------------

  { difficulty: 20, topic: 'algebra', gen(rng) {
    return {
      statement: T('Let a, b, c be positive real numbers. Prove that a³/(b + c) + b³/(c + a) + c³/(a + b) ≥ (a² + b² + c²)/2.'),
      choices: null,
      answer: '(a² + b² + c²)/2 is a lower bound; equality at a = b = c',
      hint: 'Write a³/(b+c) = a⁴/(a(b+c)) and apply Titu\u2019s lemma; then use a² + b² + c² ≥ ab + bc + ca.',
      solution: 'By Cauchy\u2019s Engel form (Titu\u2019s lemma), ∑ a³/(b+c) = ∑ a⁴/(a(b+c)) ≥ (a²+b²+c²)² / ∑a(b+c) = (a²+b²+c²)² / (2(ab+bc+ca)). Now (a²+b²+c²)²/(2(ab+bc+ca)) ≥ (a²+b²+c²)/2 is equivalent to a²+b²+c² ≥ ab+bc+ca, which holds since ½∑(a−b)² ≥ 0. Chaining gives ∑ a³/(b+c) ≥ (a²+b²+c²)/2. Equality in both steps requires a = b = c, which indeed gives equality: each side equals 3a²/2.'
    };
  } },

  { difficulty: 20, topic: 'algebra', gen(rng) {
    const t = rng.pick([1, 3, 5, 7, 9]);
    return {
      statement: T('Prove that there is no function f : ℕ → ℕ (ℕ = {1, 2, 3, …}) satisfying f(f(n)) = n + ' + t + ' for all n ∈ ℕ.'),
      choices: null,
      answer: 'No such function exists',
      hint: 'Show f is injective, derive f(f(f(n))) two ways to get f(n+1) = f(n) + 1, then determine the exact form of f.',
      solution: 'First, f is injective: f(a) = f(b) implies a + ' + t + ' = f(f(a)) = f(f(b)) = b + ' + t + '. Apply f to both sides of the hypothesis: f(f(f(n))) = f(n + ' + t + '). But the hypothesis at m = f(n) gives f(f(f(n))) = f(n) + ' + t + '. Hence f(n + ' + t + ') = f(n) + ' + t + ' for all n. So f descends to a well-defined injective, hence bijective, map on residues mod ' + t + ', and f(f(n)) = n + ' + t + ' makes it an involution. An involution of a ' + t + '-element set (' + t + ' odd) has a fixed point: f(r) ≡ r (mod ' + t + ') for some r. Write f(r) = r + jt with integer j (possible since ' + t + ' divides f(r) − r; j ≥ 0 as f(r) ≥ 1 > r − ' + t + '). Iterating f(n+' + t + ') = f(n)+' + t + ' j times gives f(r + jt) = f(r) + jt = r + 2jt. But f(f(r)) = r + ' + t + ' by hypothesis, while f(f(r)) = f(r + jt) = r + 2jt. Hence ' + t + ' = 2jt, i.e. 2j = 1, impossible in integers. Contradiction: no such f exists. (For even t, f(n) = n + t/2 works, so oddness is essential.)',
    };
  } },

  { difficulty: 20, topic: 'geometry', gen(rng) {
    return {
      statement: T('Let ABC be an equilateral triangle and let P be a point on the circumcircle of ABC lying on the arc BC not containing A. Prove that PA = PB + PC. (Van Schooten\u2019s theorem.)'),
      choices: null,
      answer: 'PA = PB + PC',
      hint: 'Apply Ptolemy\u2019s theorem to the cyclic quadrilateral ABPC and use AB = BC = CA.',
      solution: 'The quadrilateral ABPC is cyclic with vertices in order A, B, P, C around the circle (P on arc BC opposite A). Ptolemy\u2019s theorem gives AB·PC + BP·AC = AP·BC. Since ABC is equilateral, AB = BC = CA = s for some s > 0. Substituting: s·PC + s·PB = s·PA. Dividing by s yields PA = PB + PC, as required. (Ptolemy itself follows from constructing a point D on diagonal AC with ∠ABD = ∠PBC and using similar triangles.)'
    };
  } },

  { difficulty: 20, topic: 'geometry', gen(rng) {
    const triples = [[5, 3, 4], [13, 5, 12], [25, 7, 24], [10, 6, 8], [26, 10, 24]];
    const tr = rng.pick(triples);
    const b = tr[0], m = tr[1], ad = tr[2];
    const a = 2 * m;
    return {
      statement: T('In △ABC, AB = AC = ' + b + ' and BC = ' + a + '. Let D be the midpoint of BC. Prove Stewart\u2019s theorem in this setting and find AD.'),
      choices: null,
      answer: 'AD = ' + ad,
      hint: 'Apply the law of cosines in △ABD and △ADC with supplementary angles at D, or use coordinates; the cross terms cancel.',
      solution: 'Stewart\u2019s theorem: for D on BC with BD = m, DC = n, BC = a = m+n, man + dad² = bmb + cnc where the sides are AB = c, AC = b. Proof: by the law of cosines in △ABD and △ADC, c² = m² + d² − 2md·cos∠ADB and b² = n² + d² − 2nd·cos∠ADC with cos∠ADC = −cos∠ADB; multiply the first by n, the second by m, and add to get nc² + mb² = (m+n)d² + mn(m+n). Here m = n = ' + m + ', b = c = ' + b + ', so ' + a + '·AD² + ' + a + '·' + m + '² = ' + m + '·' + b + '² + ' + m + '·' + b + '², giving AD² = ' + b + '² − ' + m + '² = ' + (b * b) + ' − ' + (m * m) + ' = ' + (ad * ad) + '. Hence AD = ' + ad + ' (the median to the base of an isosceles triangle is also the altitude).'
    };
  } },

  { difficulty: 20, topic: 'geometry', gen(rng) {
    const alpha = rng.pick([50, 60, 70, 80]);
    return {
      statement: T('Let ABC be an acute triangle with ∠BAC = ' + alpha + '°, and let H be its orthocenter. Prove that the reflection of H across line BC lies on the circumcircle of △ABC, and find ∠BHC.'),
      choices: null,
      answer: '∠BHC = ' + (180 - alpha) + '°; the reflection H\u2032 satisfies ∠BH\u2032C = 180° − ' + alpha + '°, so ABH\u2032C is cyclic',
      hint: 'Show ∠BHC = 180° − ∠A using the two altitudes, then use that reflection preserves angles.',
      solution: 'Let the altitudes from B and C meet AC, AB at E, F. In quadrilateral AEHF, ∠AEH = ∠AFH = 90°, so ∠EHF = 180° − ' + alpha + '°. But ∠BHC = ∠EHF (vertical angles), so ∠BHC = 180° − ' + alpha + '° = ' + (180 - alpha) + '°. Let H′ be the reflection of H across BC; reflection preserves angles, so ∠BH′C = ∠BHC = 180° − ' + alpha + '°. Since ∠BH′C + ∠BAC = 180°, the quadrilateral ABH′C has supplementary opposite angles, hence is cyclic — H′ lies on the circumcircle of ABC. (Equivalently, ∠BHC = 180° − A is the familiar orthocenter angle relation.)'
    };
  } },

  { difficulty: 20, topic: 'number_theory', gen(rng) {
    const p = rng.pick([3, 5, 7]);
    return {
      statement: T('Let p = ' + p + ' (an odd prime), and let x, y be integers with p | (x − y) but p ∤ xy. Prove the LTE lemma in this case: for every n ≥ 1, v_p(xⁿ − yⁿ) = v_p(x − y) + v_p(n), where v_p is the exponent of p.'),
      choices: null,
      answer: 'v_p(xⁿ − yⁿ) = v_p(x − y) + v_p(n)',
      hint: 'Write n = pᵏ·m with p ∤ m; handle the prime-to-p exponent by factoring, and the p-power exponent by lifting one p at a time.',
      solution: 'Write n = pᵏm with p ∤ m. First, xᵐ − yᵐ = (x−y)(xᵐ⁻¹ + ⋯ + yᵐ⁻¹); modulo p, x ≡ y gives the second factor ≡ m·xᵐ⁻¹ ≢ 0 (mod p) since p ∤ m and p ∤ x. So v_p(xᵐ−yᵐ) = v_p(x−y). Now lift: for p odd and p | (u−v), v_p(uᵖ−vᵖ) = v_p(u−v)+1, because uᵖ−vᵖ = (u−v)(uᵖ⁻¹+⋯+vᵖ⁻¹) and the second factor ≡ p·uᵖ⁻¹ ≡ 0 (mod p) but ≢ 0 (mod p²) — write u = v+t with p | t; expanding (v+t)ᵖ⁻ʲvʲ = vᵖ + j·vᵖ⁻¹t (mod t²,p·t), the sum is p·vᵖ + t·vᵖ⁻¹·p(p−1)/2 + p·(terms with t² or higher), each divisible by p² except p·vᵖ which is exactly divisible by p¹. Hence each p-th powering adds exactly one factor of p. Applying this k times to u = xᵐ, v = yᵐ gives v_p(xⁿ−yⁿ) = v_p(xᵐ−yᵐ) + k = v_p(x−y) + v_p(n).'
    };
  } },

  { difficulty: 20, topic: 'number_theory', gen(rng) {
    return {
      statement: T('Prove that n⁴ + 4 is composite for every integer n > 1. (Sophie Germain\u2019s identity.)'),
      choices: null,
      answer: 'n⁴ + 4 = (n² − 2n + 2)(n² + 2n + 2), both factors exceeding 1 for n > 1',
      hint: 'Complete the square: n⁴ + 4n² + 4 − 4n² is a difference of squares.',
      solution: 'n⁴ + 4 = n⁴ + 4n² + 4 − 4n² = (n² + 2)² − (2n)² = (n² − 2n + 2)(n² + 2n + 2). For n > 1, both factors exceed 1: n² + 2n + 2 > n² − 2n + 2 = (n−1)² + 1 ≥ 2. Hence n⁴ + 4 is a product of two integers each greater than 1, so it is composite. (For n = 1 we get 5, prime; the hypothesis n > 1 is necessary.)'
    };
  } },

  { difficulty: 20, topic: 'number_theory', gen(rng) {
    const p = rng.pick([5, 7, 11, 13]);
    const half = (p - 1) / 2;
    const exp = (p + 1) / 2;
    const ans = exp % 2 === 0 ? '1' : '−1';
    return {
      statement: T('Let p = ' + p + '. Prove that ((' + half + ')!)² ≡ ' + ans + ' (mod ' + p + '), and deduce the general formula ((p−1)/2)!² ≡ (−1)^((p+1)/2) (mod p) for odd primes p.'),
      choices: null,
      answer: '≡ ' + ans + ' (mod ' + p + ')',
      hint: 'Pair each k in {(p+1)/2, …, p−1} with −(p−k) and apply Wilson\u2019s theorem (p−1)! ≡ −1 (mod p).',
      solution: 'The residues (p+1)/2, …, p−1 are congruent to −1, …, −(p−1)/2 respectively, so (p−1)! = [1·2⋯(p−1)/2]·[((p+1)/2)⋯(p−1)] ≡ ((p−1)/2)! · (−1)^((p−1)/2)·((p−1)/2)! = ((p−1)/2)!²·(−1)^((p−1)/2) (mod p). By Wilson\u2019s theorem (p−1)! ≡ −1 (mod p), hence ((p−1)/2)!² ≡ −(−1)^((p−1)/2) = (−1)^((p+1)/2) (mod p). For p = ' + p + ', (p+1)/2 = ' + exp + ' is ' + (exp % 2 === 0 ? 'even' : 'odd') + ', giving ((p−1)/2)!² ≡ ' + ans + ' (mod ' + p + '). (Wilson\u2019s theorem: pair each a ∈ {1,…,p−1} with its inverse; only 1 and p−1 are self-inverse.)'
    };
  } },

  { difficulty: 20, topic: 'combinatorics', gen(rng) {
    const n = rng.pick([4, 5, 6, 7, 8, 9]);
    return {
      statement: T('Prove the identity ∑_{k=0}^{' + n + '} C(' + n + ', k)² = C(' + (2 * n) + ', ' + n + '), where C denotes the binomial coefficient. Give a combinatorial (double-counting) proof.'),
      choices: null,
      answer: 'C(' + (2 * n) + ', ' + n + ')',
      hint: 'Count the ways to choose ' + n + ' people from a group of ' + n + ' men and ' + n + ' women, conditioning on how many men are chosen.',
      solution: 'Consider ' + n + ' men and ' + n + ' women, ' + (2 * n) + ' people total. The number of ways to choose a committee of ' + n + ' is C(' + (2 * n) + ', ' + n + '). Alternatively, condition on k = number of men chosen (0 ≤ k ≤ ' + n + '): choose k men in C(' + n + ', k) ways and ' + n + '−k women in C(' + n + ', ' + n + '−k) = C(' + n + ', k) ways, giving C(' + n + ', k)² committees for this k. Summing over k counts every ' + n + '-subset exactly once, so ∑_{k=0}^{' + n + '} C(' + n + ', k)² = C(' + (2 * n) + ', ' + n + '). This is Vandermonde\u2019s identity in the special case m = n = r.'
    };
  } },

  { difficulty: 20, topic: 'combinatorics', gen(rng) {
    const n = rng.pick([2, 3, 4, 5, 6]);
    const side = 2 * n;
    return {
      statement: T('A ' + side + ' × ' + side + ' chessboard has two opposite corner squares removed. Prove that the remaining board cannot be tiled by 2 × 1 dominoes.'),
      choices: null,
      answer: 'Tiling is impossible (color-count obstruction)',
      hint: 'Color the board in the usual chessboard pattern and count black versus white squares covered by each domino.',
      solution: 'Color the ' + side + ' × ' + side + ' board black and white as a chessboard; opposite corners have the same color, say white. Removing them leaves ' + (2 * n * n - 2) + ' white and ' + (2 * n * n) + ' black squares: two fewer white than black. Every domino covers exactly one black and one white square, so any tiled region has equally many black and white squares. Since the counts differ (' + (2 * n * n) + ' vs ' + (2 * n * n - 2) + '), no domino tiling exists. The argument works for any even-sided board with opposite corners removed.'
    };
  } }
];

// ---------------- self-test ----------------
if (require.main === module) {
  function mulberry32(seed) {
    let a = seed >>> 0;
    const f = () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return {
      f,
      int: (min, max) => min + Math.floor(f() * (max - min + 1)),
      pick: (arr) => arr[Math.floor(f() * arr.length)],
      shuffle: (arr) => {
        const a2 = arr.slice();
        for (let i = a2.length - 1; i > 0; i--) {
          const j = Math.floor(f() * (i + 1));
          [a2[i], a2[j]] = [a2[j], a2[i]];
        }
        return a2;
      }
    };
  }

  const templates = module.exports;
  const topics = new Set(['algebra', 'geometry', 'number_theory', 'combinatorics']);
  let fail = 0;
  const check = (cond, msg) => { if (!cond) { fail++; console.error('FAIL: ' + msg); } };

  check(Array.isArray(templates) && templates.length === 20, 'must export array of exactly 20 (got ' + templates.length + ')');
  const counts19 = templates.filter(t => t.difficulty === 19).length;
  const counts20 = templates.filter(t => t.difficulty === 20).length;
  check(counts19 === 10 && counts20 === 10, 'need 10 at 19 and 10 at 20 (got ' + counts19 + '/' + counts20 + ')');
  let lastD = -Infinity;
  const topicCount = {};
  for (const t of templates) {
    check(Number.isInteger(t.difficulty) && t.difficulty >= 19 && t.difficulty <= 20, 'difficulty 19-20 (got ' + t.difficulty + ')');
    check(topics.has(t.topic), 'valid topic (got ' + t.topic + ')');
    topicCount[t.topic] = (topicCount[t.topic] || 0) + 1;
    check(t.difficulty >= lastD, 'difficulty ascending order violated');
    lastD = t.difficulty;
    check(typeof t.gen === 'function', 'gen is function');
  }
  for (const tp of topics) check(topicCount[tp] === 5, 'topic ' + tp + ' appears 5 times (got ' + (topicCount[tp] || 0) + ')');

  for (let i = 0; i < templates.length; i++) {
    for (const seed of [1, 7, 42]) {
      const rng = mulberry32(seed * 1000 + i);
      let r;
      try { r = templates[i].gen(rng); }
      catch (e) { check(false, 'template ' + i + ' seed ' + seed + ' threw: ' + e.message); continue; }
      const tag = 'template ' + i + ' (d' + templates[i].difficulty + '/' + templates[i].topic + ') seed ' + seed;
      check(r && typeof r.statement === 'string' && r.statement.length > 0, tag + ': non-empty statement');
      check(r.statement.length <= 700, tag + ': statement ≤ 700 chars (got ' + r.statement.length + ')');
      check(!/<[a-zA-Z/!][^>]*>/.test(r.statement), tag + ': statement has no HTML tags');
      check(r.choices === null, tag + ': choices === null');
      check(typeof r.answer === 'string' && r.answer.length > 0, tag + ': non-empty answer');
      check(typeof r.hint === 'string' && r.hint.length > 0, tag + ': non-empty hint');
      check(typeof r.solution === 'string' && r.solution.length >= 150, tag + ': solution ≥ 150 chars (got ' + (r.solution || '').length + ')');
    }
  }

  if (fail === 0) { console.log('PASS: all 20 templates × 3 seeds'); }
  else { console.log('FAILURES: ' + fail); process.exit(1); }
}
