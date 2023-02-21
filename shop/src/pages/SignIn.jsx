import React, { useState } from 'react'
import SignPic from './signin.jpg'

import { Link } from 'react-router-dom';
import Oauth from '../components/Oauth';

function SignIn() {
  const [formData, setFormData] = useState(
    {
      email: '',
      password: ''
    }
  )
  const { email, password } = formData;
  function Change(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value

    }))
      console.log(email)
     
  }
 
  


  
  return (
    <section className=' '>
      <h1 className=' text-3xl text-center mt-10 font-bold '>
        SIGN IN
      </h1>
      <div className='flex justify-center flex-wrap
                      max-w-6xl mx-auto 
                       items-center px-6 py-10 space-x-20 '>
        <div className=' md:w-[67%] lg:w-[50%]  mb-12 md:mb-6'>
          <img src={SignPic} alt="SIGN IN "
            className=' rounded-2xl w-full '
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] '>
          <form action="" className='' >
           <div >
           <input type="email" id='email' value={email} placeholder='email'onChange={Change} 
            className='w-full px-4 text-xl text-gray-700 bg-white border-gray-600
                         rounded-md transition ease-in-out' 
             />
             <input type="password" id='password' value={password} placeholder='password'onChange={Change} 
            className='w-full px-4 text-xl text-gray-700 bg-white border-gray-600
                         rounded-md transition ease-in-out mt-6' 
             />

           </div>
           <button className='w-full shadow-md hover:bg-blue-700
                               bg-blue-500 mt-4 rounded-md  font-semibold 
                                active:bg-blue-900 h-8
                               text-zinc-900 transition ease-in-out '    >
                                SIGN In
              </button>
          </form>
             
          <div className='flex space-x-60 mt-8'>
         
            <p> 
              <Link to='/pages/signup' 
              className='text-red-600 hover:text-red-700 
                          cursor-pointer  ml-2 font-semibold text-lg '>
                Sign Up
                </Link>
            </p>
        
        
             <Link to='/pages/forgotpassword' className=' text-blue-600 font-semibold'>Forgot Password</Link>
        
          </div>
          <div className='flex items-center my-4 
                            before:border-t before:flex-1
                            before:border-gray-300 after:border-t
                            after:border-gray-300 after:flex-1 font-semibold
                            '>
            <p className='text-centre font-semibold mx-4'>
              or
            </p>
          </div>
          <div>
            <Oauth/>
          </div>
        </div>

      </div>
      
     
    </section>
  )
}

export default SignIn