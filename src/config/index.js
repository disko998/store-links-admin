import firebase from 'firebase/app'
import { createStore, combineReducers, compose } from 'redux'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDoOXFKdYqROkENq0was49-tGLKTtbmRdg',
    authDomain: 'linksapp-c48d4.firebaseapp.com',
    databaseURL: 'https://linksapp-c48d4.firebaseio.com',
    projectId: 'linksapp-c48d4',
    storageBucket: 'linksapp-c48d4.appspot.com',
    messagingSenderId: '619535807289',
    appId: '1:619535807289:web:9e1c56fcde265fc140eee8',
    measurementId: 'G-FJWS8SCSQ0',
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
export const fb = firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
export const db = firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
export const store = createStore(rootReducer, initialState, composeEnhancers())

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
}
