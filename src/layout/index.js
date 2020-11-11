import React from 'react'
import Grid from '@material-ui/core/Grid';

import Header from './Header'

const index = () => {
  return (
    <Grid container spacing={0}>
      <Header />
      <Grid item xs={12}>
        content
      </Grid>
      <Grid item xs={12}>
        footer
      </Grid>
    </Grid>
  )
}

index.propTypes = {

}

export default index
