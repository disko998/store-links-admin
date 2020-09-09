import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import routes from './routes'

import StoreStack from './StoreStack'
import StoryStack from './StoryStack'
import AdsStack from './AdsStack'

import DashboardPage from '../pages/DashboardPage'
import CategoriesPage from '../pages/CategoriesPage'
import CountriesPage from '../pages/CountriesPage'
import RequestsPage from '../pages/RequestsPage'

export default function MainRouter() {
    return (
        <Switch>
            <Route exact path={routes.DASHBOARD}>
                <DashboardPage />
            </Route>
            <Route path={routes.STORES}>
                <StoreStack />
            </Route>
            <Route path={routes.STORY}>
                <StoryStack />
            </Route>
            <Route path={routes.REQUESTS}>
                <RequestsPage />
            </Route>
            <Route path={routes.ADS}>
                <AdsStack />
            </Route>
            <Route path={routes.CATEGORIES}>
                <CategoriesPage />
            </Route>
            <Route path={routes.COUNTRY}>
                <CountriesPage />
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
