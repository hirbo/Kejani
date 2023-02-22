import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Logo from './logo.png'
import { useLocation } from 'react-router-dom'
import ForgotPassword from '../pages/Forgotpassword'

function Header() {
  const location = useLocation();
  const matchroute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  const navigate = useNavigate();
  return (
    <div className=' bg-emerald-900  border-b shadow-sm sticky top-0 z-50 flex-wrap max-w-8xl mx-auto '>
      <div className='   flex justify-between items-center'>
        <div class=' px-3'>
          <img src={Logo} alt="logo" class='h-24 w-32'  onClick={()=>navigate('/')}/>
        </div>

        <div className='space-x-10  mr-4 '>
          
        <NavLink to='/' className={`font-semibold py-3 text-lg border-b-4
             border-b-transparent transition ease-in-out ${matchroute("/") && "text-black border-b-yellow-600" 
              }`}>Home</NavLink>
          <NavLink to='../pages/Offers' className={`font-semibold py-3 text-lg border-b-4 
             border-b-transparent transition ease-in-out ${matchroute("/pages/Offers") && "text-black border-b-yellow-600 transition ease-in-out" 
              }`}>Offers</NavLink>
          
          <NavLink to='../pages/signin' className={`font-semibold py-3 text-lg border-b-4
             border-b-transparent transition ease-in-out ${matchroute("/pages/signin") && "text-black border-b-yellow-600  " 
              }`}>sign IN</NavLink>

        </div>

      </div>


    </div>
  )
}

export default Header