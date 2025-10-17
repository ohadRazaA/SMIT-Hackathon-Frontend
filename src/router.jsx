import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/User/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import App from './App';


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
      { path: "/", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
])