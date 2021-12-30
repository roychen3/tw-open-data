import React, { useState, useEffect, Suspense } from 'react'
// import PropTypes from 'prop-types'
import { HashRouter } from "react-router-dom"
import { ThemeProvider } from 'styled-components'

import { MuiLoadingPage } from './components/muiCircularProgress'
import { lightTheme, darkTheme } from './webTheme'
import { GlobalStyles } from './globalStyles'
import Layout from './layout'

const App = () => {
  const [webTheme, setWebTheme] = useState('dark')
  const toggleTheme = () => {
    if (webTheme === 'light') {
      setWebTheme('dark')
      window.localStorage.setItem('webTheme', 'dark')
    } else {
      setWebTheme('light')
      window.localStorage.setItem('webTheme', 'light')
    }
  }

  useEffect(() => {
    const localWebTheme = window.localStorage.getItem('webTheme')
    if (localWebTheme === 'light') {
      setWebTheme('light')
    }
  }, [])

  return (
    <ThemeProvider theme={webTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <HashRouter>
        <Suspense fallback={<MuiLoadingPage />}>
          <div className="app">
            <Layout toggleTheme={toggleTheme} />
          </div>
        </Suspense>
      </HashRouter>
    </ThemeProvider>
  )
}

App.propTypes = {
}

export default App
