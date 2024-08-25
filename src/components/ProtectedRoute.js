import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FIREBASE_AUTH } from '../firebase/firebase'

export const ProtectedRoute = ({ to, children }) => {
    

    if (FIREBASE_AUTH.currentUser) {
        return <Navigate to={`/${FIREBASE_AUTH.currentUser.displayName}`}/>
    }

    return children
}
