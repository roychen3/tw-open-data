import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '@material-ui/icons/GitHub'

import MuiSwitchToggleTheme from '../components/MuiSwitchToggleTheme'

const StyledMenuContainer = styled.div`
  min-height: 30px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`
const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.mainText} !important;

  &.MuiButtonBase-root.MuiIconButton-root {
    padding: 0 !important;
  }

  :hover {
    color: ${({ theme }) => theme.highlight} !important;
  }
`

const StyledToggleThemeContainer = styled.div`
  display: flex;
  align-items: center;
`

const Menu = ({ toggleTheme }) => {
  return (
    <StyledMenuContainer>
      <StyledIconButton
        href="https://github.com/roychen3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </StyledIconButton>
      <StyledToggleThemeContainer>
        <MuiSwitchToggleTheme toggleTheme={toggleTheme} />
      </StyledToggleThemeContainer>
    </StyledMenuContainer>
  )
}

Menu.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
}

export default Menu
