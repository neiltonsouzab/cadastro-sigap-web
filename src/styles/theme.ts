import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5397D9',
      main: '#3181CE',
      dark: '#084F93',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#F7FAFC',
        },
      },
    },
  },
});

export default theme;
