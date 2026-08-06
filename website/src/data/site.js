// Single source of truth for links, handles, and shows. No individual owners (company voice).
export const site = {
  name: 'Top Loaded Treasures',
  est: 'EST 2026',
  city: 'Wilmington, NC',
  // DM-to-transact until the shop goes live. Instagram DM is the primary inbox.
  dmUrl: 'https://instagram.com/toploadedtreasuress',
  // Public Instagram profile. Used as the temporary "buy" destination for Mystery Packs
  // until the shop checkout is live.
  instagramUrl: 'https://instagram.com/toploadedtreasuress',
  whatnotUrl: 'https://www.whatnot.com/user/toploadedtreasures',
  socials: [
    { key: 'whatnot', label: 'Whatnot', handle: 'Live selling', url: 'https://www.whatnot.com/user/toploadedtreasures', note: 'Live' },
    { key: 'youtube', label: 'YouTube', handle: '@toploadedtreasures', url: 'https://www.youtube.com/@toploadedtreasures' },
    { key: 'instagram', label: 'Instagram', handle: '@toploadedtreasuress', url: 'https://instagram.com/toploadedtreasuress' },
  ],
  shows: [
    { name: 'American Legion Post 10', place: 'Wilmington, NC', tag: 'Home base' },
    { name: 'The National', place: 'Rotating host cities', tag: 'On the road' },
    { name: 'Las Vegas shows', place: 'Las Vegas, NV', tag: 'On the road' },
  ],
}

/** Pick socials by key, in the exact order given. Lets each surface set its own order. */
export const socialsInOrder = (...keys) =>
  keys.map((k) => site.socials.find((s) => s.key === k)).filter(Boolean)
