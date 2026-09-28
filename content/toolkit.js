'use strict';

// ============================================================
// Olympiad Math Trainer — Strategy Toolkit
// 50 contest strategy methods. ids 0-9 are the FREE tier (two
// per category in category order); ids 10-49 are Pro.
// ============================================================

const METHODS = [
  // ---------- FREE TIER (ids 0-9): two per category ----------
  {
    id: 0,
    title: 'Substitution and Change of Variables',
    category: 'Algebra',
    body: `Substitution replaces a messy or repeated expression with a single new variable, turning an intimidating equation into one you already know how to solve. Use it whenever the same complicated chunk appears more than once, whenever exponents or radicals obscure a familiar pattern (quadratic in disguise, for example), or when a system of equations has symmetric structure.

Steps: (1) Identify the repeated or awkward expression and give it a name, e.g. let u = x² + 3x or u = √(x + 1). (2) Rewrite the entire equation in terms of u, simplifying as far as possible. (3) Solve the simpler equation for u. (4) Back-substitute: replace u with the original expression and solve for the original variable. (5) Check every candidate in the original equation, since squaring or other non-reversible steps can create impostors.

Mini-example: Solve x⁴ − 5x² + 4 = 0. Let u = x². Then u² − 5u + 4 = 0, which factors as (u − 1)(u − 4) = 0, so u = 1 or u = 4. Back-substituting: x² = 1 gives x = ±1, and x² = 4 gives x = ±2. Check: 1 − 5 + 4 = 0 and 16 − 80 + 4 = 0. All four check out, so the solution set is {−2, −1, 1, 2}.

Pitfalls: Forgetting to back-substitute is the classic error — u is not the answer. Also, when you square both sides to isolate a radical, always verify in the original: squaring  √(x) = −2 gives x = 4, which is false. Finally, declare any domain restrictions up front (denominators, radicands), because a u-value that looks valid may force an impossible original expression.`,
  },
  {
    id: 1,
    title: "Vieta's Formulas",
    category: 'Algebra',
    body: `Vieta's formulas connect the coefficients of a polynomial to sums and products of its roots, letting you answer questions about roots without ever finding the roots themselves. For ax² + bx + c = 0 with roots r₁ and r₂: r₁ + r₂ = −b/a and r₁r₂ = c/a. For a cubic ax³ + bx² + cx + d = 0: the sum of the roots is −b/a, the sum of pairwise products is c/a, and the product of all three is −d/a. Use these whenever a problem asks about symmetric expressions in the roots, like r₁² + r₂² or 1/r₁ + 1/r₂.

Steps: (1) Write the equation in standard form so a, b, c (and d) are clear. (2) Write down the sum and product of the roots from Vieta. (3) Rewrite the target symmetric expression in terms of those two building blocks — for instance r₁² + r₂² = (r₁ + r₂)² − 2r₁r₂. (4) Substitute the numbers and compute. The method extends to higher degrees by the same sign-alternating pattern.

Mini-example: Let r₁ and r₂ be the roots of x² − 7x + 10 = 0. Find r₁² + r₂². By Vieta, r₁ + r₂ = 7 and r₁r₂ = 10. Then r₁² + r₂² = (r₁ + r₂)² − 2r₁r₂ = 49 − 20 = 29. No factoring needed, and it works even when the roots are irrational or complex.

Pitfalls: Watch the signs — the sum carries a minus sign (−b/a), and the product's sign alternates with degree. Don't apply Vieta to an equation that isn't polynomial, or to one where you haven't divided through so the leading coefficient is identified correctly. Remember that Vieta gives symmetric combinations only; a non-symmetric expression like r₁² + r₂ (with different powers) generally cannot be found this way. In integer-root problems, combine Vieta with the fact that integer roots must divide the constant term.`,
  },
  {
    id: 2,
    title: 'Angle Chasing',
    category: 'Geometry',
    body: `Angle chasing is the art of computing unknown angles by propagating known ones through a diagram, using the triangle angle sum (180°), straight lines (180°), vertical angles, parallel-line angle relations, and the exterior-angle theorem. Reach for it the moment a problem gives scattered angle measures and asks for one more — especially in AMC/AIME geometry where no coordinates or trig are required.

Steps: (1) Draw a large, careful diagram and label every given angle. (2) Mark every angle you can deduce for free: vertical angles, angles on a straight line, triangle third angles. (3) Look for isosceles triangles (equal sides give equal base angles), parallel lines (alternate interior angles), and exterior angles equal to the sum of the two remote interior angles. (4) Work inward toward the target angle, introducing a single variable like x for an unknown angle if needed and solving. (5) Verify by summing the angles of every triangle in your final diagram — each must total 180°.

Mini-example: In triangle ABC, ∠A = 50°, and point D lies on BC with AD = BD. If ∠DAC = 20°, find ∠ADC. First, ∠BAC = 50° so ∠BAD = 50° − 20° = 30°. In triangle ABD, AD = BD makes it isosceles with base AB, so ∠ABD = ∠BAD = 30°. Then ∠ADB = 180° − 30° − 30° = 120°, and on the straight line BC, ∠ADC = 180° − 120° = 60°.

Pitfalls: The most dangerous mistake is chasing angles in a diagram drawn inaccurately — if your sketch makes an acute angle look obtuse, you will "prove" contradictions. Redraw if things look off. Don't assume points are collinear or that lines are parallel unless stated or proved. Keep track of which angle is which; in a crowded diagram, label arcs with colors or double arcs to avoid mixing up ∠ABD with ∠DBC.`,
  },
  {
    id: 3,
    title: 'Similar Triangles',
    category: 'Geometry',
    body: `Two triangles are similar when their angles match (AA criterion), and then their corresponding sides are in a single fixed ratio. This converts angle information into length information and back, which makes similarity one of the highest-leverage tools in contest geometry. Use it whenever a problem mixes angles and side lengths, involves parallel lines cutting a triangle, or features nested triangles sharing an angle.

Steps: (1) Hunt for pairs of triangles with two known equal angles — AA is usually enough; SAS and SSS similarity are rarer in contests. Common sources: a line parallel to one side of a triangle, an altitude dropped to the hypotenuse (creating three similar right triangles), or vertical angles at intersecting lines. (2) Write the correspondence carefully: which vertex matches which, in order. (3) Set up the proportion of corresponding sides and solve for the unknown. (4) If the problem asks for an area ratio, remember it is the square of the side ratio.

Mini-example: In triangle ABC, points D and E lie on AB and AC respectively, with DE parallel to BC. If AD = 4, DB = 6, and DE = 6, find BC. Because DE ∥ BC, ∠ADE = ∠ABC and ∠AED = ∠ACB, so △ADE ∼ △ABC by AA. The similarity ratio is AD/AB = 4/(4 + 6) = 2/5. Hence DE/BC = 2/5, so BC = 6 · (5/2) = 15.

Pitfalls: The correspondence order is everything — matching the wrong vertices gives a wrong proportion. Always write △ADE ∼ △ABC, never just "the triangles are similar," and double-check that side DE corresponds to side BC, not to some other side. Also, similarity needs two angle pairs (or the SAS/SSS condition); a single shared angle is not enough. When parallel lines are involved, confirm parallelism is given or proved, not merely drawn that way.`,
  },
  {
    id: 4,
    title: 'Modular Arithmetic Basics',
    category: 'Number Theory',
    body: `Modular arithmetic studies remainders: we write a ≡ b (mod m) when a and b leave the same remainder upon division by m, equivalently when m divides a − b. Congruences add, subtract, and multiply cleanly, so you can replace huge numbers by small remainders before computing. Use mod whenever a problem asks about divisibility, remainders, last digits, or parity (which is just mod 2).

Steps: (1) Identify the modulus — the divisor in question, or choose a clever one yourself (mod 3, 4, 9, 10, 11 are frequent). (2) Reduce every number to its remainder; work only with small numbers from 0 to m − 1. (3) Apply the rules: (a + b) mod m and (a · b) mod m can be computed after reducing a and b. (4) For powers, reduce the base first, then multiply repeatedly — patterns in powers always cycle. (5) Translate the final remainder back into the answer.

Mini-example: Find the remainder when 7¹⁰⁰ is divided by 6. Reduce the base: 7 ≡ 1 (mod 6). Then 7¹⁰⁰ ≡ 1¹⁰⁰ = 1 (mod 6). The remainder is 1. Contrast with computing 7¹⁰⁰ directly, which has 85 digits — modular arithmetic did it in one line.

Pitfalls: Division does not work like multiplication in modular arithmetic — you cannot cancel a factor unless it is coprime to the modulus. The congruence a ≡ b (mod m) is not an equation over the integers; statements like "x ≡ 2 (mod 6) means x = 2" are false (x could be 8, 14, −4, ...). Also, exponent rules need care: reducing the exponent mod m is generally wrong — Fermat's little theorem handles that in special cases only. Always sanity-check small cases by hand when you're unsure.`,
  },
  {
    id: 5,
    title: 'Divisibility Rules',
    category: 'Number Theory',
    body: `Divisibility rules are quick tests that decide whether a number is divisible by a small integer without performing the division. They turn long-division chores into digit arithmetic, which matters on timed contests. The core rules: a number is divisible by 2 iff its last digit is even; by 3 iff the sum of its digits is divisible by 3; by 4 iff its last two digits form a multiple of 4; by 5 iff it ends in 0 or 5; by 9 iff the sum of its digits is divisible by 9; by 10 iff it ends in 0; by 11 iff the alternating sum of its digits is divisible by 11.

Steps: (1) Decide which divisor you need to test. (2) Apply the matching digit rule — add or alternate digits as required. (3) If the rule still leaves a large number (e.g. digit sum of a huge number), apply it again recursively. (4) For composite divisors like 6 or 12, split into coprime factors and test each: divisible by 6 means divisible by both 2 and 3; divisible by 12 means divisible by both 3 and 4.

Mini-example: Is 4,582,176 divisible by 9? Add the digits: 4 + 5 + 8 + 2 + 1 + 7 + 6 = 33, and 3 + 3 = 6, which is not divisible by 9. So 4,582,176 is not divisible by 9. For 11: test 918,082. Alternating sum: (2 − 8 + 0 − 8 + 1 − 9) = −22, divisible by 11, so 918,082 is divisible by 11. Indeed 918,082 ÷ 11 = 83,462.

Pitfalls: The digit-sum rules work only for 3 and 9 (and their relatives); there is no digit-sum rule for 7 or 13, so don't improvise one. For composite divisors the split must be into coprime parts — testing divisibility by 2 and 4 does not prove divisibility by 8 (use the last-three-digits rule instead). The 11-test's alternating sum must start from the rightmost digit; starting from the left flips the sign convention but keeps divisibility, so either end works as long as you're consistent — the key trap is miscounting digits.`,
  },
  {
    id: 6,
    title: 'Pigeonhole Principle',
    category: 'Combinatorics',
    body: `The pigeonhole principle says that if n + 1 objects are placed into n boxes, some box holds at least two objects. Its power lies in guaranteeing a collision without constructing one. The generalized form: distributing N objects into k boxes forces some box to hold at least ⌈N/k⌉ objects. Use it whenever a problem asks you to prove that two of something must share a property — birthdays, remainders, distances, colors.

Steps: (1) Identify the "pigeons" (the objects, usually the things you have many of) and the "holes" (the categories or outcomes, usually fewer). (2) Define the mapping: which hole does each pigeon go in? (3) Count: if pigeons outnumber holes, conclude some hole has at least two pigeons; for the generalized version compute ⌈N/k⌉. (4) Translate the collision back into the problem's language — two numbers with the same remainder, two people sharing a birthday month, etc.

Mini-example: Prove that among any 13 people, at least two were born in the same month. The 13 people are pigeons, the 12 months are holes. Since 13 > 12, two people land in the same month-hole. Generalized example: among 25 students, some month contains at least ⌈25/12⌉ = 3 birthdays.

Pitfalls: The principle guarantees existence, never which box or which objects — don't overclaim. Make sure your holes genuinely partition the possibilities with no overlap; if an object could sit in two holes, the argument breaks. The most common failure is miscounting holes, especially with remainders: modulo n there are n possible remainders (0 through n − 1), not n − 1. Also check the strictness: n objects into n boxes guarantees nothing — you need n + 1 objects for the basic version.`,
  },
  {
    id: 7,
    title: 'Complementary Counting',
    category: 'Combinatorics',
    body: `Complementary counting computes what you want by subtracting what you don't want from the total: desired = total − undesired. It shines when the desired event is messy ("at least one," "not all the same," "no two adjacent") but the complement is clean ("none," "all the same"). Any problem phrased with "at least" or "not" deserves a serious look at the complement before you start direct counting.

Steps: (1) Count the total number of outcomes with no restrictions — this is usually the easy part. (2) Precisely describe the complement of the desired event; be careful that "complement" means everything else, with no gaps and no overlap. (3) Count the complement, which should be simpler than the original. (4) Subtract: answer = total − complement. (5) Sanity-check: the answer must be non-negative and no larger than the total.

Mini-example: How many 3-digit numbers have at least one digit equal to 7? Total 3-digit numbers: 900. Complement: numbers with no digit 7. Hundreds digit: 8 choices (1–9 except 7); tens and ones: 9 choices each (0–9 except 7). Complement count = 8 · 9 · 9 = 648. Answer = 900 − 648 = 252.

Pitfalls: The complement must be exactly the negation — for "at least one 7," the complement is "zero 7s," not "exactly one 7." Also, make sure the total is genuinely unrestricted: in the example, the hundreds digit can't be zero in either count, and forgetting that restriction in the total (or the complement) breaks the subtraction. Complementary counting also fails when the "complement" is actually harder to count — then switch to casework or inclusion-exclusion. Finally, for probability questions, the same idea works: P(at least one) = 1 − P(none).`,
  },
  {
    id: 8,
    title: 'Working Backwards',
    category: 'General',
    body: `Working backwards starts from the goal and asks what could have produced it, instead of pushing forward from the givens. It is the method of choice when the forward path branches explosively but the reverse path is narrow — undoing operations, reconstructing sequences, and "find the original number" puzzles are classic territory. Polya listed it among his core heuristics for a reason.

Steps: (1) State the final condition precisely. (2) List the operations that could lead into that state and invert each one (the inverse of "add 5" is "subtract 5," the inverse of "multiply by 2" is "divide by 2"). (3) Step backward one operation at a time, keeping every branch that stays legal — some inverses create multiple predecessors, and you must track them all. (4) Stop when you reach a valid starting configuration; verify it by running forward. (5) If a backward step is impossible (e.g. dividing produces a non-integer where integers are required), prune that branch.

Mini-example: A number is multiplied by 3, then 7 is added, then the result is divided by 5, giving 10. Find the original number. Undo in reverse order: before the division by 5 the value was 10 · 5 = 50; before adding 7 it was 50 − 7 = 43; before multiplying by 3 it was 43/3... wait — 43 is not divisible by 3, so no integer solution? Recompute: undoing "divide by 5" on the final answer 10 gives 50, undoing "add 7" gives 43, undoing "multiply by 3" gives 43/3. Since 43/3 is not an integer, no whole-number original exists — but as a real number the answer is 43/3. Check: (43/3)·3 = 43, + 7 = 50, ÷ 5 = 10. ✓

Pitfalls: Inverses aren't always unique — the inverse of "square it" is "take ± the square root," and dropping the negative branch loses solutions. Some operations have no inverse on the allowed domain (you can't undo "take the remainder" to recover the original dividend). Always run your answer forward through the original process; backward reasoning is where sign and arithmetic errors love to hide.`,
  },
  {
    id: 9,
    title: 'Estimation and Sanity Checks',
    category: 'General',
    body: `Estimation and sanity checks are your last line of defense against absurd answers: before committing to a result, ask whether its size, sign, parity, and units make sense. On multiple-choice contests this alone can eliminate three wrong answers; on free-response contests it catches the dropped zero or flipped sign before you submit. Build the habit of spending the final 30 seconds on verification rather than rushing onward.

Steps: (1) Estimate the answer's magnitude before or after computing: round aggressively and get a rough bound. (2) Check the sign — should the answer be positive? (3) Check parity and divisibility where relevant: a count of objects must be a whole number, a probability must lie between 0 and 1. (4) Test an extreme or special case: does your formula survive n = 1, or the case where a variable equals 0? (5) If the problem gives multiple choice, eliminate options that fail any check, then compute only among survivors.

Mini-example: A problem asks for the area of a triangle with sides 5, 5, 6, and your formula work gives 48. Sanity check: the triangle fits inside a 6 × 5 rectangle of area 30, so 48 is impossible — you must have erred. Recomputing: height to the base of 6 is √(25 − 9) = 4, so area = ½ · 6 · 4 = 12, which is comfortably under 30. The estimate caught a 4× error.

Pitfalls: Estimation guards against blunders, not against subtly wrong reasoning — a plausible-looking wrong answer can pass every check. Don't let a sanity check override a careful derivation without investigation; if they disagree, recompute rather than fudging the derivation to match the estimate. Keep checks fast and rough — the point is to catch order-of-magnitude errors, and a check that takes as long as the problem defeats its purpose.`,
  },
];

