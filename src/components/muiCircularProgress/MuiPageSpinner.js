import React from 'react'
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress'

const StyledSpinnerContainer = styled.div`
  padding: 15vh 0;
`
const StyledCircularProgress = styled(CircularProgress)`
  display: block !important;
  margin: 0 auto;
`

export const MuiPageSpinner = () => {
  return (
    <StyledSpinnerContainer>
      <StyledCircularProgress />
    </StyledSpinnerContainer>
  )
}

MuiPageSpinner.propTypes = {}
