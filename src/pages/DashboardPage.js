import React from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

import Chart from '../components/dashboard/Chart'
import Deposits from '../components/dashboard/Deposits'
import AdBanner from '../components/AdBanner'

export default function DashboardPage() {
    const classes = useStyles()

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <Grid container spacing={3}>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Deposits />
                </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <AdBanner />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
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
    fixedHeight: {
        height: 300,
    },
}))
