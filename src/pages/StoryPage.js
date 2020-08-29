import React from 'react'
import { Grid, makeStyles, Avatar, IconButton, Box } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'

import routes from '../router/routes'
import SimpleDialog from '../components/dashboard/SimpleDialog'
import { asyncHandler } from '../utils/helper'
import { deleteFileStory } from '../utils/firebase'

export default function StoryPage() {
    useFirestoreConnect([{ collection: 'story' }])

    const firestore = useFirestore()
    const classes = useStyles()
    const history = useHistory()
    const { url } = useRouteMatch()
    const stories = useSelector(state => state.firestore.ordered.story)
    const [open, setOpen] = React.useState(null)

    const handleClickOpen = story => {
        setOpen(story)
    }

    const handleClose = () => {
        setOpen(null)
    }

    const addStoryScreen = React.useCallback(() => {
        history.push(`${url}${routes.ADD}`)
    }, [history, url])

    const removeStory = React.useCallback(
        asyncHandler(async ({ id, storeId }) => {
            await firestore.delete(`story/${id}`)

            // await deleteFileStory(storeId)
        }),
        [firestore],
    )

    if (!stories) {
        return (
            <div className={classes.root}>
                <Skeleton variant='circle' width={130} height={130} />
                <Skeleton variant='circle' width={130} height={130} />
                <Skeleton variant='circle' width={130} height={130} />
                <Skeleton variant='circle' width={130} height={130} />
            </div>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.root}>
                    {stories.map(story => (
                        <Box key={story.id} display='flex' flexDirection='column'>
                            <IconButton
                                className={classes.story}
                                onClick={() => handleClickOpen(story)}
                            >
                                <Avatar
                                    alt={story.name}
                                    src={story.logo}
                                    className={classes.large}
                                >
                                    <AddIcon fontSize='large' />
                                </Avatar>
                            </IconButton>
                        </Box>
                    ))}
                    {
                        <IconButton onClick={addStoryScreen}>
                            <Avatar alt={'Add store'} className={classes.large}>
                                <AddIcon fontSize='large' />
                            </Avatar>
                        </IconButton>
                    }
                </div>
            </Grid>
            <SimpleDialog open={open} onClose={handleClose} onDelete={removeStory} />
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',

        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
    story: {
        borderWidth: 2,
        borderColor: '#3366FF',
        padding: 5,
        borderStyle: 'solid',
        borderRadius: '50%',
    },
}))
