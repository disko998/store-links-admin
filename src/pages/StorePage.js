import React from 'react'
import { Grid, CircularProgress, Box, IconButton } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import EditIcon from '@material-ui/icons/Edit'

import AlertDialog from '../components/AlertDialog'
import StoreForm from '../components/StoreForm'
import { updateImageFile } from '../utils/firebase'
import { EditStoreSchema } from '../utils/validation'
import Store from '../components/Store'

export default function EditStorePage() {
    let { id } = useParams()
    const history = useHistory()
    const firestore = useFirestore()

    const [editable, setEditable] = React.useState(false)
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
            setEditable(false)
        },
        [updateStore],
    )

    const onEdit = React.useCallback(() => {
        setEditable(state => !state)
    }, [])

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

    if (!store) {
        return (
            <Box justifyContent='center' display='flex'>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Store
                    handleImageChange={handleImageChange}
                    store={store}
                    editable={editable}
                    onEdit={onEdit}
                    onPin={() => updateStore({ pinned: !store.pinned })}
                    onUnique={() => updateStore({ unique: !store.unique })}
                    onHide={() => updateStore({ hidden: !store.hidden })}
                    onDelete={toggleDialog}
                />
            </Grid>
            <Grid item xs={12}>
                <StoreForm
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    title='Edit Store'
                    buttonLabelText='Update store'
                    disabled={!editable}
                    hideImages
                    noReset
                    validationSchema={EditStoreSchema}
                    renderSuffix={
                        <IconButton aria-label='edit' onClick={onEdit}>
                            <EditIcon
                                style={{
                                    color: editable ? '#357a38' : '#9e9e9e',
                                    fontSize: 30,
                                }}
                            />
                        </IconButton>
                    }
                />
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
