import React, { useState, useEffect, Suspense } from 'react';
// import PropTypes from 'prop-types'
import { HashRouter } from 'react-router-dom';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { MuiLoadingPage } from './components/muiCircularProgress';
import { lightTheme, darkTheme } from './styles/webTheme';
import {
  lightTheme as muiLightTheme,
  darkTheme as muiDarkTheme,
} from './styles/muiTheme';
import { GlobalStyles } from './styles/globalStyles';
import Layout from './layout';

const App = () => {
  const [webTheme, setWebTheme] = useState('dark');
  const toggleTheme = () => {
    if (webTheme === 'light') {
      setWebTheme('dark');
      window.localStorage.setItem('webTheme', 'dark');
    } else {
      setWebTheme('light');
      window.localStorage.setItem('webTheme', 'light');
    }
  };

  useEffect(() => {
    const localWebTheme = window.localStorage.getItem('webTheme');
    if (localWebTheme !== webTheme) {
      toggleTheme();
    }
  }, []);

  return (
    <SCThemeProvider theme={webTheme === 'light' ? lightTheme : darkTheme}>
      <MuiThemeProvider
        theme={webTheme === 'light' ? muiLightTheme : muiDarkTheme}
      >
        <GlobalStyles />
        <HashRouter>
          <Suspense fallback={<MuiLoadingPage />}>
            <div className="app">
              <Layout toggleTheme={toggleTheme} />
            </div>
          </Suspense>
        </HashRouter>
      </MuiThemeProvider>
    </SCThemeProvider>
  );
};

App.propTypes = {};

export default App;
