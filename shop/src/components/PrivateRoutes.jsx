import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import {UseAuthStatus } from '../hooks/UseAuthStatus';
import Profile from '../pages/Profile';

function PrivateRoutes({children}) {


//useEffect to get Authentication status
const {loggedIn,loading}=UseAuthStatus();
  

  if(loading){
    //Show loading indicator until authentication info received
    return <>
    <h1>Loading...</h1>
    </>
      
    
  } 
      //If logged in show Outlet component otherwise redirect to login
    return loggedIn ? <Profile/> : <Navigate to='/pages/signin' />
  

  

}

export default PrivateRoutes
