module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF3855',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
