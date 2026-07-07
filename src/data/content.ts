/**
 * CONTENIDO DEL PORTAFOLIO — andres®
 * ------------------------------------------------------------------
 * Edita ÚNICAMENTE este archivo para personalizar textos, servicios,
 * proyectos, métricas, testimonios y datos de contacto.
 * Los valores marcados como (placeholder) son seguros de cambiar.
 */

export const brand = {
  /** Marca / nombre (navbar, preloader, footer wordmark). */
  name: 'andres',
  /** Marca con símbolo de registro (logo). */
  logo: 'andres®',
  /** Marca corta para móvil. */
  shortName: 'a®',
  role: 'Microagencia digital',
  availability: 'Disponible para nuevos proyectos',
  location: 'Remoto · LATAM',
  year: 2026,
}

export const hero = {
  /** Patrón firma: parte sans + palabra(s) serif italic. */
  titleSans: 'Creado,',
  titleItalic: 'con intención',
  /** Statement arriba a la derecha. */
  statement:
    'Creo y rediseño landing pages, webs completas, CRMs y automatizaciones con foco, claridad y compromiso total. Calidad de agencia, un único responsable dedicado.',
  contactLabel: 'Hablemos',
  /** Lista "Lo que hago" del hero. */
  doList: ['Landing Pages', 'Webs Completas', 'CRM Básicos', 'Automatizaciones'],
  /** Palabras que ciclan en el showcase tipográfico. */
  cyclingWords: ['landings.', 'webs', 'CRMs', 'flujos'],
  featuredLabel: 'Destacado',
  featuredIndex: '01',
}

export const marqueeWords = [
  'Landing Pages',
  'Webs Completas',
  'CRM Básicos',
  'Automatizaciones',
  'Diseño Premium',
  'Compromiso Total',
]

export type Service = {
  index: string
  title: string
  description: string
  tags: string[]
}

/** Los 4 servicios reales (reemplazan a los del template). */
export const services: Service[] = [
  {
    index: '01',
    title: 'Landing Pages',
    description:
      'Creación desde cero o rediseño de una existente. Páginas enfocadas en convertir: estructura persuasiva, copy claro y un único objetivo medible.',
    tags: ['Creación', 'Rediseño', 'Conversión'],
  },
  {
    index: '02',
    title: 'Webs Completas',
    description:
      'Sitios multipágina corporativos y de producto: rápidos, responsivos y optimizados para buscadores. Diseño limpio que transmite confianza desde el primer scroll.',
    tags: ['Multipágina', 'Responsive', 'SEO'],
  },
  {
    index: '03',
    title: 'CRM Básicos',
    description:
      'Un CRM adaptado a tu proceso de ventas: contactos, pipeline y seguimiento. Lo justo y necesario, sin pagar de más por funciones que no usas.',
    tags: ['Pipeline', 'Notion / Airtable', 'Seguimiento'],
  },
  {
    index: '04',
    title: 'Automatizaciones',
    description:
      'Conecto tus herramientas y elimino tareas repetitivas con flujos automáticos: formularios, emails, notificaciones y sincronización de datos.',
    tags: ['Make / Zapier', 'Webhooks', 'No-code'],
  },
]

export const servicesIntro =
  'Diseño y construyo experiencias digitales de principio a fin — estrategia, diseño y desarrollo en un solo flujo, sin el sobrecoste de una agencia.'

export type Project = {
  /** Coincide con el nombre del screenshot en src/assets/previews. */
  slug: string
  title: string
  /** Descripción de una línea (eyebrow). */
  blurb: string
  tags: string[]
  /** Reconocimiento opcional (badge). */
  badge?: { label: string; type: string; date: string }
  /** Color de acento del arte/mockup (gradiente CSS, fondo del modal). */
  art: string
  /** URL local para abrir la landing e interactuar (nueva pestaña). */
  localUrl: string
  /** Pista de ruta/arranque para el usuario. */
  pathHint: string
}

