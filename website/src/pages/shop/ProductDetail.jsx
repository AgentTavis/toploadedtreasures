import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../../components/common/Icon.jsx'
import { asset } from '../../lib/asset'
import { useCart } from './CartContext.jsx'

export default function ProductDetail({ product, onClose }) {
  const cart = useCart()

  // Mystery Packs are sold per sport, so the buyer picks one before adding to cart.
  const sports = product?.sports || null
  const [sport, setSport] = useState(null)
  const [frame, setFrame] = useState(0)

  // Gallery: an explicit list when the product has one, otherwise just its single photo.
  const gallery = useMemo(() => {
    if (!product) return []
    return product.gallery?.length ? product.gallery : [{ src: product.img, label: null }]
  }, [product])

  // Reset per-product state whenever a different product is opened.
  useEffect(() => {
    setSport(null)
    setFrame(0)
  }, [product?.id])

  // Picking a sport jumps the gallery to that sport's photo when one exists.
  const chooseSport = (s) => {
    setSport(s)
    const i = gallery.findIndex((g) => g.label === s)
    if (i >= 0) setFrame(i)
  }

  const step = (dir) => setFrame((f) => (f + dir + gallery.length) % gallery.length)

  const needsSport = Boolean(sports) && !sport
  const current = gallery[frame] || gallery[0]

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-t-3xl border border-white/10 bg-navy-900 sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-navy-950/60 text-cream hover:text-gold"
              aria-label="Close"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="grid gap-0 sm:grid-cols-2">
              {/* Image, with arrow-through gallery when the product has more than one photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy-850 sm:aspect-auto">
                <img
                  key={current.src}
                  src={asset(current.src)}
                  alt={current.label ? `${product.name}, ${current.label}` : product.name}
                  className="h-full w-full object-cover"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy-950/70 text-cream backdrop-blur transition hover:border-gold/50 hover:text-gold"
                    >
                      <Icon name="arrowRight" size={18} className="rotate-180" />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy-950/70 text-cream backdrop-blur transition hover:border-gold/50 hover:text-gold"
                    >
                      <Icon name="arrowRight" size={18} />
                    </button>

                    {current.label && (
                      <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-gold/40 bg-navy-950/75 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                        {current.label}
                      </span>
                    )}

                    <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                      {gallery.map((g, i) => (
                        <button
                          key={g.src}
                          onClick={() => setFrame(i)}
                          aria-label={`Photo ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            i === frame ? 'w-5 bg-gold' : 'w-1.5 bg-cream/40 hover:bg-cream/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col p-6">
                <span className="kicker">{product.category}</span>
                <h3 className="mt-2 text-3xl text-cream">{product.name}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-cream/60">
                    {product.sport}
                  </span>
                  <span className="rounded border border-gold/30 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-gold">
                    {product.grade}
                  </span>
                  <span className="rounded border border-rust/30 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-rust-bright">
                    {product.rarity}
                  </span>
                </div>

                {sports ? (
                  <div className="mt-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
                      Choose your sport
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {sports.map((s) => (
                        <button
                          key={s}
                          onClick={() => chooseSport(s)}
                          aria-pressed={sport === s}
                          className={`rounded-full px-4 py-2 font-display text-sm uppercase tracking-wide transition ${
                            sport === s
                              ? 'bg-gold text-navy-950'
                              : 'border border-white/15 bg-white/5 text-cream/75 hover:border-gold/50 hover:text-gold'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-cream/70">
                    Demo listing for the storefront preview. Full condition notes, photos, and
                    provenance land here when the shop goes live.
                  </p>
                )}

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-4xl text-cream">${product.price}</span>
                    <button
                      onClick={() => cart.add({ ...product, sport: sport || product.sport })}
                      disabled={needsSport}
                      className={needsSport
                        ? 'btn cursor-not-allowed border border-white/10 bg-white/5 text-cream/40'
                        : 'btn-gold'}
                    >
                      <Icon name="cart" size={18} /> Add to cart
                    </button>
                  </div>
                  {needsSport && (
                    <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-widest text-cream/45">
                      Pick a sport first
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
