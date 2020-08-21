import React from 'react'
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom'

import routes from './routes'
import StoresPage from '../pages/StoresPage'
import StorePage from '../pages/StorePage'

export default function StoreStack() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <StoresPage />
            </Route>
            <Route path={`${path}${routes.VIEW_STORE}/:id`}>
                <StorePage />
            </Route>
            <Route path={`${path}${routes.ADD_STORE}`}>
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
