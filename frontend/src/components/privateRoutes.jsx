import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({isLoggedIn}) => {

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes