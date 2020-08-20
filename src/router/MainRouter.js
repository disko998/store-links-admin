import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import routes from './routes'

export default function MainRouter() {
    return (
        <Switch>
            <Route exact path={routes.DASHBOARD}>
                <Development />
            </Route>
            <Route path={routes.STORES}>
                <Development />
            </Route>
            <Route path={routes.STORY}>
                <Development />
            </Route>
            <Route path={routes.REQUESTS}>
                <Development />
            </Route>
            <Route path={routes.ADS}>
                <Development />
            </Route>
            <Route path={routes.CATEGORIES}>
                <Development />
            </Route>
            <Route path={routes.COUNTRY}>
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
