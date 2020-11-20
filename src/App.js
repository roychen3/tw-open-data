import React, { useState } from 'react'
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
    } else {
      setTheme('light')
    }
  }

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
