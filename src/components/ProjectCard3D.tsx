import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useSpring } from 'framer-motion'
import { EASE } from '../lib/easings'

interface ProjectCard3DProps {
  children: ReactNode
  className?: string
  /** Glow especular que sigue al cursor. */
  glow?: boolean
  /** Coords en píxeles dentro de la tarjeta (para efectos externos: burbujas, etc.). */
  onLocalMove?: (x: number, y: number) => void
  onEnter?: () => void
  onLeave?: () => void
  onClick?: () => void
  /** Zona de cursor personalizado (p. ej. "arrow" → disco con flecha). */
  cursorZone?: string
}

/** Tarjeta con tilt 3D suavizado por springs + glow especular opcional. */
export default function ProjectCard3D({
  children,
  className = '',
  glow = true,
  onLocalMove,
  onEnter,
  onLeave,
  onClick,
  cursorZone,
}: ProjectCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // Springs para suavizar el tracking del mouse.
  const rotateX = useSpring(0, { stiffness: 200, damping: 25 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 })
  const glowX = useSpring(50, { stiffness: 150, damping: 20 })
  const glowY = useSpring(50, { stiffness: 150, damping: 20 })

  const glowBg = useMotionTemplate`radial-gradient(160px circle at ${glowX}% ${glowY}%, rgba(192, 57, 43, 0.12), transparent 70%)`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0 → 1
    const y = (e.clientY - rect.top) / rect.height // 0 → 1

    onLocalMove?.(e.clientX - rect.left, e.clientY - rect.top)

    if (prefersReduced) return
    // Máximo ~6° de rotación (sutil, no cartoon).
    rotateX.set((y - 0.5) * -12)
    rotateY.set((x - 0.5) * 12)
    glowX.set(x * 100)
    glowY.set(y * 100)
  }

  function handleMouseEnter() {
    onEnter?.()
  }

  function handleMouseLeave() {
    onLeave?.()
    rotateX.set(0)
    rotateY.set(0)
    glowX.set(50)
    glowY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      data-cursor
      data-cursor-zone={cursorZone}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={prefersReduced ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.25, ease: EASE.spring }}
      className={`group relative overflow-hidden ${className}`}
    >
      {/* Glow especular siguiendo al cursor */}
      {glow && !prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}
      {children}
    </motion.div>
  )
}
