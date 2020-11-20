import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import DataUsageIcon from '@material-ui/icons/DataUsage'
import Drawer from '@material-ui/core/Drawer'

import { WEB_COLOR_ORANGEWEB, WEB_COLOR_WHITE, WEB_COLOR_BLACK, WEB_COLOR_OXFORDBLUE, WEB_COLOR_DARK_HOVER } from '../constants/color'
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

const useStyles = makeStyles({
  iconButton: {
    marginRight: 10,
    color: WEB_COLOR_WHITE,

    '&:hover': {
      backgroundColor: WEB_COLOR_DARK_HOVER,
    }
  },
  iconTitle: {
    color: WEB_COLOR_ORANGEWEB,
    margin: 'auto 0',

  },
  paper: {
    backgroundColor: WEB_COLOR_BLACK,
    color: WEB_COLOR_WHITE,
    borderRight: `${WEB_COLOR_OXFORDBLUE} solid 1px`,
    boxShadow: 'inset 0px 0px 0px -100px #ABABAB,13px 0px 18px 0px #00000080',
  }
})

const Header = ({ toggleTheme }) => {
  const classes = useStyles()

  const [mobilMenuIsOpen, setMobilMenuIsOpen] = useState(false)
  const toggleMobilMenuDrawer = (open) => { setMobilMenuIsOpen(open) }

  return (
    <StyledHeader>
      <Grid container spacing={1}>
        <Grid item xs>
          <StyledTitleContainer>
            <Hidden smUp>
              <IconButton className={classes.iconButton} size="small" onClick={() => toggleMobilMenuDrawer(true)}>
                <MenuIcon />
              </IconButton >
              <Drawer
                classes={{ paper: classes.paper }}
                variant="persistent"
                anchor={'left'}
                open={mobilMenuIsOpen}
                onClose={() => toggleMobilMenuDrawer(false)}
              >
                <MobileMenu
                  closeMenu={() => toggleMobilMenuDrawer(false)} toggleTheme={toggleTheme}
                />
              </Drawer>
            </Hidden>
            <DataUsageIcon className={classes.iconTitle} />
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