/** Proyectos reales — landings construidas. Screenshot por slug en assets/previews. */
export const projects: Project[] = [
  {
    slug: 'don-pietro',
    title: 'Don Pietro',
    blurb: 'Landing para pizzería artesanal — hero de producto y pedido directo',
    tags: ['Landing Page', 'Framer Motion', 'Awwwards style'],
    badge: { label: 'Destacado', type: 'Awwwards style', date: '2025' },
    art: 'linear-gradient(135deg,#8C2F39,#1a1208)',
    localUrl: 'http://localhost:3000',
    pathHint: 'E:\\CLAUDE\\don-pietro-pizzeria · Iniciar-dev.bat',
  },
  {
    slug: 'coqui-cafe',
    title: 'Coquí Café',
    blurb: 'Café de especialidad "quiet luxury" — hero en vídeo y carta',
    tags: ['Landing Page', 'Video Hero'],
    badge: { label: 'Caso', type: 'Landing Page', date: '2025' },
    art: 'linear-gradient(135deg,#1f3a36,#0d1f1c)',
    localUrl: 'http://localhost:3001',
    pathHint: 'E:\\CLAUDE\\coqui-cafe · Iniciar-dev.bat',
  },
  {
    slug: 'fontana-lounge',
    title: 'Fontana Lounge',
    blurb: 'Bar & Grill "moody luxe" — petróleo + cobre, reserva de mesa',
    tags: ['Landing Page'],
    badge: { label: 'Caso', type: 'Landing Page', date: '2025' },
    art: 'linear-gradient(135deg,#243b40,#3a1d10)',
    localUrl: 'http://localhost:3000',
    pathHint: 'E:\\CLAUDE\\fontana-lounge · Iniciar-dev.bat',
  },
  {
    slug: 'cafe-colonial',
    title: 'Café Colonial',
    blurb: 'Café · Restaurante · Bar — landing multipágina estética colonial',
    tags: ['Web Completa', 'Multipágina'],
    badge: { label: 'Caso', type: 'Multipágina', date: '2024' },
    art: 'linear-gradient(135deg,#5b3a1e,#1c130b)',
    localUrl: 'file:///E:/CLAUDE/cafe-colonial%20-%20copia/index.html',
    pathHint: 'E:\\CLAUDE\\cafe-colonial - copia · index.html',
  },
]

export const about = {
  title: 'Sobre mí',
  /** Etiqueta superior (eyebrow) de la columna de bio. */
  eyebrow: 'Sobre mí',
  /** Badge de disponibilidad sobre la foto. */
  availability: 'Disponible · LATAM',
  /** Titular: primera línea + palabra(s) de acento en serif italic. */
  headline: 'Diseñador y desarrollador.',
  headlineAccent: 'Uno solo, sin dilución.',
  /** Bio en dos párrafos (principal + secundario). */
  bioPrimary:
    'Trabajo desde Huancayo, Perú, con clientes de toda Hispanoamérica. No subcontrato, no delego en gestores: lo que diseño, lo construyo; lo que construyo, lo entrego. Microagencia significa que tu proyecto tiene un único responsable de principio a fin.',
  bioSecondary:
    'Me especializo en negocios reales — restaurantes, estudios, startups, retail — que necesitan presencia digital que convierta, no solo que se vea bien.',
  /** Stack de herramientas (pills). */
  tools: ['React', 'Next.js', 'Framer', 'Tailwind', 'GSAP', 'Supabase', 'Figma'],
  /** CTA inline hacia contacto. */
  ctaLabel: 'Escribir directo',
  /** Párrafo con highlight progresivo (legado — ya no se usa en la nueva sección). */
  paragraph:
    'Ayudo a fundadores y equipos pequeños a lanzar productos digitales que destacan y escalan. Un solo aliado, foco total y compromiso de principio a fin — desde la primera llamada hasta el lanzamiento, y después.',
  /** Contadores (count-up). Ajusta a tus números reales. */
  metrics: [
    { value: 40, suffix: '+', label: 'Proyectos entregados' },
    { value: 4, suffix: '+', label: 'Años de experiencia' },
    { value: 20, suffix: '+', label: 'Clientes felices' },
  ],
}

export type Step = {
  index: string
  title: string
  description: string
}

export const process = {
  intro:
    'Trabajo de forma directa y ágil — tratas conmigo, no con una cadena de gestores. Las ideas van de concepto a lanzamiento sin caos.',
  steps: [
    {
      index: '01',
      title: 'Descubrir',
      description: 'Entiendo tu objetivo, tu público y qué significa éxito para tu proyecto.',
    },
    {
      index: '02',
      title: 'Diseñar',
      description: 'Doy forma a la experiencia con un diseño con propósito y fiel a tu marca.',
    },
    {
      index: '03',
      title: 'Desarrollar',
      description: 'Construyo soluciones rápidas, escalables y responsivas, con cuidado del detalle.',
    },
    {
      index: '04',
      title: 'Lanzar y crecer',
      description: 'Publicamos con impacto y seguimos mejorando después del go-live.',
    },
  ] as Step[],
}

export type Highlight = {
  /** Etiqueta superior (eyebrow) en mono mayúsculas. */
  eyebrow: string
  /** Título corto del motivo (estilo "Reach Out"). */
  title: string
  /** Descripción larga que aparece bajo el título. */
  description: string
}

