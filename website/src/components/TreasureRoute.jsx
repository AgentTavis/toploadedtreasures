import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '../lib/gsap'

// "X marks the spot" — one continuous dashed route drawn down the page as you scroll,
// ticking off a waypoint at each section boundary and terminating in the single X on the
// Shop link in the footer.
//
// How the drawing works: a dashed stroke cannot also use stroke-dasharray to reveal itself,
// so the visible dashed path is clipped by an SVG <mask> containing a thick solid copy of the
// same path. Animating THAT copy's stroke-dashoffset wipes the dashes into view. One path
// repaint per frame, driven by ScrollTrigger scrub.
//
// Coordinates are real page pixels (viewBox matches the element box 1:1) so the stroke width
// and dash rhythm never distort. Everything is re-measured on resize.

const WAYPOINT_SECTIONS = ['vault', 'packs', 'merch', 'reviews', 'find']

// Gentle left/right meander. Desktop swings wide like a route on a chart; mobile is nearly
// straight so it never crowds a 390px column.
function weaveFor(width) {
  const mobile = width < 640
  return {
    mobile,
    amp: mobile ? Math.min(26, width * 0.07) : Math.min(300, width * 0.2),
    strokeWidth: mobile ? 1 : 1.25,
    // Tuned by eye against the hero photo and the Vault grid: high enough to read as a
    // deliberate map line on flat navy, low enough to stay background texture. Mobile runs
    // slightly under desktop because the near-straight line sits closer to the copy column.
    opacity: mobile ? 0.22 : 0.38,
    dash: mobile ? '1.5 9' : '2 11',
    xSize: mobile ? 44 : 72,
  }
}

// Smooth S-curves between points, with vertical tangents at each end so the path reads as a
// hand-drawn route rather than a zig-zag.
function buildPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1]
    const p1 = points[i]
    const dy = (p1.y - p0.y) * 0.5
    d += ` C ${p0.x.toFixed(1)} ${(p0.y + dy).toFixed(1)}, ${p1.x.toFixed(1)} ${(p1.y - dy).toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`
  }
  return d
}

