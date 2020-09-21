import React from 'react'
import {
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Chip,
} from '@material-ui/core'
import { useSelector } from 'react-redux'

export default function CountrySelect({ onChange, value, ...selectProps }) {
    const classes = useStyles()
    const countries = useSelector(state => state.firestore.ordered.countries)

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='country-label'>Country *</InputLabel>
            <Select
                labelId='country'
                id='country'
                name='country'
                required
                value={value}
                onChange={onChange}
                {...selectProps}
            >
                {countries &&
                    countries.map(({ name }) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}
