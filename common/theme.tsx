'use client';
import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5B1958',
    },
    secondary: {
      main: '#628CDD',
    },
  },
  typography: {
    fontSize: 13,
  },
});

export default responsiveFontSizes(theme);
