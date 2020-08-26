import React from 'react'
import { Grid, CircularProgress, Box, IconButton } from '@material-ui/core'
import { useFirestore } from 'react-redux-firebase'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import EditIcon from '@material-ui/icons/Edit'
import StarsIcon from '@material-ui/icons/Stars'
import DeleteIcon from '@material-ui/icons/Delete'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import AlertDialog from '../components/AlertDialog'
import StoreForm from '../components/StoreForm'
import { uploadStoreImages, updateStorePicture } from '../utils/firebase'
import { EditStoreSchema } from '../utils/validation'

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

    const handleSubmit = React.useCallback(
        async values => {
            try {
                await firestore.update(`stores/${id}`, values)
                setEditable(false)
            } catch (error) {
                alert('Error ocurred, see logs for more details...')
                console.log(error)
            }
        },
        [firestore, id],
    )

    const onEdit = React.useCallback(() => {
        setEditable(state => !state)
    }, [])

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
                        <AdminButtons
                            store={store}
                            editable={editable}
                            onEdit={onEdit}
                            onPin={() => updateStore({ pinned: !store.pinned })}
                            onUnique={() => updateStore({ unique: !store.unique })}
                            onHide={() => updateStore({ hidden: !store.hidden })}
                            onDelete={toggleDialog}
                        />
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

export function AdminButtons({
    store,
    editable,
    onEdit,
    onUnique,
    onDelete,
    onPin,
    onHide,
}) {
    return (
        <Box aria-label='admin buttons'>
            <IconButton aria-label='edit' onClick={onEdit}>
                <EditIcon
                    style={{ color: editable ? '#357a38' : '#9e9e9e', fontSize: 25 }}
                />
            </IconButton>
            <IconButton aria-label='pin' onClick={onPin}>
                <LocalOfferIcon
                    style={{ color: store.pinned ? '#3d5afe' : '#9e9e9e', fontSize: 25 }}
                />
            </IconButton>
            <IconButton aria-label='unique' onClick={onUnique}>
                <StarsIcon
                    style={{ color: store.unique ? '#ffc107' : '#9e9e9e', fontSize: 25 }}
                />
            </IconButton>
            <IconButton aria-label='hide' onClick={onHide}>
                {store.hidden ? (
                    <VisibilityOffIcon style={{ color: '#9e9e9e', fontSize: 25 }} />
                ) : (
                    <VisibilityIcon style={{ color: '#35baf6', fontSize: 25 }} />
                )}
            </IconButton>
            <IconButton aria-label='delete' onClick={onDelete}>
                <DeleteIcon style={{ color: '#b2102f', fontSize: 25 }} />
            </IconButton>
        </Box>
    )
}
