import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

type Props = {
  to: number
  suffix?: string
  duration?: number
}

/** Contador count-up (odómetro) que arranca al entrar en viewport. */
export default function Counter({ to, suffix = '', duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}
