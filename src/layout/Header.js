import React from 'react'
import Grid from '@material-ui/core/Grid';

const Header = () => {
  return (
    <Grid item xs={12}>
      <div className="header-container">
        <div className="title">政府資料開放平台</div>
      </div>
    </Grid>
  )
}

Header.propTypes = {

}

export default Header
