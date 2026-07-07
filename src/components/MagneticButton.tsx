import { useRef, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  target?: string
  rel?: string
  className?: string
  type?: 'button' | 'submit'
}

/**
 * Botón "magnético": se desplaza ligeramente hacia el cursor (efecto Awwwards).
 * primary = pill claro (texto oscuro). ghost = pill translúcido con borde + flecha.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  target,
  rel,
  className = '',
  type = 'button',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-[transform,background-color,color,border-color] duration-300 ease-out-expo will-change-transform'
  const styles =
    variant === 'primary'
      ? 'bg-steel-100 text-steel-950 hover:bg-white'
      : 'pill text-steel-100 hover:bg-steel-100/10'

  const arrow = (
    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  )

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        data-cursor
        className={`${base} ${styles} ${className}`}
      >
        {children}
        {arrow}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor
      className={`${base} ${styles} ${className}`}
    >
      {children}
      {arrow}
    </button>
  )
}
