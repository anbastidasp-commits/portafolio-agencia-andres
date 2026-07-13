import { motion, type Variants } from 'framer-motion'

type Props = {
  text: string
  className?: string
  delay?: number
  /** Retardo entre palabras. */
  stagger?: number
  /** 'mask' = cada palabra sube desde su recorte (titulares).
   *  'fade' = cada palabra se funde en su sitio (párrafos). */
  mode?: 'mask' | 'fade'
}

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Appearance de texto palabra a palabra al entrar en viewport.
 * Sólo transform/opacity (compuesto en GPU) y una única vez (once) —
 * no añade coste al scroll después de aparecer.
 *
 * El observer vive en el span RAÍZ (nunca recortado) y propaga variants a
 * las palabras: en modo mask cada palabra arranca 100% oculta dentro de un
 * overflow-hidden, y un IntersectionObserver sobre la propia palabra jamás
 * la vería entrar en viewport (área visible = 0) → no animaría nunca.
 */
export default function TextAppear({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  mode = 'mask',
}: Props) {
  const words = text.split(' ')

  const child: Variants =
    mode === 'mask'
      ? {
          hidden: { y: '115%' },
          visible: (i: number) => ({
            y: '0%',
            transition: { duration: 0.85, delay: delay + i * stagger, ease },
          }),
        }
      : {
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: delay + i * stagger, ease },
          }),
        }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* el espacio se aporta con margin: dentro de un inline-block los
          espacios finales colapsan y las palabras quedarían pegadas */}
      {words.map((word, i) => (
        <span
          key={i}
          style={{ marginRight: i < words.length - 1 ? '0.25em' : undefined }}
          className={`inline-block ${mode === 'mask' ? 'overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]' : ''}`}
        >
          <motion.span custom={i} variants={child} className="inline-block will-change-transform">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
