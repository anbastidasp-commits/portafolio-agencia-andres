import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

type Props = {
  text: string
  className?: string
}

/** Pseudo-aleatorio determinista a partir de un índice (estable entre renders). */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x) // 0..1
}

/**
 * Texto que ARRANCA disperso (cada palabra desplazada y girada, casi invisible)
 * y se ORDENA progresivamente a su sitio palabra a palabra a medida que la
 * sección sube por el viewport (efecto scatter → assemble ligado al scroll).
 */
export default function ScrollHighlightText({ text, className = '' }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.4'],
  })

  const words = text.split(' ')

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        // Cada palabra se asienta en una ventana de scroll propia y escalonada.
        const start = (i / words.length) * 0.72
        const end = Math.min(1, start + 0.34)
        // Offset inicial disperso, determinista por palabra.
        const dx = (rand(i + 1) - 0.5) * 260
        const dy = (rand(i + 7) - 0.5) * 130
        const rot = (rand(i + 13) - 0.5) * 26
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            offset={{ dx, dy, rot }}
          >
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({
  children,
  progress,
  range,
  offset,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  offset: { dx: number; dy: number; rot: number }
}) {
  const x = useTransform(progress, range, [offset.dx, 0])
  const y = useTransform(progress, range, [offset.dy, 0])
  const rotate = useTransform(progress, range, [offset.rot, 0])
  const opacity = useTransform(progress, range, [0.08, 1])
  return (
    <span className="relative mr-[0.28em] mt-[0.1em] inline-block">
      <motion.span
        className="inline-block will-change-transform"
        style={{ x, y, rotate, opacity }}
      >
        {children}
      </motion.span>
    </span>
  )
}
