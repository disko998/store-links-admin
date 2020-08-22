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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

export default function CategorySelect(...selectProps) {
    const classes = useStyles()
    const [personName, setPersonName] = React.useState([])
    const categories = useSelector(state => state.firestore.ordered.categories)

    const handleChange = event => {
        setPersonName(event.target.value)
    }

    console.log(categories)
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='categories-label'>Categories *</InputLabel>
            <Select
                labelId='categories'
                id='categories'
                multiple
                required
                multiline
                rowsMin={3}
                value={personName}
                onChange={handleChange}
                input={<Input id='categories-chip' />}
                renderValue={selected => (
                    <div className={classes.chips}>
                        {selected.map(value => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {categories &&
                    categories.map(({ title }) => (
                        <MenuItem key={title} value={title}>
                            {title}
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