// ---------- PRO TIER: Algebra (ids 10-17) ----------
METHODS.push(
  {
    id: 10,
    title: 'Completing the Square',
    category: 'Algebra',
    body: `Completing the square rewrites a quadratic ax² + bx + c as a(x − h)² + k, exposing its vertex, its maximum or minimum value, and whether it factors. It is the engine behind the quadratic formula and the go-to move whenever a problem asks for the smallest or largest value of a quadratic, or when an equation needs to reveal a sum of squares.

Steps: (1) Factor out the leading coefficient from the x-terms if a ≠ 1: a(x² + (b/a)x) + c. (2) Take half of the x-coefficient, square it, and add and subtract it inside: x² + px becomes (x + p/2)² − (p/2)². (3) Collapse the perfect square and combine the constants. (4) Read off the vertex (h, k): the extreme value is k, achieved at x = h. (5) For equations, isolate the square and take ± square roots.

Mini-example: Find the minimum value of x² − 6x + 11. Half of −6 is −3; squaring gives 9. So x² − 6x + 11 = (x² − 6x + 9) + 2 = (x − 3)² + 2. Since (x − 3)² ≥ 0, the minimum is 2, attained at x = 3.

Pitfalls: Forgetting to multiply the added constant by the factored-out a is the most common error: 2x² + 8x + 3 = 2(x² + 4x) + 3 = 2(x + 2)² − 8 + 3 = 2(x + 2)² − 5, not −1. When solving, remember the ±: (x − 3)² = 4 gives x = 5 or x = 1. Completing the square also proves a quadratic has no real roots when the constant term after completing is positive with a > 0 — don't force a factorization that doesn't exist over the reals.`,
  },
  {
    id: 11,
    title: "Simon's Favorite Factoring Trick",
    category: 'Algebra',
    body: `Simon's Favorite Factoring Trick (SFFT) handles equations of the form xy + ax + by = c by adding a constant to both sides so the left factors as (x + b)(y + a). It converts a two-variable Diophantine-looking mess into a clean divisor problem. Whenever you see an xy term mixed with x and y terms, SFFT should be your first instinct.

Steps: (1) Move all terms to one side so the equation reads xy + ax + by = c (constants on the right). (2) Add ab to both sides, where a is the coefficient of y... more precisely: to factor (x + b)(y + a) = xy + ax + by + ab, you need to add ab to both sides, where the x-coefficient inside the first factor is the coefficient of y in the equation and vice versa. (3) Factor the left as (x + b)(y + a) = c + ab. (4) List the factor pairs of c + ab (including negatives) and solve each resulting tiny system. (5) Verify each pair in the original equation.

Mini-example: Find all positive integer pairs (x, y) with xy + 3x + 2y = 36. Add 3·2 = 6 to both sides: xy + 3x + 2y + 6 = 42, which factors as (x + 2)(y + 3) = 42. Factor pairs of 42: 1·42, 2·21, 3·14, 6·7 (and reverses). So (x, y) = (1−2, 42−3), ... keeping x, y positive: x + 2 ∈ {3, 6, 7, 14, 21, 42} gives (x, y) ∈ {(1, 11), (4, 4), (5, 3), (12, 1), (19, 0)...} — filtering to positive: (1, 11), (4, 4), (5, 3), (12, 1). Check (4, 4): 16 + 12 + 8 = 36. ✓

Pitfalls: Add ab to both sides — adding it only to the left breaks the equation. Get the cross-matching right: for xy + 3x + 2y, the factors are (x + 2)(y + 3), matching 3 with the y-factor and 2 with the x-factor. Don't forget negative factor pairs when the problem allows non-positive integers — they produce extra valid solutions. And always verify, since it's easy to mis-add the constant.`,
  },
  {
    id: 12,
    title: 'Difference of Squares and Sum/Difference Patterns',
    category: 'Algebra',
    body: `The identities a² − b² = (a − b)(a + b), a³ − b³ = (a − b)(a² + ab + b²), and a³ + b³ = (a + b)(a² − ab + b²) are the most-used factorizations in contest algebra. Recognizing them — including in disguise, like 4x² − 9 = (2x)² − 3² — turns simplification, cancellation, and integer-root problems from grinds into one-liners. Use them to factor, to rationalize, and to prove divisibility.

Steps: (1) Scan for perfect squares, cubes, or expressions that become them after factoring out a common term. (2) Identify a and b precisely — for 16x⁴ − 81, a = 2x² and b = 9. (3) Apply the correct pattern, minding the signs in the cubic identities. (4) Check whether the result factors further: a² − b² applied twice, or a sum of squares that isn't factorable over the reals. (5) When simplifying fractions, cancel only factors common to the entire numerator and denominator.

Mini-example: Simplify (x⁴ − 16)/(x² + 4). The numerator is (x²)² − 4² = (x² − 4)(x² + 4) = (x − 2)(x + 2)(x² + 4). Cancel (x² + 4) (nonzero for real x... actually x² + 4 is never zero for real x, so it's safe) to get (x − 2)(x + 2) = x² − 4.

Pitfalls: a² + b² does not factor over the reals — don't invent (a + b)(a − b) for a sum. The cubic patterns have a notorious sign trap: a³ + b³ uses (a + b)(a² − ab + b²) with a minus in the middle of the trinomial. Never cancel terms that aren't factors: (x² + 4x)/(x) = x + 4 is fine, but (x² + 4)/(x) ≠ x + 4. And watch for disguised forms like x⁴ + 4, which factors over integers as (x² + 2x + 2)(x² − 2x + 2) via Sophie Germain — difference of squares alone won't find it.`,
  },
  {
    id: 13,
    title: 'Factor Theorem and Polynomial Remainder',
    category: 'Algebra',
    body: `The remainder theorem says that dividing a polynomial P(x) by (x − r) leaves remainder P(r). The factor theorem is its sharper sibling: (x − r) is a factor of P(x) if and only if P(r) = 0. Together they let you test roots by evaluation instead of division, factor higher-degree polynomials, and build polynomials from their roots. Reach for them whenever a problem mentions roots, factors, or divisibility of polynomials.

Steps: (1) To test whether r is a root, evaluate P(r) — no long division needed. (2) If P(r) = 0, factor out (x − r) using synthetic division to reduce the degree. (3) Repeat on the quotient until you reach a quadratic, then use the quadratic formula or factoring. (4) For "find the remainder" problems, evaluate directly: the remainder of P(x) ÷ (x − 3) is just P(3). (5) When constructing polynomials from given roots r₁, r₂, r₃, write a(x − r₁)(x − r₂)(x − r₃) and determine a from an extra condition.

Mini-example: Factor P(x) = x³ − 2x² − 5x + 6. Test integer candidates dividing 6: P(1) = 1 − 2 − 5 + 6 = 0, so (x − 1) is a factor. Synthetic division gives quotient x² − x − 6 = (x − 3)(x + 2). So P(x) = (x − 1)(x − 3)(x + 2), with roots 1, 3, −2.

Pitfalls: The factor theorem tests (x − r), so P(2) = 0 means the factor is (x − 2), not (x + 2) — the sign flip is a perennial error. Synthetic division must include zero coefficients for missing powers (x³ + 2x − 1 needs a 0x² column). Integer roots of a monic polynomial must divide the constant term, but non-monic polynomials can have rational roots p/q where p divides the constant term and q divides the leading coefficient — don't restrict yourself to divisors of the constant term alone.`,
  },
  {
    id: 14,
    title: 'Systems of Equations: Elimination',
    category: 'Algebra',
    body: `Elimination solves systems by adding or subtracting multiples of equations to kill off variables one at a time, reducing a tangled system to a single-variable equation. It beats substitution when coefficients are set up for clean cancellation, and it generalizes to any number of variables. Use it whenever the same variable appears in multiple equations with coefficients that are multiples of each other.

Steps: (1) Line the equations up with like variables in columns. (2) Pick a variable to eliminate and multiply equations so its coefficients become opposites (or equal). (3) Add (or subtract) the equations to eliminate that variable. (4) Repeat with the smaller system until one variable remains; solve it. (5) Back-substitute up the chain, then check the full solution in every original equation.

Mini-example: Solve 2x + 3y = 12 and 4x − 3y = 6. The y-coefficients are already opposites, so add: 6x = 18, giving x = 3. Substitute into the first: 2(3) + 3y = 12, so 3y = 6 and y = 2. Check in the second: 4(3) − 3(2) = 12 − 6 = 6. ✓ Solution: (3, 2).

Pitfalls: Multiply the entire equation — every term — when scaling; scaling only one side or one term is the classic blunder. Elimination can also mask special cases: if you end with 0 = 0, the system has infinitely many solutions (the equations were dependent), and if you get 0 = 5, there is no solution (the lines are parallel). For nonlinear systems (e.g. one equation quadratic), elimination still helps reduce to one variable but the final equation may be quadratic with two solution pairs — find all of them.`,
  },
  {
    id: 15,
    title: 'AM-GM Inequality',
    category: 'Algebra',
    body: `The AM-GM inequality states that for nonnegative numbers, the arithmetic mean is at least the geometric mean: (a + b)/2 ≥ √(ab), with equality exactly when a = b. For n numbers: (a₁ + ⋯ + aₙ)/n ≥ (a₁⋯aₙ)^(1/n). It is the contest workhorse for proving inequalities and finding minima and maxima without calculus — whenever you see a sum and a product in the same problem, AM-GM is probably invited.

Steps: (1) Identify a sum you want to bound below, or a product you want to bound above. (2) Apply AM-GM to the relevant terms — you may need to split terms cleverly, e.g. write 2x as x + x to get three terms. (3) Simplify the resulting bound into a constant. (4) Check the equality condition (all terms equal) to find where the bound is attained and confirm it's achievable within the problem's constraints. (5) For strict inequalities, verify equality can't actually occur.

Mini-example: For x > 0, find the minimum of x + 4/x. By AM-GM, (x + 4/x)/2 ≥ √(x · 4/x) = √4 = 2, so x + 4/x ≥ 4. Equality when x = 4/x, i.e. x = 2 (positive), which is allowed. Minimum is 4 at x = 2.

Pitfalls: AM-GM requires nonnegative numbers — applying it to terms that can be negative gives nonsense. The equality condition is part of the solution: a "minimum" at a point outside the domain (like x = 2 when the problem says x > 5) isn't the actual minimum. Direction matters: AM ≥ GM bounds sums below and products above, never the reverse. For fancier bounds, weighted AM-GM or AM-GM combined with Cauchy may be needed, but master the two-variable form cold first — most contest applications use it.`,
  },
  {
    id: 16,
    title: 'Telescoping Sums',
    category: 'Algebra',
    body: `A telescoping sum is one whose terms cancel in pairs, like a collapsing telescope: most interior terms vanish, leaving only the first and last. The telltale sign is a term that splits into a difference, aₖ = bₖ − bₖ₊₁, via partial fractions or a clever rewrite. Use it for series, products that telescope similarly, and any summation that resists direct formulas.

Steps: (1) Examine the general term and try to write it as a difference: for 1/(k(k+1)), use partial fractions to get 1/k − 1/(k+1). (2) Write out the first few and last few terms explicitly to see the cancellation pattern. (3) Cancel everything that appears with both signs. (4) Evaluate the surviving boundary terms. (5) Double-check the indices at the boundaries — off-by-one errors in the first or last term are the main hazard.

Mini-example: Compute S = Σ_{k=1}^{99} 1/(k(k+1)). Each term equals 1/k − 1/(k+1). So S = (1/1 − 1/2) + (1/2 − 1/3) + ⋯ + (1/99 − 1/100). Everything cancels except 1 − 1/100 = 99/100.

Pitfalls: Partial fractions must be exact — verify that 1/k − 1/(k+1) really equals 1/(k(k+1)) by recombining. Some sums telescope only after shifting the index or splitting into even and odd parts; if cancellation doesn't appear immediately, write out more terms before giving up. Products telescope too (terms cancel multiplicatively), e.g. Π (k+1)/k = n+1... wait, that telescopes to (n+1)/1 = n + 1 — the same idea with division instead of subtraction. Finally, telescoping needs a finite sum or a convergent limit argument; don't apply it blindly to divergent series.`,
  },
  {
    id: 17,
    title: 'Quadratic Discriminant Analysis',
    category: 'Algebra',
    body: `The discriminant D = b² − 4ac of ax² + bx + c = 0 reveals the nature of the roots without solving: D > 0 means two distinct real roots, D = 0 means one repeated real root, D < 0 means no real roots (a complex pair). Beyond root-counting, setting D ≥ 0 or D = 0 is a powerful constraint in parameter problems, tangency problems, and inequalities.

Steps: (1) Ensure the equation is quadratic (a ≠ 0) and in standard form. (2) Compute D = b² − 4ac carefully. (3) Translate the problem's condition: "two distinct real solutions" → D > 0; "exactly one solution" → D = 0 (or the degenerate linear case — check a = 0 separately); "no real solutions" → D < 0. (4) Solve the resulting inequality or equation in the parameter. (5) Verify edge cases, especially whether the leading coefficient can vanish and turn the problem linear.

Mini-example: For which values of k does x² + kx + 9 = 0 have exactly one real solution? D = k² − 36 = 0 gives k = ±6. Check: k = 6 gives (x + 3)² = 0 (root x = −3 twice); k = −6 gives (x − 3)² = 0. Both work, so k = 6 or k = −6. If the problem had asked for two distinct real roots, we'd need k² − 36 > 0, i.e. k > 6 or k < −6.

Pitfalls: "Exactly one solution" does not always mean D = 0 — if a parameter makes a = 0, the equation becomes linear with one solution and the discriminant analysis doesn't apply. When D must be a perfect square for rational roots, don't forget that irrational roots still count as real. Sign errors in −4ac are rampant; write it as b² − 4·a·c with parentheses. For inequalities in a parameter, test values on each side of the boundary to confirm the inequality direction.`,
  },
);

