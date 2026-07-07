import type { SVGProps } from 'react'
import { motion } from 'framer-motion'
import { Mail, Twitter, Linkedin, Instagram } from 'lucide-react'
import { contact, brand } from '../data/content'
import { SplineScene } from './ui/splite'

const ease = [0.16, 1, 0.3, 1] as const

// Contenedor con stagger; los hijos entran "desde arriba" (y negativo → 0).
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const fromTop = {
  hidden: { opacity: 0, y: -44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

/** Logo oficial de WhatsApp (inline para no depender de un set de marcas). */
function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.448h.005c6.585 0 11.946-5.359 11.949-11.893a11.821 11.821 0 00-3.479-8.413z" />
    </svg>
  )
}

const socials = [
  { Icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
  { Icon: Twitter, href: 'https://twitter.com/', label: 'X' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
]

export default function Contact() {
  const wa = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(
    contact.whatsapp.message,
  )}`

  return (
    <section
      id="contacto"
      className="relative flex min-h-screen flex-col overflow-hidden border-t border-steel-700 bg-[#0a111c]"
    >
      {/* ── Rayos de luz (god rays) desde arriba-izquierda, en tonos de paleta
            (crema + carmesí) sobre marino profundo → cierre que resalta pero
            coherente con el resto del portafolio. ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[12%] -top-[25%] h-[170%] w-[52%] rotate-[18deg] bg-[linear-gradient(90deg,rgba(245,242,235,0.09),transparent_60%)] blur-2xl" />
        <div className="absolute left-0 -top-[30%] h-[180%] w-[38%] rotate-[24deg] bg-[linear-gradient(90deg,rgba(224,122,108,0.06),transparent_55%)] blur-3xl" />
        <div className="absolute -left-[6%] -top-[35%] h-[185%] w-[28%] rotate-[11deg] bg-[linear-gradient(90deg,rgba(245,242,235,0.05),transparent_50%)] blur-2xl" />
        {/* Glow carmesí (arriba-izq) + acero (der) para teñir hacia la paleta */}
        <div className="absolute -left-40 -top-40 h-[62vh] w-[62vh] rounded-full bg-[radial-gradient(circle,rgba(192,57,43,0.12),transparent_70%)] blur-[120px]" />
        <div className="absolute right-[-10%] top-1/4 h-[55vh] w-[45vh] rounded-full bg-[radial-gradient(circle,rgba(69,123,157,0.10),transparent_70%)] blur-[130px]" />
        {/* Viñeta inferior para profundidad */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070d16] to-transparent" />
      </div>

      {/* ── Robot 3D (Spline) DETRÁS del headline: capa entre el fondo y el
            contenido. Interactivo (sigue el cursor); el contenedor del texto es
            pointer-events-none salvo el botón de WhatsApp, así el mouse llega
            al robot pero los clicks siguen funcionando. ── */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] flex items-center justify-center">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="h-full w-full"
        />
      </div>

      {/* ── Centro: eyebrow + titular + subtítulo + WhatsApp (entran desde arriba) ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-120px' }}
        className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-8"
      >
        <motion.p variants={fromTop} className="serif-accent text-lg text-steel-400 sm:text-xl">
          {brand.availability}
        </motion.p>

        <motion.h2
          variants={fromTop}
          className="mt-6 font-display font-bold leading-[0.9] tracking-tightest"
          style={{ fontSize: 'clamp(60px, 11vw, 184px)' }}
        >
          <span className="text-steel-100">Trabajemos</span>{' '}
          <span className="text-wine-300">juntos</span>
        </motion.h2>

        <motion.p
          variants={fromTop}
          className="mt-7 max-w-xl text-xl leading-relaxed text-steel-300 sm:text-2xl"
        >
          Cuéntame qué necesitas. Estoy disponible para nuevos proyectos — o solo para conversar.
        </motion.p>

        <motion.div variants={fromTop} className="mt-10">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="group pointer-events-auto inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/5 px-8 py-4 text-base font-medium text-steel-100 backdrop-blur-sm transition-colors duration-300 hover:border-[#25D366]/60 hover:bg-[#25D366]/12"
          >
            <WhatsappIcon className="h-5 w-5 text-[#25D366] transition-transform duration-300 ease-out-expo group-hover:scale-110" />
            WhatsApp
          </a>
        </motion.div>
      </motion.div>

      {/* ── Pie: © + redes (parte de la pantalla de cierre) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-5 pb-8 sm:px-8"
      >
        <span className="rounded-full border border-cream/15 px-4 py-2 font-mono text-xs text-steel-300">
          © {brand.logo}, {brand.year}
        </span>
        <div className="flex gap-2">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              data-cursor
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-steel-300 transition-colors duration-300 hover:border-[#25D366]/50 hover:bg-cream/5 hover:text-cream"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
