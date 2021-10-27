module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'lumin': 'rgb(75, 85, 72)',
      "lumin-dark": "rgb(43, 46, 43)",
      'lumin-transparent': 'rgb(205, 209, 206,0.8)',
      'lumin-products': 'rgb(226, 230, 227)',
      "cart": 'rgb(242, 242, 239)'
     }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
