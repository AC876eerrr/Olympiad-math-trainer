// problems/templates-usajmo.js — merges the USAJMO template parts.
// The core engine sorts by difficulty ascending at load, so cross-file
// ordering does not matter.
module.exports = [
  ...require('./templates-usajmo-a1'),
  ...require('./templates-usajmo-a2'),
  ...require('./templates-usajmo-b'),
];
