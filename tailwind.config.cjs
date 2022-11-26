const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grid: {
          border: colors.blue['500'],
          start: colors.red['500'],
          meta: colors.orange['500'],
          wall: colors.teal['900'],
          visited: colors.cyan['200'],
          path: colors.yellow['200'],
        },
      },
      keyframes: {
        'node-visited': {
          '0%': {
            backgroundColor: colors.purple['300'],
            borderRadius: '100%',
            transform: 'scale(0.1)',
          },
          '33%': { backgroundColor: colors.violet['300'] },
          '66%': { backgroundColor: colors.indigo['400'] },
          '100%': {
            backgroundColor: colors.cyan['200'],
            borderRadius: undefined,
            transform: undefined,
          },
        },
        'node-path': {
          '0%': {
            transform: 'scale(1.5)',
          },
          '100%': {
            transform: undefined,
          },
        },
      },
      animation: {
        'node-visited': 'node-visited 0.5s ease-out',
        'node-path': 'node-path 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
