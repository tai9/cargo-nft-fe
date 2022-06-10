import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const colors = {
  primary: {
    light: '#90caf9',
    main: '#2081e2',
    dark: '#1e88e5',
  },
  secondary: {
    light: '#ede7f6',
    main: '#ffffff',
    dark: '#5e35b1',
  },
  error: {
    light: '#ef9a9a',
    main: '#f44336',
    dark: '#c62828',
  },
  text: {
    primary: '#212121',
    secondary: '#9e9e9e',
  },
  darkBlue: '#04111d',
  darkGrey: '#363840',
  lightGrey: '#4c505c',
  greyBlue: '#1868B7',
  grey1: '#8A939B',
  grey2: '#303339',
  'black-rgba': 'rgba(0, 0, 0, 0.5)',
  darkLine: '#151c22',
}

export let theme = createTheme({
  palette: colors,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          textTransform: 'capitalize',

          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: '#4c505c',
          },
        },
        outlined: {
          color: 'white',
          borderColor: 'white',
          backgroundColor: '#202225',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textTransform: 'capitalize',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderColor: '#151c22',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: 'grey',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto',
  },
})

theme = responsiveFontSizes(theme)
