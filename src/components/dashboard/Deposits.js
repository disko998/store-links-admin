import * as React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
})

export default function Deposits() {
    const classes = useStyles()
    const stores = useSelector(state => state.firestore.ordered.stores)

    const storesNumber = stores ? stores.length : 'calculating...'

    return (
        <React.Fragment>
            <Title>Total Stores</Title>
            <Typography component='p' variant='h4'>
                {storesNumber}
            </Typography>
            <Typography color='textSecondary' className={classes.depositContext}>
                {new Date().toDateString()}
            </Typography>
            <div>
                <Link color='primary' to='/stores'>
                    View stores
                </Link>
            </div>
        </React.Fragment>
    )
}
