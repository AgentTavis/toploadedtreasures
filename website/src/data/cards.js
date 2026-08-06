// The Vault: featured showcase cards from the owner's own photos.
// Every label below is read directly off the slab in the photo — do not invent grades.
//
// `productId` links a grail to its shop product in data/products.js, which is where the PRICE
// lives. The Vault's Add to Cart button adds that same product, so buying a card from the
// Vault and from the shop grid hit one line item instead of two. A grail with no productId
// (or one pointing at a missing product) simply renders no button — never a guessed price.
export const grails = [
  {
    id: 'ohtani',
    productId: 'p-ohtani',
    img: 'assets/cards/ohtani.jpg',
    player: 'Shohei Ohtani',
    set: '2022 Topps Gallery Portrait Gallery #PG7',
    grade: 'PSA 10',
    sport: 'Baseball',
    tag: 'Gem mint',
  },
  {
    id: 'dybantsa',
    productId: 'p-dybantsa',
    img: 'assets/cards/dybantsa.jpg',
    player: 'AJ Dybantsa',
    set: '2025 Bowman U Now #1',
    grade: 'PSA 10',
    sport: 'Basketball',
    tag: 'No. 1 recruit',
  },
  {
    id: 'judge',
    productId: 'p-judge',
    img: 'assets/cards/judge.jpg',
    player: 'Aaron Judge',
    set: '2022 Topps Chrome X-Fractor #99',
    grade: 'PSA 9',
    sport: 'Baseball',
    tag: 'X-Fractor',
  },
  {
    id: 'mbappe',
    productId: 'p-mbappe',
    img: 'assets/cards/mbappe.jpg',
    player: 'Kylian Mbappe',
    set: '2024-25 Select FIFA Pandora #169',
    grade: 'PSA 10',
    sport: 'Soccer',
    tag: 'Pandora',
  },
]
