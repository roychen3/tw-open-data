import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"

import Layout from './layout'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Layout />
      </div>
    </Router>
  )
}

App.propTypes = {

}

export default App
