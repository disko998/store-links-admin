import React from 'react'
import { Box, IconButton } from '@material-ui/core'

import StarsIcon from '@material-ui/icons/Stars'
import DeleteIcon from '@material-ui/icons/Delete'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const ICON_SIZE = 30

export default function AdminButtons({
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
            <IconButton aria-label='pin' onClick={onPin}>
                <LocalOfferIcon
                    style={{
                        color: store.pinned ? '#3d5afe' : '#9e9e9e',
                        fontSize: ICON_SIZE,
                    }}
                />
            </IconButton>
            <IconButton aria-label='unique' onClick={onUnique}>
                <StarsIcon
                    style={{
                        color: store.unique ? '#ffc107' : '#9e9e9e',
                        fontSize: ICON_SIZE,
                    }}
                />
            </IconButton>
            <IconButton aria-label='hide' onClick={onHide}>
                {store.hidden ? (
                    <VisibilityOffIcon
                        style={{ color: '#9e9e9e', fontSize: ICON_SIZE }}
                    />
                ) : (
                    <VisibilityIcon style={{ color: '#35baf6', fontSize: ICON_SIZE }} />
                )}
            </IconButton>
            <IconButton aria-label='delete' onClick={onDelete}>
                <DeleteIcon style={{ color: '#b2102f', fontSize: ICON_SIZE }} />
            </IconButton>
        </Box>
    )
}
