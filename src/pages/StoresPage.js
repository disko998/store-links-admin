import React from 'react'
import { Grid, Fab, makeStyles } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import StoresList from '../components/StoresList'
import { useRouteMatch, useHistory } from 'react-router-dom'
import routes from '../router/routes'

export default function StoresPage() {
    const classes = useStyles()
    const { url } = useRouteMatch()
    const history = useHistory()

    const onItemPress = React.useCallback(
        store => {
            history.push(`${url}${routes.VIEW_STORE}/${store.id}`, store)
        },
        [history, url],
    )

    return (
        <Grid>
            <StoresList onItemPress={onItemPress} />
            <Fab
                className={classes.fab}
                size='large'
                color='primary'
                aria-label='add new store'
                onClick={() => history.push(`${url}${routes.ADD}`)}
            >
                <AddIcon />
            </Fab>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
}))
