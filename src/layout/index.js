import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const index = ({ toggleTheme }) => {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <Content />
      <Footer />
    </>
  )
}

index.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
}

export default index
