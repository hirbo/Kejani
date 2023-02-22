import React from 'react'
import { NavLink,Link,Outlet } from 'react-router-dom'
import Header from '../components/Defaultheader'
import Footer from '../components/Footer'

function Home() {
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

export default Home