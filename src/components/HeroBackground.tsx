import { useEffect, useRef, useState } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'
import { LOW_POWER } from '../lib/device'

/**
 * Fondo del hero.
 *
 * Móvil/táctil (LOW_POWER): SIN WebGL — composición estática de gradientes
 * carmesí/negro pre-pintados (coste cero por frame).
 *
 * Desktop: shader "liquid metal" carmesí, una sola capa y sin blur CSS
 * (la suavidad la da el propio shader). El canvas se desmonta cuando el
 * hero sale del viewport, y el loop rAF del parallax de puntero se detiene
 * solo cuando el valor se asienta (no gira en vacío con el mouse quieto).
 */
export default function HeroBackground() {
  if (LOW_POWER) return <StaticBackground />
  return <ShaderBackground />
}

function StaticBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-steel-950" />
      {/* "Metal líquido" congelado: radiales carmesí sobre negro cálido */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(85% 60% at 70% 22%, rgba(192,57,43,0.5), transparent 65%)',
            'radial-gradient(70% 55% at 18% 60%, rgba(143,42,32,0.55), transparent 70%)',
            'radial-gradient(55% 45% at 82% 78%, rgba(210,78,62,0.3), transparent 70%)',
            'radial-gradient(40% 30% at 40% 30%, rgba(245,242,235,0.07), transparent 70%)',
          ].join(','),
        }}
      />
      <div className="hero-grade" />
    </div>
  )
}

function ShaderBackground() {
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
    let running = false
    const pointer = { x: 0, y: 0 } // objetivo normalizado -1..1
    const current = { x: 0, y: 0 } // valor suavizado

    const tick = () => {
      current.x += (pointer.x - current.x) * 0.045
      current.y += (pointer.y - current.y) * 0.045
      wrap.style.transform = `translate3d(${(-current.x * 16).toFixed(2)}px, ${(
        -current.y * 16
      ).toFixed(2)}px, 0)`
      // Se apaga solo cuando llega al objetivo; onPointerMove lo reanuda.
      if (Math.abs(pointer.x - current.x) + Math.abs(pointer.y - current.y) < 0.001) {
        running = false
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduced])

  return (
    <div ref={wrapRef} className="absolute -inset-[6%] z-0 will-change-transform" aria-hidden="true">
      {/* Base negra cálida para que el metal líquido funda bien */}
      <div className="absolute inset-0 bg-steel-950" />

      {/* Capa CARMESÍ — metal líquido (única capa, sin blur CSS) */}
      {visible && (
        <LiquidMetal
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          colorBack="hsla(15, 15%, 4%, 0)"
          colorTint="hsl(6, 63%, 46%)"
          repetition={4}
          softness={0.9}
          shiftRed={0.3}
          shiftBlue={0.16}
          distortion={0.1}
          contour={1}
          shape="none"
          offsetX={0}
          offsetY={0}
          scale={1.05}
          rotation={25}
          speed={0.5}
        />
      )}

      {/* Atmósfera de glows (vino/crema) */}
      <div className="hero-aurora" />
      {/* Graduado mínimo inferior sólo para legibilidad de la fila inferior */}
      <div className="hero-grade" />
    </div>
  )
}
