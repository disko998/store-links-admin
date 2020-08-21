import React from 'react'
import { makeStyles, Avatar } from '@material-ui/core'

import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

export default function ImagePicker({
    id,
    round,
    src,
    title,
    width,
    height,
    variant,
    ...inputProps
}) {
    const classes = useStyles()

    return (
        <div className={classes.logo} style={{ width, height }}>
            <label for={id}>
                <Avatar
                    alt={id}
                    variant={variant || 'circle'}
                    src={src}
                    size='large'
                    className={classes.avatar}
                >
                    <AddPhotoAlternateIcon />
                    {title}
                </Avatar>
            </label>

            <input
                id={id}
                type='file'
                style={{
                    display: ' none',
                }}
                {...inputProps}
            />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    logo: {
        margin: 'auto',
    },
    avatar: {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
    },
    image: {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        background: 'gray',
    },
}))
