import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    height: '100%',
    margin: 0,
  }
})

const Menu = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} justify="flex-end" alignItems="center" classes={{ root: classes.root }}>
      <Grid item xs={'auto'}>
        <a href="#">國定假日</a>
      </Grid>
      <Grid item xs={'auto'}>
        <a href="#">全國天氣</a>
      </Grid>
    </Grid>
  )
}

Menu.propTypes = {

}

export default Menu
