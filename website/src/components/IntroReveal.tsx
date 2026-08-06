import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ShaderAnimation from './ui/shader-animation'
import { asset } from '../lib/asset'

const SESSION_KEY = 'tlt_intro_seen'
const HOLD_MS = 1200 // shader + logo held for ~1.2s ...
const FADE_MS = 600 //  ... then the overlay fades out over 0.6s (total ~1.8s)

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = (c.getContext('webgl') || c.getContext('experimental-webgl')) as WebGLRenderingContext | null
    const ok = !!(window.WebGLRenderingContext && gl)
    // Release the probe context immediately so this check never leaks a WebGL context.
    if (gl) {
      const ext = gl.getExtension('WEBGL_lose_context')
      if (ext) ext.loseContext()
    }
    return ok
  } catch {
    return false
  }
}

type Phase = 'playing' | 'done'

export default function IntroReveal() {
  // Decide synchronously on first render so there is no flash of the intro when it
  // should be skipped. This initializer is pure (reads only).
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === 'undefined') return 'done'
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return 'done' // already played this session
    } catch {
      return 'done'
    }
    if (prefersReducedMotion() || !webglAvailable()) return 'done' // honor a11y + WebGL guard
    return 'playing'
  })
  const [show, setShow] = useState(true)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    // Run the intro sequence exactly once. Checked + set synchronously at the very top so
    // a second invocation (React StrictMode double-mount, or any remount) bails immediately
    // and never starts a second shader/timer sequence.
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    // Mark as seen at the START (not on finish) so any second mount already sees it and skips.
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }

    if (phase !== 'playing') return

    document.body.style.overflow = 'hidden' // no scrolling behind the intro
    const t = window.setTimeout(() => setShow(false), HOLD_MS)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skip = useCallback(() => setShow(false), [])

  if (phase !== 'playing') return null

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ''
        setPhase('done') // fully unmount -> ShaderAnimation cleanup disposes WebGL
      }}
    >
      {show && (
        <motion.div
          key="tlt-intro"
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
          onClick={skip}
          role="button"
          aria-label="Skip intro"
        >
          {/* WebGL shader background */}
          <ShaderAnimation className="absolute inset-0 h-full w-full" speed={0.008} onError={skip} />

          {/* Cinematic vignette to focus the logo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 50%, transparent 26%, rgba(0,0,0,0.6) 82%)' }}
          />

          {/* Centered brand mark, slow fade-in */}
          <motion.img
            src={asset('assets/logo.png')}
            alt="Top Loaded Treasures"
            width="224"
            height="224"
            className="relative z-10 h-40 w-40 drop-shadow-[0_12px_60px_rgba(231,180,76,0.55)] sm:h-56 sm:w-56"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Skip affordance */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              skip()
            }}
            className="pointer-events-auto absolute bottom-5 right-5 z-20 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cream/70 backdrop-blur transition-colors hover:text-gold"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