/** Sección "Por qué yo" — cada item con número gigante que cambia al scrollear. */
export const highlightsIntro = {
  title: '¿Por qué',
  titleItalic: 'yo?',
  description:
    'Sin intermediarios, sin sorpresas y sin cajas negras. Esto es lo que obtienes al trabajar conmigo de principio a fin.',
}
export const highlights: Highlight[] = [
  {
    eyebrow: 'Rapidez',
    title: 'Respuesta en 48 h',
    description:
      'Te contesto en menos de dos días, siempre. Sin colas de soporte ni tickets: hablas directamente conmigo y avanzamos sin esperas.',
  },
  {
    eyebrow: 'Plazos',
    title: 'Entrega en 2–4 semanas',
    description:
      'Landings y webs listas en pocas semanas, con un plazo claro cerrado desde el inicio y entregas visibles en cada etapa del proyecto.',
  },
  {
    eyebrow: 'Foco',
    title: 'Foco total, 100%',
    description:
      'Trabajo un proyecto a la vez. Toda mi atención en tu producto, sin repartir el cuidado entre diez clientes en paralelo.',
  },
  {
    eyebrow: 'Trato',
    title: 'Trato uno a uno',
    description:
      'Hablas conmigo de principio a fin, no con intermediarios. Una sola persona responsable de estrategia, diseño y desarrollo.',
  },
]

export type PartnerRole = { title: string; description: string }

export const partner = {
  title: 'Un solo aliado,',
  titleItalic: 'en cada paso',
  description:
    'Soy microagencia: no delego en una cadena de cuentas. Cubro todo el proceso de principio a fin, con un único responsable y compromiso total.',
  roles: [
    {
      title: 'Estrategia',
      description: 'Defino objetivo, público y alcance para que cada decisión tenga un porqué.',
    },
    {
      title: 'Diseño',
      description: 'Doy forma a una experiencia con propósito, fiel a tu marca y pensada para convertir.',
    },
    {
      title: 'Desarrollo',
      description: 'Construyo rápido, escalable y responsivo, cuidando cada detalle del código.',
    },
    {
      title: 'Entrega',
      description: 'Publicamos con impacto y sigo disponible para mejorar tras el lanzamiento.',
    },
  ] as PartnerRole[],
}

export type Testimonial = {
  quote: string
  name: string
  /** Empresa / cargo (línea muted bajo el nombre). */
  company: string
}

/** Testimonios — VACÍOS a propósito (aún sin clientes). Se conserva la estructura
 *  de la sección: cada entrada vacía renderiza una tarjeta placeholder (esqueleto)
 *  en Testimonials.tsx. Al tener citas reales, rellena quote/name/company y las
 *  tarjetas se muestran automáticamente con su contenido. */
export const testimonials: Testimonial[] = [
  { quote: '', name: '', company: '' },
  { quote: '', name: '', company: '' },
  { quote: '', name: '', company: '' },
  { quote: '', name: '', company: '' },
  { quote: '', name: '', company: '' },
  { quote: '', name: '', company: '' },
]

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: '¿Cuánto tarda un proyecto típico?',
    a: 'La mayoría de landings y webs toman entre 2 y 4 semanas. Siempre te doy un plazo claro por adelantado.',
  },
  {
    q: '¿Ofreces soporte después del lanzamiento?',
    a: 'Sí — quedo disponible para arreglos, ajustes y mejoras después del go-live.',
  },
  {
    q: '¿Y si solo necesito el diseño o solo el desarrollo?',
    a: 'Funciona. Puedo encargarme de todo o integrarme en una sola parte del proceso.',
  },
  {
    q: '¿Puedes trabajar con mi equipo interno?',
    a: 'Claro. Me integro con tu equipo y tus herramientas sin fricción.',
  },
  {
    q: '¿Trabajas con startups o solo empresas establecidas?',
    a: 'Con ambas — desde fundadores primerizos hasta equipos en crecimiento.',
  },
]

export const contact = {
  titleSans: 'Hablemos de tu',
  titleItalic: 'próxima gran idea',
  formLabel: 'Rellena el formulario',
  email: 'anbastidasp@gmail.com',
  whatsapp: {
    label: 'WhatsApp',
    number: '51967200872',
    display: '+51 967 200 872',
    message: 'Hola, vi tu portafolio y me gustaría contarte sobre un proyecto.',
  },
}

export const footer = {
  location: { label: 'Ubicación', lines: ['Remoto · LATAM', 'Trabajo con clientes de toda Hispanoamérica'] },
  contact: { label: 'Contacto', email: 'anbastidasp@gmail.com', phone: '+51 967 200 872' },
  links: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
    { label: 'WhatsApp', href: 'https://wa.me/51967200872' },
  ],
}

export const nav = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]
