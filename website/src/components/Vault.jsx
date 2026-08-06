import Reveal from './common/Reveal.jsx'
import SplitHeadline from './common/SplitHeadline.jsx'
import HoloCard from './HoloCard.jsx'
import Icon from './common/Icon.jsx'
import { grails } from '../data/cards'
import { products } from '../data/products'
import { useCart } from '../pages/shop/CartContext.jsx'

// Price + Add to Cart come from the matching shop product (grail.productId), so the Vault and
// the shop share one source of truth and one cart line item per card.
const productFor = (grail) => products.find((p) => p.id === grail.productId)

export default function Vault() {
  const cart = useCart()
  return (
    <section id="vault" className="relative scroll-mt-24 overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-70" />
      <div className="container-tlt">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="kicker mb-3">The Vault</p>
            <SplitHeadline as="h2" text="Featured Grails" className="text-4xl font-bold text-cream sm:text-5xl" />
            <p className="mt-4 text-lg text-cream/70">
              Real cards we have pulled and vaulted, graded and gem. These are not stock photos. Move your
              cursor across a card to catch the foil.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream/70">
            <Icon name="spark" size={16} className="text-gold" />
            <span className="font-mono uppercase tracking-widest">Hover to tilt</span>
          </div>
        </div>

        <Reveal className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07} y={30}>
          {grails.map((c) => (
            <figure key={c.id} data-reveal className="flex flex-col gap-3">
              <HoloCard card={c} />
              <figcaption className="px-0.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg leading-tight text-cream">{c.player}</h3>
                  <span className="shrink-0 rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gold">
                    {c.grade}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-snug text-cream/55">{c.set}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cream/60">
                    {c.sport}
                  </span>
                  <span className="rounded border border-rust/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-rust-bright">
                    {c.tag}
                  </span>
                </div>

                {/* Only rendered when the grail has a matching shop product with a price —
                    no product, no button, never an invented price. */}
                {(() => {
                  const p = productFor(c)
                  if (!p) return null
                  return (
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="font-display text-2xl leading-none text-cream">${p.price}</span>
                      <button
                        onClick={() => cart.add(p)}
                        aria-label={`Add ${c.player} to cart`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-2 font-display text-sm uppercase tracking-wide text-navy-950 transition hover:bg-gold-hi"
                      >
                        <Icon name="plus" size={16} /> Add
                      </button>
                    </div>
                  )
                })()}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
