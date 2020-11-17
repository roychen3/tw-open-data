import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { WEB_COLOR_ORANGEWEB, } from '../../constants/color'

const theme = createMuiTheme({
  overrides: {
    MuiCircularProgress: {
      colorPrimary: {
        color: WEB_COLOR_ORANGEWEB,
      },
    },
  },
})

export const MuiCircularProgress = () => {
  return (
    <ThemeProvider theme={theme}>
      <CircularProgress />
    </ThemeProvider>
  )
}

MuiCircularProgress.propTypes = {

}
