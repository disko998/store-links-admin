import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useFirestoreConnect } from 'react-redux-firebase'

import './App.css'
import RootRouter from './router'

function App() {
    useFirestoreConnect([
        { collection: 'stores', orderBy: 'name' },
        { collection: 'categories', orderBy: 'title' },
        { collection: 'countries', orderBy: 'name' },
        { collection: 'requests', orderBy: 'createdAt', limit: 20 },
    ])

    return (
        <BrowserRouter>
            <RootRouter />
        </BrowserRouter>
    )
}

export default App
