import SplitHeadline from './common/SplitHeadline.jsx'
import Reveal from './common/Reveal.jsx'
import Icon from './common/Icon.jsx'
import GlowCard from './ui/GlowCard.jsx'
import { asset } from '../lib/asset'
import { site } from '../data/site'

// Official merch. Not purchasable yet, so it carries the same "Coming Soon" gating
// treatment used on the Shop.
export default function Merch() {
  return (
    <section id="merch" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-50" />
      <div className="container-tlt">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="kicker mb-3">Official merchandise</p>
            <SplitHeadline as="h2" text="Wear the badge" className="text-4xl font-bold text-cream sm:text-5xl" />
            <p className="mt-4 text-lg text-cream/70">
              The coastal badge on a heavyweight cream tee. Front left chest, full logo on the back.
              Represent Top Loaded Treasures wherever you go.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            <span className="h-2 w-2 animate-glowpulse rounded-full bg-gold" /> Coming soon
          </span>
        </div>

        <Reveal className="mt-12 grid items-stretch gap-8 lg:grid-cols-12" stagger={0.08}>
          {/* Tee mockup */}
          <GlowCard
            data-reveal
            customSize
            className="surface relative overflow-hidden p-0 lg:col-span-8"
          >
            <img
              src={asset('assets/merch-tee.jpg')}
              alt="Top Loaded Treasures cream t-shirt, front and back, with the coastal badge logo"
              className="h-full w-full object-cover"
              loading="lazy"
              width="1400"
              height="933"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Front and back</p>
              <p className="mt-1 font-display text-2xl uppercase text-cream">The Treasures tee</p>
            </div>
          </GlowCard>

          {/* Details + gated CTA */}
          <GlowCard
            data-reveal
            customSize
            className="foil-surface flex flex-col justify-center gap-5 p-7 lg:col-span-4"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                <Icon name="spark" size={26} />
              </span>
              <div>
                <h3 className="text-2xl text-cream">Shop merch</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-gold/90">Dropping soon</p>
              </div>
            </div>
            <p className="text-sm text-cream/70">
              Tees are on the way. Follow along and we will let you know the moment they drop.
            </p>
            <button
              disabled
              className="btn w-full cursor-not-allowed border border-white/10 bg-white/5 text-cream/40"
            >
              Shop merch
              <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] tracking-widest">SOON</span>
            </button>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  )
}
