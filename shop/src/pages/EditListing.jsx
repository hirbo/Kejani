import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  sna,
} from "firebase/storage";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function EditListing() {
  // Assign formData object to state
  const [imgurl, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(false);
  const auth = getAuth();
  const [formData, setformData] = useState({
    type: "sale",
    name: "",
    bedrooms: 1,
    bathrooms: 0,
    parking: false,
    furnished: false,
    adress: "",
    description: "",
    offer: false,
    regularprice: 0,
    discountedprice: 0,
    images: {},
  });

  // destructuring data from the formData object
  const {
    offer,
    description,
    discountedprice,
    adress,
    parking,
    furnished,
    bedrooms,
    bathrooms,
    regularprice,
    type,
    name,
    images,
    latitude,
    longitude,
  } = formData;

  const navigate = useNavigate();
  const params = useParams();

  // The useEffect hook is used to perform side effects in functional components
  useEffect(() => {
    // Before starting the data fetching, set the loading state to true
    setLoading(true);

    // Define an asynchronous function to fetch the data
    async function fetchListing() {
      // Get a reference to the document in Firestore
      const docRef = doc(db, "listings", params.listingId);
      // Fetch the document snapshot
      const docSnap = await getDoc(docRef);

      // If the document exists, set the listing state and form data state with its data, and set loading to false
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setformData(docSnap.data());
        setLoading(false);
      } else {
        // If the document doesn't exist, navigate to the homepage and display an error toast
        navigate("/");
        toast.error("error");
      }
    }

    // Call the fetchListing function when the component mounts (i.e., the dependency array is empty)
    fetchListing();
    
  }, []);
  useEffect(()=>{
    if(listing && auth.currentUser.uid!==listing.userRef){
            navigate('/');
            toast.error('you cant edit this listing');
    }
  }
    
  )

  // function to change state depending on the event target value
  // This function is called when the value of an input element is changed
  function onChange(e) {
    // Declare a variable to hold a boolean value
    let boolean = null;

    // If the value of the input element is 'true', set boolean to true
    if (e.target.value === "true") {
      boolean = true;
    }

    // If the value of the input element is 'false', set boolean to false
    if (e.target.value === "false") {
      boolean = false;
    }

    // If the input element has files attached (such as a file upload input),
    // update the formData state with the attached files
    if (e.target.files) {
      setformData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    }

    // If the input element does not have files attached, update the formData
    // state with the input element's value, unless it is a boolean, in which
    // case, use the boolean value previously determined
    if (!e.target.files) {
      setformData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  // define a function called submitForm that takes an event object as a parameter
  async function submitForm(e) {
    // prevent the default behavior of the event
    e.preventDefault();
    // set the loading state to true
    setLoading(true);
    // check if the discounted price is greater than or equal to the regular price
    if (discountedprice >= regularprice) {
      // if it is, set the loading state to false and display an error message using a toast
      setLoading(false);
      toast.error("regular price is lower than discounted price");
      // return to exit the function
      return;
    }
    // check if the number of images exceeds six
    if (images.length > 6) {
      // if it does, set the loading state to false and display an error message using a toast
      setLoading(false);
      toast.error("Max of six images are allowed");
      // return to exit the function
      return;
    }

    // define an asynchronous function called storeImage that takes an image parameter
    async function storeImage(image) {
      // return a promise that resolves or rejects based on whether the image is uploaded successfully or not
      return new Promise((resolve, reject) => {
        // get the storage object
        const storage = getStorage();
        // create a unique filename for the image that includes the user ID, image name, and a UUID
        const filename = ` ${auth.currentUser.uid}-${image.name}-${uuidv4()} `;
        // create a storage reference to the file
        const storageRef = ref(storage, filename);
        // upload the file using the storage reference and create an upload task
        const uploadtask = uploadBytesResumable(storageRef, image);

        // listen to state changes of the upload task
        uploadtask.on(
          "state_changed",
          (snapshot) => {
            // calculate the upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            // log the state of the snapshot
            switch (snapshot.state) {
              case "paused":
                console.log("paused");
                break;
              case "running":
                console.log("uploading");
                break;
            }
          },
          // handle errors during the upload
          (error) => {
            reject(error);
          },
          // resolve the promise once the upload is complete and get the download URL of the uploaded file
          () => {
            getDownloadURL(uploadtask.snapshot.ref).then((downloadUrl) => {
              resolve(downloadUrl);
            });
          }
        );
      });
    }

    // This code uploads multiple images to a server using the storeImage() function
    // and Promise.all()

    // Use Promise.all() to execute storeImage() on each image in the images array.
    // This will create an array of Promises.
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    )
      // If there is an error during the Promise.all() execution, the catch block will be triggered.
      .catch((error) => {
        setLoading(false); // stop the loading spinner
        toast.error("Images not uploaded"); // display an error message to the user
        return; // return nothing
      });

    // This code creates a copy of the form data with additional fields, such as image URLs and a timestamp.
    const formDataCopy = {
      ...formData,
      imgUrls, // Add the image URLs from the previous Promise.all() call
      timestamp: serverTimestamp(), // Add a timestamp from the server
      userRef: auth.currentUser.uid, // Add the current user's UID
    };

    // Remove unnecessary fields from the copied form data object.
    delete formDataCopy.images; // Remove the images array, as we already uploaded them
    !formDataCopy.offer && delete formDataCopy.discountedprice; // Remove the discounted price if there's no offer
    delete formDataCopy.latitude; // Remove the latitude field
    delete formDataCopy.longitude; // Remove the longitude field

    // update the form data copy to the document in the "listings" collection in Firestore.
    const docref = doc(db, "listings",params.listingId)
    const docRef = await updateDoc(docref,formDataCopy);

    // Stop the loading spinner and display a success message to the user.
    setLoading(false);
    navigate('/')
    toast.success("Listing edited");
  }

  // if the loading state is true, display a spinner
  if (loading) {
    return <Spinner />;
  }

  return (
    <main class="max-w-md px-2 mx-auto">
      <h1 class="text-3xl text-center mt-6 font-bold">Edit Listing</h1>

      <form action="" onSubmit={submitForm}>
        <p class="text-lg mt-6 font-semibold">sell or rent</p>
        <div class="flex space-x-6 mx-auto ">
          <button
            onClick={onChange}
            type="button"
            id="type"
            value="sale"
            class={`px-16 py-3 font-medium text-sm  
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${type === "rent" ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            sell
          </button>
          <button
            onClick={onChange}
            type="button"
            id="type"
            value="rent"
            class={`px-16 py-3 font-medium text-sm 
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${type === "sale" ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            rent
          </button>
        </div>
        <p class="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength="32"
          minLength="3"
          required
          class="w-full text-gray-900 bg-white border rounded-md
         py-2 px-4 transition duration-150 ease-in-out focus:shadow-lg 
          focus:bg-white hover:shadow-lg active:bg-slate-800
          focus:text-slate-900 

         "
        />
        <div class=" flex space-x-20">
          <div class="">
            <p class="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              class="px-4 py-2 text-gray-800 bg-white rounded-md transition duration-150 ease-in-out
                text-center w-full
    
              "
            />
          </div>
          <div class="">
            <p class="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="30"
              required
              class="px-4 py-2 text-gray-800 bg-white rounded-md transition duration-150 ease-in-out
                        text-center w-full
            "
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            no
          </button>
        </div>
        <p class="text-lg mt-6 font-semibold">furnished</p>
        <div class="flex space-x-6 mx-auto ">
          <button
            onClick={onChange}
            type="button"
            id="furnished"
            value={true}
            class={`px-16 py-3 font-medium text-sm  
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${!furnished ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            yes
          </button>
          <button
            onClick={onChange}
            type="button"
            id="furnished"
            value={false}
            class={`px-16 py-3 font-medium text-sm 
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${furnished ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            No
          </button>
        </div>
        <p class="text-lg mt-6 font-semibold">Adress</p>
        <textarea
          type="text"
          id="adress"
          value={adress}
          onChange={onChange}
          placeholder="Name"
          required
          class="w-full text-gray-900 bg-white border rounded-md
         py-2 px-4 transition duration-150 ease-in-out focus:shadow-lg 
          focus:bg-white hover:shadow-lg active:bg-slate-800
          focus:text-slate-900 resize-none

         "
        />

        <p class="text-lg mt-6 font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Name"
          required
          class="w-full text-gray-900 bg-white border rounded-md
         py-2 px-4 transition duration-150 ease-in-out focus:shadow-lg 
          focus:bg-white hover:shadow-lg active:bg-slate-800
          focus:text-slate-900 resize-none

         "
        />
        <p class="text-lg mt-6 font-semibold">Offer</p>
        <div class="flex space-x-6 mx-auto ">
          <button
            onClick={onChange}
            type="button"
            id="offer"
            value={true}
            class={`px-16 py-3 font-medium text-sm  
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${!offer ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            yes
          </button>
          <button
            onClick={onChange}
            type="button"
            id="offer"
            value={false}
            class={`px-16 py-3 font-medium text-sm 
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${offer ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            No
          </button>
        </div>
        <div class="mt-3">
          <p class="text-lg font-semibold">Regular price</p>
          <div class="mt-2 flex items-center">
            <div>
              <input
                type="number"
                id="regularprice"
                value={regularprice}
                onChange={onChange}
                min="1000"
                max="400000000"
                className="
                    w-full px-4 py-4  text-gray-600 bg-white rounded-md
                    transition duration-150 ease-in-out focus:shadow-lg
                    
                    "
              />
            </div>
            {type === "rent" && (
              <div>
                <p class=" text-xl font-semibold whitespace-nowrap ">
                  $ / month
                </p>
              </div>
            )}
          </div>
        </div>

        {offer && (
          <div class="mt-3">
            <p class="text-lg font-semibold">Discounted price</p>
            <div class="mt-2 flex items-center">
              <div>
                <input
                  type="number"
                  id="discountedprice"
                  value={discountedprice}
                  onChange={onChange}
                  min="1000"
                  max="400000000"
                  className="
                        w-full px-4 py-4  text-gray-600 bg-white rounded-md
                        transition duration-150 ease-in-out focus:shadow-lg
                        
                        "
                />
              </div>
              {type === "rent" && (
                <div>
                  <p class=" text-xl font-semibold whitespace-nowrap ">
                    $ / month
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div class="mt-6">
          <p class="text-lg font-semibold">Images</p>
          <p class="text-gray-600">First Image will be the cover(max of 6)</p>
          <input
            multiple
            required
            onChange={onChange}
            accept=".jpg , .png , .jpeg"
            type="file"
            id="images"
            class="w-full px-3 py-1.5 text-gray-700 bg-white border rounded-md 
        transition duration-150 ease-in-out focus:bg-slate-500 focus:shadow-lg
        "
          />
        </div>
        <button
          type="submit"
          class="mb-6 w-full bg-blue-600 text-yellow-50 font-semibold
        shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700
        rounded-md  active:bg-blue-900 transition duration-150 py-5 px-4 mt-6 ease-in-out
        "
        >
          Edit Listing
        </button>
      </form>
    </main>
  );
}
