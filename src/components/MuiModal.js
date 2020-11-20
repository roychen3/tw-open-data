import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal'

const StyledModalContainer = styled.div`
position: absolute;
width: 90%;
@media (min-width: 576px){
  width: 50%;
}
text-align: center;
color: ${({ theme }) => theme.mainText};
background-color: ${({ theme }) => theme.secondBackground};
border: 2px solid ${({ theme }) => theme.highlight};
padding: 2rem 1rem;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`

const MuiModal = ({
  open,
  handaleClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handaleClose}
    >
      <StyledModalContainer>
        {children}
      </StyledModalContainer>
    </Modal>
  )
}

MuiModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handaleClose: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
}

export default MuiModal
