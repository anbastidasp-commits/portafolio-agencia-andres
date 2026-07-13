import { useEffect } from 'react'
import Lenis from 'lenis'
import { LOW_POWER } from '../lib/device'

/**
 * Scroll suave estilo Awwwards con Lenis.
 * Respeta prefers-reduced-motion, y en táctil no se activa: el scroll
 * nativo del móvil ya es suave y Lenis solo añadiría un rAF permanente.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || LOW_POWER) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let frame = 0
    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Enlaces internos -> scroll suave hacia la sección
    const handleAnchor = (e: Event) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: 0 })
      }
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', handleAnchor)
      lenis.destroy()
    }
  }, [])
}
