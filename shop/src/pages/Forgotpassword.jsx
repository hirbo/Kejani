import React, { useState } from 'react'
import Forgot from './forgot.png'
import { Link } from 'react-router-dom';
import Oauth from '../components/Oauth';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
  // Set the initial state of formData
const [formData, setFormData] = useState({
  email: ''
});

// Get the email from formData
const { email } = formData;

// Function that updates the data when user enters their email
function Change(e) {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.id]:e.target.value
  }));
}

// Submit function that sends an email reset email with get auth
async function submitEmail (e){
  e.preventDefault();
  try{
    const auth = getAuth();
    await sendPasswordResetEmail(auth,email);
    toast.success('Email sent')

  }catch(err){
    toast.error('Wrong Email')
  }

}
 


  
  return (
    <section className=' '>
      <h1 className=' font-sans text-3xl text-center mt-10 font-bold '>
        Forgot Password
      </h1>
      <div className='flex justify-center flex-wrap
                      max-w-6xl mx-auto 
                       items-center px-6 py-10 space-x-20 '>
        <div className=' md:w-[67%] lg:w-[50%]  mb-12 md:mb-6'>
          <img src={Forgot} alt="SIGN IN "
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
            

           </div>
           <button className='w-full shadow-md hover:bg-blue-700 font-sans
                               bg-blue-500 mt-4 rounded-md  font-semibold 
                                active:bg-blue-900 h-8
                               text-zinc-900 transition ease-in-out '  
                               onClick={submitEmail}  >
                                Reset Password
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
        
        
             <Link to='/pages/signin' className=' text-blue-600 font-semibold'>Sign In</Link>
        
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

export default ForgotPassword