import React from 'react'
import {
    makeStyles,
    Typography,
    Avatar,
    CircularProgress,
    Box,
    Grid,
    IconButton,
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import { useHistory, useRouteMatch } from 'react-router-dom'

import routes from '../router/routes'

export default function StoresList() {
    const stores = useSelector(state => state.firestore.ordered.stores)
    const classes = useStyles()
    const history = useHistory()
    const { url } = useRouteMatch()

    const onItemPress = React.useCallback(
        store => {
            history.push(`${url}${routes.VIEW_STORE}/${store.id}`, store)
        },
        [history, url],
    )

    return (
        <Grid container spacing={3}>
            {stores ? (
                stores.map(store => (
                    <Grid
                        key={store.id}
                        item
                        xs={6}
                        sm={3}
                        lg={2}
                        className={classes.item}
                    >
                        <IconButton aria-label='store' onClick={() => onItemPress(store)}>
                            <Avatar
                                alt={store.name}
                                src={store.logo}
                                className={classes.large}
                            />
                        </IconButton>

                        <Typography variant='h6' component='h6' align='center'>
                            {store.name}
                        </Typography>
                    </Grid>
                ))
            ) : (
                <Loading />
            )}
        </Grid>
    )
}

function Loading() {
    const classes = useStyles()
    return (
        <Box className={classes.loading}>
            <CircularProgress />
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '100%',
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
}))
