module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        likeheart: {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '15%': { opacity: 0.9, transform: 'scale(1.2)' },
          '30%:': { transform: 'scale(0.95)' },
          '45%, 80%': { opacity: 0.9, transform: 'scale(1)' },
        },
      },
      animation: {
        likeheart: 'likeheart 1s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
