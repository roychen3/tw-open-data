import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect } from "react-router-dom"
import styled from 'styled-components'

import { creatRouteList } from '../routes'


const StyledContent = styled.div`
background-color: ${({ theme }) => theme.mainBackground};
color: ${({ theme }) => theme.mainText};
min-height: 100%;
padding-top: 56px;
margin-bottom: -47px;
`

const StyledContentContainer = styled.div`
width: 95%;
margin: 0 auto;
padding: 4rem 0 8rem;

@media (min-width: 960px) {
    width: 70%;
}

.page-title {
    font-size: xx-large;
    font-weight: bolder;
    margin-bottom: 2rem;
}

.table-container {
    margin: 1rem 0;
}
`

const Content = ({ store }) => {

    const routeList = creatRouteList(store)

    return (
        <StyledContent>
            <StyledContentContainer>
                <Switch>
                    {routeList}
                    <Redirect from="/" to={`/${routeList[0].hashName}`} />
                </Switch>
            </StyledContentContainer>
        </StyledContent>
    )
}

Content.propTypes = {
    store: PropTypes.instanceOf(Object).isRequired
}

export default Content