// ---------- PRO TIER: Geometry (ids 18-25) ----------
METHODS.push(
  {
    id: 18,
    title: 'Power of a Point',
    category: 'Geometry',
    body: `The power of a point P relative to a circle is the constant value PA · PB where line through P meets the circle at A and B — the same no matter which secant you draw. If P is outside, power also equals (tangent length)². If P is inside, the power is negative (by signed convention) with |power| = PA · PB for any chord through P. Use it when two lines cross (inside or outside a circle) and you know three of four segment lengths, or to prove concyclicity.

Steps: (1) Identify the circle and the point P. (2) Write the power equation: for secants PAB and PCD, PA · PB = PC · PD (with A nearer P than B). (3) If a tangent PT exists, use PT² = PA · PB. (4) Solve for the unknown segment. (5) For concyclicity proofs, show two points have equal power relationships implying the four endpoints lie on one circle.

Mini-example: Two chords intersect inside a circle at X: AX = 4, BX = 6, CX = 3. Find DX. By power of a point, AX · BX = CX · DX, so 4 · 6 = 3 · DX, giving DX = 8. Outside version: from external point P, tangent PT = 6 and secant PAB with PA = 4. Then 6² = 4 · PB, so PB = 9 and AB = 5.

Pitfalls: Segment order matters: PA · PB uses the whole secant (external part times entire secant), not just the external piece times the internal piece. For inside intersections, all four segments are the pieces from X to the circle — don't mix up which segments pair together; the pairs are the two pieces of the same line. Power of a point is about one circle at a time; if two circles are involved, their radical axis (points of equal power) is the line through intersection points — a frequent follow-up configuration.`,
  },
  {
    id: 19,
    title: 'Mass Points',
    category: 'Geometry',
    body: `Mass points assign "weights" to triangle vertices so that cevians balance like a seesaw: if a point D on BC balances B and C, then mass(B) · BD = mass(C) · DC. This turns ratio problems on concurrent cevians into arithmetic. Use it when cevians intersect inside a triangle and the problem gives (or asks for) segment ratios — it replaces Menelaus/Ceva computations with a quick balancing act.

Steps: (1) Assign masses to two vertices so their connecting cevian point balances: masses are inversely proportional to the adjacent segments. (2) Propagate: the mass at a cevian foot equals the sum of the masses at the endpoints it balances. (3) At each interior intersection, balance again using the masses arriving along each cevian. (4) Read off the desired ratio as the inverse mass ratio. (5) Verify consistency — every vertex should end up with a single well-defined mass.

Mini-example: In △ABC, D is on BC with BD:DC = 2:1, and E is on AC with AE:EC = 1:2. Segments AD and BE meet at P. Find AP:PD. Assign mass(B) = 1, mass(C) = 2 (inverse of 2:1), so mass(D) = 3. Assign mass(A) = 2, mass(C) = 1 for the 1:2 split... but C already has mass 2 — scale the second assignment by 2: mass(A) = 4, mass(C) = 2, so mass(E) = 6. Now on cevian AD: mass(A) = 4 balances mass(D) = 3, so AP:PD = mass(D):mass(A) = 3:4.

Pitfalls: Mass points work only for cevians of a triangle meeting at interior points — transversals that aren't cevians (not through a vertex) break the method. When a vertex gets masses from two different cevians, you must scale one assignment so the shared vertex's mass agrees; forgetting to rescale is the top error. The method gives ratios, not lengths. For problems with cevians meeting outside the triangle or with quadrilaterals, switch to coordinates or Menelaus instead.`,
  },
  {
    id: 20,
    title: "Pick's Theorem",
    category: 'Geometry',
    body: `Pick's theorem gives the area of a lattice polygon — one whose vertices sit on integer grid points — from counting boundary and interior lattice points: A = I + B/2 − 1, where I is the number of interior lattice points and B the number on the boundary. It converts an area computation into careful counting, which is ideal for grid-based contest problems where coordinates are integers but the shape is awkward.

Steps: (1) Confirm every vertex has integer coordinates. (2) Count B: lattice points on the boundary, including vertices — for a segment between lattice points, it contains gcd(|Δx|, |Δy|) + 1 lattice points, so add gcd(|Δx|,|Δy|) per edge. (3) Count I: interior lattice points (systematic row-by-row counting beats guessing). (4) Apply A = I + B/2 − 1. (5) Sanity-check with a bounding box or decomposition when possible.

Mini-example: Triangle with vertices (0,0), (4,0), (0,3). Edge gcds: gcd(4,0) = 4, gcd(0,3) = 3, gcd(4,3) = 1, so B = 4 + 3 + 1 = 8. Interior points: the only integer point strictly inside is (1,1) — check (2,1): is it inside? The hypotenuse is y = −3x/4 + 3; at x = 2, y < 1.5, so (2,1) is inside too. Careful counting gives I = 3: (1,1), (2,1), (1,2)? At x=1, y < 2.25, so (1,2) is inside. Yes, I = 3. Area = 3 + 8/2 − 1 = 6. Check: ½·4·3 = 6. ✓

Pitfalls: The theorem requires all vertices on lattice points — one non-integer vertex invalidates it entirely. Counting I by eye is error-prone for large polygons; use the bounding-box subtraction as a cross-check. Remember B includes the vertices themselves and points on every edge. Pick's theorem also has a 3D analogue that fails (Reeve's tetrahedra), so don't generalize it to volume problems.`,
  },
  {
    id: 21,
    title: 'Area Ratios',
    category: 'Geometry',
    body: `Area ratios let you compare regions without computing any actual area: triangles sharing an altitude have areas in the ratio of their bases, and triangles sharing a base have areas in the ratio of their heights. Combined with similarity (area ratio = squared side ratio), this handles a huge class of "find the shaded area" problems with zero formula memorization. Use it whenever a diagram is partitioned and only ratios or one small area is given.

Steps: (1) Find triangles (or parallelograms) that share a height — often they sit on the same line with vertices on a parallel line. (2) Write area ratios as base ratios. (3) Chain ratios through a common triangle to connect distant regions. (4) If one concrete area is given, scale every ratio to actual areas. (5) For similar figures, square the length ratio to get the area ratio.

Mini-example: In △ABC, D is the midpoint of BC and E is on AD with AE:ED = 2:1. Find the ratio of [BEC] to [ABC] ([·] denotes area). Triangles BEC and ABC share base BC, so their areas are in the ratio of their heights from E and A to BC — which equals ED:AD = 1:3 (since E divides median AD in ratio 2:1 from A). Thus [BEC]/[ABC] = 1/3.

Pitfalls: The shared-altitude rule needs the bases on the same line (or parallel lines); triangles that merely "look" aligned may not share a height. Don't confuse area ratios with length ratios — for non-similar triangles, doubling a base doubles the area only if the height is fixed. When chaining ratios, make sure each link shares a common triangle or the chain is invalid. For shaded-area problems, consider the complement: sometimes computing the unshaded area and subtracting from the whole is far easier.`,
  },
  {
    id: 22,
    title: 'Coordinate Geometry Setup',
    category: 'Geometry',
    body: `Coordinate geometry converts a geometry problem into algebra by placing the figure on a grid: assign coordinates to key points, translate geometric conditions into equations, and solve. It is the universal fallback — when synthetic insight fails, coordinates almost always work. Best for problems with right angles, midpoints, perpendicularity, or distance conditions; place the origin and axes to exploit symmetry.

Steps: (1) Choose coordinates strategically: put a right angle at the origin, a base on the x-axis, and use symmetry (e.g. an isosceles triangle with vertex at (0, h) and base endpoints (−b, 0), (b, 0)). (2) Write coordinates for every relevant point, using variables for unknowns. (3) Translate conditions: distance via the distance formula, perpendicularity via slopes multiplying to −1 (or dot product zero), midpoints by averaging. (4) Solve the resulting algebra. (5) Translate the answer back into geometry and check it against the diagram.

Mini-example: Prove the diagonals of a rectangle are equal. Place the rectangle at (0,0), (w,0), (w,h), (0,h). Diagonal lengths: √((w−0)² + (h−0)²) = √(w² + h²) and √((w−0)² + (0−h)²) = √(w² + h²). Equal. ✓ A harder use: finding a circumcenter becomes solving two linear perpendicular-bisector equations.

Pitfalls: Bad coordinate choices create algebraic swamps — never place a general triangle at (a,b), (c,d), (e,f) when a symmetric placement exists. Keep radicals at bay by working with squared distances until the final step. Coordinates can obscure elegant structure, so on a contest with limited time, spend 60 seconds looking for a synthetic approach first; use coordinates as the reliable plan B. Also verify that your placement didn't accidentally assume something unproven (like a right angle that was never given).`,
  },
  {
    id: 23,
    title: 'Cyclic Quadrilaterals',
    category: 'Geometry',
    body: `A quadrilateral is cyclic — its four vertices lie on one circle — exactly when its opposite angles sum to 180°, or equivalently when an exterior angle equals the opposite interior angle. Cyclic quadrilaterals unlock the whole circle-theorem toolkit: equal angles subtending the same chord, Ptolemy's theorem, and power of a point. Suspect cyclicity whenever a problem has two right angles subtending the same segment, or asks about angle equalities that look like they "want" a circle.

Steps: (1) Test for cyclicity: opposite angles summing to 180°, or two points seeing the same segment under equal angles on the same side. (2) Once cyclic, transfer angles freely: angles subtending the same chord are equal, so ∠ABD = ∠ACD if they stand on arc AD. (3) For length relations in a cyclic quadrilateral, deploy Ptolemy: AC · BD = AB · CD + BC · DA. (4) Combine with power of a point when diagonals or extensions intersect. (5) If you need to prove cyclicity, the angle-sum test is usually the path.

Mini-example: In quadrilateral ABCD, ∠ABC = ∠ADC = 90°. Prove ∠BAC = ∠BDC. Since both right angles subtend AC, points B and D lie on the circle with diameter AC — ABCD is cyclic. Angles BAC and BDC both subtend arc BC, so they are equal. This two-line proof replaces a page of triangle chasing.

Pitfalls: The "equal angles subtend the same segment" test requires the two points to be on the same side of the segment; on opposite sides the angles are supplementary, which is a different (also useful) configuration. Ptolemy's theorem applies only to cyclic quadrilaterals in the given vertex order — crossing the order gives a wrong equation. Don't assume cyclicity from a "round-looking" diagram; prove it with the 180° test or equal angles first.`,
  },
  {
    id: 24,
    title: 'Pythagorean Triples and Special Right Triangles',
    category: 'Geometry',
    body: `Integer-sided right triangles come in Pythagorean triples — (3,4,5), (5,12,13), (8,15,17), (7,24,25), (20,21,29) — plus multiples like (6,8,10) and (9,12,15). Recognizing them instantly evaluates hypotenuses and legs without the square-root grind. The 45-45-90 triangle (legs 1, 1, hypotenuse √2) and 30-60-90 triangle (sides 1, √3, 2) similarly short-circuit angle-based problems. Use this recognition reflex whenever a right triangle's sides look like small integers.

Steps: (1) When you see a right triangle with two known sides, check the famous triples before reaching for a² + b² = c². (2) Memorize the primitive triples up to 25 and their doubles. (3) For 30-60-90: the side opposite 30° is half the hypotenuse; the side opposite 60° is (half the hypotenuse)·√3. For 45-45-90: hypotenuse = leg·√2. (4) Watch for triples hiding in larger numbers: 10-24-26 is just 5-12-13 doubled. (5) Confirm the right angle is actually present before applying any of this.

Mini-example: A right triangle has legs 9 and 12. Instead of computing √(81 + 144) = √225 = 15, recognize 9-12-15 as 3·(3,4,5): hypotenuse 15 immediately. Reverse: hypotenuse 25, one leg 7 → the other leg is 24 (7-24-25).

Pitfalls: The triple must match exactly — 3-4-6 is not a right triangle at all (3² + 4² ≠ 6²). Multiples scale all three sides: 5-12-13 doubled is 10-24-26, not 10-12-13. The 30-60-90 ratios attach to specific angles; mixing up which leg is which gives answers off by a factor of √3. And triples only give integer answers when the triangle is genuinely right-angled and the sides genuinely match — close-looking numbers like 5-12-12 are just a non-right triangle.`,
  },
  {
    id: 25,
    title: 'Constructing Auxiliary Lines',
    category: 'Geometry',
    body: `An auxiliary line is a segment you add to the diagram that the problem never mentioned — a parallel, an extension, a dropped perpendicular, or a connected pair of points — which creates the similar triangles, cyclic quadrilaterals, or congruent pieces that crack the problem. It is the most creative geometry move: use it when angle chasing stalls, when a length looks unreachable, or when the diagram feels "one line short" of yielding.

Steps: (1) Stare at what's missing: is there a triangle that would be similar if only one more line existed? A right angle that a perpendicular would create? (2) Choose the standard constructions first: extend a side to meet another line, draw through a point a line parallel to a given one, drop an altitude, join two notable points (midpoints, centers). (3) Redraw cleanly with the new line and re-run your angle chasing or ratio tools — the construction should activate them. (4) Prove any property you need about the new line (e.g. that your "parallel" really is parallel). (5) If one construction doesn't help, try another; auxiliary lines are cheap to test.

Mini-example: In △ABC with ∠A = 20°, AB = AC, point D is on AB such that ∠DCB = 20°. Find ∠CDA. (Langley's Adventitious Angles, simplified telling.) The classic auxiliary: draw DE such that... a cleaner mini-example: to prove the midline theorem, extend the segment joining two midpoints to twice its length, creating congruent triangles that reveal the parallel and the half-length. The pattern is the same: add the line that completes a familiar configuration.

Pitfalls: Every auxiliary line must be constructible from the given data — you can't just declare that a line through P hits side BC at its midpoint unless you prove it does. Don't overcrowd: more than two or three auxiliary lines usually means you're forcing it; step back and look for a different insight. Name new points immediately and keep the diagram legible, or you'll chase angles belonging to the wrong triangle.`,
  },
);