export default function TreasureRoute() {
  const hostRef = useRef(null)
  const pathRef = useRef(null)
  const maskRef = useRef(null)
  const [geo, setGeo] = useState(null)

  // ---- measure the page and lay out the route ------------------------------------------
  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return

    const measure = () => {
      const box = host.getBoundingClientRect()
      const width = host.clientWidth
      const height = host.clientHeight
      if (!width || !height) return

      const base = box.top + window.scrollY
      const yTop = (el, frac = 0) => {
        const r = el.getBoundingClientRect()
        return r.top + window.scrollY - base + r.height * frac
      }

      const w = weaveFor(width)
      const cx = width / 2
      const hero = document.getElementById('top')
      const endEl = document.querySelector('[data-route-x]')
      if (!hero || !endEl) return

      const points = []
      const waypoints = []

      // Start under the hero copy, not on top of it.
      points.push({ x: cx + w.amp * 0.25, y: yTop(hero, 0.78) })

      WAYPOINT_SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        // Alternate sides, easing the swing down as we approach the destination.
        const dir = i % 2 === 0 ? -1 : 1
        const falloff = 1 - i / (WAYPOINT_SECTIONS.length + 1)
        const x = cx + dir * w.amp * falloff
        const y = yTop(el)
        points.push({ x, y })
        waypoints.push({ x, y })
        // A mid-section control point keeps the curve alive between boundaries.
        points.push({ x: cx + dir * w.amp * falloff * 0.35, y: y + el.getBoundingClientRect().height * 0.5 })
      })

      // Terminate dead-centre on the marker in the closing CTA. That marker is a zero-size
      // point sitting in its own clear band above the Shop button, so the X lands ON the
      // destination without crossing the button label.
      const er = endEl.getBoundingClientRect()
      const end = {
        x: er.left + er.width / 2 - box.left,
        y: er.top + window.scrollY - base + er.height / 2,
      }
      points.push({ x: end.x, y: end.y - w.xSize * 1.1 })

      setGeo({ width, height, w, d: buildPath(points), waypoints, end })
    }

    measure()

    // Re-measure only after the resize settles; ScrollTrigger.refresh() is expensive.
    let resizeTimer = 0
    const refresh = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        measure()
        ScrollTrigger.refresh()
      }, 200)
    }

    window.addEventListener('resize', refresh)
    window.addEventListener('load', measure)
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    const settle = setTimeout(measure, 900)

    // Late-loading images change the page height, which would leave the X measured against
    // stale geometry. Re-measure whenever the document actually resizes.
    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)

    return () => {
      window.removeEventListener('resize', refresh)
      window.removeEventListener('load', measure)
      ro.disconnect()
      clearTimeout(resizeTimer)
      clearTimeout(settle)
    }
  }, [])

  // ---- animate ---------------------------------------------------------------------------
  useGSAP(
    () => {
      if (!geo || !pathRef.current || !maskRef.current) return

      const len = pathRef.current.getTotalLength()
      gsap.set(maskRef.current, { strokeDasharray: len })

      // Reduced motion: skip the draw entirely, show the finished map.
      if (prefersReduced()) {
        gsap.set(maskRef.current, { strokeDashoffset: 0 })
        gsap.set('.route-waypoint, .route-x-stroke', { opacity: 1, scale: 1, strokeDashoffset: 0 })
        return
      }

      gsap.set(maskRef.current, { strokeDashoffset: len })

      // Where along the path does each waypoint sit? The route is monotonic in y, so a binary
      // search on getPointAtLength converts a waypoint's y into a 0-1 progress value. Driving
      // the dots off the same scrubbed timeline means each one lands exactly as the drawing
      // head reaches it, and un-lands on the way back up.
      const progressAtY = (targetY) => {
        let lo = 0
        let hi = len
        for (let i = 0; i < 24; i++) {
          const mid = (lo + hi) / 2
          if (pathRef.current.getPointAtLength(mid).y < targetY) lo = mid
          else hi = mid
        }
        return gsap.utils.clamp(0, 1, lo / len)
      }

      const dots = gsap.utils.toArray('.route-waypoint')
      const strokes = gsap.utils.toArray('.route-x-stroke')
      const xLen = strokes[0]?.getTotalLength?.() || 80
      gsap.set(strokes, { strokeDasharray: xLen, strokeDashoffset: xLen })

      // One scrubbed timeline drives the whole map. scrub: 0.6 keeps it glued to the
      // scrollbar without feeling stiff.
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hostRef.current,
          start: 'top top',
          // Finish when the X marker reaches just above centre screen, NOT at the page bottom.
          // Tying it to the page bottom meant the second stroke only completed once the footer
          // was in view, so the payoff landed after the CTA had already scrolled past.
          end: () => `+=${Math.max(1, Math.round(geo.end.y - window.innerHeight * 0.55))}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      tl.to(maskRef.current, { strokeDashoffset: 0, duration: 1 }, 0)

      dots.forEach((dot, i) => {
        const wp = geo.waypoints[i]
        if (!wp) return
        const at = progressAtY(wp.y)
        tl.fromTo(
          dot,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.035, ease: 'back.out(2)' },
          Math.max(0, at - 0.01),
        )
      })

      // The payoff: one stroke, then the other, right as the route runs out.
      tl.to(strokes[0], { strokeDashoffset: 0, duration: 0.035, ease: 'power2.out' }, 0.92)
        .to(strokes[1], { strokeDashoffset: 0, duration: 0.035, ease: 'power2.out' }, 0.962)
        .fromTo('.route-x-glow', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.04 }, 0.96)

      // Slow breath on the glow, paused while off screen.
      gsap.to('.route-x-glow', {
        scale: 1.08,
        opacity: 0.55,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        scrollTrigger: { trigger: '.route-x', start: 'top 98%', toggleActions: 'play pause resume pause' },
      })
    },
    { scope: hostRef, dependencies: [geo] },
  )

  const half = geo ? geo.w.xSize / 2 : 0

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {geo && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${geo.width} ${geo.height}`}
          fill="none"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Thick solid copy of the route; wiping its dash offset reveals the dashed path. */}
            <mask id="tlt-route-mask" maskUnits="userSpaceOnUse">
              <path
                ref={maskRef}
                d={geo.d}
                stroke="#fff"
                strokeWidth={geo.w.strokeWidth * 10}
                strokeLinecap="round"
                fill="none"
              />
            </mask>
            <radialGradient id="tlt-x-glow">
              <stop offset="0%" stopColor="#E7B44C" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#E7B44C" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#E7B44C" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g mask="url(#tlt-route-mask)">
            <path
              ref={pathRef}
              d={geo.d}
              stroke="#E7B44C"
              strokeWidth={geo.w.strokeWidth}
              strokeDasharray={geo.w.dash}
              strokeLinecap="round"
              fill="none"
              opacity={geo.w.opacity}
            />
          </g>

          {geo.waypoints.map((p, i) => (
            <g key={i} className="route-waypoint" style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
              <circle cx={p.x} cy={p.y} r={geo.w.mobile ? 2 : 2.5} fill="#E7B44C" opacity="0.5" />
              <circle cx={p.x} cy={p.y} r={geo.w.mobile ? 5 : 6.5} stroke="#E7B44C" strokeWidth="0.75" opacity="0.28" />
            </g>
          ))}

          {/* The single X on the page. */}
          <g className="route-x" style={{ transformOrigin: `${geo.end.x}px ${geo.end.y}px` }}>
            <circle
              className="route-x-glow"
              cx={geo.end.x}
              cy={geo.end.y}
              r={geo.w.xSize * 0.95}
              fill="url(#tlt-x-glow)"
              opacity="0"
              style={{ transformOrigin: `${geo.end.x}px ${geo.end.y}px` }}
            />
            <line
              className="route-x-stroke"
              x1={geo.end.x - half} y1={geo.end.y - half}
              x2={geo.end.x + half} y2={geo.end.y + half}
              stroke="#E7B44C" strokeWidth={geo.w.mobile ? 1.75 : 2.25}
              strokeLinecap="round" opacity="0.85"
            />
            <line
              className="route-x-stroke"
              x1={geo.end.x + half} y1={geo.end.y - half}
              x2={geo.end.x - half} y2={geo.end.y + half}
              stroke="#E7B44C" strokeWidth={geo.w.mobile ? 1.75 : 2.25}
              strokeLinecap="round" opacity="0.85"
            />
          </g>
        </svg>
      )}
    </div>
  )
}
