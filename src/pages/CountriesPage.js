import React from 'react'
import MaterialTable from 'material-table'
import { useSelector } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'

import TableIcons from '../components/TableIcons'
import { asyncHandler } from '../utils/helper'

const columns = [
    { title: 'ID', field: 'id', editable: 'never' },
    { title: 'Name', field: 'name' },
    { title: 'Stores', field: 'stores', editable: 'never' },
]

export default function CountriesPage() {
    // hooks
    const firestore = useFirestore()
    const countries = useSelector(state => state.firestore.ordered.countries)
    const stores = useSelector(state => state.firestore.ordered.stores)

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

    const data = React.useMemo(
        () =>
            countries &&
            countries.map(country => ({
                ...country,
                stores: stores.filter(s => s.country === country.name).length,
            })),
        [countries, stores],
    )

    return (
        <MaterialTable
            icons={TableIcons}
            title='Edit Categories'
            columns={columns}
            data={data}
            isLoading={!countries}
            editable={{
                onRowAdd: onAdd,
                onRowUpdate: onUpdate,
                onRowDelete: onDelete,
            }}
        />
    )
}
