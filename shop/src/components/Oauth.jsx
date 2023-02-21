import React from 'react'
import {FcGoogle} from 'react-icons/fc'
function Oauth() {
  return (
    <button className='flex items-center justify-center space-x-2
                 hover:bg-red-800 transition ease-in-out
                  text-gray-900 font-semibold hover:shadow-lg
                  active:bg-red-900
                bg-red-700 w-full h-10 rounded-md shadow-md'>
       
        <FcGoogle className=' text-3xl rounded-full bg-slate-100  '/>
        <p>
       Continue With Google
        </p>
    </button>
  )
}

export default Oauth