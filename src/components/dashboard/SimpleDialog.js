import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DeleteIcon from '@material-ui/icons/Delete'

export default function SimpleDialog(props) {
    const { onClose, open, onDelete } = props

    if (!open) {
        return null
    }

    const handleClose = () => {
        onDelete(open)
        onClose()
    }

    return (
        <Dialog onClose={onClose} aria-labelledby='simple-dialog-title' open={open}>
            <DialogTitle id='simple-dialog-title'>{open.name}</DialogTitle>
            <List>
                <ListItem autoFocus button onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar>
                            <DeleteIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Delete ${open.name}`} />
                </ListItem>
            </List>
        </Dialog>
    )
}
