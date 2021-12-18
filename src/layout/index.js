import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const index = ({ toggleTheme, store }) => {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <Content store={store} />
      <Footer />
    </>
  )
}

index.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  store: PropTypes.instanceOf(Object).isRequired
}

export default index
