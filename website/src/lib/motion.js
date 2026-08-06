// Shared Framer Motion variants for component-level micro-interactions.

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 18 },
  },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

// Standard viewport config so sections reveal once, a touch before fully in view.
export const viewportOnce = { once: true, amount: 0.3, margin: '0px 0px -10% 0px' }
