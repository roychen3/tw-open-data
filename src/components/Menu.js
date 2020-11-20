import React from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { menuList } from '../routes'
import MuiSwitchToggleTheme from '../components/MuiSwitchToggleTheme'

const StyledMenuContainer = styled.div`
min-height: 30px;
height: 100%;
display: flex;
justify-content: flex-end;
align-items: center;

a{
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
}
`
const StyledToggleThemeContainer = styled.div`
display: flex;
align-items: center;
color: ${({ theme }) => theme.mainText} !important;
`

const Menu = ({ toggleTheme }) => {

  const linkList = menuList.map((item) => (
    <Link key={item.hashName} to={`/${item.hashName}`}>{item.itemName}</Link>))

  return (
    <StyledMenuContainer>
      {linkList}
      <StyledToggleThemeContainer>
        <MuiSwitchToggleTheme
          toggleTheme={toggleTheme}
        />
      </StyledToggleThemeContainer>
    </StyledMenuContainer>
  )
}

Menu.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
}

export default Menu
