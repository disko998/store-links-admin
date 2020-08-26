import React from 'react'
import {
    makeStyles,
    Grid,
    TextField,
    Button,
    FormHelperText,
    Paper,
    Box,
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { useFormik } from 'formik'

import Title from './dashboard/Title'
import CategorySelect from './CategorySelect'
import ImagePicker from './ImagePicker'

export default function StoreForm({
    onSubmit,
    initialValues,
    title,
    buttonLabelText,
    disabled,
    hideImages,
    noReset,
    renderSuffix,
    validationSchema,
}) {
    const classes = useStyles()

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values)
            !noReset && resetForm()
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
    })

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid container item xs={12} className={classes.header}>
                    <Grid item>
                        <Title className={classes.title}>{title}</Title>
                    </Grid>
                    <Grid item>
                        <Box>{renderSuffix}</Box>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Text */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                            {!hideImages && (
                                <Grid item container spacing={3} xs={12}>
                                    <Grid item xs={12} sm={6}>
                                        <ImagePicker
                                            disabled={disabled}
                                            name='logo'
                                            width={100}
                                            height={100}
                                            title='Logo *'
                                            required
                                            handleImageChange={formik.handleChange}
                                            img={formik.values.logo}
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
                                            disabled={disabled}
                                            variant='rounded'
                                            name='image'
                                            width={200}
                                            height={100}
                                            title='Store Image *'
                                            required
                                            img={formik.values.image}
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
                            )}

                            {/* Numbers */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                                    disabled={disabled}
                                    className={classes.input}
                                    id='order_link'
                                    name='order_link'
                                    label='Order Link'
                                    variant='outlined'
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
                                    disabled={disabled}
                                    error={formik.errors.categories}
                                    value={formik.values.categories || []}
                                    onChange={formik.handleChange}
                                />
                                <FormHelperText error={formik.errors.categories}>
                                    {formik.errors.categories}
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    disabled={disabled}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    className={classes.input}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    {buttonLabelText}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Paper>
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
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        maxWidth: '50em',
        margin: 'auto',
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}))