// ---------- PRO TIER: Number Theory (ids 26-33) ----------
METHODS.push(
  {
    id: 26,
    title: 'Euclidean Algorithm',
    category: 'Number Theory',
    body: `The Euclidean algorithm computes gcd(a, b) by repeated division: gcd(a, b) = gcd(b, a mod b), continuing until the remainder is zero — the last nonzero remainder is the gcd. It reduces enormous numbers in a handful of steps and underlies fraction reduction, modular inverses, and Diophantine equations. Use it whenever you need a gcd, need to test coprimality, or need to reduce a fraction.

Steps: (1) Divide the larger by the smaller and keep the remainder. (2) Replace the pair (a, b) with (b, remainder). (3) Repeat until a remainder of 0 appears; the previous remainder is the gcd. (4) For the extended version (finding x, y with ax + by = gcd), work the steps backward, substituting each remainder. (5) A fraction a/b reduces by dividing top and bottom by the gcd.

Mini-example: gcd(1071, 462). 1071 = 2·462 + 147; 462 = 3·147 + 21; 147 = 7·21 + 0. So gcd = 21. Reduce 462/1071: divide by 21 → 22/51. Extended: 21 = 462 − 3·147 = 462 − 3(1071 − 2·462) = 7·462 − 3·1071, so x = −3, y = 7 gives 1071x + 462y = 21.

Pitfalls: The algorithm needs nonnegative integers — take absolute values first. Don't stop one step early: the gcd is the last nonzero remainder, not the final zero. When back-substituting for the extended version, keep the signs straight; it's the step where most errors occur. Note that gcd(a, 0) = a, which also serves as the base case. For three or more numbers, apply pairwise: gcd(a, b, c) = gcd(gcd(a, b), c).`,
  },
  {
    id: 27,
    title: 'Prime Factorization and the Fundamental Theorem',
    category: 'Number Theory',
    body: `The Fundamental Theorem of Arithmetic says every integer greater than 1 factors uniquely into primes: n = p₁^e₁ · p₂^e₂ · ⋯ · pₖ^eₖ. This prime factorization is the "DNA" of a number — divisibility, gcd, lcm, divisor counts, and perfect-power questions all become questions about exponents. Factor first, ask questions later is the number theorist's motto.

Steps: (1) Factor by trial division with small primes (2, 3, 5, 7, 11, ...) up to √n. (2) Write the factorization with exponents. (3) Read off answers: d|n iff each exponent of d is ≤ the matching exponent of n; gcd takes minimum exponents; lcm takes maximum exponents; the number of divisors is (e₁+1)(e₂+1)⋯(eₖ+1). (4) For perfect squares, every exponent must be even; for perfect cubes, every exponent a multiple of 3. (5) When factoring large contest numbers, look for algebraic structure first (difference of squares, etc.) before grinding trial division.

Mini-example: n = 360 = 2³ · 3² · 5¹. Number of divisors: (3+1)(2+1)(1+1) = 24. gcd(360, 84): 84 = 2²·3·7, so gcd = 2²·3 = 12 (min exponents). lcm = 2³·3²·5·7 = 2520 (max exponents). Is 360 a perfect square? No — exponents 3, 2, 1 aren't all even.

Pitfalls: Uniqueness means the factorization is the whole story, but you must actually find it — stopping trial division before √n risks missing a large prime factor (if no divisor ≤ √n divides it, the remainder itself is prime). Don't confuse the number of divisors with the sum of divisors — different formulas. For gcd/lcm via exponents, include primes appearing in only one number (exponent 0 in the other). Remember 1 is not prime and has an empty factorization; treat it as a special case.`,
  },
  {
    id: 28,
    title: 'Diophantine Equations Basics',
    category: 'Number Theory',
    body: `Diophantine equations are equations where only integer solutions are wanted — typically linear ones like ax + by = c, or factorable nonlinear ones. The linear case is completely understood: solutions exist iff gcd(a, b) divides c, and then there are infinitely many, spaced regularly. Use this whenever a problem asks for integer (or natural-number) solutions, coin-problem combinations, or lattice points on a line.

Steps: (1) For ax + by = c, compute g = gcd(a, b); if g ∤ c, stop — no solutions. (2) Find one particular solution (x₀, y₀) via the extended Euclidean algorithm (divide through by g first to work with coprime coefficients). (3) Write the general solution: x = x₀ + (b/g)t, y = y₀ − (a/g)t for integer t. (4) Apply constraints (nonnegative, bounded, etc.) to find admissible t values. (5) For nonlinear Diophantine equations, try factoring (SFFT!), bounding, or modular restrictions to limit possibilities.

Mini-example: Find all integer solutions of 6x + 10y = 14. gcd(6,10) = 2, and 2 | 14, so solutions exist. Divide by 2: 3x + 5y = 7. One solution: x = 4, y = −1 (12 − 5 = 7). General: x = 4 + 5t, y = −1 − 3t. Nonnegative solutions: t = 0 gives (4, −1) — y negative; no t makes both nonnegative (check t = 0, −1, ...), so there are no nonnegative solutions, though infinitely many integer ones exist.

Pitfalls: The divisibility condition gcd(a,b) | c is decisive — many contest problems are designed so it fails and the answer is "no solutions." When parametrizing, the steps are b/g and a/g (divided by g!), not b and a. For word problems, translate "nonnegative integers" carefully: x ≥ 0 and y ≥ 0 restrict t to an interval, possibly empty. Nonlinear Diophantine equations have no universal method — factoring and modular arithmetic are your tools, and sometimes the answer is a clever infinite-descent or bounding argument.`,
  },
  {
    id: 29,
    title: "Fermat's Little Theorem and Modular Inverses",
    category: 'Number Theory',
    body: `Fermat's little theorem: if p is prime and p ∤ a, then a^(p−1) ≡ 1 (mod p). This collapses giant exponents modulo a prime and produces modular inverses: a^(−1) ≡ a^(p−2) (mod p). A modular inverse of a mod m is a number x with ax ≡ 1 (mod m), which exists iff gcd(a, m) = 1 — it plays the role of division in modular arithmetic. Use these for large powers mod a prime, fraction-like modular computations, and primality-flavored problems.

Steps: (1) Confirm the modulus is prime (for Fermat) and the base isn't a multiple of it. (2) Reduce the exponent modulo p − 1: a^k ≡ a^(k mod (p−1)) (mod p). (3) For inverses mod prime p, compute a^(p−2) mod p by repeated squaring. (4) For inverses mod composite m, use the extended Euclidean algorithm instead. (5) Replace "division by a" in a congruence with "multiplication by the inverse of a."

Mini-example: Compute 3⁹⁹ mod 7. Since 7 is prime, 3⁶ ≡ 1 (mod 7). Reduce exponent: 99 = 6·16 + 3, so 3⁹⁹ ≡ 3³ = 27 ≡ 6 (mod 7). Inverse example: 4x ≡ 1 (mod 7) → x ≡ 4⁵ = 1024 ≡ 1024 − 7·146 = 1024 − 1022 = 2 (mod 7). Check: 4·2 = 8 ≡ 1. ✓

Pitfalls: Fermat needs a prime modulus — for composite moduli use Euler's theorem (exponent reduces mod φ(m)) instead. The exponent reduction is mod (p−1), not mod p — a very common slip. Inverses exist only when gcd(a, m) = 1; "dividing" by a number sharing a factor with the modulus is invalid and produces wrong answers. Also, a^(p−1) ≡ 1 requires p ∤ a; if p | a the power is just 0 mod p.`,
  },
  {
    id: 30,
    title: 'Last-Digit Cycles (Cyclicity)',
    category: 'Number Theory',
    body: `The last digit of a^n cycles with period at most 4 as n grows, because only the last digit of the base matters and there are just 10 possibilities. The cycles: 0→0; 1→1; 2→2,4,8,6; 3→3,9,7,1; 4→4,6; 5→5; 6→6; 7→7,9,3,1; 8→8,4,2,6; 9→9,1. This makes "find the units digit of 7^2026" a 10-second problem. Use it for last-digit questions, and extend the idea: last-two-digit cycles exist too (period ≤ 20 via Carmichael).

Steps: (1) Reduce the base to its last digit. (2) Write the cycle for that digit. (3) Reduce the exponent modulo the cycle length (careful: for exponent 0 mod cycle-length, use the last element of the cycle, not the first). (4) Read off the corresponding digit. (5) For expressions with multiple powers, find each last digit and combine.

Mini-example: Last digit of 7^2026. Cycle of 7: 7, 9, 3, 1 (length 4). 2026 mod 4 = 2, so take the 2nd element: 9. Answer: 9. Combined example: last digit of 2^10 + 3^10. 2^10: cycle 2,4,8,6; 10 mod 4 = 0 → last element 6. 3^10: cycle 3,9,7,1; 10 mod 4 = 0 → 1. Sum ends in 6 + 1 = 7.

Pitfalls: The "exponent mod cycle length = 0" case takes the last cycle entry — 2^4 ends in 6 (4th entry), not 2 (1st entry). Cycles listed above assume positive exponents;  a^0 = 1 for any a ≠ 0. For bases ending in 0, 1, 5, 6 the digit never changes, which trivializes those cases — don't overthink them. When combining terms, only last digits matter for the last digit of a sum or product, but never for anything else (like divisibility by higher powers of 2 or 5).`,
  },
  {
    id: 31,
    title: 'GCD and LCM Relationships',
    category: 'Number Theory',
    body: `The gcd and lcm of two numbers are linked by the fundamental identity gcd(a, b) · lcm(a, b) = a · b. This lets you find one from the other, and it powers a family of contest problems: "two numbers have gcd 6 and lcm 72 — find the numbers." Beyond the identity, remember gcd(a, b) = gcd(a, b − a), gcd scales as gcd(ka, kb) = k·gcd(a, b), and consecutive integers are always coprime.

Steps: (1) When given gcd and product information, use gcd · lcm = a·b to find the missing piece. (2) To find pairs with given gcd g and lcm l: write a = g·x, b = g·y with gcd(x, y) = 1 and x·y = l/g; enumerate coprime factor pairs. (3) Use gcd(a,b) = gcd(a mod b, b) to simplify before computing. (4) For fraction and ratio problems, divide through by the gcd to get lowest terms — coprime numerators/denominators unlock divisibility arguments. (5) Remember lcm(a, b) is the smallest positive number divisible by both — for scheduling/periodic problems, it's the answer directly.

Mini-example: Find all pairs (a, b) with gcd 6 and lcm 72. Write a = 6x, b = 6y, gcd(x,y) = 1, xy = 72/6 = 12. Coprime factor pairs of 12: (1,12), (3,4) (and reverses). So (a,b) ∈ {(6,72), (18,24), (24,18), (72,6)}.

Pitfalls: The identity gcd·lcm = a·b holds for two numbers only — there is no such simple relation for three. A common trap: assuming lcm(a,b) = a·b; that's true only when coprime. When enumerating factor pairs, enforce the coprimality of x and y — (2,6) also multiplies to 12 but gcd(2,6) = 2 ≠ 1, so it would double-count the gcd. Also, gcd is defined for the numbers' absolute values; signs don't matter.`,
  },
  {
    id: 32,
    title: 'Parity Arguments',
    category: 'Number Theory',
    body: `Parity — whether a number is even or odd — is modular arithmetic mod 2, and it's a surprisingly strong proof tool. Even ± even = even, odd ± odd = even, even ± odd = odd; even · anything = even; odd · odd = odd. Squares preserve parity (n² ≡ n mod 2). Use parity for impossibility proofs: if a process preserves some parity but the target has different parity, the target is unreachable. Chessboard colorings are parity in disguise.

Steps: (1) Identify a quantity whose parity is constrained — a sum, a product, a count of odd terms. (2) Determine how the allowed moves or equations affect parity. (3) Find the invariant: parity that cannot change. (4) Show the start and target states have different parity → impossible. (5) For constructive problems, use parity to narrow cases: e.g. if x² + y² is odd, exactly one of x, y is odd.

Mini-example: Can you tile a 8×8 board with two opposite corners removed using 2×1 dominoes? Each domino covers one black and one white square. Opposite corners have the same color, so the mutilated board has 32 of one color and 30 of the other. 31 dominoes would need 31 black and 31 white squares — impossible. The coloring (parity) argument kills it in seconds.

Pitfalls: Parity arguments prove impossibility, not possibility — "parity doesn't forbid it" is not a construction. Make sure the parity claim is airtight: "the sum of two odds is even" is safe, but hand-wavy "evenness is preserved" needs the actual computation. When counting odd/even terms in a sum, be careful with subtraction and with terms that could be zero (zero is even). For coloring arguments, verify that each tile really does cover the claimed color balance — L-trominoes cover 2-1, not 1-1, which changes the analysis.`,
  },
  {
    id: 33,
    title: 'Divisor Functions: Counting and Summing Divisors',
    category: 'Number Theory',
    body: `From the prime factorization n = p₁^e₁ ⋯ pₖ^eₖ, two formulas drop out: the number of divisors τ(n) = (e₁+1)⋯(eₖ+1), and the sum of divisors σ(n) = Π (pᵢ^(eᵢ+1) − 1)/(pᵢ − 1). These turn "how many divisors" and "sum of divisors" problems into factoring problems. They're also the gateway to perfect numbers (σ(n) = 2n) and abundant/deficient classification.

Steps: (1) Factor n completely. (2) For the count: add 1 to each exponent and multiply. (3) For the sum: for each prime power p^e, compute 1 + p + ⋯ + p^e = (p^(e+1) − 1)/(p − 1), then multiply across primes. (4) Use these in reverse too: "n has exactly 6 divisors" means the exponent pattern is (5) or (2,1), i.e. n = p⁵ or n = p²q. (5) For perfect numbers, set σ(n) = 2n and solve structurally.

Mini-example: n = 48 = 2⁴ · 3¹. τ(48) = (4+1)(1+1) = 10 divisors. σ(48) = (1+2+4+8+16)(1+3) = 31·4 = 124. Is 48 perfect? 2·48 = 96 ≠ 124, so no (it's abundant). Reverse: smallest n with τ(n) = 6? Patterns: p⁵ = 32, or p²q with smallest primes: 2²·3 = 12. Answer: 12.

Pitfalls: The formulas need the full prime factorization — a missed prime factor corrupts both. Don't confuse τ (count) with σ (sum); contest problems exploit exactly this. The geometric-series formula for σ needs p^(e+1), not p^e — the off-by-one is the classic error (for 2⁴: 1+2+4+8+16 = 31 = 2⁵−1). When working backward from a divisor count, enumerate all exponent patterns: τ(n) = 12 comes from (11), (5,1), (3,2), (2,1,1) — missing a pattern misses candidate n values.`,
  },
);

