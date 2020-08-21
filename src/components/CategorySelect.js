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

    const handleChange = event => {
        setPersonName(event.target.value)
    }
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='categories-label'>Chip</InputLabel>
            <Select
                labelId='categories'
                id='categories'
                className={classes.input}
                multiple
                required
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
                {names.map(name => (
                    <MenuItem
                        key={name}
                        value={name}
                        // style={getStyles(name, personName, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
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
