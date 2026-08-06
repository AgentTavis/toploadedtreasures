import Reveal from './common/Reveal.jsx'
import SplitHeadline from './common/SplitHeadline.jsx'
import Icon from './common/Icon.jsx'
import GlowCard from './ui/GlowCard.jsx'
import { site, socialsInOrder } from '../data/site'

// Social row order is explicit: Instagram first, then YouTube.
// (Whatnot is intentionally omitted here — it has the large feature card above.)
const ROW_SOCIALS = socialsInOrder('instagram', 'youtube')

export default function FindUs() {
  return (
    <section id="find" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-60" />
      <div className="container-tlt">
        <div className="max-w-2xl">
          <p className="kicker mb-3">Where to find us</p>
          <SplitHeadline as="h2" text="Come pull with us" className="text-4xl font-bold text-cream sm:text-5xl" />
          <p className="mt-4 text-lg text-cream/70">
            Live most nights and table-side on weekends. Here is where to catch the next drop.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Whatnot feature */}
          <GlowCard customSize className="foil-surface flex flex-col justify-between gap-6 p-7 lg:col-span-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                  <Icon name="live" size={26} />
                </span>
                <div>
                  <h3 className="text-3xl text-cream">Live on Whatnot</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-gold/90">Rips, breaks, and deals</p>
                </div>
              </div>
              <p className="mt-4 max-w-lg text-cream/75">
                Join the stream for live pack rips, single sales, and giveaways. Bid, buy, and trade with the
                community in real time.
              </p>
            </div>
            <a href={site.whatnotUrl} target="_blank" rel="noopener noreferrer" className="btn-gold self-start">
              Watch the next stream <Icon name="arrowRight" size={18} />
            </a>
          </GlowCard>

          {/* Stream schedule */}
          <GlowCard customSize className="surface flex flex-col gap-4 p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-rust/15 text-rust-bright">
                <Icon name="calendar" size={22} />
              </span>
              <h3 className="text-2xl leading-tight text-cream">Our Whatnot Stream Schedule</h3>
            </div>
            <div className="hairline" />
            <p className="text-sm text-cream/65">
              We go live most nights. Follow us on Whatnot to get a notification the moment the next
              stream starts.
            </p>
          </GlowCard>
        </div>

        {/* Upcoming shows */}
        <GlowCard customSize className="surface mt-5 p-7">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-rust/15 text-rust-bright">
              <Icon name="pin" size={22} />
            </span>
            <h3 className="text-2xl text-cream">Upcoming Shows</h3>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {site.shows.map((s) => (
              <li key={s.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-cream">{s.name}</span>
                  <span className="block text-sm text-cream/55">{s.place}</span>
                </span>
                <span className="shrink-0 rounded-full border border-gold/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-gold">
                  {s.tag}
                </span>
              </li>
            ))}
          </ul>
        </GlowCard>

        {/* Socials — Instagram, then YouTube */}
        <Reveal className="mt-5 grid gap-4 sm:grid-cols-2" stagger={0.06}>
          {ROW_SOCIALS.map((s) => (
            <GlowCard
              as="a"
              customSize
              key={s.key}
              data-reveal
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="surface surface-hover flex items-center gap-3 p-4"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-cream">
                <Icon name={s.key} size={22} />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-cream">{s.label}</span>
                <span className="block truncate text-sm text-cream/55">{s.handle}</span>
              </span>
            </GlowCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
