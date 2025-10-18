import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/User/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import App from './App';
import OtpVerificationPage from './pages/Auth/OtpVerificationPage';
import AmdinLayout from './components/Layout/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashbaord';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
      {
        element: <AmdinLayout />,
        children: [
          { path: "admin-dashboard", element: <AdminDashboard /> },
        ],
      },
      { path: "/", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/otp-verification", element: <OtpVerificationPage /> },
    ],
  },
])