import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from '@material-ui/core'

import LinkIcon from '@material-ui/icons/Link'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone'
import PhoneIcon from '@material-ui/icons/Phone'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import InstagramIcon from '@material-ui/icons/Instagram'

import { getNameFormURL } from '../utils/helper'
import { useFirestore } from 'react-redux-firebase'

export default function RequestMessage({
    logo,
    store_link,
    createdAt,
    isOwner,
    email,
    owner_number,
    instagram,
    store_number,
    whatsApp,
    id,
    read,
}) {
    const classes = useStyles()
    const name = getNameFormURL(store_link)
    const firestore = useFirestore()

    React.useEffect(() => {
        !read && firestore.update(`requests/${id}`, { read: true })
    }, [read, id, firestore])

    const renderMessage = message => (
        <Typography variant='body2' color='textSecondary' component='p'>
            {message}
            <Link href={store_link} target='_blank'>
                {': ' + store_link}
            </Link>
        </Typography>
    )

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar alt={name.toUpperCase()} src={logo || 'logo.png'} />}
                action={
                    <IconButton aria-label='settings'>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={new Date(createdAt).toDateString()}
            />

            <CardContent>
                {isOwner
                    ? renderMessage(
                          `Hi, I\'m the owner of this store, and I would like to add it in your app`,
                      )
                    : renderMessage(`Hi, I like this store hope you can add it`)}
            </CardContent>

            <CardActions disableSpacing>
                <IconButton href={store_link} target='_blank' aria-label='store website'>
                    <LinkIcon />
                </IconButton>
                {isOwner && (
                    <>
                        <IconButton href={`mailto:${email}`} aria-label='email'>
                            <EmailIcon />
                        </IconButton>
                        <IconButton
                            href={`tel:${owner_number}`}
                            aria-label='phone number'
                        >
                            <PhoneIphoneIcon />
                        </IconButton>
                        <IconButton
                            href={`tel:${store_number}`}
                            aria-label='phone number'
                        >
                            <PhoneIcon />
                        </IconButton>
                        <IconButton
                            href={`https://wa.me/${whatsApp}`}
                            aria-label='whatsApp'
                            target='_blank'
                        >
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton
                            href={instagram}
                            aria-label='instagram'
                            target='_blank'
                        >
                            <InstagramIcon />
                        </IconButton>
                    </>
                )}
            </CardActions>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    media: {
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
    },
    avatar: {
        backgroundColor: red[500],
    },
}))
