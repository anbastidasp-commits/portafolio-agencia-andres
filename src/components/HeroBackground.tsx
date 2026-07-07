import { useEffect, useRef } from 'react'
import { LiquidMetal } from '@paper-design/shaders-react'

/**
 * Fondo del hero — shader "liquid metal" (paper-design) en los colores del
 * portafolio: capa base VINO + capa de acento CREMA (blend screen). Sustituye
 * al orbe/vídeo anterior.
 *
 * Parallax sutil siguiendo el cursor con un loop rAF eased.
 * Cleanup on unmount: cancela el rAF y quita el listener de puntero.
 */
export default function HeroBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      {/* Base oscura para que el metal líquido funda bien */}
      <div className="absolute inset-0 bg-steel-950" />

      {/* Capa CARMESÍ — metal líquido principal (definitiva) */}
      <LiquidMetal
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'blur(9px)' }}
        colorBack="hsla(215, 41%, 10%, 0)"
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

      {/* Capa CREMA + acento ACERO — metálico suave (screen) */}
      <LiquidMetal
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(18px)',
          mixBlendMode: 'screen',
          opacity: 0.45,
        }}
        colorBack="hsla(0, 0%, 0%, 0)"
        colorTint="hsl(42, 35%, 90%)"
        repetition={3}
        softness={0.8}
        shiftRed={0.18}
        shiftBlue={0.24}
        distortion={0.08}
        contour={1}
        shape="none"
        offsetX={0.25}
        offsetY={-0.12}
        scale={1.25}
        rotation={-18}
        speed={reduced ? 0 : 0.38}
      />

      {/* Atmósfera de glows (refuerza vino/slate/crema) */}
      <div className="hero-aurora" />
      {/* Graduado mínimo inferior sólo para legibilidad de la fila inferior */}
      <div className="hero-grade" />
    </div>
  )
}
