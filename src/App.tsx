import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import About from './components/About'
import Work from './components/Work'
import Process from './components/Process'
import Highlights from './components/Highlights'
import Partner from './components/Partner'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import ScrollCurtain from './components/ScrollCurtain'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Preloader />
      <CustomCursor />
      <div className="grain" aria-hidden="true" />

      {/* Fondo base de la página: marino limpio y plano (sin blobs de color que
          generaban "ruido"). Las secciones-cortina se elevan con un panel un
          tono más claro; el acento (carmesí) vive en los componentes. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg,#101826 0%,#0c1420 100%)' }}
      />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        {/* Secciones-cortina = panel marino homogéneo (#141d2c) elevado sobre la
            base. Sin tintes de color en el fondo → cero ruido; coherente y limpio. */}
        <ScrollCurtain background="#141d2c">
          <Services />
        </ScrollCurtain>
        <ScrollCurtain background="#141d2c">
          <About />
        </ScrollCurtain>
        <Work />
        <ScrollCurtain background="#141d2c">
          <Process />
        </ScrollCurtain>
        {/* Highlights se excluye de la cortina: usa position:sticky (la cortina
            rompe sticky por su overflow-hidden + transform). */}
        <Highlights />
        <ScrollCurtain background="#141d2c">
          <Partner />
        </ScrollCurtain>
        {/* Testimonials se excluye de la cortina: usa sticky (igual que Work) */}
        <Testimonials />
        <ScrollCurtain background="#141d2c">
          <FAQ />
        </ScrollCurtain>
        {/* Contacto = pantalla de cierre a tela completa (incluye © + redes,
            por eso ya no hay un Footer separado). */}
        <Contact />
      </main>
    </>
  )
}