// ---------- PRO TIER: Combinatorics (ids 34-41) ----------
METHODS.push(
  {
    id: 34,
    title: 'Stars and Bars',
    category: 'Combinatorics',
    body: `Stars and bars counts nonnegative integer solutions to x₁ + ⋯ + xₖ = n: the answer is C(n+k−1, k−1). Picture n stars in a row and k−1 bars dividing them into k groups — choosing bar positions determines the solution. It applies to distributing identical objects into distinct boxes, counting multisets, and any "sum to n" composition problem. Positive (≥1) solutions: substitute yᵢ = xᵢ − 1 to get C(n−1, k−1).

Steps: (1) Check the objects are identical and the boxes distinct — stars and bars fails for distinct objects. (2) Identify n (total) and k (number of variables/boxes). (3) For nonnegative (≥ 0): answer C(n+k−1, k−1). For positive (≥ 1): answer C(n−1, k−1). (4) For lower bounds xᵢ ≥ mᵢ, shift variables: yᵢ = xᵢ − mᵢ, then count nonnegative solutions of the shifted equation. (5) Upper bounds need inclusion-exclusion on top of stars and bars.

Mini-example: How many nonnegative integer solutions to x + y + z = 10? Stars and bars: C(10+3−1, 3−1) = C(12, 2) = 66. Positive solutions: C(10−1, 3−1) = C(9,2) = 36. With x ≥ 2: set x' = x − 2, then x' + y + z = 8, giving C(10, 2) = 45.

Pitfalls: The #1 error is using stars and bars when objects are distinct — distributing 5 different books to 3 people is 3⁵, not C(7,2). Double-check whether zero is allowed: "distribute 10 identical candies to 3 kids" usually allows zero (C(12,2)), but "each kid gets at least one" changes it (C(9,2)). The formula is symmetric: C(n+k−1, k−1) = C(n+k−1, n) — use whichever is easier to compute. Upper bounds (xᵢ ≤ m) break the plain formula; count total minus violations via inclusion-exclusion.`,
  },
  {
    id: 35,
    title: 'Permutations vs Combinations',
    category: 'Combinatorics',
    body: `Permutations count ordered selections: P(n, k) = n!/(n−k)!. Combinations count unordered selections: C(n, k) = n!/(k!(n−k)!). The entire distinction is whether order matters — "president, then treasurer" is permutations; "a committee of two" is combinations. Misdiagnosing this is the single most common counting error, so make the order question explicit every time.

Steps: (1) Ask: does rearranging the selection create a different outcome? If yes → permutations; if no → combinations. (2) Check for repetition: are objects reused (like digits in a PIN, which allows repeats → n^k)? (3) Apply the formula, or reason directly: fill k ordered slots with n, n−1, ... choices. (4) For "at least/most" phrasing, sum over cases or use the complement. (5) Verify with small numbers: test your formula on n = 3, k = 2 by listing.

Mini-example: A club has 10 members. (a) Choose a president and secretary (distinct roles): order matters → P(10,2) = 90. (b) Choose a 2-person committee: order irrelevant → C(10,2) = 45. Note 90 = 2·45: each committee yields 2 role assignments. (c) A 4-digit PIN from 10 digits with repetition: 10⁴ = 10,000 — neither formula, since repeats are allowed.

Pitfalls: Words like "arrange," "schedule," "rank," "password" signal order; "choose," "committee," "team," "set" signal no order — but always verify against the actual problem. Dividing by k! converts permutations to combinations only when every unordered selection corresponds to exactly k! orderings (true for distinct objects, false with repeated objects — MISSISSIPPI needs the multinomial adjustment). Circular arrangements divide further by n for rotations. When in doubt, list all outcomes for a tiny case and check your formula against the list.`,
  },
  {
    id: 36,
    title: 'Recursion in Counting',
    category: 'Combinatorics',
    body: `Recursion counts complex arrangements by relating the count for size n to counts for smaller sizes: find how the first (or last) choice splits the problem into smaller copies of itself. This yields a recurrence like aₙ = aₙ₋₁ + aₙ₋₂, which you solve by computing upward from base cases or by recognizing a famous sequence (Fibonacci appears constantly). Use it for tilings, binary strings with restrictions, stair-climbing, and any "count sequences of length n" problem.

Steps: (1) Define aₙ precisely: what exactly is being counted for size n. (2) Condition on the first move/choice: partition all valid configurations by what happens at position 1. (3) Show each case reduces to a smaller instance (aₙ₋₁, aₙ₋₂, ...) and add them. (4) Establish base cases by direct counting (a₀, a₁). (5) Compute upward or find a closed form; verify the first few values by brute listing.

Mini-example: Tile a 2×n board with 2×1 dominoes. Let aₙ be the number of tilings. Look at the leftmost column: either a vertical domino covers it (leaving a 2×(n−1) board: aₙ₋₁ ways) or two horizontal dominoes cover the first two columns (leaving 2×(n−2): aₙ₋₂ ways). So aₙ = aₙ₋₁ + aₙ₋₂, with a₀ = 1, a₁ = 1. Thus a₂ = 2, a₃ = 3, a₄ = 5 — Fibonacci.

Pitfalls: The recurrence is only as good as the case split — the cases must be disjoint and exhaustive; overlapping or missed cases are the main failure. Base cases need care: a₀ = 1 (empty tiling) is a convention that must be consistent with the recurrence. Don't assume every recurrence is Fibonacci — condition carefully and compute the first values to see the actual pattern. For two interdependent sequences (e.g. strings ending in 0 vs 1), set up a system of recurrences rather than forcing one.`,
  },
  {
    id: 37,
    title: 'Inclusion-Exclusion',
    category: 'Combinatorics',
    body: `Inclusion-exclusion counts a union by adding individual counts, subtracting pairwise intersections, adding back triple intersections, and so on: |A ∪ B| = |A| + |B| − |A ∩ B|, and |A ∪ B ∪ C| = |A| + |B| + |C| − |A∩B| − |A∩C| − |B∩C| + |A∩B∩C|. It corrects the overcounting from naive addition. Use it for "divisible by 2 or 3," derangements, and any "at least one of these properties" count where the properties overlap.

Steps: (1) Define the sets A, B, C, ... (one per property). (2) Count each set individually. (3) Count each pairwise intersection — these are usually "satisfies both properties." (4) Continue alternating signs through higher intersections. (5) For "none of the properties," subtract the union from the total (combining with complementary counting).

Mini-example: How many integers from 1 to 100 are divisible by 2 or 3? |A| (divisible by 2) = 50, |B| (divisible by 3) = 33, |A ∩ B| (divisible by 6) = 16. Union = 50 + 33 − 16 = 67. Neither divisible: 100 − 67 = 33.

Pitfalls: Sign alternation is the heart of the formula — with three sets, the triple intersection is added back, and getting one sign wrong corrupts everything. Intersections must be counted exactly: "divisible by both 4 and 6" means divisible by lcm(4,6) = 12, not by 24. For many sets the formula explodes combinatorially (2ⁿ terms); beyond 3–4 sets, look for symmetry or a smarter approach. Derangements have their own clean formula (!n = n!Σ(−1)^k/k!) — don't re-derive inclusion-exclusion from scratch each time.`,
  },
  {
    id: 38,
    title: 'Casework Done Well',
    category: 'Combinatorics',
    body: `Casework splits a counting problem into disjoint, exhaustive cases and adds the results. It is the most reliable method — almost always correct — but also the slowest, so the skill is in choosing the split that minimizes cases. Split on the most restrictive condition first, and prefer splits where each case is uniform to count. Use casework when the problem has natural categories (by size, by position of a special object, by parity) that resist a single formula.

Steps: (1) Choose the case variable: the feature that most constrains the count (often the location of a distinguished element or the value of the largest/smallest item). (2) Verify cases are disjoint (no double-counting) and exhaustive (nothing missed) — write the partition explicitly. (3) Count each case with the sharpest tool available (combinations, stars and bars, etc.). (4) Add the case counts. (5) Cross-check with a second split or a small-case computation when time permits.

Mini-example: How many 3-element subsets of {1,...,7} contain no two consecutive numbers? Split on the smallest element s. If s = 1: choose 2 more from {3,...,7} with no consecutives... this gets messy; better split: count directly by choosing 3 nonconsecutive. Alternative clean split on the middle element m (2..6): left element chosen from {1,...,m−2} (m−2... let me just do: elements a<b<c, nonconsecutive. For fixed b, a ∈ {1,...,b−2} (b−2... a can be 1..b−2, that's b−2... wait a ≥ 1 so b−2 choices... hmm a ∈ [1, b−2] gives b−2 values only if b−2 ≥ 1. Let me recount: a has (b−2) − 1 + 1 = b − 2 choices when b ≥ 3; c ∈ [b+2, 7] gives 7 − (b+2) + 1 = 6 − b choices. Sum over b = 2..6 of (b−2)(6−b): b=2: 0·4=0; b=3: 1·3=3; b=4: 2·2=4; b=5: 3·1=3; b=6: 4·0=0. Total 10.

Pitfalls: The two deadly sins are overlapping cases (double-count) and gaps (undercount) — state the partition in one sentence and test it: "every valid subset has exactly one middle element b." Avoid splitting on two variables at once; nested casework multiplies cases and errors. If your case count exceeds ~5 cases, reconsider — there's often a stars-and-bars or complement shortcut (here: C(5,3) = 10 via the standard "subtract gaps" bijection). Always do a final reasonableness check against a crude bound.`,
  },
  {
    id: 39,
    title: 'Symmetry and WLOG (Without Loss of Generality)',
    category: 'Combinatorics',
    body: `Symmetry lets you assume an ordering or a distinguished position "without loss of generality" (WLOG), because every configuration can be relabeled into one satisfying your assumption. This collapses redundant cases: instead of counting all seatings, fix one person's seat (rotational symmetry) and count the rest. Use WLOG whenever the problem is symmetric under permuting labels, rotating, or reflecting — then multiply back by the symmetry factor if needed.

Steps: (1) Identify the symmetry: what relabeling leaves the problem unchanged? (2) State the WLOG assumption explicitly ("WLOG let a ≤ b ≤ c" or "fix person A at the head of the table"). (3) Count or argue under the assumption — this is now a smaller, easier problem. (4) If the assumption discarded symmetric copies, multiply by the number of copies (e.g. n rotations). (5) Double-check the symmetry is genuine: the assumption must be achievable for every case by relabeling alone.

Mini-example: Seat 5 people around a round table. Rotations are identical, so WLOG fix person A at a reference seat; arrange the remaining 4 freely: 4! = 24. (Linear arrangements would be 5! = 120; the symmetry factor is 5.) Ordering example: for symmetric inequality proofs, WLOG assume x ≤ y ≤ z, prove the claim, and note any permutation of variables preserves the hypothesis.

Pitfalls: WLOG is a claim that needs justification — "WLOG a is the smallest" is valid only if the problem treats all variables symmetrically; if a has a special role, you cannot reorder. For round-table problems, decide whether flipping the table counts as identical (usually not, unless "up to rotation and reflection" is stated — that gives (n−1)!/2). When you WLOG-fix a value, don't also count its symmetric variants later. The most embarrassing error: assuming symmetry the problem doesn't have, e.g. WLOG-ordering variables in an equation that isn't symmetric in them.`,
  },
  {
    id: 40,
    title: 'Lattice Path Counting',
    category: 'Combinatorics',
    body: `A lattice path from (0,0) to (m,n) using only right (R) and up (U) steps is a sequence of m+n moves with exactly m R's — so there are C(m+n, m) such paths. This models grid walks, ballot sequences, and any process with two types of steps. Restrictions ("never go above the diagonal," "avoid a blocked point") are handled by subtraction: count all paths, subtract those violating the restriction, often via the reflection principle.

Steps: (1) Encode the process as R/U steps and identify the endpoint (m, n). (2) Unrestricted count: C(m+n, m). (3) For forbidden regions, count paths through the forbidden point as (paths to it) × (paths from it onward) and subtract. (4) For "never exceed the diagonal" (m = n), use Catalan numbers: C(2n,n) − C(2n,n+1) = C(2n,n)/(n+1). (5) Verify endpoints and step counts match the problem's story.

Mini-example: Paths from (0,0) to (3,3) moving only right or up: C(6,3) = 20. Paths that never rise above the diagonal y = x (Dyck paths): Catalan C₃ = 20/4 = 5. Paths through blocked point (1,1): paths (0,0)→(1,1) = C(2,1) = 2, times paths (1,1)→(3,3) = C(4,2) = 6, so 12 paths hit (1,1); avoiding it leaves 20 − 12 = 8.

Pitfalls: Step definitions must be exact — "right or up" vs "right, up, or diagonal" give totally different counts. The reflection principle's formula C(2n,n+1) counts paths that cross above the diagonal; make sure "above" vs "touching" matches the problem (touching the diagonal is usually allowed). When subtracting paths through a forbidden point, the product counts paths that go through it at least once — fine for a single point, but multiple forbidden regions need inclusion-exclusion. Off-by-one in grid dimensions (points vs squares) is a classic: an m×n grid of squares has (m+1)×(n+1) lattice points.`,
  },
  {
    id: 41,
    title: 'Multiplication and Addition Principles',
    category: 'Combinatorics',
    body: `The multiplication principle: if a process has stages with n₁, n₂, ..., nₖ choices respectively, the total is n₁·n₂⋯nₖ. The addition principle: if outcomes split into disjoint types with n₁, n₂ counts, the total is n₁ + n₂. These two rules underlie every counting formula — permutations, combinations, and casework are all applications. When fancy formulas don't fit, fall back to staged slot-filling; it's slow but nearly infallible.

Steps: (1) Decompose the construction into sequential stages (slots). (2) Count choices at each stage given previous choices — watch for stages whose count depends on earlier ones. (3) Multiply the stage counts. (4) If the problem offers alternative forms (disjoint cases), count each form by multiplication and add. (5) Verify stages are independent enough that multiplication is valid: the number of choices at stage 2 must not depend on which specific choice was made at stage 1, only that one was made.

Mini-example: License plates with 2 letters followed by 3 digits (repetition allowed): 26·26·10·10·10 = 676,000. With no repeated characters at all: 26·25·10·9·8 = 468,000 — the digit stages shrink because letters used... wait, letters and digits are separate alphabets, so digits still have 10·9·8 (no digit repeats a letter). Correct: 26·25 for letters, then 10·9·8 for digits = 468,000. Addition example: plates with either 2 letters + 3 digits or 3 letters + 2 digits: 676,000 + 26³·10² = 676,000 + 1,757,600 = 2,433,600.

Pitfalls: Multiplying when you should add (or vice versa) is the fundamental error — "and" (stages) means multiply, "or" (alternatives) means add. Choices at later stages often depend on earlier ones; "choose 2 cards" isn't 52·52 (that's with replacement and order). The addition principle needs disjoint types — overlapping types need inclusion-exclusion. Slot-filling counts ordered constructions; if order doesn't matter, you'll overcount by the permutations of the slots and must divide.`,
  },
);

