import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {toast} from 'react-toastify'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';




function Oauth() {
  // Declare navigate for router navigation 
  const navigate =useNavigate();

  // async function to handle logging in with Google
  async function signInWithGoogle (){
    try {

      // Get authentication and create GoogleAuthProvider 
      const auth = getAuth();
      const provider =new GoogleAuthProvider();

      // Sign in with Google popup
      const result =  await signInWithPopup(auth,provider);
      const user = result.user;
      console.log(user);
      
      // Navigate to the home page and display a success message
      navigate('/')
      toast.success('sucessful');

      // Get user data from FireStore document
      const docRef = doc(db,'users',user.uid);
      const userDoc = await getDoc(docRef);

      // If user does not already exist in Firestore
      // Add their information to the document
      if (!userDoc.exists()){
        await setDoc(docRef,{
          name:user.displayName,
          email:user.email,
          timestamo:serverTimestamp(),
        })
      }

    }catch(err){
      // Display error message if something went wrong
      toast.error('error happened')
    }
  }

  // Return the button for signing in with Google 
  return (
    <button className='flex items-center justify-center space-x-2
                 hover:bg-red-800 transition ease-in-out
                  text-gray-900 font-semibold hover:shadow-lg
                  active:bg-red-900
                bg-red-700 w-full h-10 rounded-md shadow-md'
                onClick={signInWithGoogle}
                >       
        <FcGoogle className=' text-3xl rounded-full bg-slate-100  '/>
        <p>Continue With Google</p>        
    </button>
  )
}

export default Oauth
