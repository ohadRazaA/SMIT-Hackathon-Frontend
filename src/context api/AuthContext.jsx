import React from 'react';
import { createContext, useState } from 'react'
import Cookies from 'js-cookie'
import { useFetchData } from '../hooks/useFetchData';
import apiEndPoints, { BASE_URL } from '../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const token = Cookies.get('token');
  const { data, isLoading, error } = useFetchData(
    'user-data',
    `${BASE_URL}${apiEndPoints.me}`,
    {},
    { Authorization: `Bearer ${Cookies.get("token")}` },
    {
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
      refetchOnMount: "always",
      enabled: !!token
    }
  );

  const logout = () => {
    setUser(null)
    Cookies.remove('token');
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{
      loader,
      setLoader,
      logout,
      data,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider