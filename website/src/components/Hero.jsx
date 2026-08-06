import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitHeadline from './common/SplitHeadline.jsx'
import Marquee from './common/Marquee.jsx'
import Icon from './common/Icon.jsx'
import { asset } from '../lib/asset'
import { site } from '../data/site'
import { fadeUp, stagger } from '../lib/motion'
import { scrollToSection } from '../lib/scrollToSection'

// The DM CTA was removed here and in the closing block: the owner cannot keep up with DMs at
// higher traffic, so both slots now point at the Merchandise section instead.
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-10">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
          style={{ backgroundImage: `url(${asset('assets/treasure-table.jpg')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/85 to-navy-950" />
        <div className="absolute left-1/2 top-[42%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-gold blur-2xl" />
      </div>

      <div className="container-tlt">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.img
            variants={fadeUp}
            src={asset('assets/logo.png')}
            alt="Top Loaded Treasures badge logo"
            width="150"
            height="150"
            className="mb-7 h-32 w-32 animate-float drop-shadow-[0_10px_40px_rgba(231,180,76,0.35)] sm:h-36 sm:w-36"
          />

          <motion.p variants={fadeUp} className="kicker mb-4">
            {site.city} <span className="text-cream/40">/</span> {site.est}
          </motion.p>

          <SplitHeadline
            as="h1"
            text="Top Loaded Treasures"
            className="text-balance text-5xl font-extrabold leading-[0.92] text-cream sm:text-6xl md:text-7xl"
            start="top 90%"
          />

          <motion.p
            variants={fadeUp}
            className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-foil sm:text-3xl"
          >
            Find the treasure
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
            Every card rides safe in a toploader. The thrill is what you pull. We buy, sell, and trade
            singles, graded slabs, and our signature gold Mystery Packs. Rip one and find out.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link to="/shop" className="btn-gold">
              Shop the Drop
              <span className="rounded-full bg-navy-950/25 px-2 py-0.5 font-mono text-[10px] tracking-widest">SOON</span>
            </Link>
            <a href={site.whatnotUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Icon name="live" size={20} /> Watch on Whatnot
            </a>
            <button onClick={() => scrollToSection('merch')} className="btn-ghost">
              Official Merchandise
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2 text-sm text-cream/55">
            <Icon name="slab" size={16} className="text-gold" />
            <span className="font-mono uppercase tracking-widest">
              Graded pulls up to PSA · BGS · CGC · SGC · TAG GEM MT 10
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee divider band — extra space above (separates it from the CTAs / graded line)
          and a bit below so it reads as its own balanced band before The Vault. */}
      <div className="mt-20 pb-6 sm:mt-28 sm:pb-8">
        <Marquee items={['Buy', 'Sell', 'Trade', 'Singles', 'Slabs', 'Mystery Packs', 'TCG']} />
      </div>
    </section>
  )
}
