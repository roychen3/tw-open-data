import React from 'react'
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress'

const StyledLoadingPageContainer = styled.div`
background-color: ${({ theme }) => theme.mainBackground};
width: 100%;
height: 100vh;
`

const StyledSpinnerContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`
const StyledCircularProgress = styled(CircularProgress)`
display: block !important;
margin: 0 auto;

&.MuiCircularProgress-colorPrimary{
  color: ${({ theme }) => theme.highlight};
}
`

export const MuiLoadingPage = () => {
  return (
      <StyledLoadingPageContainer>
        <StyledSpinnerContainer>
          <StyledCircularProgress />
        </StyledSpinnerContainer>
      </StyledLoadingPageContainer>
  )
}

MuiLoadingPage.propTypes = {

}
