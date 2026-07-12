import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({children}) {
 const {user, loading} = useContext(AuthContext);

 if (loading) return <h1>Loading....</h1>

 return user ? children: <Navigate to="/login" />
}
