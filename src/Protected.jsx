import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie"

const Protected = () => {
    const token = Cookies.get("token")
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // renders nested routes
}

export default Protected
