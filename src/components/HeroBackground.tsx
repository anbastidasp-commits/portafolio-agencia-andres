import { useEffect, useRef, useState } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'

/**
 * Fondo del hero — shader "liquid metal" (paper-design) en carmesí sobre
 * negro cálido. Optimizado: UNA sola capa de shader (antes eran dos con
 * blur(5px)/blur(11px) apiladas = coste por frame enorme) y el canvas se
 * desmonta cuando el hero sale del viewport (deja de renderizar en GPU
 * mientras se scrollea el resto de la página).
 *
 * Parallax sutil siguiendo el cursor con un loop rAF eased.
 */
export default function HeroBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Desmonta el shader cuando el hero no está en pantalla.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) return
    const wrap = wrapRef.current
    if (!wrap) return

    let raf = 0
    const pointer = { x: 0, y: 0 } // objetivo normalizado -1..1
    const current = { x: 0, y: 0 } // valor suavizado

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const tick = () => {
      current.x += (pointer.x - current.x) * 0.045
      current.y += (pointer.y - current.y) * 0.045
      wrap.style.transform = `translate3d(${(-current.x * 16).toFixed(2)}px, ${(
        -current.y * 16
      ).toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduced])

  return (
    <div ref={wrapRef} className="absolute -inset-[6%] z-0 will-change-transform" aria-hidden="true">
      {/* Base negra cálida para que el metal líquido funda bien */}
      <div className="absolute inset-0 bg-steel-950" />

      {/* Capa CARMESÍ — metal líquido (única capa de shader) */}
      {visible && (
        <LiquidMetal
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'blur(3px)' }}
          colorBack="hsla(15, 15%, 4%, 0)"
          colorTint="hsl(6, 63%, 46%)"
          repetition={4}
          softness={0.75}
          shiftRed={0.3}
          shiftBlue={0.16}
          distortion={0.1}
          contour={1}
          shape="none"
          offsetX={0}
          offsetY={0}
          scale={1.05}
          rotation={25}
          speed={reduced ? 0 : 0.5}
        />
      )}

      {/* Atmósfera de glows (vino/crema — sustituye a la 2ª capa de shader) */}
      <div className="hero-aurora" />
      {/* Graduado mínimo inferior sólo para legibilidad de la fila inferior */}
      <div className="hero-grade" />
    </div>
  )
}
