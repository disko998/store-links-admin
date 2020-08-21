import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'

import StoreForm from '../components/StoreForm'

export default function AddStorePage() {
    const classes = useStyles({})

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <StoreForm />
                    {/* <div style={{ width: '100%', background: 'red' }}>dasds</div> */}
                </Paper>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
}))
