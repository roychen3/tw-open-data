import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from 'styled-components'

import { lightTheme, darkTheme } from './webTheme'
import { GlobalStyles } from './globalStyles'
import Layout from './layout'

const App = () => {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      window.localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      window.localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if(localTheme === 'light'){
      setTheme('light')
    }
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <div className="app">
          <Layout toggleTheme={toggleTheme} />
        </div>
      </Router>
    </ThemeProvider>
  )
}

App.propTypes = {

}

export default App
