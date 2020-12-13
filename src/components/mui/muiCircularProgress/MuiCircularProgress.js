import React from 'react'
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress'

const StyledCircularProgress = styled(CircularProgress)`
&.MuiCircularProgress-colorPrimary{
  color: ${({ theme }) => theme.highlight};
}
`

export const MuiCircularProgress = () => {
  return (
      <StyledCircularProgress />
  )
}

MuiCircularProgress.propTypes = {

}
