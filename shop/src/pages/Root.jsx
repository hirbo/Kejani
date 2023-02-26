import { collection, doc, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { NavLink,Link,Outlet } from 'react-router-dom'
import { Slide } from 'react-toastify'
import Header from '../components/Defaultheader'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import { db } from '../FirebaseConfig'

function Root() {

 
  return (
    <div > 
      <Header/>
      
      
    
      
      

      
      
      <Outlet/>
      <div className='fixed bottom-0'>
      <Footer />
      </div>
      
    
    </div>
  )
}

export default Root