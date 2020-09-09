import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from './routes'
import StoryPage from '../pages/StoryPage'
import AddStoryPage from '../pages/AddStoryPage'

export default function StoryStack() {
    return (
        <Switch>
            <Route exact path={routes.STORY}>
                <StoryPage />
            </Route>
            <Route path={`${routes.STORY}${routes.ADD}`}>
                <AddStoryPage />
            </Route>
        </Switch>
    )
}
