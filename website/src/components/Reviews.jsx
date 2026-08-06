import SplitHeadline from './common/SplitHeadline.jsx'
import Reveal from './common/Reveal.jsx'
import Icon from './common/Icon.jsx'
import GlowCard from './ui/GlowCard.jsx'
import { site } from '../data/site'
import { reviews } from '../data/reviews'

// Five gold stars. Every review we publish is a 5.0, so the rating is fixed rather than
// data-driven — if a non-5 review ever gets added this needs to read from the data.
function Stars() {
  return (
    <span className="flex items-center gap-1 text-gold" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="starFill" size={14} />
      ))}
    </span>
  )
}

function ReviewCard({ r }) {
  return (
    <GlowCard
      as="figure"
      customSize
      className="surface surface-hover flex h-full w-full flex-col gap-4 p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Stars />
          <span className="font-display text-sm leading-none text-gold">5.0</span>
          <span className="sr-only">Rated 5.0 out of 5 stars</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/45">{r.date}</span>
      </div>

      <blockquote className="flex-1 text-cream/80">{r.text}</blockquote>

      <figcaption className="flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-sm uppercase text-gold">
          {r.user.slice(0, 2)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm text-cream">{r.user}</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cream/45">
            <Icon name="whatnot" size={12} className="text-gold/80" /> Verified Whatnot buyer
          </span>
        </span>
      </figcaption>
    </GlowCard>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-gold/[0.06] to-transparent" />
      <div className="container-tlt">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="kicker mb-3">What buyers say</p>
            <SplitHeadline
              as="h2"
              text="Straight from the stream"
              className="text-4xl font-bold text-cream sm:text-5xl"
            />
            <p className="mt-4 text-lg text-cream/70">
              We would rather let the people who have already ripped with us do the talking.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            <Icon name="check" size={14} /> Verified Whatnot buyers
          </span>
        </div>
      </div>

      {/* Full-bleed so the row reads as continuous. The second group is a visual
          duplicate for the seamless loop, so it is hidden from assistive tech. */}
      <Reveal className="mt-12">
        <div data-reveal className="card-marquee">
          <div className="card-marquee__track" style={{ animationDuration: '90s' }}>
            {[0, 1].map((g) => (
              <div className="card-marquee__group" key={g} aria-hidden={g === 1 || undefined}>
                {reviews.map((r) => (
                  <div className="card-marquee__item" key={`${g}-${r.user}`}>
                    <ReviewCard r={r} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="container-tlt mt-10 flex justify-center">
        <a href={site.whatnotUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          <Icon name="live" size={18} /> Read them on Whatnot
        </a>
      </div>
    </section>
  )
}