// ---------- PRO TIER: General (ids 42-49) ----------
METHODS.push(
  {
    id: 42,
    title: 'Invariants',
    category: 'General',
    body: `An invariant is a quantity or property that doesn't change as a process unfolds — parity, a sum, a remainder mod something, a coloring balance. If the start and end states disagree on an invariant, the transformation is impossible. This is the master key for "can you reach..." puzzles, chip-swapping games, and process problems across algebra, combinatorics, and number theory.

Steps: (1) Model the allowed moves precisely. (2) Hunt for candidate invariants: total sum, product, parity of a count, value mod 3 or mod something, difference between two piles, a coloring sum. (3) Prove invariance: show each legal move preserves it (compute before and after). (4) Compute the invariant at the start and at the desired end. (5) If they differ, conclude impossibility; if they agree, the invariant doesn't decide — you may need a construction or a finer invariant.

Mini-example: On a board are the numbers 1 through 10. A move replaces two numbers a, b with |a − b|. Can you reach a single 0? Consider the total sum's parity... better invariant: the parity of the sum of all numbers. Replacing a, b with |a − b| changes the sum by |a−b| − a − b, which is even (since |a−b| ≡ a+b mod 2). So sum parity is invariant: initial sum 55 (odd). A single 0 has sum 0 (even). Odd ≠ even — impossible.

Pitfalls: You must prove the quantity is truly invariant under every legal move — one counterexample move destroys the argument. Invariants give one-way results: agreement between start and end proves nothing about reachability. Choose the invariant to fit the moves: mod-2 for parity-flipping moves, mod-3 for "add 2" type moves, weighted sums for moves that shift value between piles. A frequent trap is computing the invariant at the end state incorrectly (e.g. miscounting colors on the target board).`,
  },
  {
    id: 43,
    title: 'Extremal Principle',
    category: 'General',
    body: `The extremal principle: consider the largest, smallest, longest, or shortest object in a finite collection, and derive a contradiction or a construction from its extremality. The minimal counterexample method is its famous form: assume a smallest counterexample to a claim, then produce an even smaller one — contradiction. Use it for existence proofs, graph theory, combinatorial geometry, and inequalities where "take the extreme one" breaks the symmetry.

Steps: (1) Identify a quantity to extremize over the finite set of candidates (max degree, closest pair of points, smallest counterexample). (2) Assert the existence of an extremal example — finiteness guarantees it. (3) Exploit extremality: the extremal object can't be improved, which constrains its structure (e.g. the closest pair of points has an empty circle around them). (4) Derive the desired conclusion or contradiction. (5) For minimal counterexamples, construct a smaller instance satisfying the same bad property.

Mini-example: Given finitely many points in the plane, not all on one line, prove some line through two of them contains exactly two of the points (Sylvester–Gallai). Consider the smallest distance from any point to any line through two other points; let P and line ℓ (through A, B) achieve it. Drop the perpendicular from P to ℓ at H. Among A, B, one... two of A, B, H lie on the same side; say A, B with AH < BH. Then the distance from A to line PB is less than PH (right-triangle hypotenuse PH vs leg), contradicting minimality unless ℓ has exactly the two points. Hence some line has exactly two points.

Pitfalls: Finiteness is essential — the principle fails on infinite sets (no smallest positive real). The extremal object must actually exist within the problem's constraints; "the largest integer" doesn't exist. Minimal-counterexample arguments need the constructed smaller object to genuinely be a counterexample (verify all conditions). Don't extremize a quantity that the argument doesn't actually constrain — the contradiction must use extremality, not just existence.`,
  },
  {
    id: 44,
    title: 'Bounding and Squeezing',
    category: 'General',
    body: `Bounding traps an unknown quantity between two values that are close enough to force the answer — the squeeze. If you can show n ≤ X < n+1 for an integer X, then X = n... more precisely X's integer constraints pin it down. It's the tool for Diophantine approximation, integer-valued expressions, and "find the integer part" problems. Whenever an exact computation is hard but nearby bounds are easy, squeeze.

Steps: (1) Find a clean lower bound and a clean upper bound for the target — often by replacing terms with simpler ones (drop negative terms for a lower bound, etc.). (2) Tighten until the bounds pin down the answer: for integer targets, get upper − lower < 1. (3) Common squeezes: n² < n² + k < (n+1)² for small k forces non-squareness; k < √N < k+1 bounds roots. (4) Conclude: the integer strictly between, or the impossibility if no integer fits. (5) Verify the bounds are rigorous, not approximate — every inequality step must be justified.

Mini-example: Show that √(n² + n) is never an integer for positive integer n... squeeze: n² < n² + n < n² + 2n + 1 = (n+1)² for n ≥ 1. So n < √(n²+n) < n+1, strictly between consecutive integers — cannot be an integer. Integer-part example: ⌊√50⌋: 49 < 50 < 64 gives 7 < √50 < 8, so the integer part is 7.

Pitfalls: Strict vs non-strict inequalities matter enormously: n² ≤ n² + n is true but useless for the squeeze above; you need the strict version. When bounding sums, bound every term in the same direction — mixing directions invalidates the total. The squeeze must actually close: bounds like 3 < X < 7 don't determine an integer X. For "prove not a perfect square" arguments, the standard move is trapping between consecutive squares k² and (k+1)² — make sure k is identified correctly.`,
  },
  {
    id: 45,
    title: 'Structured Guess-and-Check',
    category: 'General',
    body: `Guess-and-check is legitimate when disciplined: make an educated guess, test it, and use the error to improve the next guess — essentially manual binary search or Newton's method by hand. It's ideal for integer equations where the function is monotonic, for word problems with small search spaces, and as a fallback when algebra stalls. The key word is structured: each guess must teach you something.

Steps: (1) Establish monotonicity or a small search range — guessing works when "too high" vs "too low" gives directional feedback. (2) Pick a smart starting guess: round numbers, bounds from estimation. (3) Evaluate and note the direction of the error. (4) Halve the interval (binary search) or step by the error's size. (5) Verify the final candidate exactly — a guess is only a candidate until checked.

Mini-example: Find the integer n with n³ + n = 410. Try n = 7: 343 + 7 = 350 < 410. n = 8: 512 + 8 = 520 > 410. Since x³ + x is strictly increasing, no integer between 7 and 8 exists — no integer solution. (If the target were 350, we'd have n = 7 immediately.) Refined: n³ = 1000-ish → n ≈ 10: 10³ + 10 = 1010. Each guess brackets the answer.

Pitfalls: Undisciplined guessing — random tries with no bracketing — wastes time and misses solutions. You must confirm monotonicity (or exhaust the range); a non-monotonic function can hide extra solutions between your guesses. Guess-and-check finds candidates, not proofs: on a proof-style problem, follow up by showing uniqueness (monotonicity) or by verifying no other candidates exist. Never present a guessed answer without the verification step — graders and answer keys both demand it.`,
  },
  {
    id: 46,
    title: 'Answer-Choice Elimination',
    category: 'General',
    body: `On multiple-choice contests (AMC, SAT-style), you don't need the answer — you need to kill four wrong options. Elimination uses parity, size bounds, special cases, and answer-structure to discard choices without fully solving. It's a distinct skill from solving: a problem you can't crack in 5 minutes might yield to elimination in 60 seconds. Use it when time is short, when the problem is computation-heavy, or to verify a derived answer.

Steps: (1) Read the choices first — note their sizes, parities, forms. (2) Apply cheap filters: parity/mod constraints, sign, rough magnitude, must-be-integer, must-be-between-0-and-1. (3) Plug in a special case: set a variable to 0 or 1 (if allowed) and see which choices survive. (4) Test the middle choice ("plug and chug") when choices are ordered numbers — one test eliminates half. (5) If one choice remains, take it; if two remain, invest solving effort only in distinguishing them.

Mini-example: "A rectangle's length is twice its width; its area is 50. What is the width?" Choices: (A) 3 (B) 5 (C) 7 (D) 10 (E) 25. Area = 2w² = 50 → w² = 25. Without solving: w must satisfy 2w² = 50; test (B) 5: 2·25 = 50 ✓. Even faster: w² = 25-ish, so w ≈ 5 — only (B) is near. Elimination by magnitude alone picks (B).

Pitfalls: Special-case plugging must respect the problem's constraints — setting x = 0 when the problem says x > 0 can "eliminate" the right answer. Elimination is probabilistic confidence, not proof; on free-response contests it's useless, so don't let it atrophy your solving. Beware of choices designed as traps: the "obvious" estimate is sometimes planted as a distractor — apply at least two independent filters before committing. And never eliminate your derived answer just because it "looks ugly"; contest answers are often ungainly.`,
  },
  {
    id: 47,
    title: 'Dimensional and Unit Sanity Checks',
    category: 'General',
    body: `Every formula has dimensions: lengths, areas, volumes, counts, and pure numbers can't be added together, and both sides of an equation must match dimensionally. Checking dimensions catches a huge class of errors — adding a length to an area, or a probability formula yielding 7.3. In physics-flavored problems, track units explicitly; in pure math, track "type": is this term a length, an area, a count, a ratio?

Steps: (1) Label each quantity's type: L (length), L² (area), L³ (volume), count (dimensionless integer), ratio (dimensionless). (2) Verify every sum adds like types only. (3) Verify products and quotients produce the expected type: area/length = length. (4) Check the final answer's type matches what's asked — an area answer in "units" not "square units" signals trouble. (5) For formulas with constants (π, ½), confirm the constant is dimensionless and the variables carry the dimensions.

Mini-example: Heron's formula A = √(s(s−a)(s−b)(s−c)): each factor is a length, four lengths multiply to L⁴, square root gives L² — an area. ✓ Dimensionally sound. Contrast a wrong "formula" A = s(s−a)(s−b)(s−c) without the root: L⁴ ≠ area, immediately exposed. Probability check: P = (favorable)/(total) is dimensionless — if your probability expression has units of "meters," it's wrong.

Pitfalls: Dimensionless doesn't mean correct — dimensional analysis catches type errors, not wrong coefficients (it can't distinguish ½bh from bh). Counts and ratios are both dimensionless but shouldn't be mixed: "3 apples + 0.5 probability" is nonsense despite both being "dimensionless." In geometry, angles are dimensionless (radians) — don't try to add an angle to a length. Use this as a fast filter, then verify the actual mathematics; it's a smoke test, not a proof.`,
  },
  {
    id: 48,
    title: 'Draw a Diagram',
    category: 'General',
    body: `Drawing a diagram externalizes the problem: it turns abstract relations into visible ones, reveals hidden structure (that midpoint you didn't notice, the triangle that's actually right), and gives your intuition something to grip. This applies far beyond geometry — draw number lines for inequalities, tree diagrams for probability, graphs for processes, tables for casework. If a problem resists 60 seconds of pure thought, draw.

Steps: (1) Draw big — cramped diagrams hide structure; use a full page or whiteboard. (2) Mark everything given: lengths, angles, labels, right-angle squares, parallel ticks. (3) Draw to scale when possible; a roughly-accurate sketch suggests true relationships (but never proves them). (4) Add what you deduce in a second color or with annotations, keeping givens visually distinct from conclusions. (5) Redraw from scratch if the diagram gets cluttered or if your sketch contradicts a deduction — the sketch is probably wrong, not the math.

Mini-example: "Two trains 100 miles apart approach each other at 40 and 60 mph; when do they meet?" A number line with two dots moving toward each other makes the relative speed (100 mph) obvious: time = 100/100 = 1 hour. Without the picture, many students set up two separate distance equations and fumble the algebra. Tree-diagram example: coin-flip probability problems become trivial when the 8 paths of three flips are drawn.

Pitfalls: A diagram is evidence, not proof — "it looks like a right angle" never justifies using Pythagoras; verify with given information. Misleading sketches cause real damage: drawing an isosceles triangle as scalene (or vice versa) can make a true statement look false. Label points in order and consistently; in combinatorics diagrams, make sure the picture matches the counting model exactly (a tree with wrong branch counts gives wrong probabilities). For 3D problems, draw multiple 2D views rather than one confusing perspective.`,
  },
  {
    id: 49,
    title: 'Small Cases and Pattern Hunting',
    category: 'General',
    body: `When a problem asks about the nth case, compute n = 1, 2, 3, 4 by hand and stare at the results — the pattern usually leaps out, and then you prove it by induction or direct argument. This experimental approach turns "find a formula" problems into "guess and verify" problems. It's also a debugging tool: if your general formula fails on n = 2, it's wrong. Use it for sequences, counting formulas, and any problem with a natural integer parameter.

Steps: (1) Compute the first 3–5 cases carefully — by brute force if needed; small cases must be exactly right. (2) Tabulate: n vs answer, and also differences, ratios, or other transforms. (3) Guess the pattern: linear? quadratic? Fibonacci? powers of 2? (4) Test the guess on one more case before committing. (5) Prove it: induction is the natural partner — the pattern suggests the statement, induction certifies it.

Mini-example: How many regions do n lines divide the plane into (no two parallel, no three concurrent)? n=1: 2 regions. n=2: 4. n=3: 7. n=4: 11. Differences: 2, 3, 4 — the nth line adds n regions (it's cut into n segments by the previous lines). So regions = 2 + 2 + 3 + ⋯ + n = 1 + n(n+1)/2. Check n=3: 1 + 6 = 7. ✓ Then prove by induction: the (n+1)th line is divided into n+1 parts, each splitting one region.

Pitfalls: Patterns from 3 terms can lie — 1, 2, 4 might continue as 8 (powers of 2) or 7 (circle-division problem); compute at least 4–5 terms and prefer structural reasons over numerology. A guessed formula is a conjecture, not a solution — on proof contests you must still prove it (induction usually). Brute-forcing small cases by hand invites arithmetic slips; double-check the base computations, since one wrong small case derails the whole pattern. If no pattern emerges by n = 6, switch strategies — not every problem yields to this.`,
  },
);

