import { Link } from 'react-router-dom'
import SplitHeadline from './common/SplitHeadline.jsx'
import Reveal from './common/Reveal.jsx'
import Icon from './common/Icon.jsx'
import { site } from '../data/site'

// Closing CTA and the end of the treasure route. The X is drawn on the marker below, which
// sits in its own clear band directly above the Shop button, so it reads as marking the spot
// the button occupies rather than striking through the label.
//
// The Shop itself is still gated: the button routes to the Coming Soon shop page and keeps the
// SOON badge, and the line underneath says plainly that checkout is not open yet.
export default function ShopCTA() {
  return (
    <section id="shop-cta" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="container-tlt">
        <Reveal className="mx-auto max-w-2xl text-center" stagger={0.07}>
          <p data-reveal className="kicker mb-3">End of the map</p>

          <SplitHeadline
            as="h2"
            text="You found the spot"
            className="text-4xl font-bold text-cream sm:text-5xl"
          />

          <p data-reveal className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/75">
            You followed the map all the way down. Now go dig.
          </p>

          {/* Clear band the route terminates in. The marker is a zero-size point, so the X is
              centred exactly here and never lands on the button label below.
              Deliberately NOT data-reveal: Reveal translates its children, which would shift
              the marker out from under the X that was measured against it. */}
          <div className="relative mx-auto mt-8 h-24 sm:h-28">
            <span
              data-route-x
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 block h-0 w-0"
            />
          </div>

          <div data-reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/shop" className="btn-gold px-7 py-3.5 text-lg">
              Shop the Drop
              <span className="rounded-full bg-navy-950/25 px-2 py-0.5 font-mono text-[10px] tracking-widest">
                SOON
              </span>
            </Link>
            <a href={site.whatnotUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Icon name="live" size={20} /> Rip live on Whatnot
            </a>
          </div>

          {/* No "Find the treasure" sign-off here: the headline already lands that payoff, and
              the footer still carries the line. */}
          <p data-reveal className="mt-4 text-sm text-cream/55">
            Online checkout is coming soon. Until it goes live, grab yours live on Whatnot.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
