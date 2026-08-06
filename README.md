# Top Loaded Treasures — website

This repository holds everything that makes **https://toploadedtreasures.com** work.

The site is a single web page (plus a Shop page) covering the shop, the Vault of featured
graded cards, the gold Mystery Packs, merch, reviews, and where to find you.

**The most important thing to know:** when you save a change here, the live website updates
itself in about two minutes. You never have to "upload" anything.

---

## How to make a change

You do not need to understand the code. Open this folder in **Claude Code** and describe what
you want in plain English, for example:

> "Change the Slab Pack price from $20 to $25."
>
> "Swap the football Mystery Pack photo for this new one."
>
> "Add a new review from Marcus that says the packs were worth it."

Claude Code will find the right file and make the edit. Then tell it:

> "Commit and push this."

That's it. GitHub rebuilds the site and it goes live in roughly two minutes.

### Checking that it worked

1. Go to the **Actions** tab at the top of this repository on GitHub.
2. The newest entry at the top is your change.
3. A **yellow dot** means it's still building. A **green check** means it's live.
4. A **red X** means something went wrong — the old version of the site stays up, nothing
   breaks. Tell Claude Code "the deploy failed, can you check the Actions log" and it can
   read the error and fix it.

Then open https://toploadedtreasures.com to see it. If it looks unchanged, do a hard refresh
(**Ctrl+Shift+R**, or **Cmd+Shift+R** on a Mac) — your browser may be showing a saved copy.

---

## Where things live

Everything for the site is inside the **`website`** folder.

### Text, prices, and product info

These are the files you'll change most. They're in `website/src/data/`:

| File | What's in it |
| --- | --- |
| `products.js` | Everything in the online Shop: names, **prices**, categories, photos |
| `packs.js` | The three Mystery Pack tiers on the home page — names, prices, descriptions |
| `cards.js` | The Vault "Featured Grails" — player, card details, grade |
| `reviews.js` | Customer reviews |
| `site.js` | Shop name, city, social media links |

### Wording on the page

Headlines and paragraphs live in `website/src/components/`. The file names match the section:

- `Hero.jsx` — the big top section with the logo and headline
- `Vault.jsx` — the "Featured Grails" section
- `MysteryPacks.jsx` — the gold Mystery Packs section
- `Merch.jsx` — the t-shirt / merch section
- `Reviews.jsx` — customer reviews section
- `FindUs.jsx` — where to find you
- `ShopCTA.jsx` — the "You found the spot" section at the bottom
- `Footer.jsx` — the very bottom of the page

### Photos

All images are in `website/public/assets/`.

- `cards/` — the graded card photos in the Vault
- `pack-*.jpg` — individual Mystery Pack bags (by tier and sport)
- `tier-*.jpg` — the three-bag group photos used in the Shop
- `stickers.jpg`, `merch-tee.jpg`, `logo.png` — stickers, shirt, logo

To swap a photo, the simplest approach is to give Claude Code the new image and say which one
it replaces. Keeping the same file name means nothing else has to change.

---

## Please don't change these

These three keep the site online. Changing them can take the site down or disconnect the
domain name:

1. **`website/public/CNAME`** — this is what points `toploadedtreasures.com` at the site.
   If it's deleted or edited, the domain stops working.
2. **`.github/workflows/deploy.yml`** — the instructions that rebuild and publish the site.
3. **The `base` line in `website/vite.config.js`** — controls how the site finds its own
   images and styles.

If you ever think one of these needs to change, ask Claude Code to explain what it does first.

---

## Running the site on your own computer (optional)

You don't need this to make changes — editing and pushing is enough. This is only useful if
you want to preview changes privately before they go live.

**One-time setup:** install [Node.js](https://nodejs.org) (choose the "LTS" version).

Then, in a terminal:

```bash
cd website
npm install
npm run dev
```

It will print a link (usually `http://localhost:5173`). Open it in your browser to see the
site running on your own machine. Changes you save appear instantly. Press **Ctrl+C** in the
terminal to stop.

Nothing you do here affects the live site until you push your changes.

---

## How the automatic publishing works

When you push a change to the `main` branch, GitHub:

1. Installs what the site needs to build.
2. Builds the finished website.
3. Checks that the domain file (`CNAME`) is intact — the build stops if it isn't.
4. Publishes it to GitHub Pages, which serves toploadedtreasures.com.

This runs on GitHub's servers using credentials GitHub creates on the spot. **No password,
access token, or secret is stored in this repository**, and you don't need one to publish.

---

## Quick reference

| | |
| --- | --- |
| Live site | https://toploadedtreasures.com |
| Where the code lives | the `website` folder |
| Prices and products | `website/src/data/products.js` |
| Time from push to live | about 2 minutes |
| Check deploy status | the **Actions** tab on GitHub |
