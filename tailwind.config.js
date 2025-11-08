/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./views/**/*.ejs",
    "./views/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), require('daisyui'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['dim'],
  },
};
