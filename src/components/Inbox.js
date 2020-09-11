import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, Paper, Box } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Skeleton from '@material-ui/lab/Skeleton'
import { getNameFormURL } from '../utils/helper'

export default function Inbox({ requests, onItemPress }) {
    const classes = useStyles()

    if (!requests) {
        return (
            <>
                <Box marginBottom={5}>
                    <Skeleton animation='wave' variant='circle' width={40} height={40} />
                    <Skeleton
                        animation='wave'
                        height={10}
                        width='80%'
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation='wave' height={10} width='40%' />
                </Box>
                <Box marginBottom={5}>
                    <Skeleton animation='wave' variant='circle' width={40} height={40} />
                    <Skeleton
                        animation='wave'
                        height={10}
                        width='80%'
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation='wave' height={10} width='40%' />
                </Box>
                <Box>
                    <Skeleton animation='wave' variant='circle' width={40} height={40} />
                    <Skeleton
                        animation='wave'
                        height={10}
                        width='80%'
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation='wave' height={10} width='40%' />
                </Box>
            </>
        )
    }

    // unfreeze array
    const reverseRequests = requests.map(r => r).reverse()

    return (
        <Paper className={classes.root}>
            <List>
                {reverseRequests.map(request => (
                    <React.Fragment key={request.id}>
                        <ListItem
                            button
                            onClick={() => onItemPress(request)}
                            alignItems='flex-start'
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt={getNameFormURL(request.store_link).toUpperCase()}
                                    src={request.logo || 'logo.jpg'}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primaryTypographyProps={{
                                    className: !request.read && classes.bold,
                                }}
                                secondaryTypographyProps={{
                                    className: !request.read && classes.bold,
                                }}
                                primary={`Hi, ${getNameFormURL(request.store_link)}`}
                                secondary={
                                    <React.Fragment>
                                        {request.createdAt
                                            ? new Date(request.createdAt).toDateString()
                                            : 'unknown date'}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant='inset' component='li' />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        maxHeight: 500,
        minHeight: 300,
        overflow: 'auto',
        overflowX: 'hidden',
    },
    inline: {
        display: 'inline',
    },
    bold: {
        fontWeight: 'bold',
    },
}))
