import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

/**
 * "Cortina" de scroll — el borde inferior de cada bloque se curva/distorsiona
 * mientras entra en pantalla y se aplana (la sección "se completa") conforme
 * llega a su sitio. Arco elíptico + escala = sensación de pliegue progresivo.
 *
 * Nota: usa overflow-hidden, así que NO debe envolver secciones con
 * position:sticky interno (rompería el sticky) — p. ej. Work.
 */
export default function ScrollCurtain({
  children,
  className = '',
  background = '#06141B',
}: {
  children: ReactNode
  className?: string
  /** Fondo opaco del bloque (la curva inferior lo revela). Acepta cualquier
   *  valor CSS — usado para teñir secciones en tonos vino/crema. */
  background?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  // Mientras el bloque sube hacia su posición, el arco inferior es grande;
  // al asentarse se aplana a 0.
  const arc = useTransform(scrollYProgress, [0, 0.85], [64, 0])
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.975, 1])
  const radius = useMotionTemplate`0px 0px 50% 50% / 0px 0px ${arc}px ${arc}px`

  return (
    <motion.div
      ref={ref}
      style={{ borderRadius: radius, scale, background }}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
