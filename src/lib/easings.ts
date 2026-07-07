// Sistema de easings con propósito semántico.
// Centraliza las curvas en vez de hardcodear [0.16, 1, 0.3, 1] por todos lados.

export const EASE = {
  // Entrada principal — expo out. Para reveals y apariciones.
  out: [0.16, 1, 0.3, 1] as const,

  // Para elementos que salen de pantalla (disappear). Más rápido.
  in: [0.7, 0, 0.84, 0] as const,

  // Para micro-interacciones hover con rebote físico.
  spring: [0.34, 1.56, 0.64, 1] as const,

  // Para acordeones y expansiones de altura (sin overshoot que recorte).
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
} as const

export const DUR = {
  fast: 0.25, // micro-feedback (hover, click)
  base: 0.5, // revelación de elemento individual
  slow: 0.7, // revelación de sección completa
  hero: 1.1, // animaciones del hero (ya en uso)
} as const

// Stagger por tipo de contenido.
export const STAGGER = {
  cards: 0.08, // tarjetas de servicios/proyectos
  lines: 0.06, // líneas de texto
  items: 0.1, // items de lista/FAQ
} as const
