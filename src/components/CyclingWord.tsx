import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  words: string[]
  interval?: number
  className?: string
}

/** Palabra que cicla en loop tipo "slot" (showcase tipográfico del hero). */
export default function CyclingWord({ words, interval = 1900, className = '' }: Props) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || words.length <= 1) return
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic [grid-area:1/1]"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
