import React from 'react'
import { Switch, Route } from "react-router-dom";

import Holiday from '../pages/holiday'
import Weather from '../pages/weather'

const Content = () => {
    return (
        <div className="content">
            <div className="content-container">
                <Switch>
                    <Route path="/holiday">
                        <Holiday />
                    </Route>
                    <Route path="/weather">
                        <Weather />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

Content.propTypes = {

}

export default Content
