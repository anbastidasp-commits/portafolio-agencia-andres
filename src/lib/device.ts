/**
 * Tier de dispositivo, evaluado una vez por sesión.
 * LOW_POWER = táctil o pantalla estrecha → versión ligera del sitio:
 * sin shader WebGL, sin Spline, sin Lenis, sin parallax por frame,
 * sin grano ni backdrop-filter. El diseño (paleta, layout, reveals
 * one-shot) se mantiene idéntico.
 */
export const LOW_POWER =
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
