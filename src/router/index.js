import React from 'react'

import LoginPage from '../pages/LoginPage'
import Dashboard from '../components/dashboard/Dashboard'
import { useSelector } from 'react-redux'

export default function RootRouter() {
    const auth = useSelector(state => state.firebase.auth)

    return !auth.isEmpty ? <Dashboard /> : <LoginPage />
}
