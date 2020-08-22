import React from 'react'
import { makeStyles, Grid, TextField, Button, FormHelperText } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { useFormik } from 'formik'

import CategorySelect from './CategorySelect'
import ImagePicker from './ImagePicker'
import { StoreSchema } from '../utils/validation'

export default function StoreForm() {
    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            name: '',
            title: '',
            whatsApp_number: '',
            call_number: '',
            order_link: '',
            logo: '',
            image: '',
            categories: [],
        },
        onSubmit: values => {
            console.log(values)
        },
        validationSchema: StoreSchema,
        validateOnChange: false,
        validateOnBlur: false,
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                {/* Text */}
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        id='name'
                        name='name'
                        required
                        label='Store Name'
                        variant='outlined'
                        error={formik.errors.name}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <FormHelperText error={formik.errors.name}>
                        {formik.errors.name}
                    </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        id='title'
                        name='title'
                        required
                        label='Store Title'
                        variant='outlined'
                        error={formik.errors.title}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <FormHelperText error={formik.errors.title}>
                        {formik.errors.title}
                    </FormHelperText>
                </Grid>

                {/* Image Picker */}
                <Grid item container spacing={3} xs={12}>
                    <Grid item xs={12} sm={6}>
                        <ImagePicker
                            name='logo'
                            width={100}
                            height={100}
                            title='Logo *'
                            required
                            handleImageChange={formik.handleChange}
                        />
                        <FormHelperText
                            style={{ textAlign: 'center' }}
                            error={formik.errors.logo}
                        >
                            {formik.errors.logo}
                        </FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ImagePicker
                            variant='rounded'
                            name='image'
                            width={200}
                            height={100}
                            title='Store Image *'
                            required
                            handleImageChange={formik.handleChange}
                        />
                        <FormHelperText
                            style={{ textAlign: 'center' }}
                            error={formik.errors.image}
                        >
                            {formik.errors.image}
                        </FormHelperText>
                    </Grid>
                </Grid>

                {/* Numbers */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        id='whatsApp_number'
                        name='whatsApp_number'
                        label='WhatsApp Number'
                        type='number'
                        variant='outlined'
                        required
                        error={formik.errors.whatsApp_number}
                        onChange={formik.handleChange}
                        value={formik.values.whatsApp_number}
                    />
                    <FormHelperText error={formik.errors.whatsApp_number}>
                        {formik.errors.whatsApp_number}
                    </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        id='call_number'
                        name='call_number'
                        label='Call Number'
                        type='number'
                        variant='outlined'
                        required
                        error={formik.errors.call_number}
                        onChange={formik.handleChange}
                        value={formik.values.call_number}
                    />
                    <FormHelperText error={formik.errors.call_number}>
                        {formik.errors.call_number}
                    </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        id='order_link'
                        name='order_link'
                        label='Order Link'
                        variant='outlined'
                        required
                        error={formik.errors.order_link}
                        onChange={formik.handleChange}
                        value={formik.values.order_link}
                    />
                    <FormHelperText error={formik.errors.order_link}>
                        {formik.errors.order_link}
                    </FormHelperText>
                </Grid>

                {/* Categories */}
                <Grid item xs={12} sm={12}>
                    <CategorySelect
                        error={formik.errors.categories}
                        value={formik.values.categories}
                        onChange={formik.handleChange}
                    />
                    <FormHelperText error={formik.errors.categories}>
                        {formik.errors.categories}
                    </FormHelperText>
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
                        Publish
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
