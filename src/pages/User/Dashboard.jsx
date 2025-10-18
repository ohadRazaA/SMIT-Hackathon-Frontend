import React from 'react'
import Box from '@mui/material/Box'
import Cards from '../../components/Cards'
import { useFetchData } from '../../hooks/useFetchData'
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints'
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress'
import Select from '../../components/Select'


const Dashboard = () => {
  // const { data, isLoading, error } = useFetchData(
  //   'loan-category',
  //   `${BASE_URL}${apiEndPoints.getLoanCategory}`,
  //   {},
  //   { Authorization: `Bearer ${Cookies.get("token")}` },
  //   {
  //     staleTime: 1000 * 60 * 60, // 1 hour fresh
  //     gcTime: 1000 * 60 * 30, // remove from cache after 30 min inactive
  //     refetchOnWindowFocus: false, // don’t annoy user
  //     refetchOnReconnect: true, // in case of network drop
  //     retry: false, // don’t retry on permanent failures like 404
  //   }
  // );

  // console.log(data?.data);

  // if(isLoading) return <Box className='!my-5 flex items-center justify-center gap-4'><CircularProgress /> Loading...</Box> 

  return (
      <>User Dashboard</>
  );
};

export default Dashboard