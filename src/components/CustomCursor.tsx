import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * Cursor personalizado: un punto que sigue al ratón y un anillo con retardo.
 * Crece sobre elementos interactivos. En las zonas marcadas con
 * `data-cursor-zone="arrow"` (sección Proceso) se transforma en un disco
 * oscuro con una flecha. Se desactiva en dispositivos táctiles.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [arrow, setArrow] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    let frame = 0
    // Estado previo en refs: sólo hacemos setState (re-render) cuando el valor
    // cambia de verdad, no en cada mousemove (evita 60+ renders/seg = lag).
    let prevArrow = false
    let prevHover = false

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      const target = e.target as HTMLElement
      const nextArrow = Boolean(target?.closest('[data-cursor-zone="arrow"]'))
      const nextHover = Boolean(target?.closest('a, button, [data-cursor]'))
      if (nextArrow !== prevArrow) {
        prevArrow = nextArrow
        setArrow(nextArrow)
      }
      if (nextHover !== prevHover) {
        prevHover = nextHover
        setHovering(nextHover)
      }
    }

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  if (!enabled) return null

  const size = arrow ? 56 : hovering ? 48 : 32
  const half = size / 2

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-steel-100 transition-opacity duration-200 ${
          arrow ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[120] grid place-items-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out-expo ${
          arrow
            ? 'border-transparent bg-steel-950 text-cream shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]'
            : hovering
              ? 'border border-steel-300/60 bg-steel-100/5 text-transparent'
              : 'border border-steel-300/60 text-transparent'
        }`}
        style={{
          width: size,
          height: size,
          marginLeft: -half,
          marginTop: -half,
        }}
      >
        <ArrowRight
          className={`h-5 w-5 transition-opacity duration-200 ${arrow ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </>
  )
}
