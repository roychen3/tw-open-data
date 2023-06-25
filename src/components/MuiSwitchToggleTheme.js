import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Switch from '@material-ui/core/Switch'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'

const StyledSwitch = styled(Switch)``

const MuiSwitchToggleTheme = ({ toggleTheme }) => {
  const localWebTheme = window.localStorage.getItem('webTheme')

  return (
    <>
      <Brightness4Icon />
      <StyledSwitch
        checked={localWebTheme === 'light' ? true : false}
        color="default"
        size="small"
        onChange={toggleTheme}
      />
      <Brightness7Icon />
    </>
  )
}

MuiSwitchToggleTheme.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
}

export default MuiSwitchToggleTheme
