import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Etiqueta de sección (eyebrow) estilo "OUR SERVICES":
 * pill translúcida con punto + texto en mono uppercase.
 */
export default function SectionLabel({ children, className = '' }: Props) {
  return (
    <span className={`section-label pill text-steel-300 ${className}`}>
      <span className="section-label__dot" />
      <span>{children}</span>
    </span>
  )
}
