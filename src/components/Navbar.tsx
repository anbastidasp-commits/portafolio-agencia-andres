import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, Instagram, Linkedin, Github, Dribbble } from 'lucide-react'
import { brand, nav } from '../data/content'

const socials = [
  { Icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { Icon: Dribbble, href: 'https://dribbble.com/', label: 'Dribbble' },
  { Icon: Github, href: 'https://github.com/', label: 'GitHub' },
]

const W = ['#C0392B', '#D24E3E', '#E07A6C'] // carmesí (definitiva)
const C = '#F5F2EB' // crema
const S = '#D24E3E' // carmesí claro

/** Formas abstractas cálidas que reaccionan al hover de cada link del menú. */
function MenuShapes() {
  return (
    <div className="kmenu-shapes" aria-hidden="true">
      <svg className="kmenu-shape" data-shape="1" viewBox="0 0 400 400" fill="none">
        <circle className="kmenu-shape-el" cx="90" cy="120" r="46" fill={W[0]} opacity="0.4" />
        <circle className="kmenu-shape-el" cx="300" cy="90" r="64" fill={W[1]} opacity="0.28" />
        <circle className="kmenu-shape-el" cx="210" cy="300" r="84" fill={C} opacity="0.14" />
        <circle className="kmenu-shape-el" cx="340" cy="280" r="30" fill={W[2]} opacity="0.4" />
      </svg>
      <svg className="kmenu-shape" data-shape="2" viewBox="0 0 400 400" fill="none">
        <path className="kmenu-shape-el" d="M0 200 Q100 100 200 200 T400 200" stroke={W[0]} strokeWidth="56" fill="none" opacity="0.35" />
        <path className="kmenu-shape-el" d="M0 285 Q100 185 200 285 T400 285" stroke={C} strokeWidth="38" fill="none" opacity="0.2" />
      </svg>
      <svg className="kmenu-shape" data-shape="3" viewBox="0 0 400 400" fill="none">
        {[60, 160, 260, 360].map((x) =>
          [60, 160, 260, 360].map((y, j) => (
            <circle key={`${x}-${y}`} className="kmenu-shape-el" cx={x} cy={y} r={j % 2 ? 9 : 13} fill={[W[0], C, W[2], S][(x / 100 + j) % 4 | 0]} opacity="0.5" />
          )),
        )}
      </svg>
      <svg className="kmenu-shape" data-shape="4" viewBox="0 0 400 400" fill="none">
        <path className="kmenu-shape-el" d="M110 110 Q160 60 210 110 Q260 160 210 210 Q160 260 110 210 Q60 160 110 110" fill={W[1]} opacity="0.3" />
        <path className="kmenu-shape-el" d="M250 210 Q300 160 350 210 Q400 260 350 310 Q300 360 250 310 Q200 260 250 210" fill={C} opacity="0.16" />
      </svg>
      <svg className="kmenu-shape" data-shape="5" viewBox="0 0 400 400" fill="none">
        <line className="kmenu-shape-el" x1="0" y1="110" x2="320" y2="400" stroke={W[0]} strokeWidth="30" opacity="0.32" />
        <line className="kmenu-shape-el" x1="110" y1="0" x2="400" y2="300" stroke={C} strokeWidth="24" opacity="0.2" />
        <line className="kmenu-shape-el" x1="210" y1="0" x2="400" y2="200" stroke={W[2]} strokeWidth="18" opacity="0.3" />
      </svg>
    </div>
  )
}

export default function Navbar() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Estado de scroll para el fondo de la barra
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloqueo de scroll + Escape mientras el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Timeline GSAP de apertura/cierre
  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.inOut'
      const tl = gsap.timeline({ defaults: { ease, duration: 0.7 } })
      const btnTexts = gsap.utils.toArray<HTMLElement>('.kmenu-btn-text p')

      if (open) {
        gsap.set('.kmenu-wrap', { display: 'block' })
        tl.set('.kmenu-panel', { xPercent: 0 })
          .fromTo(btnTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.1, duration: 0.5 })
          .fromTo('.kmenu-overlay', { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
          .fromTo(
            '.kmenu-layer',
            { xPercent: 102 },
            { xPercent: 0, stagger: 0.1, duration: 0.6 },
            '<',
          )
          .fromTo(
            '.kmenu-link-inner',
            { yPercent: 120, rotate: 5 },
            { yPercent: 0, rotate: 0, stagger: 0.06, duration: 0.7 },
            '<+=0.32',
          )
          .fromTo(
            '.kmenu-foot',
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, clearProps: 'all' },
            '<+=0.15',
          )
      } else {
        tl.to('.kmenu-overlay', { autoAlpha: 0, duration: 0.5 })
          .to('.kmenu-layer', { xPercent: 102, stagger: 0.06, duration: 0.45 }, '<')
          .to(btnTexts, { yPercent: 0, duration: 0.4 }, '<')
          .set('.kmenu-wrap', { display: 'none' })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [open])

  // Efecto hover: cada link activa su forma abstracta
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('.kmenu-item[data-shape]'))
    const shapesBox = root.querySelector('.kmenu-shapes')
    const cleanups: Array<() => void> = []

    items.forEach((item) => {
      const idx = item.getAttribute('data-shape')
      const shape = shapesBox?.querySelector<SVGElement>(`.kmenu-shape[data-shape="${idx}"]`)
      if (!shape) return
      const els = shape.querySelectorAll('.kmenu-shape-el')

      const enter = () => {
        shapesBox?.querySelectorAll('.kmenu-shape').forEach((s) => s.classList.remove('active'))
        shape.classList.add('active')
        gsap.fromTo(
          els,
          { scale: 0.5, opacity: 0, rotate: -8 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: 'back.out(1.7)',
            overwrite: 'auto',
          },
        )
      }
      const leave = () => {
        gsap.to(els, {
          scale: 0.85,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          overwrite: 'auto',
          onComplete: () => shape.classList.remove('active'),
        })
      }
      item.addEventListener('mouseenter', enter)
      item.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        item.removeEventListener('mouseenter', enter)
        item.removeEventListener('mouseleave', leave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  const close = () => setOpen(false)

  return (
    <div ref={rootRef}>
      {/* Barra fija — solo logo + botón de menú (sin links de sección) */}
      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-6 sm:pt-5">
        <nav
          className={`relative mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-expo ${
            scrolled || open
              ? 'glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-cream/10'
              : 'bg-steel-950/20 ring-1 ring-inset ring-cream/5 backdrop-blur-sm'
          }`}
        >
          <a href="#top" onClick={close} className="font-serif text-2xl italic leading-none text-cream" data-cursor>
            {brand.logo}
          </a>

          {/* Botón cinético Menú/Cerrar */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            data-cursor
            className="group flex items-center gap-3 rounded-full bg-cream py-2.5 pl-5 pr-2.5 text-steel-950 transition-colors duration-500 ease-out-expo hover:bg-white"
          >
            <span className="kmenu-btn-text font-mono text-sm font-medium uppercase tracking-[0.12em]">
              <p>Menú</p>
              <p>Cerrar</p>
            </span>
            {/* Hamburguesa cinética: reacciona al hover (las barras se separan y
                cambian de ancho) y se cruza en X cuando el menú está abierto. */}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-steel-950 text-cream transition-colors duration-300 group-hover:bg-wine">
              <span className="relative block h-[11px] w-[18px]">
                <span
                  className={`absolute left-0 block h-[2px] rounded-full bg-cream transition-all duration-300 ease-out-expo ${
                    open
                      ? 'top-1/2 w-full -translate-y-1/2 rotate-45'
                      : 'top-0 w-full group-hover:w-3/4'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] rounded-full bg-cream transition-all duration-300 ease-out-expo ${
                    open
                      ? 'top-1/2 w-full -translate-y-1/2 -rotate-45'
                      : 'bottom-0 w-full group-hover:ml-[25%] group-hover:w-3/4'
                  }`}
                />
              </span>
            </span>
          </button>
        </nav>
      </header>

      {/* Menú a pantalla completa */}
      <div className="kmenu-wrap" data-nav={open ? 'open' : 'closed'}>
        <div className="kmenu-overlay" onClick={close} />
        <nav className="kmenu-panel">
          {/* Capas de fondo + glow + formas */}
          <div className="kmenu-layer l1" />
          <div className="kmenu-layer l2" />
          <div className="kmenu-layer l3" />
          <div className="kmenu-glow" />
          <MenuShapes />

          {/* Contenido */}
          <div className="relative z-[2] flex h-full flex-col justify-between px-7 pb-9 pt-28 sm:px-12 sm:pt-32">
            <ul className="flex flex-col gap-1.5">
              {nav.map((item, i) => (
                <li key={item.href} className="kmenu-item" data-shape={i + 1}>
                  <a
                    href={item.href}
                    onClick={close}
                    data-cursor
                    className="group flex items-baseline gap-4"
                  >
                    <span className="font-mono text-xs text-wine-300">0{i + 1}</span>
                    <span className="kmenu-link-mask">
                      <span className="kmenu-link-inner font-display text-[clamp(40px,9vw,76px)] font-medium leading-[1.05] tracking-tightest text-cream transition-colors duration-300 group-hover:text-wine-300">
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Pie del menú: CTA + disponibilidad + redes */}
            <div className="kmenu-foot flex flex-col gap-6 border-t border-cream/15 pt-7">
              <a
                href="#contacto"
                onClick={close}
                data-cursor
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-wine-500"
              >
                Hablemos
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/70">
                  {brand.availability}
                </span>
                <div className="flex gap-2">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      data-cursor
                      className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors duration-300 hover:border-wine-400/60 hover:bg-wine-500/20 hover:text-cream"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
