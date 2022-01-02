import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import DataUsageIcon from '@material-ui/icons/DataUsage'
import Drawer from '@material-ui/core/Drawer'

import Menu from '../components/Menu'
import MobileMenu from '../components/MobileMenu'

const StyledHeader = styled.header`
width: 100%;
padding: 1rem;
background-color: ${({ theme }) => theme.secondBackground};
position: fixed;
z-index: 110;
`
const StyledTitleContainer = styled.div`
min-height: 30px;
height: 100%;
display: flex;
align-items: center;
`
const StyledTitle = styled.div`
margin: auto 0;
font-size: large;
font-weight: bolder;
color: ${({ theme }) => theme.mainText};
`
const StyledIconButton = styled(IconButton)`
margin-right: 10px !important;
color: ${({ theme }) => theme.mainText} !important;

:hover {
    background-color: ${({ theme }) => theme.hover} !important;
}
`
const StyledDataUsageIcon = styled(DataUsageIcon)`
margin: auto 0;
color: ${({ theme }) => theme.highlight};
`
const StyledDrawer = styled(Drawer)`
.MuiPaper-root {
  background-color: ${({ theme }) => theme.secondBackground};
  color: ${({ theme }) => theme.mainText};
  border-right: solid 1px ${({ theme }) => theme.mainBackground};
  box-shadow: inset 0px 0px 0px -100px ${({ theme }) => theme.hover},13px 0px 18px 0px #00000080;
}
`

const Header = ({ toggleTheme }) => {
  const [mobilMenuIsOpen, setMobilMenuIsOpen] = useState(false)
  const toggleMobilMenuDrawer = (open) => { setMobilMenuIsOpen(open) }

  return (
    <StyledHeader>
      <Grid container spacing={1}>
        <Grid item xs>
          <StyledTitleContainer>
            <StyledIconButton size="small" onClick={() => toggleMobilMenuDrawer(true)}>
              <MenuIcon />
            </StyledIconButton >
            <StyledDrawer
              variant="persistent"
              anchor={'left'}
              open={mobilMenuIsOpen}
              onClose={() => toggleMobilMenuDrawer(false)}
            >
              <MobileMenu
                closeMenu={() => toggleMobilMenuDrawer(false)} toggleTheme={toggleTheme}
              />
            </StyledDrawer>
            <StyledDataUsageIcon />
            <StyledTitle>政府資料開放平台</StyledTitle>
          </StyledTitleContainer>
        </Grid>
        <Hidden xsDown>
          <Grid item xs>
            <Menu toggleTheme={toggleTheme} />
          </Grid>
        </Hidden>
      </Grid>
    </StyledHeader>
  )
}

Header.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
}

export default Header
