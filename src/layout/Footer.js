import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
width: 100%;
background-color: ${({ theme }) => theme.secondBackground};
color: ${({ theme }) => theme.secondText};
padding: 1rem;
font-size: small;
text-align: center;
`

const Footer = () => {
    return (
        <StyledFooter>Copyright © 2020 Roy Chen.</StyledFooter>
    )
}

Footer.propTypes = {

}

export default Footer
