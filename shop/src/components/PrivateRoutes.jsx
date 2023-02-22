import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import {UseAuthStatus } from '../hooks/UseAuthStatus';
import Profile from '../pages/Profile';
import Spinner from './Spinner';

function PrivateRoutes({children}) {


//useEffect to get Authentication status
const {loggedIn,loading}=UseAuthStatus();
  

  if(loading){
    //Show loading indicator until authentication info received
    return <>
    <Spinner/>
    </>
      
    
  } 
      //If logged in show Outlet component otherwise redirect to login
    return loggedIn ? <Profile/> : <Navigate to='/pages/signin' />
  

  

}

export default PrivateRoutes
