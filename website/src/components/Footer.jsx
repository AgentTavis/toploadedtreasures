import { Link } from 'react-router-dom'
import Icon from './common/Icon.jsx'
import { asset } from '../lib/asset'
import { site, socialsInOrder } from '../data/site'
import { prefersReduced } from '../lib/gsap'
import { scrollToSection } from '../lib/scrollToSection'

const LINKS = [
  { id: 'vault', label: 'The Vault' },
  { id: 'packs', label: 'Mystery Packs' },
  { id: 'merch', label: 'Merch' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'find', label: 'Find Us' },
]

// Footer handle order: Instagram, Whatnot, YouTube.
const FOOTER_SOCIALS = socialsInOrder('instagram', 'whatnot', 'youtube')

const go = (id) => () => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-tlt py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={asset('assets/logo.png')} alt="Top Loaded Treasures" width="56" height="56" className="h-14 w-14" />
              <div>
                <p className="font-display text-xl uppercase leading-none text-cream">Top Loaded Treasures</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-gold">
                  {site.est} <span className="text-cream/40">/</span> {site.city}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-cream/60">
              A sports card and TCG shop that buys, sells, and trades. Home of the gold Mystery
              Pack. Find the treasure.
            </p>
            <button onClick={() => scrollToSection('merch')} className="btn-primary mt-6">
              Official Merchandise
            </button>
          </div>

          <div>
            <p className="kicker mb-4 text-cream/50">Explore</p>
            <ul className="flex flex-col gap-2.5">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button onClick={go(l.id)} className="text-cream/70 transition-colors hover:text-gold">
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/shop" className="flex w-fit items-center gap-2 text-cream/70 transition-colors hover:text-gold">
                  Shop <span className="rounded-full bg-white/10 px-1.5 py-0.5 font-mono text-[9px] tracking-widest">SOON</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="kicker mb-4 text-cream/50">Follow</p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_SOCIALS.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-cream/70 transition-colors hover:text-gold"
                  >
                    <Icon name={s.key} size={18} /> {s.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream/45">© 2026 Top Loaded Treasures. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold/80">Find the treasure</p>
        </div>
      </div>
    </footer>
  )
}
