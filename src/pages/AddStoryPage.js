import React from 'react'

import StoresList from '../components/StoresList'
import AddImageDialog from '../components/AddImageDialog'

export default function AddStoryPage() {
    const [story, setStory] = React.useState(null)

    const handleClose = () => {
        setStory(false)
    }

    const onItemPress = React.useCallback(store => {
        setStory(store)
    }, [])

    return (
        <>
            <StoresList onItemPress={onItemPress} />
            <AddImageDialog handleClose={handleClose} state={story} />
        </>
    )
}
