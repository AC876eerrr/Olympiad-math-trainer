// USAJMO-flavored templates, batch A2: geometry + combinatorics (difficulty 17-18).
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

function mkRng(seed){var f=mulberry32(seed);return{f:function(){return f()},int:function(a,b){return a+Math.floor(f()*(b-a+1))},pick:function(arr){return arr[Math.floor(f()*arr.length)]},shuffle:function(arr){var a=arr.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(f()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}}}

var T=[
{difficulty:17,topic:'geometry',gen:function(rng){
  var a=rng.int(2,6),b=rng.int(2,6),c=rng.int(2,6),d=rng.int(2,6),p=rng.int(5,12);
  var ans=(a*c+b*d)+'/'+p;
  return{statement:'ABCD is a cyclic quadrilateral with AB='+a+', BC='+b+', CD='+c+', DA='+d+' and diagonal BD='+p+'. Find AC, and prove your value is forced by the side lengths and BD.',
  choices:null,answer:'AC = '+ans,
  hint:'Relate the product of the diagonals to the sums of products of opposite sides.',
  solution:'Ptolemy\u2019s theorem says that for a cyclic quadrilateral, AC\u00b7BD = AB\u00b7CD + BC\u00b7DA, so AC = ('+(a*c)+'+'+(b*d)+')/'+p+' = '+ans+'. To prove it, pick E on diagonal AC with \u2220ABE = \u2220DBC. Since ABCD is cyclic, \u2220BAC = \u2220BDC (same arc BC), so \u25b3ABE \u223c \u25b3DBC, giving AE/BC = AB/BD, i.e. AE = AB\u00b7BC/BD. Also \u2220ABD = \u2220EBC (subtract the common angle), and \u2220ADB = \u2220ECB (same arc AB), so \u25b3ABD \u223c \u25b3EBC, giving CE/CD = AD/BD, i.e. CE = CD\u00b7AD/BD. Adding, AC = AE + EC = (AB\u00b7CD + BC\u00b7DA)/BD, so AC\u00b7BD = AB\u00b7CD + BC\u00b7DA. Hence AC is forced to '+ans+', approximately '+(Math.round((a*c+b*d)/p*100)/100)+'. Note the construction needs E to fall on segment AC, which holds because \u2220ABE = \u2220DBC < \u2220ABC, so ray BE enters the interior of angle ABC and meets diagonal AC. The argument works for any cyclic quadrilateral, convex or not, with signed lengths.'}}},
{difficulty:17,topic:'geometry',gen:function(rng){
  var A=rng.int(40,80);
  return{statement:'In \u25b3ABC, \u2220A = '+A+'\u00b0 and I is the incenter. Find \u2220BIC in terms of A, evaluate it, and prove the formula holds for every triangle.',
  choices:null,answer:'90\u00b0 + A/2 = '+(90+A/2)+'\u00b0',
  hint:'Write \u2220IBC and \u2220ICB as halves of B and C, then use the angle sum in \u25b3BIC.',
  solution:'Since I is the incenter, BI and CI bisect angles B and C, so \u2220IBC = B/2 and \u2220ICB = C/2. In \u25b3BIC the angles sum to 180\u00b0, giving \u2220BIC = 180\u00b0 \u2212 (B+C)/2. But B + C = 180\u00b0 \u2212 A, so (B+C)/2 = 90\u00b0 \u2212 A/2, and therefore \u2220BIC = 180\u00b0 \u2212 90\u00b0 + A/2 = 90\u00b0 + A/2 for every triangle. With A = '+A+'\u00b0 this equals '+(90+A/2)+'\u00b0. Intuitively the incenter sits \u201cdeep\u201d inside the triangle, so the angle it subtends at BC is obtuse and grows with A; the extremal cases A \u2192 0\u00b0 and A \u2192 180\u00b0 give 90\u00b0 and 180\u00b0, consistent with I collapsing onto BC or escaping the triangle. Contrast the A-excenter I\u2090, which satisfies \u2220BI\u2090C = 90\u00b0 \u2212 A/2, always acute \u2014 the incenter and excenter formulas differ only by a sign.'}}},
{difficulty:17,topic:'geometry',gen:function(rng){
  var t=rng.int(4,9),p=rng.int(2,5);
  var ans=(t*t)+'/'+p;
  return{statement:'Point P lies outside a circle. The tangent from P touches the circle at T with PT = '+t+'. A secant through P meets the circle at A then B, with PA = '+p+'. Find PB and prove your formula.',
  choices:null,answer:'PB = '+ans+' = '+(t*t/p).toFixed(2),
  hint:'Show \u25b3PTA \u223c \u25b3PBT using the tangent-chord angle.',
  solution:'We claim PT\u00b2 = PA\u00b7PB, so PB = '+t+'\u00b2/'+p+' = '+ans+'. Proof: \u2220TPA is common to \u25b3PTA and \u25b3PBT. The tangent-chord theorem gives \u2220PTA = \u2220PBT, since each equals half the measure of arc TA (the angle between tangent PT and chord TA equals the angle in the alternate segment). Hence \u25b3PTA \u223c \u25b3PBT by AA, matching vertex P to P, T to B, A to T. Corresponding sides give PT/PB = PA/PT, i.e. PT\u00b2 = PA\u00b7PB. This is the power of a point: the product PA\u00b7PB is the same for every secant through P. Substituting the numbers, PB = '+(t*t)+'/'+p+' \u2248 '+(t*t/p).toFixed(2)+', and since B is farther than A along the ray, PB > PA as required. If instead the secant passed through the circle with P between A and B, the same similar triangles (with vertical angles at P) give PA\u00b7PB = PT\u00b7PT\u2032 for two tangents, unifying the tangent-secant and secant-secant forms of power of a point.'}}},
{difficulty:17,topic:'combinatorics',gen:function(rng){
  var n=rng.int(5,12);
  return{statement:'Choose any '+(n+1)+' distinct integers from {1, 2, \u2026, '+(2*n)+'} . Prove that among them one divides another.',
  choices:null,answer:'Write each as odd\u00d72^k; '+(n+1)+' numbers, '+n+' odd parts \u21d2 two share an odd part',
  hint:'Factor out all powers of 2 from each chosen integer. How many odd numbers are available?',
  solution:'Write each chosen integer m as m = q\u00b72^k with q odd and k \u2265 0; this \u201codd part\u201d q is unique. Since 1 \u2264 m \u2264 '+(2*n)+', the odd part q is an odd integer between 1 and '+(2*n)+', so there are only '+n+' possible odd parts: 1, 3, 5, \u2026, '+(2*n-1)+'. We chose '+(n+1)+' integers but there are just '+n+' odd parts, so by the pigeonhole principle two of our integers, say x = q\u00b72^r and y = q\u00b72^s, share the same odd part q. If r \u2264 s then x divides y (quotient 2^(s\u2212r)); otherwise y divides x. Either way one of the chosen integers divides another. This is sharp: the '+n+' integers '+(n+1)+', \u2026, '+(2*n)+' contain no divisibility pair, so '+(n+1)+' is best possible.'}}},
{difficulty:17,topic:'combinatorics',gen:function(rng){
  var k=rng.int(6,10);
  return{statement:'Place '+k+' points inside a unit square (no three on a grid line of a subdivision you choose). Prove that two of them are at distance at most \u221a2/2, and show this bound cannot be improved in general.',
  choices:null,answer:'Split into 4 quarter-squares; two share one; diagonal = \u221a2/2; 4 corners show sharpness',
  hint:'Divide the square into four congruent smaller squares and apply the pigeonhole principle.',
  solution:'Divide the unit square into four congruent squares of side 1/2 by joining the midpoints of opposite sides. By the pigeonhole principle, two of the '+k+' points lie in (or on the boundary of) the same small square \u2014 with '+k+' \u2265 5 > 4 this is forced. The farthest two points in a (1/2)\u00d7(1/2) square can be is its diagonal, \u221a((1/2)\u00b2+(1/2)\u00b2) = \u221a2/2, so those two points are at distance at most \u221a2/2. The bound is sharp: the four corners of the unit square are pairwise at distance at least \u221a2/2 apart (adjacent corners are distance 1, diagonal corners \u221a2), so no smaller universal bound works. In general, n\u00b2+1 points in a unit square force a pair within \u221a2/n, a classic Dirichlet-type geometric estimate.'}}},
{difficulty:18,topic:'geometry',gen:function(rng){
  var r1=rng.int(3,6),r2=rng.int(3,6);
  if(r1===r2)r2++;
  return{statement:'Two circles of radii '+r1+' and '+r2+' with distinct centers O and O\u2032 intersect at X and Y. Prove that the line XY is perpendicular to OO\u2032.',
  choices:null,answer:'X, Y lie on the radical axis, which is perpendicular to OO\u2032',
  hint:'Consider the set of points with equal powers with respect to the two circles.',
  solution:'The power of a point P with respect to the first circle is |PO|\u00b2 \u2212 '+r1+'\u00b2 and with respect to the second |PO\u2032|\u00b2 \u2212 '+r2+'\u00b2. The locus of points with equal powers satisfies |PO|\u00b2 \u2212 |PO\u2032|\u00b2 = '+r1+'\u00b2 \u2212 '+r2+'\u00b2, a constant. Writing this in coordinates with OO\u2032 as the x-axis, the y\u00b2 terms cancel and we get a linear equation in x alone: a vertical line perpendicular to OO\u2032. This is the radical axis. Both intersection points X and Y have power zero with respect to each circle, hence equal powers, so X and Y both lie on the radical axis. Two distinct points determine a line, so line XY is exactly the radical axis, perpendicular to OO\u2032. The argument uses only that X \u2260 Y, i.e. the circles genuinely intersect in two points.'}}},
{difficulty:18,topic:'geometry',gen:function(rng){
  var A=rng.int(50,70);
  return{statement:'In acute \u25b3ABC with \u2220A = '+A+'\u00b0, let H be the orthocenter and let H\u2090 be the reflection of H across side BC. Prove that H\u2090 lies on the circumcircle of \u25b3ABC.',
  choices:null,answer:'\u2220BH\u2090C = 180\u00b0 \u2212 A, so BH\u2090CH is cyclic',
  hint:'Compute \u2220BHC first, then see how reflection changes it.',
  solution:'Let the altitudes from B and C meet at H, with feet E on AC and F on AB. In quadrilateral AEHF, \u2220AEH = \u2220AFH = 90\u00b0, so \u2220EAF + \u2220EHF = 180\u00b0, giving \u2220BHC = \u2220EHF = 180\u00b0 \u2212 A = '+(180-A)+'\u00b0. Reflection across BC is an isometry fixing B and C, so \u2220BH\u2090C = \u2220BHC = 180\u00b0 \u2212 A. Now \u2220BH\u2090C + \u2220BAC = (180\u00b0 \u2212 A) + A = 180\u00b0, so quadrilateral BH\u2090CA has a pair of opposite angles summing to 180\u00b0 and is therefore cyclic. Its circumcircle through B, C, A is the circumcircle of \u25b3ABC, hence H\u2090 lies on it. Equivalently, the reflection of H across any side, or across any side\u2019s midpoint, lands on the circumcircle \u2014 the orthocenter\u2019s mirror symmetry with the circumcircle.'}}},
{difficulty:18,topic:'combinatorics',gen:function(rng){
  var cols=rng.pick([['red','blue'],['crimson','navy'],['scarlet','azure']]);
  return{statement:'Every edge of the complete graph K\u2086 is colored '+cols[0]+' or '+cols[1]+'. Prove there is always a monochromatic triangle.',
  choices:null,answer:'Yes: pigeonhole on 5 edges from one vertex forces a monochromatic K\u2083',
  hint:'Fix one vertex; five edges in two colors force three of one color.',
  solution:'Pick any vertex v. It has 5 incident edges, each '+cols[0]+' or '+cols[1]+', so by the pigeonhole principle at least 3 of them share a color \u2014 say '+cols[0]+' edges vx, vy, vz. Now look at the triangle xyz. If any of its edges, e.g. xy, is '+cols[0]+', then vxy is a '+cols[0]+' triangle and we are done. Otherwise all three edges xy, yz, zx are '+cols[1]+', forming a '+cols[1]+' triangle xyz. Either way a monochromatic triangle exists. Hence the Ramsey number R(3,3) is at most 6; the 2-coloring of K\u2085 given by a 5-cycle in each color shows R(3,3) > 5, so R(3,3) = 6 exactly. This is the smallest nontrivial Ramsey number, the seed of the theorem that R(s,t) is finite for all s, t.'}}},
{difficulty:18,topic:'combinatorics',gen:function(rng){
  var n=rng.int(4,8);
  return{statement:'A derangement of {1,\u2026,'+n+'} is a permutation with no fixed points. Use inclusion\u2013exclusion to prove that the number D\u2099 of derangements equals '+n+'!\u00b7\u03a3(\u22121)\u1d4f/k! (sum k=0..'+n+'), and deduce D\u2099 is the nearest integer to '+n+'!/e.',
  choices:null,answer:'D\u2099 = \u03a3(\u22121)\u1d4f\u00b7C('+n+',k)\u00b7('+n+'\u2212k)!; nearest integer to '+n+'!/e',
  hint:'Let A\u1d62 be the permutations fixing i; count the complement of \u222aA\u1d62.',
  solution:'Let A\u1d62 be the set of permutations of '+n+' fixing i. Then |A\u1d62| = ('+n+'\u22121)!, and for any k-subset S of indices, |\u2229_{i\u2208S} A\u1d62| = ('+n+'\u2212k)!. By inclusion\u2013exclusion, the permutations with at least one fixed point number \u03a3_{k=1}^{'+n+'} (\u22121)^{k+1} C('+n+',k) ('+n+'\u2212k)!. Subtracting from '+n+'! gives D\u2099 = \u03a3_{k=0}^{'+n+'} (\u22121)^k C('+n+',k) ('+n+'\u2212k)! = '+n+'! \u03a3_{k=0}^{'+n+'} (\u22121)^k/k!, as claimed. For the rounding claim, 1/e = \u03a3_{k=0}^\u221e (\u22121)^k/k!, so |'+n+'!/e \u2212 D\u2099| = '+n+'! \u00b7 |\u03a3_{k='+(n+1)+'}^\u221e (\u22121)^k/k!| < '+n+'!/('+(n+1)+')! = 1/'+(n+1)+' < 1/2, using the alternating-series remainder bound on a series with decreasing terms. Hence D\u2099 is within half an integer of '+n+'!/e and must be the nearest integer to it. Thus about 1/e \u2248 37% of all permutations are derangements, e.g. for n = '+n+', D\u2099 \u2248 '+Math.round((function(){var s=0,f=1;for(var k=0;k<=n;k++){if(k>0)f*=k;s+=(k%2?-1:1)/f}return s})()* (function(){var f=1;for(var k=2;k<=n;k++)f*=k;return f})())+'.'}}},
{difficulty:18,topic:'combinatorics',gen:function(rng){
  var n=rng.int(8,16);
  return{statement:'Let G be a graph with '+n+' vertices. Prove that the number of vertices of odd degree is even.',
  choices:null,answer:'\u03a3 deg = 2|E| is even, so odd-degree vertices come in pairs',
  hint:'Add up all the vertex degrees. What does each edge contribute?',
  solution:'This is the handshaking lemma. Sum the degrees over all '+n+' vertices: \u03a3_v deg(v). Every edge has two endpoints, so it contributes exactly 2 to this sum (a loop contributes 2 to its single vertex). Hence \u03a3_v deg(v) = 2|E|, an even number. Split the sum into vertices of even degree and vertices of odd degree. The even-degree part is a sum of even numbers, hence even. Therefore the odd-degree part must also be even, since even = even + (odd part). But a sum of odd numbers is even only when there are evenly many of them. So the number of odd-degree vertices is even. For instance, in any party the number of people who shook an odd number of hands is even \u2014 a one-line parity obstruction ruling out many \u201cgraphs\u201d.'}}}
];

if(require.main===module){
  var fails=[];
  T.forEach(function(t,ti){
    for(var s=0;s<3;s++){
      var rng=mkRng(ti*100+s),tag='t'+ti+' seed'+s;
      try{
        var r=t.gen(rng);
        if(!r.statement||r.statement.length===0||r.statement.length>600)fails.push(tag+': statement bad ('+(r.statement||'').length+')');
        if(/[<>]/.test(r.statement))fails.push(tag+': raw HTML brackets in statement');
        if(r.choices!==null)fails.push(tag+': choices not null');
        if(!r.answer||r.answer.length===0)fails.push(tag+': answer empty');
        if(!r.hint||r.hint.length===0)fails.push(tag+': hint empty');
        if(!r.solution||r.solution.length<120)fails.push(tag+': solution too short ('+(r.solution||'').length+')');
        if(t.difficulty!==17&&t.difficulty!==18)fails.push(tag+': difficulty '+t.difficulty);
        if(t.topic!=='geometry'&&t.topic!=='combinatorics')fails.push(tag+': topic '+t.topic);
      }catch(e){fails.push(tag+': threw '+e.message)}
    }
  });
  var d17=T.filter(function(t){return t.difficulty===17}).length,d18=T.filter(function(t){return t.difficulty===18}).length;
  var g=T.filter(function(t){return t.topic==='geometry'}).length,c=T.filter(function(t){return t.topic==='combinatorics'}).length;
  if(T.length!==10)fails.push('length '+T.length);if(d17!==5)fails.push('d17='+d17);if(d18!==5)fails.push('d18='+d18);
  if(g!==5)fails.push('geo='+g);if(c!==5)fails.push('comb='+c);
  // purity check: same seed -> same output
  T.forEach(function(t,ti){var a=JSON.stringify(t.gen(mkRng(7))),b=JSON.stringify(t.gen(mkRng(7)));if(a!==b)fails.push('t'+ti+': impure gen')});
  if(fails.length){console.log('FAIL');fails.forEach(function(f){console.log(' - '+f)});process.exit(1)}
  console.log('PASS: 10 templates (5x17, 5x18; 5 geometry, 5 combinatorics), 3 seeds each, purity ok');
  console.log(JSON.stringify(T[0].gen(mkRng(42)),null,1).slice(0,900));
}
module.exports=T;
