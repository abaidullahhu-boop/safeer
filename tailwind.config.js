/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F4F3EE',
          light: '#FBFAF6',
          dark: '#EBE9E0',
        },
        pearl: '#FBFAF6',
        navy: {
          DEFAULT: '#0C2A5C',
          deep: '#081B3D',
          royal: '#174E87',
          950: '#081B3D',
          900: '#0C2A5C',
          850: '#11356F',
          800: '#174E87',
        },
        gold: {
          700: '#85601B', // Gold text on light backgrounds
          500: '#B58638',
          300: '#E3C078',
          100: '#F6E2A8',
          DEFAULT: '#B58638',
        },
        aqua: {
          500: '#3EBFD2',
          200: '#9BE3EE',
          50: '#E3F6F9',
          DEFAULT: '#3EBFD2',
        },
        leaf: '#3E9B5B',
        champagne: {
          DEFAULT: '#B58638',
          light: '#E3C078',
          dark: '#85601B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        amiri: ['Amiri', 'serif'],
        editorial: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'sans-serif'], // Removed monospace as required
      },
      boxShadow: {
        'card-pearl': '0 12px 36px rgba(12, 42, 92, 0.06), 0 2px 8px rgba(181, 134, 56, 0.05)',
        'card-dark': '0 20px 50px rgba(8, 27, 61, 0.4)',
        'gold-glow': '0 4px 20px rgba(181, 134, 56, 0.35)',
        'gold-glow-lg': '0 8px 30px rgba(181, 134, 56, 0.45)',
      }
    },
  },
  plugins: [],
}
