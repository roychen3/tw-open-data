import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import Drawer from '@material-ui/core/Drawer';

import { WEB_COLOR_ORANGEWEB, WEB_COLOR_WHITE, WEB_COLOR_BLACK, WEB_COLOR_OXFORDBLUE, WEB_COLOR_DARK_HOVER } from '../constants/color'
import Menu from '../components/Menu'
import MobileMenu from '../components/MobileMenu'

const useStyles = makeStyles({
  iconButton: {
    color: WEB_COLOR_WHITE,

    '&:hover': {
      backgroundColor: WEB_COLOR_DARK_HOVER,
    }
  },
  iconTitle: {
    color: WEB_COLOR_ORANGEWEB,
    margin: 'auto 0',
    marginLeft: 10,
  },
  paper: {
    backgroundColor: WEB_COLOR_BLACK,
    color: WEB_COLOR_WHITE,
    borderRight: `${WEB_COLOR_OXFORDBLUE} solid 1px`,
    boxShadow: 'inset 0px 0px 0px -100px #ABABAB,13px 0px 18px 0px #00000080',
  }
})

const Header = () => {
  const classes = useStyles()

  const [mobilMenuIsOpen, setMobilMenuIsOpen] = useState(false)
  const toggleMobilMenuDrawer = (open) => { setMobilMenuIsOpen(open) }

  return (
    <header className="header-container">
      <Grid container spacing={1}>
        <Grid item xs>
          <div className="title-container">
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
                <MobileMenu closeMenu={() => toggleMobilMenuDrawer(false)} />
              </Drawer>
            </Hidden>
            <DataUsageIcon className={classes.iconTitle} />
            <div className="title">政府資料開放平台</div>
          </div>
        </Grid>
        <Hidden xsDown>
          <Grid item xs>
            <Menu />
          </Grid>
        </Hidden>
      </Grid>
    </header>
  )
}

Header.propTypes = {

}

export default Header
