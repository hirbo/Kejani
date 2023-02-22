import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "./logo.png";
import { useLocation } from "react-router-dom";
import ForgotPassword from "../pages/Forgotpassword";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Header() {
// Use the useLocation hook to get the current pathname
const location = useLocation();

// A function for checking the route matches the current pathname
const matchroute = (route) => {  // Check if the route passed in matches the current pathname
  if (route === location.pathname) {
    return true;
  }
};

// Use the useState hook to set up the page state
const [pageState, setPageState] = useState();

// Get access to the navigate method from react-router-dom 
const navigate = useNavigate();

// Get the user's auth status
const auth = getAuth();

// Run a side effect whenever auth changes
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Set the page state to profile if the user is authenticated
      setPageState("profile");
    } else {
      // Else, the set the page state to signIn
      setPageState("signIn");
    }
  });
}, [auth]);


  return (
    <div className=" bg-emerald-900  border-b shadow-sm sticky top-0 z-50 flex-wrap max-w-8xl mx-auto ">
      <div className="   flex justify-between items-center">
        <div class=" px-3">
          <img
            src={Logo}
            alt="logo"
            class="h-24 w-32"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="space-x-10  mr-4 ">
          <NavLink
            to="/"
            onClick={() => navigate("/")}
            className={`font-semibold py-3 text-lg border-b-4
             border-b-transparent transition ease-in-out ${
               matchroute("/") && "text-black border-b-yellow-600"
             }`}
          >
            Home
          </NavLink>
          <NavLink
            to="../pages/Offers"
            onClick={() => navigate("/pages/offers")}
            className={`font-semibold py-3 text-lg border-b-4 
             border-b-transparent transition ease-in-out ${
               matchroute("/pages/Offers") &&
               "text-black border-b-yellow-600 transition ease-in-out"
             }`}
          >
            Offers
          </NavLink>

          <NavLink
            to="../pages/signin"
            className={`font-semibold py-3 text-lg border-b-4
             border-b-transparent transition ease-in-out ${
               (matchroute("/pages/signin") || matchroute("/pages/profile")) &&
               "text-black border-b-yellow-600  "
             }`}
            onClick={() => navigate("/pages/signin")}
          >
            {pageState}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
