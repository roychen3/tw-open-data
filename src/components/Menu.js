import React from 'react'
import { Link } from "react-router-dom";

import { MENU_LIST } from '../constants/menuItem'

const Menu = () => {
  const linkList = MENU_LIST.map((item) => (
    <Link key={item.hasName} to={`/${item.hasName}`}>{item.itemName}</Link>))

  return (
    <div className="menu">
      {linkList}
    </div>
  )
}

Menu.propTypes = {

}

export default Menu
