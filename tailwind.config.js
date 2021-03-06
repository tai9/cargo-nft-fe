module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2181e2',
        darkBlue: '#04111d',
        darkGrey: '#363840',
        lightGrey: '#4c505c',
        greyBlue: '#1868B7',
        grey1: '#8A939B',
        grey2: '#303339',
        'black-rgba': 'rgba(0, 0, 0, 0.5)',
        darkLine: '#151c22',
        textGrey: '#8a939b',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: [
      {
        dark: {
          primary: '#2181e2',
        },
      },
    ],
  },
}
