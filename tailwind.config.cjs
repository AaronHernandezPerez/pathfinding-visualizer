/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grid: {
          border: colors.blue['500'],
          start: colors.red['500'],
          meta: colors.orange['500'],
        },
      },
    },
  },
  plugins: [],
};
