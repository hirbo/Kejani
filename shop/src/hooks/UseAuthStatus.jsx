import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

// export default function UseAuthStatus() checks for authentication status on mount of the component
export  function UseAuthStatus() {
    
    // sets loggedIn to false and loading to true when the component mounts 
    const [loggedIn,setLoggedIn] = useState(false);
    const [loading,setLoading]=useState(true);
    
    // Checks auth status when the component mounts 
    useEffect(()=>{
        const auth =getAuth(); // gets auth status 
        onAuthStateChanged(auth,(user)=>{ // callback once auth state has been checked 
            if(user){
                setLoggedIn(true) // if a user is found, set logged in to true 
            }
           setLoading(false) // sets loading to false no matter what 
        })

    },[]) // runs only once when component mounts 
  return {loading,loggedIn} // returns loading and loggedIn values 
  
}
