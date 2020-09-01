import React from 'react'
import { useFirebase, useFirestore } from 'react-redux-firebase'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

import { asyncHandler } from '../utils/helper'
import Uploader from './Uploader'
import { useHistory } from 'react-router-dom'

export default function AddImageDialog({ state, handleClose }) {
    const history = useHistory()
    const firebase = useFirebase()
    const firestore = useFirestore()
    const [uploadedFiles, setUploadedFiles] = React.useState(null)

    const onFilesDrop = React.useCallback(
        asyncHandler(async files => {
            const filesPath = `story/${state.id}`

            const snapshots = await firebase.uploadFiles(filesPath, files)

            const urls = await Promise.all(
                snapshots.map(snap => snap.uploadTaskSnapshot.ref.getDownloadURL()),
            )

            setUploadedFiles(urls)
        }),
        [state, setUploadedFiles],
    )

    const onClose = () => {
        setUploadedFiles(null)
        handleClose()
    }

    const addStory = React.useCallback(
        asyncHandler(async () => {
            const data = {
                storeId: state.id,
                logo: state.logo,
                name: state.name,
                order_link: state.order_link,
                images: uploadedFiles,
            }

            await firestore.add('story', data)

            onClose()
            history.goBack()
        }),
        [state, uploadedFiles, onClose, history],
    )

    const onFileDelete = React.useCallback(
        asyncHandler(async file => {
            firebase.deleteFile(file)
        }),
        [],
    )

    if (!state) {
        return null
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={state}
        >
            <DialogTitle id='customized-dialog-title' onClose={onClose}>
                {state.name}
            </DialogTitle>
            <DialogContent dividers>
                <Uploader onFilesDrop={onFilesDrop} uploadedFiles={uploadedFiles} />
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    color='primary'
                    disabled={!uploadedFiles}
                    onClick={addStory}
                >
                    Add Story
                </Button>
            </DialogActions>
        </Dialog>
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

const useStyles = makeStyles({
    add: {
        '& label': {
            cursor: 'pointer',
        },
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
