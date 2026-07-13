import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { partner } from '../data/content'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import TextAppear from './TextAppear'
import roleEstrategia from '../assets/work/role-estrategia.jpg'
import roleDiseno from '../assets/work/role-diseno.jpg'
import roleDesarrollo from '../assets/work/role-desarrollo.jpg'
import roleEntrega from '../assets/work/role-entrega.jpg'
import partnerBg from '../assets/work/partner-bg.jpg'

const roleImages = [roleEstrategia, roleDiseno, roleDesarrollo, roleEntrega]
// Magnitud de parallax por tarjeta (px). Alterna dirección para dar profundidad.
const parallax = [60, -50, 55, -45]

export default function Partner() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-steel-700 py-24 sm:py-32">
      {/* Imagen de fondo de la sección (tenue, tono de paleta) */}
      <div aria-hidden="true" className="absolute inset-0 -z-0">
        <img
          src={partnerBg}
          alt=""
          className="h-full w-full object-cover opacity-[0.18] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171210] via-[#171210]/88 to-[#171210]" />
        <div className="absolute inset-0 bg-[#1b1512] mix-blend-multiply opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Encabezado centrado */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionLabel>Con quién trabajas</SectionLabel>
          </Reveal>
          <h2
            className="mt-6 font-display font-bold leading-[0.98] tracking-tightest text-steel-100"
            style={{ fontSize: 'clamp(40px, 5.4vw, 88px)' }}
          >
            <TextAppear text={partner.title} delay={0.05} />{' '}
            <TextAppear
              text={partner.titleItalic}
              delay={0.2}
              className="serif-accent font-bold text-wine-300"
            />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-steel-300 sm:text-2xl">
            <TextAppear text={partner.description} mode="fade" delay={0.1} stagger={0.012} />
          </p>
        </div>

        {/* 4 tarjetas con imagen: hover realza + sube; parallax al scrollear */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partner.roles.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.08}>
              <RoleCard
                title={role.title}
                description={role.description}
                image={roleImages[i]}
                index={i}
                progress={scrollYProgress}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function RoleCard({
  title,
  description,
  image,
  index,
  progress,
}: {
  title: string
  description: string
  image: string
  index: number
  progress: MotionValue<number>
}) {
  const amp = parallax[index % parallax.length]
  // Parallax: la imagen (más alta que la card) se desplaza con el scroll.
  const y = useTransform(progress, [0, 1], [amp, -amp])

  return (
    <article className="group relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-inset ring-cream/10 transition-[transform,box-shadow] duration-500 ease-out-expo will-change-transform hover:-translate-y-3 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
      {/* Imagen con parallax + realce al hover (sobredimensionada para cubrir el desplazamiento) */}
      <motion.img
        src={image}
        alt={title}
        loading="lazy"
        style={{ y }}
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover grayscale transition-[transform,filter] duration-[1.1s] ease-out-expo will-change-transform group-hover:scale-110 group-hover:grayscale-0"
      />
      {/* Tinte de paleta + grade inferior para legibilidad */}
      <div className="absolute inset-0 bg-[#1a1310] mix-blend-multiply opacity-40 transition-opacity duration-500 group-hover:opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/30 to-steel-950/10" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-2xl italic leading-tight text-cream sm:text-3xl">{title}</h3>
          <span className="font-mono text-xs text-cream/70">/0{index + 1}</span>
        </div>
        <p className="max-w-[24ch] text-base leading-relaxed text-cream/90 opacity-0 translate-y-3 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          {description}
        </p>
      </div>
    </article>
  )
}
