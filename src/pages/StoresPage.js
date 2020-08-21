import React from 'react'
import { Grid, Fab, makeStyles } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import StoresListHeader from '../components/StoresListHeader'
import StoresList from '../components/StoresList'
import { useRouteMatch, useHistory } from 'react-router-dom'

export default function StoresPage() {
    const classes = useStyles()
    const { url } = useRouteMatch()
    const history = useHistory()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <StoresListHeader />
            </Grid>
            <Grid item xs={12}>
                <StoresList />
            </Grid>
            <Fab
                className={classes.fab}
                size='large'
                color='primary'
                aria-label='add new store'
                onClick={() => history.push(`${url}/add`)}
            >
                <AddIcon />
            </Fab>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}))
