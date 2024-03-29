import * as React from 'react'
import { useHistory } from 'react-router-dom'
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Divider,
} from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard'
import StoreIcon from '@material-ui/icons/Store'
import LayersIcon from '@material-ui/icons/Layers'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import CategoryIcon from '@material-ui/icons/Category'
import FlagIcon from '@material-ui/icons/Flag'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'

import routes from '../../router/routes'
import { useFirebase } from 'react-redux-firebase'

export const MainListItems = () => {
    let history = useHistory()

    return (
        <div>
            <ListItem button onClick={() => history.push(routes.DASHBOARD)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
            </ListItem>
            <ListItem button onClick={() => history.push(routes.STORES)}>
                <ListItemIcon>
                    <StoreIcon />
                </ListItemIcon>
                <ListItemText primary='Stores' />
            </ListItem>
            <ListItem button onClick={() => history.push(routes.STORY)}>
                <ListItemIcon>
                    <ViewCarouselIcon />
                </ListItemIcon>
                <ListItemText primary='Story' />
            </ListItem>
            <ListItem button onClick={() => history.push(routes.REQUESTS)}>
                <ListItemIcon>
                    <AnnouncementIcon />
                </ListItemIcon>
                <ListItemText primary='Requests' />
            </ListItem>
            <ListItem button onClick={() => history.push(routes.ADS)}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary='Create Ad' />
            </ListItem>
        </div>
    )
}

export const SecondaryListItems = () => {
    let history = useHistory()
    const firebase = useFirebase()

    return (
        <div>
            <ListSubheader inset></ListSubheader>
            <ListItem button onClick={() => history.push(routes.CATEGORIES)}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary='Categories' />
            </ListItem>
            <ListItem button onClick={() => history.push(routes.COUNTRY)}>
                <ListItemIcon>
                    <FlagIcon />
                </ListItemIcon>
                <ListItemText primary='Country' />
            </ListItem>
            <Divider />
            <ListItem button onClick={firebase.logout}>
                <ListItemIcon>
                    <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
            </ListItem>
        </div>
    )
}
