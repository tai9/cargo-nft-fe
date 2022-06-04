import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export let theme = createTheme({
  palette: {
    primary: {
      light: '#90caf9',
      main: '#2081e2',
      dark: '#1e88e5',
    },
    secondary: {
      light: '#ede7f6',
      main: '#673ab7',
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
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: 680,
          '@media (min-width: 600px)': {
            maxWidth: 680,
          },
        },
        maxWidthMd: {
          maxWidth: 860,
          '@media (min-width: 900px)': {
            maxWidth: 860,
          },
        },
      },
      variants: [],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          textTransform: 'capitalize',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // background: color.grey50,
          borderRadius: `4px`,
          '& .MuiOutlinedInput-notchedOutline': {
            // borderColor: color?.grey400,
          },
          '&:hover $notchedOutline': {
            // borderColor: color?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          // background: color.grey50,
          padding: '15.5px 14px',
          borderRadius: `4px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `4px`,
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)
