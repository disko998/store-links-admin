import React from 'react'
import { Grid, CircularProgress, Box } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AlertDialog from '../components/AlertDialog'
import StoreForm from '../components/StoreForm'
import { updateImageFile } from '../utils/firebase'
import { EditStoreSchema } from '../utils/validation'
import StoreCard from '../components/StoreCard'

export default function StorePage() {
    let { id } = useParams()
    const history = useHistory()
    const firestore = useFirestore()

    const [expanded, setExpanded] = React.useState(false)
    const [dialog, setDialog] = React.useState(false)

    const store = useSelector(({ firestore: { data } }) => data.stores && data.stores[id])

    const initialValues = React.useMemo(
        () =>
            store && {
                name: store.name,
                title: store.title,
                whatsApp_number: store.whatsApp_number,
                call_number: store.call_number,
                order_link: store.order_link,
                categories: store.categories,
                locations: store.locations,
            },
        [store],
    )

    const updateStore = React.useCallback(
        async data => {
            try {
                await firestore.update(`stores/${id}`, data)
            } catch (error) {
                alert('Error ocurred, see logs for more details...')
                console.log(error)
            }
        },
        [firestore, id],
    )

    const handleSubmit = React.useCallback(
        async values => {
            await updateStore(values)
            setExpanded(false)
        },
        [updateStore],
    )

    const onDelete = React.useCallback(async () => {
        try {
            await firestore.delete(`stores/${id}`)

            history.goBack()
        } catch (error) {
            alert('Error ocurred, see logs for more details...')
            console.log(error)
        }
    }, [id, history, firestore])

    const toggleDialog = React.useCallback(() => {
        setDialog(state => !state)
    }, [])

    const handleImageChange = React.useCallback(
        async e => {
            try {
                const file = e.target.files[0]
                const link = await updateImageFile(id, file, e.target.name)

                await updateStore(link)
            } catch (error) {
                alert('Error ocurred, see logs for more details...')
                console.log(error)
            }
        },
        [id, updateStore],
    )

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    if (!store) {
        return (
            <Box justifyContent='center' display='flex'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Grid container spacing={3} style={{ minHeight: 1200 }}>
            <Grid item xs={12}>
                <StoreCard
                    expanded={expanded}
                    handleExpandClick={handleExpandClick}
                    handleImageChange={handleImageChange}
                    store={store}
                    onPin={() => updateStore({ pinned: !store.pinned })}
                    onUnique={() => updateStore({ unique: !store.unique })}
                    onHide={() => updateStore({ hidden: !store.hidden })}
                    onDelete={toggleDialog}
                >
                    <StoreForm
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        title='Edit Store'
                        buttonLabelText='Update store'
                        hideImages
                        noReset
                        validationSchema={EditStoreSchema}
                    />
                </StoreCard>
            </Grid>
            <AlertDialog
                handleClose={toggleDialog}
                handleDisagree={toggleDialog}
                handleAgree={onDelete}
                open={dialog}
                title={`Delete ${store.name}?`}
                message={`Are you sure you want to delete this store, this is a permanent action and cannot be undone.`}
            />
        </Grid>
    )
}
