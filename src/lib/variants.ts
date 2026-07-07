// Variantes de animación reutilizables, alimentadas por los tokens de easings.
import type { Variants } from 'framer-motion'
import { EASE, STAGGER, DUR } from './easings'

// Contenedor para listas con stagger (Servicios, etc.).
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.cards,
      delayChildren: 0.1,
    },
  },
}

// Tarjeta / fila individual — "caída en lugar" con leve inclinación + rebote.
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    rotate: 1.5,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: DUR.slow,
      ease: EASE.spring,
    },
  },
}

// Líneas de texto en secciones de copy.
export const textLineVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE.out },
  },
}

// Grid de estadísticas con delay escalonado por índice.
export const statVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.slow,
      ease: EASE.out,
      delay: i * 0.12,
    },
  }),
}

// Proyectos: tarjetas más grandes y pesadas → más recorrido y stagger más espaciado.
export const projectCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotate: 2,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASE.spring,
    },
  },
}

export const projectContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
}
