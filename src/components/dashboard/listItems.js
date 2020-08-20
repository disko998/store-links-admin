import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard'
import StoreIcon from '@material-ui/icons/Store'
import LayersIcon from '@material-ui/icons/Layers'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import CategoryIcon from '@material-ui/icons/Category'
import FlagIcon from '@material-ui/icons/Flag'
import routes from '../../router/routes'

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
                    <AddPhotoAlternateIcon />
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
                <ListItemText primary='Ads' />
            </ListItem>
        </div>
    )
}

export const SecondaryListItems = () => {
    let history = useHistory()

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
        </div>
    )
}
