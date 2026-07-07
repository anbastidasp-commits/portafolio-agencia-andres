/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta DEFINITIVA — base Azul Marino #1B263B, texto Crema #F5F2EB,
        // detalles Azul Acero #457B9D. (El nombre "steel" se conserva para no
        // tocar cada className; los valores son los nuevos.)
        steel: {
          950: '#0F1722', // base background (marino profundo)
          900: '#1B263B', // Azul Marino — estructura / paneles / secciones
          800: '#22304A', // cards / superficies elevadas
          700: '#2C3A56', // bordes 1px / stroke
          500: '#457B9D', // Azul Acero — detalles secundarios / muted
          300: '#8FA9BE', // texto secundario / labels (acero claro)
          100: '#F5F2EB', // Crema Suave — texto / foreground
        },
        // Rojo Carmesí #C0392B — color de elementos importantes (definitiva).
        // (Se conserva el nombre "wine" para no tocar cada className.)
        wine: {
          DEFAULT: '#C0392B',
          700: '#8F2A20',
          600: '#A52F23',
          500: '#C0392B',
          400: '#D24E3E',
          300: '#E07A6C', // carmesí claro sobre fondo oscuro
        },
        cream: {
          DEFAULT: '#F5F2EB', // Crema Suave (definitiva)
          dark: '#DAD5C7',
        },
        slate: '#457B9D', // Azul Acero (definitiva)

        // Alias semánticos
        light: '#F5F2EB',
      },
      fontFamily: {
        // Grotesca pesada para titulares (estilo ref. SPECTOR)
        display: ['Archivo', '"Inter Tight"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        // Serif italic display para palabras de acento (firma visual)
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'menu-fade-in': {
          from: { opacity: '0', transform: 'translateY(0.5em)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        // Atmósfera de color que deriva lento detrás del vídeo del hero.
        'aurora-drift': {
          '0%': { transform: 'translate3d(-2%, -1%, 0) scale(1.06)', opacity: '0.75' },
          '100%': { transform: 'translate3d(2%, 2%, 0) scale(1.14)', opacity: '1' },
        },
        // Brillo que recorre los títulos gigantes (sutil, premium).
        sheen: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        // Pulso del punto "disponible".
        'pulse-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.7)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'menu-fade-in': 'menu-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 7s ease-in-out infinite',
        'aurora-drift': 'aurora-drift 22s ease-in-out infinite alternate',
        sheen: 'sheen 6s linear infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
