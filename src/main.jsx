import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme.js'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './queryClient.js'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