// ---------- API ----------
function getMethod(id) {
  if (!Number.isInteger(id) || id < 0 || id >= METHODS.length) {
    throw new RangeError(`Method id out of range: ${id} (valid: 0-${METHODS.length - 1})`);
  }
  return METHODS[id];
}

function listMethods() {
  return METHODS.map((m) => ({ id: m.id, title: m.title, category: m.category }));
}

module.exports = { METHODS, getMethod, listMethods };

// ---------- Self-test ----------
if (require.main === module) {
  const assert = require('assert');
  const failures = [];
  const check = (name, fn) => {
    try {
      fn();
    } catch (e) {
      failures.push(`${name}: ${e.message}`);
    }
  };

  check('count is 50', () => assert.strictEqual(METHODS.length, 50));
  check('ids 0-49 unique', () => {
    const ids = METHODS.map((m) => m.id);
    assert.deepStrictEqual([...ids].sort((a, b) => a - b), Array.from({ length: 50 }, (_, i) => i));
  });
  check('all fields non-empty', () => {
    for (const m of METHODS) {
      assert.ok(typeof m.title === 'string' && m.title.trim().length > 0, `id ${m.id} title`);
      assert.ok(typeof m.category === 'string' && m.category.trim().length > 0, `id ${m.id} category`);
      assert.ok(typeof m.body === 'string' && m.body.trim().length > 0, `id ${m.id} body`);
      assert.ok(!/<[a-z][^>]*>/i.test(m.body), `id ${m.id} body contains HTML`);
    }
  });
  check('body word count >= 120 each', () => {
    for (const m of METHODS) {
      const wc = m.body.trim().split(/\s+/).length;
      assert.ok(wc >= 120, `id ${m.id} has ${wc} words`);
    }
  });
  check('categories exactly the 5 listed, 10 each', () => {
    const expected = ['Algebra', 'Geometry', 'Number Theory', 'Combinatorics', 'General'];
    const counts = {};
    for (const m of METHODS) counts[m.category] = (counts[m.category] || 0) + 1;
    assert.deepStrictEqual(Object.keys(counts).sort(), [...expected].sort());
    for (const c of expected) assert.strictEqual(counts[c], 10, `category ${c}`);
  });
  check('free tier ids 0-9: two per category in order', () => {
    const free = METHODS.slice(0, 10).map((m) => m.category);
    assert.deepStrictEqual(free, [
      'Algebra', 'Algebra',
      'Geometry', 'Geometry',
      'Number Theory', 'Number Theory',
      'Combinatorics', 'Combinatorics',
      'General', 'General',
    ]);
  });
  check('getMethod works / throws RangeError', () => {
    assert.strictEqual(getMethod(0).id, 0);
    assert.strictEqual(getMethod(49).id, 49);
    assert.throws(() => getMethod(-1), RangeError);
    assert.throws(() => getMethod(50), RangeError);
    assert.throws(() => getMethod(1.5), RangeError);
  });
  check('listMethods shape', () => {
    const list = listMethods();
    assert.strictEqual(list.length, 50);
    for (const e of list) {
      assert.deepStrictEqual(Object.keys(e).sort(), ['category', 'id', 'title']);
    }
  });

  if (failures.length) {
    console.error('FAIL');
    for (const f of failures) console.error(' - ' + f);
    process.exit(1);
  }
  const wcs = METHODS.map((m) => m.body.trim().split(/\s+/).length);
  console.log(`PASS: 50 methods, word counts min=${Math.min(...wcs)} max=${Math.max(...wcs)}`);
}
