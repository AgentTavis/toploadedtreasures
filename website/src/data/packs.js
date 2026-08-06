// Mystery Pack tiers — three tiers with pricing, cheapest first.
// `badge` = the HOME section thumbnail. Every tier now has its OWN single-sport hero shots, so
// each thumbnail shows a single bag of that actual pack style (a shrunk 3-bag combo reads
// cluttered at ~90px). All three use the BASKETBALL shot for a consistent set, and it differs
// from the football Slab in the feature panel. The SHOP keeps combos on the product cards and
// shows each tier's own per-sport photos in the detail gallery (see data/products.js).
// NOTE: Auto Pack copy deliberately avoids implying autographs are signed directly on the
// card — some are authenticated sticker autos. Say "certified autograph" only.
export const packs = [
  {
    id: 'relic',
    // Official name, matches the sticker printed on the actual bags.
    name: '# or Patch Pack',
    price: '$5',
    tagline: 'Numbered and rare',
    badge: 'assets/pack-patch-basketball.jpg',
    blurb: 'Serial-numbered parallels, relics, and patches.',
    accent: 'teal',
  },
  {
    id: 'auto',
    name: 'Auto Pack',
    price: '$10',
    tagline: 'Certified autographs',
    badge: 'assets/pack-auto-basketball.jpg',
    blurb: 'A certified autograph in every single pack.',
    accent: 'gold',
    signature: true,
  },
  {
    id: 'slab',
    name: 'Slab Pack',
    price: '$20',
    tagline: 'Graded, guaranteed',
    badge: 'assets/pack-slab-basketball.jpg',
    blurb: 'A graded slab in hand, guaranteed in every pack.',
    accent: 'gold',
    signature: true,
  },
]

// Sports every tier is available in.
export const packSports = ['Baseball', 'Basketball', 'Football']
