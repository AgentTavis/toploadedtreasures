import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Fullscreen Three.js shader. Shadertoy-style (iResolution / iTime, mainImage()).
// Recolored to the Top Loaded Treasures palette: rust -> gold -> warm cream on black.
// There is intentionally NO blue/cyan contribution anywhere.

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  #include <common>
  uniform vec3 iResolution;
  uniform float iTime;

  void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // Centered, aspect-correct coordinates
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    // Three streak layers. Each layer is tinted a warm brand tone instead of a
    // raw R / G / B channel, so the buildup lands in the amber / gold / rust family.
    for (float i = 0.0; i < 3.0; i++) {
      uv = fract(uv * 1.5) - 0.5;

      vec3 tone;
      if (i < 0.5)      tone = vec3(0.86, 0.30, 0.09);  // rust  (high R, low G, ~0 B)
      else if (i < 1.5) tone = vec3(0.96, 0.68, 0.20);  // gold  (high R, mid-high G, low B)
      else              tone = vec3(0.99, 0.90, 0.66);  // warm cream (R >= G > B)

      float d = length(uv) * exp(-length(uv0));
      d = sin(d * 8.0 + iTime) / 8.0;
      d = abs(d);
      d = pow(0.010 / d, 1.25);

      finalColor += tone * d;
    }

    // Hard guarantee against any cyan/blue drift: blue can never exceed green.
    finalColor.b = min(finalColor.b, finalColor.g * 0.85);

    fragColor = vec4(finalColor, 1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`

interface ShaderAnimationProps {
  className?: string
  /** time increment per frame. Lower = slower / more cinematic. Demo default was 0.05. */
  speed?: number
  /** called if WebGL can't initialize or the context is lost */
  onError?: () => void
}

export function ShaderAnimation({ className, speed = 0.008, onError }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ---- Guarded WebGL init -------------------------------------------------
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
      if (!renderer.getContext()) throw new Error('no webgl context')
    } catch {
      onErrorRef.current?.()
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
    }
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.autoClearColor = false
    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    container.appendChild(canvas)

    const setSize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      renderer.setSize(w, h)
      uniforms.iResolution.value.set(canvas.width, canvas.height, 1) // device pixels, matches gl_FragCoord
    }
    setSize()
    window.addEventListener('resize', setSize)

    let contextLost = false
    const onContextLost = (ev: Event) => {
      ev.preventDefault()
      contextLost = true
      onErrorRef.current?.()
    }
    canvas.addEventListener('webglcontextlost', onContextLost as EventListener, false)

    // ---- Render loop --------------------------------------------------------
    let raf = 0
    const animate = () => {
      uniforms.iTime.value += speed
      try {
        renderer.render(scene, camera)
      } catch {
        onErrorRef.current?.()
        return
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    // ---- Full cleanup (stops loop, frees GPU + DOM) -------------------------
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setSize)
      canvas.removeEventListener('webglcontextlost', onContextLost as EventListener)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (!contextLost && typeof renderer.forceContextLoss === 'function') {
        try {
          renderer.forceContextLoss()
        } catch {
          /* ignore */
        }
      }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [speed])

  return <div ref={containerRef} className={className} />
}

export default ShaderAnimation
