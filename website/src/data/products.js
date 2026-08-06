// Sample lineup for the Shop scaffolding. Prices are illustrative for singles/slabs, but
// Mystery Pack prices intentionally MATCH the live tier pricing in data/packs.js
// (Slab $20, Auto $10, # or Patch $5) and the sticker price is real.
// When the shop goes live this array gets swapped for a real product source; the grid,
// cart, and detail view do not need to change.
export const categories = ['All', 'Singles', 'Slabs', 'Mystery Packs', 'Stickers']

// Mystery Packs are sold per sport, so pack products carry a sport list for the selector and
// a gallery the buyer can arrow through. Each tier's gallery shows that tier's OWN bag photos,
// never a stand-in from another tier. All three tiers now have all three sports.
export const packSportOptions = ['Baseball', 'Basketball', 'Football']

const slabGallery = [
  { src: 'assets/tier-slab.jpg', label: 'All sports' },
  { src: 'assets/pack-slab-baseball.jpg', label: 'Baseball' },
  { src: 'assets/pack-slab-basketball.jpg', label: 'Basketball' },
  { src: 'assets/pack-slab-football.jpg', label: 'Football' },
]
const autoGallery = [
  { src: 'assets/tier-auto.jpg', label: 'All sports' },
  { src: 'assets/pack-auto-baseball.jpg', label: 'Baseball' },
  { src: 'assets/pack-auto-basketball.jpg', label: 'Basketball' },
  { src: 'assets/pack-auto-football.jpg', label: 'Football' },
]
const patchGallery = [
  { src: 'assets/tier-relic.jpg', label: 'All sports' },
  { src: 'assets/pack-patch-baseball.jpg', label: 'Baseball' },
  { src: 'assets/pack-patch-basketball.jpg', label: 'Basketball' },
  { src: 'assets/pack-patch-football.jpg', label: 'Football' },
]

export const products = [
  { id: 'p-mbappe', name: 'Kylian Mbappe Select Pandora', category: 'Slabs', price: 899, grade: 'PSA 10', sport: 'Soccer', img: 'assets/cards/mbappe.jpg', rarity: 'Pandora' },
  { id: 'p-ohtani', name: 'Shohei Ohtani Portrait Gallery', category: 'Slabs', price: 349, grade: 'PSA 10', sport: 'Baseball', img: 'assets/cards/ohtani.jpg', rarity: 'Gem mint' },
  { id: 'p-judge', name: 'Aaron Judge Topps Chrome X-Fractor', category: 'Slabs', price: 249, grade: 'PSA 9', sport: 'Baseball', img: 'assets/cards/judge.jpg', rarity: 'X-Fractor' },
  { id: 'p-dybantsa', name: 'AJ Dybantsa Bowman U Now #1', category: 'Slabs', price: 199, grade: 'PSA 10', sport: 'Basketball', img: 'assets/cards/dybantsa.jpg', rarity: 'No. 1 recruit' },
  // Photo shows a PSA MINT 9 slab (2021 Clearly Donruss #D35, cert 64870691), not a raw card.
  // Deliberately still filed under Singles: it is the only product in that category, so moving
  // it to Slabs would leave the Singles filter rendering an empty grid. Move it once there is
  // real raw inventory to take its place.
  { id: 'p-macjones', name: 'Mac Jones Downtown RC', category: 'Singles', price: 129, grade: 'PSA 9', sport: 'Football', img: 'assets/cards/mac-jones.jpg', rarity: 'SSP' },

  { id: 'p-slabpack', name: 'Slab Pack', category: 'Mystery Packs', price: 20, grade: 'Sealed', sport: 'Multi', img: 'assets/tier-slab.jpg', rarity: 'Graded guaranteed', sports: packSportOptions, gallery: slabGallery },
  { id: 'p-autopack', name: 'Auto Pack', category: 'Mystery Packs', price: 10, grade: 'Sealed', sport: 'Multi', img: 'assets/tier-auto.jpg', rarity: 'Autograph guaranteed', sports: packSportOptions, gallery: autoGallery },
  { id: 'p-relicpack', name: '# or Patch Pack', category: 'Mystery Packs', price: 5, grade: 'Sealed', sport: 'Multi', img: 'assets/tier-relic.jpg', rarity: 'Numbered', sports: packSportOptions, gallery: patchGallery },

  { id: 'p-stickers', name: 'Sticker Pack (10)', category: 'Stickers', price: 5.99, grade: '10 pack', sport: 'Logo', img: 'assets/stickers.jpg', rarity: 'Die cut' },
]
