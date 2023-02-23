import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../FirebaseConfig";
import { FcHome } from "react-icons/fc";
import Listing from "../components/ListingItem";
import ListingItem from "../components/ListingItem";

function Profile() {
  //Get authentication and store as 'auth'
  const auth = getAuth();

  // Get current user and store as 'User'
  const User = auth.currentUser;

  // Create state to store user data (name, email)
  const [Data, setData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [listings,setListings]=useState([]);
  const [loading,setLoading]=useState(false);

  // Get values of name and email from Data
  const { email, name } = Data;

  // Get access to navigation functions
  const navigate = useNavigate();

  // Function to sign out the current user

  function signOutUser() {
    const auth = getAuth();

    auth.signOut();
    navigate("/");
  }

  // Setting a state variable called changed to false
  const [changed, setChanged] = useState(false);

  // Defining a callback function that sets the data
  function changeDetails(e) {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value, // Updating a single value in the data object
    }));
  }

  // Async function to update profile when the name has changed
  async function submitForm() {
    try {
      if (auth.currentUser.displayName !== name) {
        // Getting authorization info
        const auth = getAuth();

        // Updating the auth users' profile info
        await updateProfile(auth.currentUser, { displayName: name });

        // Getting reference of the user from Firestore
        const ref = doc(db, "users", auth.currentUser.uid);

        // Updating the Firestore user's info
        await updateDoc(ref, {
          name: name,
        });

        // If successful, show a success toast message
        toast.success("profile updated");
      }
    } catch (err) {
      // Otherwise, show an error toast message
      toast.err("error");
    }
  }
  // Use the useEffect() Hook to GET the user listings
  useEffect(() => {
    // Asynchronous function to get the user listing
    async function getUserListing() {
      // Create Firestore reference
      const ref = collection(db, "listings");
      // Create Query with conditions
      const q = query(
        ref,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      // Get query snapshot
      const querySnap = await getDocs(q);
      let listings = [];
      // loop through each snapshot and push it into new array called listings
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false)
    }
    // Call the getUserListing function
    getUserListing();
  }, [auth.currentUser.uid]);

  return (
    <>
    <section className=" max-w-6xl mx-auto justify-center items-center flex-col ">
      <h1 className=" text-center text-3xl font-bold font-serif ">profile</h1>
      <div className="w-full md:w-[50%cd shop] mt-6 px-3">
        <form action="">
          <input
            onChange={changeDetails}
            type="text"
            id="name"
            value={name}
            placeholder={name}
            disabled={!changed}
            className="w-full px-4 py-2 text-gray-700 bg-yellow-50 border-gray-900 rounded-md transition ease-in- text-lg font-sans "
          />
          <input
            onChange={changeDetails}
            type="email"
            id="email"
            placeholder="email"
            value={email}
            disabled={!changed}
            className={`w-full px-4 py-2 text-gray-700 bg-yellow-50 border-gray-900 rounded-md transition ease-in-out mt-8 text-lg ${
              changed && " bg-red-200 focus:bg-red-300 "
            }`}
          />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex items-center text-gray-800 space-x-2 font-semibold ">
              Do you want to change your name?
              <span
                onClick={() => {
                  changed && submitForm();
                  setChanged(!changed);
                }}
                className="text-red-600 hover:text-red-800 transition ease-in-out font-semibold cursor-pointer "
              >
                {changed ? "save changes" : "Edit"}
              </span>
            </p>
            <p
              className="text-blue-600 hover:text-blue-800 transition
                         ease-in-out cursor-pointer font-semibold "
              onClick={signOutUser}
            >
              Sign Out
            </p>
          </div>
          <button
            type="submit"
            class="bg-blue-700  w-full text-white uppercase font-semibold px-7 py-3
                     rounded-md shadow-md hover:bg-blue-800  transition ease-in-out hover:shadow-lg active:bg-blue-900"
          >
            <Link
              to="/pages/createlisting"
              class="flex justify-center items-center"
            >
              <FcHome class="mr-2 text-3xl bg-emerald-700 rounded-full p-1 border-2 " />
              sell or rent your home
            </Link>
          </button>
        </form>
      </div>
    </section>
    <div class='  flex items-center justify-center mx-auto'>
      {!loading && listings.length > 0 &&(
        <>

        <h1 class='text-center font-semibold '>my listings</h1>
        <ul class='flex space-x-3 mt-6'>
          {listings.map((listing) => ( 
            <ListingItem
            key={listing.id}
            id={listing.id}
            listing={listing.data}
            />
          ))}
        </ul>
        </>
      ) }
    </div>
    </>
  );
}

export default Profile;
