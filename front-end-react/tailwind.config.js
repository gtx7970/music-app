module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {},
     colors: {
       'color-text-l': 'var(--color-text-l)'
     }
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }