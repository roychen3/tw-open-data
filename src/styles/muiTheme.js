import { createTheme } from '@material-ui/core/styles';
import {
  lightTheme as lightWebTheme,
  darkTheme as darkWebTheme,
} from './webTheme';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: { main: lightWebTheme.highlight },
    secondary: { main: lightWebTheme.secondText },
    error: { main: lightWebTheme.error },
    text: {
      primary: lightWebTheme.mainText,
      secondary: lightWebTheme.secondText,
      icon: lightWebTheme.mainText,
    },
    divider: lightWebTheme.secondBackground,
    background: {
      paper: lightWebTheme.secondBackground,
      default: lightWebTheme.mainBackground,
    },
    action: {
      hover: lightWebTheme.hover,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: darkWebTheme.highlight },
    secondary: { main: darkWebTheme.secondText },
    error: { main: darkWebTheme.error },
    text: {
      primary: darkWebTheme.mainText,
      secondary: darkWebTheme.secondText,
      icon: darkWebTheme.mainText,
    },
    divider: darkWebTheme.secondBackground,
    background: {
      paper: darkWebTheme.secondBackground,
      default: darkWebTheme.mainBackground,
    },
    action: {
      hover: darkWebTheme.hover,
    },
  },
});
