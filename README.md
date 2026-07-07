# andres® — Portafolio microagencia (estilo Agenciy)

Landing **awwwards** tema oscuro (steel-mono frío) con objeto 3D cromado en el hero,
scroll suave y muchas micro-animaciones. Posicionamiento: microagencia / freelance con
**foco y compromiso total** — un solo responsable, calidad de agencia.

## Cómo arrancarlo
- **Doble clic en `Iniciar-dev.bat`** (instala dependencias la primera vez y abre el navegador).
- O por terminal:
  ```bash
  npm install
  npm run dev      # http://localhost:5173
  npm run build    # genera dist/index.html (archivo único, se abre con doble clic)
  ```

## Stack
Vite + React 18 + TypeScript + Tailwind + Framer Motion + Lenis (scroll suave) +
three.js / @react-three/fiber + @react-three/drei (blob cromado del hero).
`vite-plugin-singlefile` empaqueta todo en un único `dist/index.html`.

## Editar el contenido
**Todo el texto, servicios, proyectos, métricas, testimonios y contacto** viven en
un solo archivo:

```
src/data/content.ts
```

Cambia ahí marca, copy y datos. Los valores marcados `(placeholder)` están listos para reemplazar:
- `projects` → tus 3 mejores casos (título, descripción, tags, badge).
- `about.metrics` → tus números reales (proyectos, años, clientes).
- `testimonials` → citas reales de clientes.
- `highlights` → resultados/compromisos (reemplaza la sección de premios).

## Secciones
Hero (blob cromado) · Marquee · Servicios (4) · Sobre mí (highlight + contadores) ·
Proyectos (cards apiladas) · Proceso · Resultados (filas con foco) · Con quién trabajas ·
Testimonios (parallax) · FAQ · Contacto · Footer (wordmark gigante).

## Animaciones incluidas
Reveal on-scroll, text-fill highlight, count-up, blob 3D + parallax, palabra cíclica,
cards apiladas, filas que se iluminan, marquee infinito, parallax de testimonios,
acordeón FAQ, underline en inputs, nav sticky con blur, scroll suave (Lenis).
Todo respeta `prefers-reduced-motion`.

## El blob 3D
`src/components/Scene3D.tsx`. Usa un entorno de luces **procedural** (Lightformer),
sin descargar HDR — funciona offline y en el build de archivo único. Para ajustar el
cromado: `metalness`, `roughness`, `envMapIntensity`, `distort`, `speed`.
