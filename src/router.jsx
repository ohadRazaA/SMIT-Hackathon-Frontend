import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './pages/User/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import App from './App';
import OtpVerificationPage from './pages/Auth/OtpVerificationPage';
import AdminLayout from './components/Layout/AdminLayout';
import UploadReport from './pages/Health/UploadReport';
import AddVitals from './pages/Health/AddVitals';
import ReportViewer from './pages/Health/ReportViewer';
import Timeline from './pages/Health/Timeline';
import Profile from './pages/User/Profile';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "upload-report", element: <UploadReport /> },
          { path: "add-vitals", element: <AddVitals /> },
          { path: "report/:fileId", element: <ReportViewer /> },
          { path: "timeline", element: <Timeline /> },
          { path: "profile", element: <Profile /> },
        ],
      },
      {
        element: <AdminLayout />,
        // children: [
        //   { path: "admin-dashboard", element: <AdminDashboard /> },
        // ],
      },
      { path: "/", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/otp-verification", element: <OtpVerificationPage /> },
    ],
  },
])