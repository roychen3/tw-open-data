import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { WEB_COLOR_ORANGEWEB, } from '../../constants/color'

const useStyles = makeStyles({
  spinnerContainer: {
    padding: '15vh 0',
  },
  circularProgressRoot: {
    display: 'block',
    margin: '0 auto',
  },
  circularProgressRootColorPrimary:{
    color: WEB_COLOR_ORANGEWEB,
  }
})

export const MuiPageSpinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress classes={{
        root: classes.circularProgressRoot,
        colorPrimary: classes.circularProgressRootColorPrimary,
      }} />
    </div>
  )
}

MuiPageSpinner.propTypes = {

}
