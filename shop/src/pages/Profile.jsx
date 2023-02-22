import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
 //Get authentication and store as 'auth'
const auth= getAuth();

// Get current user and store as 'User'
const User=auth.currentUser;

// Create state to store user data (name, email)
const [Data, setData] = useState({
name:'SAMPLE',
email:'SAMPLE'
});

// Get values of name and email from Data
const { email, name } = Data;

// Get access to navigation functions
const navigate =useNavigate();

// Function to sign out the current user

  function signOutUser (){
    const auth= getAuth();
    
    auth.signOut();
    navigate('/')
  }

  return (
    <section className=" max-w-6xl mx-auto justify-center items-center flex-col ">
      <h1 className=" text-center text-3xl font-bold font-serif ">profile</h1>
      <div className="w-full md:w-[50%cd shop] mt-6 px-3">
        <form action="">
          <input
            type="text"
            id="name"
            value={name}
            placeholder="name"
            disabled
            className="w-full px-4 py-2 text-gray-700 bg-yellow-50 border-gray-900 rounded-md transition ease-in- text-lg font-sans "
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            disabled
            className="w-full px-4 py-2 text-gray-700 bg-yellow-50 border-gray-900 rounded-md transition ease-in-out mt-8 text-lg "
          />
        </form>
        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
          <p className="flex items-center text-gray-800 space-x-2 font-semibold ">
            Do you want to change your name?
            <span className="text-red-600 hover:text-red-800 transition ease-in-out font-semibold cursor-pointer ">
                Edit
            </span>
          </p>
          <p className="text-blue-600 hover:text-blue-800 transition
                         ease-in-out cursor-pointer font-semibold "
                         onClick={signOutUser}
                         >
            Sign Out
            </p>
        </div>
      </div>
    </section>
  );
}

export default Profile;
