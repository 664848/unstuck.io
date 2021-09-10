const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        bebasneue: ['Bebas Neue', 'cursive'],
        lobster: ['Lobster', 'cursive'],
        comfortaa: ['Comfortaa', 'cursive'],
        handlee: ['Handlee', 'cursive'],
        indieflower: ['Indie Flower', 'cursive'],
        catamaran: ['Catamaran', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
    colors: {
      ...colors,
      bg: '#262626',
      firebrick: '#B3001B',
      lapislazuli: '#255C99',
      iceberg: '#73A3CC',
      eerie: '#262626',
      tan: 'CCAD8F',
    },
  },
  variants: {
    extend: {
      borderWidth: ['first'],
    },
  },
  plugins: [],
}
