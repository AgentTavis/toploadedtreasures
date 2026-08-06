import { useEffect, useRef, useState } from 'react'

// Scroll-reveal group. Children marked [data-reveal] fade/slide up with a CSS stagger
// (see .reveal-group in index.css). Reveal is triggered three ways so it can never leave
// content stuck invisible: an initial position check, a rAF-throttled scroll/resize check
// (reliable even on fast scroll or anchor jumps), and an IntersectionObserver. Degrades to
// visible under prefers-reduced-motion (handled in CSS).
export default function Reveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let done = false
    let io = null
    let ticking = false

    const finish = () => {
      if (done) return
      done = true
      setInView(true)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (io) io.disconnect()
    }
    const check = () => {
      ticking = false
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // Reveal once the element's top has entered the lower ~92% of the viewport (or is above it).
      if (r.top < vh * 0.92) finish()
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(check)
    }

    check() // covers content already in view on load
    if (!done) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) finish()
          },
          { rootMargin: '0px 0px -8% 0px' },
        )
        io.observe(el)
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (io) io.disconnect()
    }
  }, [])

  return (
    <Tag ref={ref} className={`reveal-group${inView ? ' is-in' : ''} ${className}`}>
      {children}
    </Tag>
  )
}
