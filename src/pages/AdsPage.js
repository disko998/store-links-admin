import React from 'react'
import { useFirebase, useFirestore } from 'react-redux-firebase'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

import { asyncHandler } from '../utils/helper'
import Uploader from '../components/Uploader'
import StoresList from '../components/StoresList'
import { db } from '../config'

export default function AdsPage() {
    const [store, setStore] = React.useState(null)
    const firebase = useFirebase()
    const [uploadedFile, setUploadedFile] = React.useState(null)

    const handleClose = () => {
        setStore(null)
        setUploadedFile(null)
    }

    const onItemPress = React.useCallback(store => {
        setStore(store)
    }, [])

    const onFilesDrop = React.useCallback(
        asyncHandler(async file => {
            const filesPath = `uploads/ad`

            const res = await firebase.uploadFile(filesPath, file[0])

            const url = await res.uploadTaskSnapshot.ref.getDownloadURL()

            setUploadedFile(url)
        }),
        [store, setUploadedFile],
    )

    const publishAd = React.useCallback(
        asyncHandler(async () => {
            db.collection('ads').doc('ad').set({
                storeId: store.id,
                storeName: store.name,
                storeLogo: store.logo,
                image: uploadedFile,
                show: true,
                updatedAt: new Date(),
            })

            handleClose()
        }),
        [store, uploadedFile, handleClose],
    )

    return (
        <>
            <StoresList onItemPress={onItemPress} />
            <Dialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={store}
            >
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    {store && store.name}
                </DialogTitle>
                <DialogContent dividers>
                    <Uploader
                        onFilesDrop={onFilesDrop}
                        uploadedFiles={uploadedFile && [uploadedFile]}
                        multiple={false}
                        imageWidth={500}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        color='primary'
                        disabled={!uploadedFile}
                        onClick={publishAd}
                    >
                        Publish Ad
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label='close'
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions)
