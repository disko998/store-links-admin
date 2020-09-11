import React from 'react'
import { makeStyles, Avatar } from '@material-ui/core'

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

export default function ImagePicker({
    name,
    round,
    handleImageChange,
    title,
    width,
    height,
    variant,
    error,
    img,
    ...inputProps
}) {
    const classes = useStyles({ error })
    const [image, setImage] = React.useState(img || '')

    const handleOnChange = input => {
        handleImageChange(input)
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader()

            reader.onload = function (e) {
                handleImageChange(input.target.name)(e.target.result)
                setImage(e.target.result)
            }

            reader.readAsDataURL(input.target.files[0])
        }
    }

    return (
        <div className={classes.logo} style={{ width, height }}>
            <label htmlFor={name}>
                <Avatar
                    alt={name}
                    variant={variant || 'circle'}
                    src={image}
                    size='large'
                    className={classes.avatar}
                >
                    <AddPhotoAlternateIcon />
                    {title}
                </Avatar>
            </label>

            <input
                id={name}
                name={name}
                type='file'
                accept='image/*'
                style={{
                    display: ' none',
                }}
                onChange={handleOnChange}
                {...inputProps}
            />
        </div>
    )
}

const useStyles = makeStyles({
    logo: {
        margin: 'auto',
    },
    avatar: props => ({
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        color: props.error ? '#f44336' : '#fff',
    }),
})
