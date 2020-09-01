import React from 'react'
import { Grid, Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import StoreForm from '../components/StoreForm'
import { uploadStoreImages } from '../utils/firebase'
import { AddStoreSchema } from '../utils/validation'

const initialFormValue = {
    name: '',
    title: '',
    whatsApp_number: '',
    call_number: '',
    order_link: '',
    logo: '',
    image: '',
    categories: [],
}

export default function AddStorePage() {
    const history = useHistory()
    const firestore = useFirestore()
    const classes = useStyles()

    const [loading, setLoading] = React.useState(false)

    const handleSubmit = React.useCallback(
        async ({
            name,
            title,
            order_link,
            call_number,
            categories,
            whatsApp_number,
            logo,
            image,
            locations,
        }) => {
            try {
                setLoading(true)
                const storeRef = await firestore.add('stores', {
                    name,
                    title,
                    order_link,
                    call_number,
                    categories,
                    whatsApp_number,
                    locations,
                })

                const { logoURL, imageURL } = await uploadStoreImages(
                    storeRef.id,
                    logo,
                    image,
                )

                await firestore.update(`stores/${storeRef.id}`, {
                    logo: logoURL,
                    image: imageURL,
                })

                history.goBack()
            } catch (error) {
                alert(`Error ocurred, ${error.message}`)
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
        [firestore, history],
    )

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <StoreForm
                    onSubmit={handleSubmit}
                    initialValues={initialFormValue}
                    title='Upload New Store'
                    buttonLabelText='Publish'
                    validationSchema={AddStoreSchema}
                />
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color='inherit' />
                </Backdrop>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))
