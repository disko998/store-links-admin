import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Switch from '@material-ui/core/Switch'

import Title from './dashboard/Title'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

export default function AdBanner() {
    const classes = useStyles()
    useFirestoreConnect(() => [{ collection: 'ads', doc: 'ad' }])
    const firestore = useFirestore()
    const ad = useSelector(
        ({ firestore: { data } }) => data.ads && data.ads['ad'],
    )

    const handleChange = event => {
        firestore.update('ads/ad', {
            show: event.target.checked,
        })
    }

    if (!ad) {
        return null
    }

    return (
        <>
            <div className={classes.header}>
                <Avatar alt={ad.storeName} src={ad.storeLogo} />
                <Title className={classes.title}>{`${ad.storeName} Ad`}</Title>
                <Switch
                    className={classes.switch}
                    checked={ad.show}
                    onChange={handleChange}
                    color='primary'
                    name='checkedB'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
            <img alt='ads banner' src={ad.image} className={classes.banner} />
        </>
    )
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        marginBottom: 0,
        marginLeft: 5,
    },
    switch: {
        marginLeft: 'auto',
    },
}))
