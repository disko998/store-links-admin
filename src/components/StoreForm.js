import React from 'react'
import { makeStyles, Grid, TextField, Button, Typography } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import CategorySelect from './CategorySelect'
import ImagePicker from './ImagePicker'

export default function StoreForm() {
    const classes = useStyles()

    return (
        <form>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        id='name'
                        required
                        label='Store Name'
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        id='title'
                        required
                        label='Store Title'
                        variant='outlined'
                    />
                </Grid>

                <Grid item container spacing={3} xs={12}>
                    <Grid item xs={12} sm={6}>
                        <ImagePicker
                            src=''
                            id='logo'
                            round
                            width={150}
                            height={150}
                            title='Logo *'
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ImagePicker
                            variant='rounded'
                            src=''
                            id='image'
                            width={200}
                            height={150}
                            title='Store Image *'
                            required
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        id='whatsApp_number'
                        label='WhatsApp Number'
                        variant='outlined'
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        id='call_number'
                        label='Call Number'
                        variant='outlined'
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        id='order_link'
                        label='Order Link'
                        variant='outlined'
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <CategorySelect />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        className={classes.input}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Store
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
    },
    logo: {
        width: 100,
        height: 100,
        margin: 'auto',
    },
    avatar: {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
    },
}))
