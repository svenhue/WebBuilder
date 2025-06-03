
/** @type {import('tailwindcss').Config} */
export default {
  content: [
     './pages/**/*.{html,js,vue}',
  './components/**/*.{html,js,vue}'
  ],
  plugins: [require("daisyui")],
  prefix: 'tw-',
  daisyui:{
    
    themes: [
      "business"
    ]
  },
  theme: {
      extend: {
      colors: {
        'primary': '#4C9AFF',
        'primary-dark': '#1F2223',
        'primary-white': '#ffffff',
        'akzent': '#0a1082',

        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',

        'fontwhite': '#ffffff',
        'darkgrey': '#57595d',
        'brightgrey': '#34373B',


        'dark': '#1d1d1d',
        'dark-page': '#121212',
        'positive': '#21ba45',
        'negative': '#c10015',
        'info': '#31ccec',
        'warning': '#f2c037'

      }
    }
  }
}

