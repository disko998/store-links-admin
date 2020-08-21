import React from 'react'
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

export default function CategorySelect(...selectProps) {
    const classes = useStyles()
    return (
        <FormControl className={classes.input}>
            <InputLabel id='demo-customized-select-label'>Category</InputLabel>
            <Select
                labelId='Categories'
                id='categories'
                required
                value={'none'}
                onChange={() => {}}
                multiline={true}
                {...selectProps}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
    },
}))
