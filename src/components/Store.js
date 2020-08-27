import React from 'react'
import { makeStyles, Grid, Paper, Typography, Avatar } from '@material-ui/core'

import AdminButtons from './AdminButtons'

export default function Store({
    store,
    onUnique,
    onDelete,
    onPin,
    onHide,
    handleImageChange,
}) {
    const classes = useStyles()

    return (
        <Paper elevation={3}>
            <Grid>
                <Grid item xs={12}>
                    <label htmlFor='image'>
                        <img
                            src={store.image}
                            alt={store.name}
                            className={classes.imageBG}
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
                </Grid>
                <Grid item container spacing={3}>
                    <Grid item xs={12} className={classes.center}>
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
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                        <Typography variant='h4'>{store.name}</Typography>
                        <Typography variant='subtitle1' className={classes.title}>
                            {store.title}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.center}>
                        <AdminButtons
                            store={store}
                            onUnique={onUnique}
                            onDelete={onDelete}
                            onPin={onPin}
                            onHide={onHide}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    imageBG: {
        height: 300,
        width: '100%',
        borderRadius: 5,
        cursor: 'pointer',
    },
    title: {
        color: '#616161',
    },
    center: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        cursor: 'pointer',
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
}))
