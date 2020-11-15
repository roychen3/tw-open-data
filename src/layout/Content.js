import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"

import { menuList } from '../routes'

const Content = () => {
    const routeList = menuList.map((item) => (
        <Route key={`${item.hashName}`} path={`/${item.hashName}`}>{item.page}</Route>))

    return (
        <div className="content">
            <div className="content-container">
                <Switch>
                    {routeList}
                    <Redirect from="/" to={`/${menuList[0].hashName}`} />
                </Switch>
            </div>
        </div>
    )
}

Content.propTypes = {

}

export default Content
