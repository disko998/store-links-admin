import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'

import StoreForm from '../components/StoreForm'
import Title from '../components/dashboard/Title'

export default function AddStorePage() {
    const classes = useStyles({})

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title className={classes.title}>Upload New Store</Title>
                    <StoreForm />
                </Paper>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        maxWidth: '50em',
        margin: 'auto',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        marginBottom: '1em',
    },
}))
