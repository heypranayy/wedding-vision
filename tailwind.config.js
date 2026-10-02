/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          emerald: '#1a484c',
          'emerald-deep': '#0f292c',
          'emerald-light': '#245a5f',
          gold: '#C5A880',
          'gold-antique': '#D4AF37',
          'gold-subtle': '#E8DCCF',
          'gold-light': '#F5EFE6',
          sand: '#FAF7F2',
          'sand-dark': '#EFE9DE',
          charcoal: '#242424',
          'charcoal-deep': '#171717',
          muted: '#666666',
          terracotta: '#B85D38',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'luxury': '0.22em',
        'heritage': '0.15em',
      },
      boxShadow: {
        'regal': '0 20px 40px -15px rgba(26, 72, 76, 0.12)',
        'regal-lg': '0 30px 60px -20px rgba(26, 72, 76, 0.22)',
      }
    },
  },
  plugins: [],
}
