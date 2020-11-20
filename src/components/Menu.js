import React from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

import { menuList } from '../routes'

const Menu = ({ toggleTheme }) => {
  const linkList = menuList.map((item) => (
    <Link key={item.hashName} to={`/${item.hashName}`}>{item.itemName}</Link>))

  return (
    <div className="menu">
      <a onClick={toggleTheme}>toggleTheme</a>
      {linkList}
    </div>
  )
}

Menu.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
}

export default Menu
