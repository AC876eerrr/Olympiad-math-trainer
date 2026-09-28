// content/adventure.js — Adventure mode chapter definitions.
// Chapter 1 is fully playable. Chapters 2–6 are metadata only (locked) so the
// architecture (chapter field in saved state, per-chapter gating) is ready
// when their content is authored.
const CHAPTERS = [
  {
    n: 1,
    title: 'The Gatekeeper of Numbers',
    playable: true,
    bossName: 'Malachar the Divider',
    bossMaxHp: 100,
    playerMaxHp: 100,
    playerDamage: 12,   // boss HP lost per correct answer
    bossDamage: 10,     // player HP lost per wrong answer
    xpPerWin: 25,
    cashPerWin: 5,
    startingPotions: 2,
    potionHeal: 30,
    intro: 'Beyond the Arch of Integers sleeps Malachar the Divider, gatekeeper of the mathematical realms. ' +
      'He feeds on wrong answers and fears only one thing: a mind that does not give up. ' +
      'Answer his challenges to strike him down. Wrong answers wound YOU. ' +
      'Spend Math Cash wisely, keep a potion ready, and prove you belong in Chapter 2.',
    victoryText: 'Malachar crumbles into prime factors! The gate swings open. Chapter 2 awaits its hero...',
    defeatText: 'Your vision blurs as Malachar laughs. Retreat, rest, and return stronger — the gate is still there.',
  },
  { n: 2, title: 'The Caverns of Combinations', playable: false, teaser: 'Count your way through the dark.' },
  { n: 3, title: 'The Geometry Citadel', playable: false, teaser: 'Angles guard every door.' },
  { n: 4, title: 'The Number Theory Depths', playable: false, teaser: 'Primes older than stone.' },
  { n: 5, title: 'The Algebra Storm', playable: false, teaser: 'Solve or be scattered.' },
  { n: 6, title: 'The Olympiad Throne', playable: false, teaser: 'The final boss remembers every mistake you ever made.' },
];

function getChapter(n) {
  return CHAPTERS.find((c) => c.n === n) || null;
}

module.exports = { CHAPTERS, getChapter };
