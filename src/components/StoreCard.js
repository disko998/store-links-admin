import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import StarsIcon from '@material-ui/icons/Stars'
import DeleteIcon from '@material-ui/icons/Delete'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import EditIcon from '@material-ui/icons/Edit'

const ICON_SIZE = 25

export default function StoreCard({
    store,
    onPin,
    onHide,
    onDelete,
    onUnique,
    children,
    expanded,
    handleExpandClick,
    handleImageChange,
}) {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <>
                        <label htmlFor='logo'>
                            <Avatar
                                className={classes.avatar}
                                alt={`${store.name} logo`}
                                src={store.logo}
                            />
                        </label>
                        <input
                            id='logo'
                            name='logo'
                            type='file'
                            accept='image/*'
                            style={{
                                display: ' none',
                            }}
                            onChange={handleImageChange}
                        />
                    </>
                }
                action={
                    <IconButton aria-label='settings'>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={store.name}
                subheader={store.title}
            />
            <label htmlFor='image'>
                <CardMedia
                    className={classes.media}
                    image={store.image}
                    title='Store'
                />
            </label>

            <input
                id='image'
                name='image'
                type='file'
                accept='image/*'
                style={{
                    display: ' none',
                }}
                onChange={handleImageChange}
            />
            {/* <CardContent>
                <Typography
                    variant='h6'
                    color='textSecondary'
                    component='p'
                    align='center'
                >
                    {store.title}
                </Typography>
            </CardContent> */}
            <CardActions disableSpacing>
                <IconButton aria-label='pin' onClick={onPin}>
                    <LocalOfferIcon
                        style={{
                            color: store.pinned && '#3d5afe',
                            fontSize: ICON_SIZE,
                        }}
                    />
                </IconButton>
                <IconButton aria-label='unique' onClick={onUnique}>
                    <StarsIcon
                        style={{
                            color: store.unique && '#ffc107',
                            fontSize: ICON_SIZE,
                        }}
                    />
                </IconButton>
                <IconButton aria-label='hide' onClick={onHide}>
                    {store.hidden ? (
                        <VisibilityOffIcon />
                    ) : (
                        <VisibilityIcon
                            style={{ color: '#35baf6', fontSize: ICON_SIZE }}
                        />
                    )}
                </IconButton>
                <IconButton aria-label='delete' onClick={onDelete}>
                    <DeleteIcon
                        style={{ color: '#b2102f', fontSize: ICON_SIZE }}
                    />
                </IconButton>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                    style={{ fontSize: ICON_SIZE }}
                >
                    <EditIcon />
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                {children}
            </Collapse>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 700,
        margin: 'auto',
    },
    media: {
        cursor: 'pointer',
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
        color: 'green',
    },
    avatar: {
        cursor: 'pointer',
    },
}))
