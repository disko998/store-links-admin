import React, { useMemo } from 'react'
import MaterialTable from 'material-table'
import { useSelector } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'

import TableIcons from '../components/TableIcons'
import { asyncHandler } from '../utils/helper'

const columns = [
    { title: 'ID', field: 'id', editable: 'never' },
    { title: 'Title', field: 'title' },
    { title: 'Icon', field: 'icon' },
    { title: 'Stores', field: 'stores', editable: 'never' },
]

export default function CategoriesPage() {
    // hooks
    const firestore = useFirestore()
    const categories = useSelector(state => state.firestore.ordered.categories)
    const stores = useSelector(state => state.firestore.ordered.stores)

    // callback handlers
    const addCategory = React.useCallback(
        asyncHandler(async newData => {
            await firestore.add('categories', newData)
        }),
        [firestore],
    )
    const editCategory = React.useCallback(
        asyncHandler(async (newData, oldData) => {
            await firestore.update(`categories/${oldData.id}`, newData)
        }),
        [firestore],
    )
    const deleteCategory = React.useCallback(
        asyncHandler(async oldData => {
            await firestore.delete(`categories/${oldData.id}`)
        }),
        [firestore],
    )

    const data = useMemo(
        () =>
            categories &&
            categories.map(c => ({
                ...c,
                stores: stores.filter(s => s.categories.includes(c.title))
                    .length,
            })),
        [categories, stores],
    )

    return (
        <MaterialTable
            icons={TableIcons}
            title='Edit Categories'
            columns={columns}
            data={data}
            isLoading={!categories}
            editable={{
                onRowAdd: addCategory,
                onRowUpdate: editCategory,
                onRowDelete: deleteCategory,
            }}
        />
    )
}
