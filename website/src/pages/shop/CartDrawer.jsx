import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../../components/common/Icon.jsx'
import { asset } from '../../lib/asset'
import { site } from '../../data/site'
import { useCart } from './CartContext.jsx'

export default function CartDrawer() {
  const cart = useCart()
  return (
    <AnimatePresence>
      {cart.open && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={() => cart.setOpen(false)} />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-navy-900"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h3 className="flex items-center gap-2 text-2xl text-cream">
                <Icon name="cart" size={22} className="text-gold" /> Your cart
              </h3>
              <button
                onClick={() => cart.setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream hover:text-gold"
                aria-label="Close cart"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/5 text-cream/50">
                      <Icon name="cart" size={26} />
                    </div>
                    <p className="mt-4 text-cream/60">Your cart is empty.</p>
                    <p className="text-sm text-cream/40">Add a few cards to preview checkout.</p>
                  </div>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {cart.items.map((i) => (
                    <li key={i.id} className="flex gap-3">
                      <img src={asset(i.img)} alt={i.name} className="h-20 w-16 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-cream">{i.name}</p>
                        <p className="font-display text-lg text-gold">${i.price}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <button onClick={() => cart.dec(i.id)} className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-cream hover:text-gold" aria-label="Decrease quantity">
                            <Icon name="minus" size={14} />
                          </button>
                          <span className="w-6 text-center font-mono text-sm text-cream">{i.qty}</span>
                          <button onClick={() => cart.inc(i.id)} className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-cream hover:text-gold" aria-label="Increase quantity">
                            <Icon name="plus" size={14} />
                          </button>
                          <button onClick={() => cart.remove(i.id)} className="ml-auto grid h-7 w-7 place-items-center rounded-full text-cream/50 hover:text-rust-bright" aria-label="Remove item">
                            <Icon name="trash" size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="mb-3 flex items-center justify-between text-cream">
                <span className="text-cream/70">Subtotal</span>
                <span className="font-display text-2xl">${cart.total}</span>
              </div>
              <div className="rounded-xl border border-gold/30 bg-gold/5 p-3 text-center">
                <p className="font-display text-lg uppercase tracking-wide text-gold">Checkout coming soon</p>
                <p className="mt-1 text-xs text-cream/60">
                  Online payments launch shortly. For now, grab it live on Whatnot.
                </p>
              </div>
              <button disabled className="btn mt-3 w-full cursor-not-allowed border border-white/10 bg-white/5 text-cream/40">
                Checkout
                <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] tracking-widest">SOON</span>
              </button>
              <div className="mt-3">
                <a href={site.whatnotUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full px-3 py-2 text-sm">
                  <Icon name="live" size={16} /> Shop live on Whatnot
                </a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
