import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from './shop/CartContext.jsx'
import ProductCard from './shop/ProductCard.jsx'
import ProductDetail from './shop/ProductDetail.jsx'
import CartDrawer from './shop/CartDrawer.jsx'
import Icon from '../components/common/Icon.jsx'
import { asset } from '../lib/asset'
import { products, categories } from '../data/products'
import { site } from '../data/site'

function ShopBar() {
  const cart = useCart()
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/85 backdrop-blur-md">
      <div className="container-tlt flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-cream/80 hover:text-gold">
          <Icon name="arrowRight" size={18} className="rotate-180" />
          <img src={asset('assets/logo.png')} alt="Top Loaded Treasures" width="36" height="36" className="h-9 w-9" />
          <span className="hidden font-display text-lg uppercase tracking-wide sm:block">Back to site</span>
        </Link>
        <button
          onClick={() => cart.setOpen(true)}
          className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-cream hover:border-gold/50"
        >
          <Icon name="cart" size={20} />
          <span className="hidden font-display uppercase tracking-wide sm:block">Cart</span>
          {cart.count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 font-mono text-[11px] font-bold text-navy-950">
              {cart.count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

function ShopInner() {
  // ?cat=<category> lets other pages deep-link into a filtered view (e.g. the home
  // "Buy a Mystery Pack Now" button). Unknown values fall back to All.
  const [params] = useSearchParams()
  const requested = params.get('cat')
  const [cat, setCat] = useState(categories.includes(requested) ? requested : 'All')
  const [selected, setSelected] = useState(null)
  const list = useMemo(() => (cat === 'All' ? products : products.filter((p) => p.category === cat)), [cat])

  return (
    <div className="min-h-screen">
      <ShopBar />

      {/* Coming soon gate */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-70" />
        <div className="container-tlt text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            <span className="h-2 w-2 animate-glowpulse rounded-full bg-gold" /> The online shop
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold uppercase leading-[0.95] text-cream sm:text-6xl">
            Curated <span className="text-foil">drops</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/75">
            This is not a giant catalog. We keep a small, hand-picked lineup of singles and slabs and
            rotate it often, so what you see is what we have right now. New drops land regularly and the
            good ones do not sit long. Priced fair, every time.
          </p>
          <p className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-gold">
            <Icon name="flame" size={15} /> Limited quantities · Rotating inventory · New drops often
          </p>
          <p className="mx-auto mt-5 max-w-xl text-cream/60">
            Online checkout is coming soon. Until it goes live, grab yours live on Whatnot.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={site.whatnotUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <Icon name="live" size={20} /> Shop live on Whatnot
            </a>
          </div>
        </div>
      </section>

      {/* Storefront preview */}
      <section className="pb-24">
        <div className="container-tlt">
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl text-cream">This week's lineup</h2>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cream/60">
                Sample lineup
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 font-display text-sm uppercase tracking-wide transition ${
                    cat === c ? 'bg-gold text-navy-950' : 'border border-white/15 bg-white/5 text-cream/70 hover:text-gold'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container-tlt flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <Link to="/" className="flex items-center gap-2 text-cream/70 hover:text-gold">
            <img src={asset('assets/logo.png')} alt="" width="28" height="28" className="h-7 w-7" />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              {site.name} <span className="text-cream/40">/</span> {site.est}
            </span>
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold/80">Find the treasure</p>
        </div>
      </footer>

      <ProductDetail product={selected} onClose={() => setSelected(null)} />
      <CartDrawer />
    </div>
  )
}

// CartProvider now lives in main.jsx (shared with the home page Vault), so this just
// renders the shop.
export default function Shop() {
  return <ShopInner />
}
