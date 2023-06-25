import React from 'react'
// import PropTypes from 'prop-types'
import { Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { creatRouteList } from '../routes'
import { menuList } from '../constants/menuList'

const StyledContent = styled.div`
  min-height: 100%;
  padding-top: 62px; /* header height */
  margin-bottom: -51px; /* footer height */
`

const Content = () => {
  const routeList = creatRouteList()

  return (
    <StyledContent>
      <Switch>
        {routeList}
        <Redirect from="/" to={`/${menuList[0].hashName}`} />
      </Switch>
    </StyledContent>
  )
}

Content.propTypes = {}

export default Content
