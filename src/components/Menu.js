import React from 'react'
import { Link } from "react-router-dom";

import { menuList } from '../routes'

const Menu = () => {
  const linkList = menuList.map((item) => (
    <Link key={item.hashName} to={`/${item.hashName}`}>{item.itemName}</Link>))

  return (
    <div className="menu">
      {linkList}
    </div>
  )
}

Menu.propTypes = {

}

export default Menu
