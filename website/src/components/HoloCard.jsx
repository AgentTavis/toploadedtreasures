import { useCallback, useRef } from 'react'
import { asset } from '../lib/asset'
import { prefersReduced } from '../lib/gsap'

// Pointer-driven holographic + 3D tilt. Technique inspired by simeydotme/pokemon-cards-css
// (CSS custom properties driving transforms, gradients, and blend modes), applied ONLY to
// Top Loaded Treasures' own graded card photos. No third-party demo art is used.
export default function HoloCard({ card }) {
  const ref = useRef(null)
  const raf = useRef(0)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el || prefersReduced()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`)
      el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`)
      el.style.setProperty('--ry', `${((px - 0.5) * 18).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${((py - 0.5) * -16).toFixed(2)}deg`)
      el.style.setProperty('--o', '1')
    })
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
    el.style.setProperty('--o', '0')
  }, [])

  // Cards are intentionally NON-INTERACTIVE for now: no onClick, no href, no routing, and
  // the cursor stays default so nothing implies "click to buy" yet. The hover tilt + foil
  // effect below is purely visual and stays.
  // TODO: wire card click to shop/product page once shop backend is live.
  return (
    <div className="holo cursor-default" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onBlur={onLeave}>
      <div className="holo__rotator">
        <img
          className="holo__img"
          src={asset(card.img)}
          alt={`${card.player}, ${card.set}, graded ${card.grade}`}
          loading="lazy"
          width="900"
          height="1200"
        />
        <div className="holo__glare" />
        <div className="holo__foil" />
        <div className="holo__frame" />
        <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-navy-950/70 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-gold backdrop-blur">
          {card.grade}
        </span>
      </div>
    </div>
  )
}
