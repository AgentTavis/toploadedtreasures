import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './common/Icon.jsx'
import { asset } from '../lib/asset'
import { prefersReduced } from '../lib/gsap'
import { useCart } from '../pages/shop/CartContext.jsx'

const LINKS = [
  { id: 'vault', label: 'The Vault' },
  { id: 'packs', label: 'Mystery Packs' },
  { id: 'merch', label: 'Merch' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'find', label: 'Find Us' },
]

function scrollToId(id, close) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
  close && close()
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const cart = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-navy-950/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-tlt relative flex h-16 items-center justify-between md:h-20">
        <button
          onClick={() => scrollToId('top')}
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
          aria-label="Top Loaded Treasures, back to top"
        >
          <img src={asset('assets/logo.png')} alt="" width="44" height="44" className="h-11 w-11 drop-shadow" />
          <span className="hidden font-display text-lg uppercase leading-none tracking-wide text-cream sm:block">
            Top Loaded<br />
            <span className="text-gold">Treasures</span>
          </span>
        </button>

        {/* Absolutely centered so the link row does not drift with the width of the
            brand lockup vs the Shop button. justify-between alone pushed it ~8px right. */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="font-display text-base uppercase tracking-wide text-cream/75 transition-colors hover:text-gold"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Only appears once something is in the cart, so the default nav is unchanged.
              Lets you reopen the drawer after adding a grail from the Vault. */}
          {cart.count > 0 && (
            <button
              onClick={() => cart.setOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-cream transition hover:border-gold/50"
              aria-label={`Open cart, ${cart.count} item${cart.count === 1 ? '' : 's'}`}
            >
              <Icon name="cart" size={20} />
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 font-mono text-[11px] font-bold text-navy-950">
                {cart.count}
              </span>
            </button>
          )}
          <Link to="/shop" className="hidden md:inline-flex btn-gold px-5 py-2 text-base">
            Shop
            <span className="rounded-full bg-navy-950/25 px-2 py-0.5 font-mono text-[9px] tracking-widest">SOON</span>
          </Link>
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </nav>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-white/10 bg-navy-900 p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between">
                <img src={asset('assets/logo.png')} alt="" width="40" height="40" className="h-10 w-10" />
                <button
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <Icon name="close" size={22} />
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollToId(l.id, () => setOpen(false))}
                    className="rounded-xl px-3 py-3 text-left font-display text-2xl uppercase tracking-wide text-cream/85 hover:bg-white/5 hover:text-gold"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <Link to="/shop" onClick={() => setOpen(false)} className="btn-gold mt-6 w-full">
                Shop the Drop
                <span className="rounded-full bg-navy-950/25 px-2 py-0.5 font-mono text-[9px] tracking-widest">SOON</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}
