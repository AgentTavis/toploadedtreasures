// Central GSAP setup. Register every plugin once so components can import from here.
// GSAP 3.13+ ships all plugins (incl. ScrollTrigger + SplitText) free.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText, useGSAP }
