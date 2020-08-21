import React from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import { useParams, useLocation } from 'react-router-dom'

export default function StorePage() {
    const location = useLocation()
    const { name, id } = location.state

    return <div>{name}</div>
}
