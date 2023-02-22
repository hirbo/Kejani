//import React components and Firebase packages
import React, { useState } from "react";
import SignPic from "./signin.jpg";
import { app } from "../FirebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";

//import React router packages
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

//import Firestore function
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


//Signup function
function SignUp() {

  //take user input data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //destructuring data
  const { name, email, password } = formData;

  // change data state when user type on input field
  const Change = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });  
    
  //using useNavigate hook for redirecting page
  const navigate = useNavigate();

  //user signup function
  async function signUser(event) {
    event.preventDefault();

    try {
           
      //get auth and firestore
      const db = getFirestore(app);
      const auth = getAuth(app);

      //create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //update user profile
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      console.log(user.displayName);

      //copy all the data without password field
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      
      //add time stamp to the formdata
      formDataCopy.timestamp = serverTimestamp();

      //save user's data to Firestore
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      console.log(formDataCopy);

      //display success message
      toast.success('account created successfully!')

      //direct user to home page
      navigate("/");

    } catch (err) {
      //display error when something went wrong
      toast.error('an error occured')
    }
  }

  
  return (
    <section className=" ">
      <h1 className=" text-3xl text-center mt-10 font-bold ">SIGN UP</h1>
      <div
        className="flex justify-center flex-wrap
                      max-w-6xl mx-auto 
                       items-center px-6 py-10 space-x-20 "
      >
        <div className=" md:w-[67%] lg:w-[50%]  mb-12 md:mb-6">
          <img src={SignPic} alt="SIGN IN " className=" rounded-2xl w-full " />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] ">
          <form action="" className="">
            <div>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="fullname"
                onChange={Change}
                className="w-full px-4 text-xl text-gray-700 bg-white border-gray-600
                         rounded-md transition ease-in-out mb-6"
              />
              <input
                type="email"
                id="email"
                value={email}
                placeholder="email"
                onChange={Change}
                className="w-full px-4 text-xl text-gray-700 bg-white border-gray-600
                         rounded-md transition ease-in-out"
              />
              <input
                type="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={Change}
                className="w-full px-4 text-xl text-gray-700 bg-white border-gray-600
                         rounded-md transition ease-in-out mt-6"
              />
            </div>
            <button
              className="w-full shadow-md hover:bg-blue-700
                               bg-blue-500 mt-4 rounded-md  font-semibold 
                                active:bg-blue-900 h-8
                               text-zinc-900 transition ease-in-out "
              onClick={signUser}
            >
              SIGN UP
            </button>
          </form>

          <div className="flex space-x-60 mt-8">
            <p>
              <Link
                to="/pages/signin"
                className="text-red-600 hover:text-red-700 
                          cursor-pointer  ml-2 font-semibold text-lg "
              >
                Log in
              </Link>
            </p>

            <Link
              to="/pages/forgotpassword"
              className=" text-blue-600 font-semibold"
            >
              Forgot Password
            </Link>
          </div>
          <div
            className="flex items-center my-4 
                            before:border-t before:flex-1
                            before:border-gray-300 after:border-t
                            after:border-gray-300 after:flex-1 font-semibold
                            "
          >
            <p className="text-centre font-semibold mx-4">or</p>
          </div>
          <div>
            <Oauth  />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
