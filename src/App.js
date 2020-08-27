import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useFirestoreConnect } from 'react-redux-firebase'

import './App.css'
import MainPage from './pages/MainPage'

function App() {
    useFirestoreConnect([
        { collection: 'stores' },
        { collection: 'categories' },
        { collection: 'countries' },
    ])

    return (
        <BrowserRouter>
            <MainPage />
        </BrowserRouter>
    )
}

export default App
