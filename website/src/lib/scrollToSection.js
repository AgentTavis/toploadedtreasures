import { prefersReduced } from './gsap'

/** Smooth-scroll to a section id on the current page. Shared by the nav, hero, and footer CTAs. */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
}
