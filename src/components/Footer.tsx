import { ArrowUp } from 'lucide-react'
import { brand, footer } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-steel-700 bg-steel-950 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* 4 bloques */}
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel-500">
              {footer.location.label}
            </p>
            <div className="mt-4 space-y-1 text-sm text-steel-300">
              {footer.location.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel-500">
              {footer.contact.label}
            </p>
            <div className="mt-4 space-y-1 text-sm text-steel-300">
              <a
                href={`mailto:${footer.contact.email}`}
                className="block transition-colors hover:text-steel-100"
                data-cursor
              >
                {footer.contact.email}
              </a>
              <p>{footer.contact.phone}</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel-500">Links</p>
            <ul className="mt-4 space-y-1.5 text-sm text-steel-300">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-steel-100" data-cursor>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel-500">Redes</p>
            <ul className="mt-4 space-y-1.5 text-sm text-steel-300">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-steel-100"
                    data-cursor
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wordmark gigante */}
        <div className="mt-16 select-none border-t border-steel-700 pt-8">
          <h2
            className="text-gradient text-center font-serif italic leading-none"
            style={{ fontSize: 'clamp(80px, 22vw, 360px)' }}
          >
            {brand.name}
          </h2>
        </div>

        {/* Base */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-steel-700 py-8 sm:flex-row">
          <p className="text-xs text-steel-500">
            © {brand.year} {brand.logo}. Todos los derechos reservados.
          </p>
          <a
            href="#top"
            data-cursor
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-steel-300 transition-colors hover:text-steel-100"
          >
            Volver arriba <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
