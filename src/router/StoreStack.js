import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import routes from './routes'
import StoresPage from '../pages/StoresPage'
import StorePage from '../pages/StorePage'
import AddStorePage from '../pages/AddStorePage'

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
            <Route path={`${path}${routes.ADD}`}>
                <AddStorePage />
            </Route>
        </Switch>
    )
}
