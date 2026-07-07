import { useInView } from 'framer-motion'
import { useRef } from 'react'

type RevealOptions = Parameters<typeof useInView>[1]

/** Dispara una vez cuando el elemento entra al viewport (margen -80px). */
export function useReveal(options: RevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px',
    ...options,
  })
  return { ref, isInView }
}
