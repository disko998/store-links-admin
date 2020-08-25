import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import StoreForm from '../components/StoreForm'
import Title from '../components/dashboard/Title'
import { uploadStoreImages } from '../utils/firebase'

export default function AddStorePage(pros) {
    const history = useHistory()
    const classes = useStyles()
    const firestore = useFirestore()

    const handleSubmit = React.useCallback(
        async values => {
            try {
                const storeRef = await firestore.add('stores', values)

                const { logoURL, imageURL } = await uploadStoreImages(
                    storeRef.id,
                    values.logo,
                    values.image,
                )

                await firestore.update(`stores/${storeRef.id}`, {
                    logo: logoURL,
                    image: imageURL,
                })

                history.goBack()
            } catch (error) {
                alert('Error ocurred, see logs for more details...')
                console.log(error)
            }
        },
        [firestore],
    )

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title className={classes.title}>Upload New Store</Title>
                    <StoreForm onSubmit={handleSubmit} />
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
