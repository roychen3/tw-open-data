import React from 'react'
import Grid from '@material-ui/core/Grid';

import Menu from './Menu'

const Header = () => {
  return (
    <Grid item xs={12}>
      <div className="header-container">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div className="title">政府資料開放平台</div>
          </Grid>
          <Grid item xs>
            <Menu />
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

Header.propTypes = {

}

export default Header
