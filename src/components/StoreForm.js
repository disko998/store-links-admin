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
import Chip from '@material-ui/core/Chip'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching'
import { useFirestore } from 'react-redux-firebase'

import Title from './dashboard/Title'
import CategorySelect from './CategorySelect'
import ImagePicker from './ImagePicker'
import CountrySelect from './CountrySelect'

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
    const firestore = useFirestore()
    const classes = useStyles()
    const [locations, setLocations] = React.useState(
        initialValues.locations || [],
    )
    const [location, setLocation] = React.useState({
        latitude: '',
        longitude: '',
    })

    const onLocationChange = React.useCallback(
        e => {
            setLocation({ ...location, [e.target.name]: e.target.value })
        },
        [location],
    )

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            onSubmit({
                ...values,
                locations,
            })
            !noReset && resetForm()
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
    })

    const addLocation = React.useCallback(() => {
        try {
            const latitude = parseFloat(location.latitude)
            const longitude = parseFloat(location.longitude)
            if (latitude && longitude) {
                setLocations([
                    ...locations,
                    new firestore.GeoPoint(latitude, longitude),
                ])
                setLocation({
                    latitude: '',
                    longitude: '',
                })
            }
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }, [location, locations, firestore])

    const removeLocation = React.useCallback(
        index => {
            setLocations(locations.filter((l, i) => i !== index))
        },
        [locations],
    )

    const newLocation = React.useMemo(
        () => location.latitude && location.longitude,
        [location],
    )

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
                                            handleImageChange={
                                                formik.handleChange
                                            }
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
                                            handleImageChange={
                                                formik.handleChange
                                            }
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
                                <FormHelperText
                                    error={formik.errors.whatsApp_number}
                                >
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
                                <FormHelperText
                                    error={formik.errors.call_number}
                                >
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
                                <FormHelperText
                                    error={formik.errors.order_link}
                                >
                                    {formik.errors.order_link}
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={disabled}
                                    className={classes.input}
                                    id='latitude'
                                    name='latitude'
                                    label='Latitude'
                                    type='number'
                                    variant='outlined'
                                    value={location.latitude}
                                    onChange={onLocationChange}
                                    // error={formik.errors.locations}
                                />
                                {/* <FormHelperText error={formik.errors.locations}>
                                    {formik.errors.locations}
                                </FormHelperText> */}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={disabled}
                                    className={classes.input}
                                    id='longitude'
                                    name='longitude'
                                    label='Longitude'
                                    type='number'
                                    variant='outlined'
                                    value={location.longitude}
                                    onChange={onLocationChange}
                                    // error={formik.errors.locations}
                                />
                                {/* <FormHelperText error={formik.errors.locations}>
                                    {formik.errors.locations}
                                </FormHelperText> */}
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={4}
                                justify='center'
                                alignItems='center'
                                style={{ display: 'flex' }}
                            >
                                <Button
                                    disabled={disabled || !newLocation}
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    className={classes.input}
                                    startIcon={<LocationSearchingIcon />}
                                    onClick={addLocation}
                                >
                                    Add location
                                </Button>
                            </Grid>
                            {locations.length ? (
                                <Grid item sm={12}>
                                    Locations:{' '}
                                    {locations.map((location, i) => (
                                        <Chip
                                            key={location.longitude}
                                            style={{ margin: 5 }}
                                            label={`${location.latitude}, ${location.longitude}`}
                                            onDelete={() => removeLocation(i)}
                                        />
                                    ))}
                                </Grid>
                            ) : null}

                            {/* Categories */}
                            <Grid item xs={12} sm={12}>
                                <CategorySelect
                                    disabled={disabled}
                                    error={formik.errors.categories}
                                    value={formik.values.categories || []}
                                    onChange={formik.handleChange}
                                />
                                <FormHelperText
                                    error={formik.errors.categories}
                                >
                                    {formik.errors.categories}
                                </FormHelperText>
                            </Grid>

                            {/* Country */}
                            <Grid item xs={12} sm={12}>
                                <CountrySelect
                                    disabled={disabled}
                                    error={formik.errors.country}
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                />
                                <FormHelperText error={formik.errors.country}>
                                    {formik.errors.country}
                                </FormHelperText>
                            </Grid>

                            {/* Submit */}
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
