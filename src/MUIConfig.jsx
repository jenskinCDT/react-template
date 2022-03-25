import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#01579b',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
});
