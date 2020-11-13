import React from 'react'
import {Link} from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/holiday">國定假日</Link>
      <Link to="/weather">全國天氣</Link>
    </div>
  )
}

Menu.propTypes = {

}

export default Menu
