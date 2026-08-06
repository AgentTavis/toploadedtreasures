import { useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import MysteryPacks from '../components/MysteryPacks.jsx'
import Vault from '../components/Vault.jsx'
import Merch from '../components/Merch.jsx'
import Reviews from '../components/Reviews.jsx'
import FindUs from '../components/FindUs.jsx'
import ShopCTA from '../components/ShopCTA.jsx'
import Footer from '../components/Footer.jsx'
import TreasureRoute from '../components/TreasureRoute.jsx'
import CartDrawer from './shop/CartDrawer.jsx'
import { ScrollTrigger } from '../lib/gsap'

export default function Home() {
  // Recompute ScrollTrigger start/end after fonts + images settle to avoid drift.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    const t = setTimeout(refresh, 700)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <div className="relative">
      {/* Background map layer. Explicit z-0 here + z-10 on the content below keeps the route
          behind everything without relying on stacking-context luck. */}
      <TreasureRoute />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Vault />
        <MysteryPacks />
        <Merch />
        <Reviews />
        <FindUs />
        <ShopCTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      {/* Same drawer the shop uses — the Vault's Add to Cart opens this. */}
      <CartDrawer />
    </div>
  )
}
