import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SplitHeadline from './common/SplitHeadline.jsx'
import Reveal from './common/Reveal.jsx'
import Icon from './common/Icon.jsx'
import GlowCard from './ui/GlowCard.jsx'
import { asset } from '../lib/asset'
import { packs, packSports } from '../data/packs'
import { site } from '../data/site'
import { gsap, useGSAP, prefersReduced } from '../lib/gsap'

function TierCard({ p }) {
  const foil = p.accent === 'gold'
  return (
    <GlowCard
      data-reveal
      customSize
      className={`${foil ? 'foil-surface' : 'surface'} surface-hover flex items-center gap-4 p-5`}
    >
      <img
        src={asset(p.badge)}
        alt={`${p.name} gold mystery packs`}
        width="160"
        height="160"
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-xl object-cover ring-1 ring-gold/25 sm:h-24 sm:w-24"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl text-cream">{p.name}</h3>
          <span className="font-display text-2xl leading-none text-gold-grad">{p.price}</span>
          {p.signature && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gold">
              Signature
            </span>
          )}
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-gold/90">{p.tagline}</p>
        <p className="mt-2 text-sm text-cream/70">{p.blurb}</p>
      </div>
    </GlowCard>
  )
}

export default function MysteryPacks() {
  const imgWrap = useRef(null)

  useGSAP(
    () => {
      if (prefersReduced()) return
      gsap.to('.pack-parallax', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: imgWrap.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    },
    { scope: imgWrap },
  )

  return (
    <section id="packs" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-rust/[0.08] to-transparent" />
      <div className="container-tlt">
        <div className="max-w-2xl">
          <p className="kicker mb-3">Signature product</p>
          <SplitHeadline as="h2" text="The Gold Mystery Packs" className="text-4xl font-bold text-cream sm:text-5xl" />
          <p className="mt-4 text-lg text-cream/75">
            This is the whole thrill of the hobby in one gold foil pack. Every tier has a guaranteed hit
            inside, so the only question left is how big you pull. This is where you find the treasure.
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold">
            <Icon name="check" size={15} className="text-gold" />
            Available in {packSports.join(', ')}
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Feature image */}
          <div ref={imgWrap} className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-3xl border border-gold/30 shadow-glow-gold">
              <img
                src={asset('assets/packs-feature.jpg')}
                alt="A Top Loaded Treasures gold Slab Pack on turf against a brick wall"
                className="pack-parallax h-full w-full scale-110 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Our signature Mystery Packs</p>
                <p className="mt-1 font-display text-2xl uppercase text-cream">Rip it. See what you pulled.</p>
              </div>
            </div>
          </div>

          {/* Tiers — on lg the three stack and fill the full image height */}
          <Reveal className="grid gap-4 lg:col-span-7 lg:h-full lg:grid-rows-3 lg:gap-5" stagger={0.08}>
            {packs.map((p) => (
              <TierCard key={p.id} p={p} />
            ))}
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
          <a href={site.whatnotUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <Icon name="live" size={20} /> Rip live on Whatnot
          </a>
          {/* Lands on the shop with the Mystery Packs category already filtered. */}
          <Link to="/shop?cat=Mystery+Packs" className="btn-ghost">
            Buy a Mystery Pack Now
          </Link>
        </div>
      </div>
    </section>
  )
}
