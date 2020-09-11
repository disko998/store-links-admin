import React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

import Inbox from '../components/Inbox'
import RequestMessage from '../components/RequestMessage'

export default function RequestsPage() {
    const requests = useSelector(state => state.firestore.ordered.requests)
    const [currentMessage, setCurrentMessage] = React.useState(null)

    const onMessagePress = React.useCallback(message => {
        setCurrentMessage(message)
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs='12' md='5'>
                <Inbox requests={requests} onItemPress={onMessagePress} />
            </Grid>
            <Grid item xs='12' md='7'>
                {currentMessage && <RequestMessage {...currentMessage} />}
            </Grid>
        </Grid>
    )
}
