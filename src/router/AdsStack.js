import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import routes from './routes'
import AdsPage from '../pages/AdsPage'

export default function AdsStack() {
    return (
        <Switch>
            <Route exact path={routes.ADS}>
                <AdsPage />
            </Route>
            <Route path={`${routes.ADS}${routes.ADD}`}>
                <Development />
            </Route>
        </Switch>
    )
}

function Development(props) {
    let location = useLocation()

    return (
        <div>
            <h2>"{location.pathname}" is in development</h2>
        </div>
    )
}
