import React from 'react'
import MaterialTable from 'material-table'
import { useSelector } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'

import TableIcons from '../components/TableIcons'
import { asyncHandler } from '../utils/helper'

const columns = [
    { title: 'ID', field: 'id', editable: 'never' },
    { title: 'Name', field: 'name' },
]

export default function CountriesPage() {
    // hooks
    const firestore = useFirestore()
    const countries = useSelector(state => state.firestore.ordered.countries)

    // callback handlers
    const onAdd = React.useCallback(
        asyncHandler(async newData => {
            await firestore.add('countries', newData)
        }),
        [firestore],
    )
    const onUpdate = React.useCallback(
        asyncHandler(async (newData, oldData) => {
            await firestore.update(`countries/${oldData.id}`, newData)
        }),
        [firestore],
    )
    const onDelete = React.useCallback(
        asyncHandler(async oldData => {
            await firestore.delete(`countries/${oldData.id}`)
        }),
        [firestore],
    )

    return (
        <MaterialTable
            icons={TableIcons}
            title='Edit Categories'
            columns={columns}
            data={countries && countries.map(o => ({ ...o }))}
            isLoading={!countries}
            editable={{
                onRowAdd: onAdd,
                onRowUpdate: onUpdate,
                onRowDelete: onDelete,
            }}
        />
    )
}
