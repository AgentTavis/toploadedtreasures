import { useEffect, useRef } from 'react'

// Cursor-follow "spotlight" glow, ported to plain JSX and tuned to the Top Loaded Treasures
// gold/rust palette (see the [data-glow] rules in index.css). The glow color + geometry live
// entirely in CSS (rendered ONCE globally, not injected per instance).
//
// Efficiency: a SINGLE module-level pointermove listener (not one per card) updates every
// registered card's local cursor coords via one rAF-throttled pass. Coords are element-
// relative (no background-attachment: fixed), so the effect is immune to the backdrop-blur /
// will-change / transform containing blocks these cards already use.

const glowCards = new Set()
let listening = false
let rafId = 0
let lastEvent = null

function onPointerMove(e) {
  lastEvent = e
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    const ev = lastEvent
    const xp = (ev.clientX / (window.innerWidth || 1)).toFixed(3)
    glowCards.forEach((el) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--glow-x', `${(ev.clientX - r.left).toFixed(1)}px`)
      el.style.setProperty('--glow-y', `${(ev.clientY - r.top).toFixed(1)}px`)
      el.style.setProperty('--glow-xp', xp) // horizontal viewport fraction -> hue drift
    })
  })
}

function registerGlowCard(el) {
  glowCards.add(el)
  if (!listening && typeof window !== 'undefined') {
    listening = true
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }
  return () => {
    glowCards.delete(el)
  }
}

/**
 * Adds the brand glow to an EXISTING card container. Pass the container's current classes via
 * `className` — the glow integrates into that box (no second visible card, no forced size).
 * `customSize` (default true) leaves the element's own dimensions/radius/padding/background alone.
 */
export default function GlowCard({ as: Tag = 'div', className = '', children, customSize = true, glowColor, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    return registerGlowCard(el)
  }, [])

  // Only used as an opt-out; default (true) preserves the wrapped container's shape.
  const sizeClass = customSize ? '' : 'aspect-[3/4] w-64'

  return (
    <Tag data-glow ref={ref} className={`${sizeClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
