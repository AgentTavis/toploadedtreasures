import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReduced } from '../../lib/gsap'

// GSAP SplitText character reveal for short headlines (<= ~8 words).
export default function SplitHeadline({ text, as: Tag = 'h2', className = '', start = 'top 85%' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReduced()) return
      const split = SplitText.create(el, { type: 'words,chars', charsClass: 'char' })
      gsap.set(el, { perspective: 600 })
      gsap.from(split.chars, {
        opacity: 0,
        yPercent: 60,
        rotateX: -55,
        transformOrigin: '50% 100% -12px',
        stagger: 0.016,
        duration: 0.62,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start, once: true },
      })
      return () => split.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
