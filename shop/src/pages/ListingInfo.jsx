import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShare, FaBath } from "react-icons/fa";
import { MdBed, MdLocationPin } from "react-icons/md";

import Spinner from "../components/Spinner";
import { db } from "../FirebaseConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
function ListingInfo() {
  const params = useParams();
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use(Autoplay, Navigation, Pagination);
  useEffect(() => {
    // Define an async function called fetchListing to fetch data from Firestore
    async function fetchListing() {
      // Create a reference to the "listings" collection in Firestore with the specific listingId parameter
      const docRef = doc(db, "listings", params.listingId);
      // Get a snapshot of the data at the specified document reference
      const docSnap = await getDoc(docRef);
      // If the snapshot exists, set the listing state with the data from the snapshot
      if (docSnap.exists()) {
        setListing(docSnap.data());
        // Set loading state to false to indicate that the data has been fetched
        setLoading(false);
      } else {
        // Handle the case where the snapshot does not exist
      }
    }
    // Call the fetchListing function when the component mounts or the listingId parameter changes
    fetchListing();
  }, [params.listingId]);

  // If the data is still loading, display a loading spinner
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        class="fixed top-[13%] right-[3%] z-10
                   bg-white cursor-pointer border-2
                    border-gray-400 rounded-full w-12 h-12 
                    flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied");
        }}
      >
        <FaShare class="text-lg text-slate-600" />
      </div>
      <div class="flex flex-col md:flex-row p-10 space-x-16 h-[600px] mt-20 ml-20 mr-20 mb-10 bg-white rounded-md shadow-lg">
        <div class="w-[600px] h-[300px] bg-gray-200 rounded-md">
          <img
            src={listing.imgUrls[0]}
            alt="{listing.name}"
            class="object-cover w-full h-full rounded-md"
          />
        </div>
        <div class="w-[600px] h-[300px]">
          <h2 class="text-3xl font-semibold mb-4">{listing.name}</h2>
          {listing.type === "sale" ? (
            <p class=" bg-green-700 w-24 p-2 text-white font-semibold text-2-xl rounded-md ">
              For Sale
            </p>
          ) : (
            <p class=" bg-blue-700 w-24 p-2 text-white font-semibold text-2-xl rounded-md ">
              For rent
            </p>
          )}
          <h2 class="text-2xl font-semibold mb-4 flex  items-center mt-3">
            <MdLocationPin class=" text-green-700 " />
            {listing.adress}
          </h2>
          <h2 class="text-3xl font-semibold mb-4">{listing.landlordcontact}</h2>
          <p class="text-lg mb-4">{listing.description}</p>
          <div class="flex flex-row space-x-20 items-center mb-4">
            <p class="text-gray-600  font-bold">
              {listing.bedrooms}
              <>
                <MdBed class="text-red-600" /> Beds
              </>
            </p>
            <p class="text-gray-600 font-bold">
              {listing.bathrooms}
              <FaBath class="text-blue-600" />
              baths
            </p>

            <div class="text-gray-600 font-bold flex tracking-[1px]">
              
              <p class="text-blue-600">{listing.size}</p> sqft
            </div>
          </div>
          <div class="flex flex-row space-x-28 mb-4 items-center">
            <p class="text-gray-600">
              {listing.parking ? (
                <p class="text-green-800 text-2xl  font-semibold">
                  Parking available{" "}
                </p>
              ) : (
                <p class="text-red-800 text-2xl  font-semibold">
                  {" "}
                  No Parking available{" "}
                </p>
              )}
            </p>
            <p class="text-gray-600">
              {listing.furnished ? (
                <p class="text-green-800 text-2xl  font-semibold">Furnished </p>
              ) : (
                <p class="text-red-800 text-2xl  font-semibold">
                  Not Furnished
                </p>
              )}{" "}
            </p>
          </div>
          {listing.offer ? (
            <p class=" bg-red-700 w-24 p-2 text-white font-semibold text-2-xl rounded-md ">
              On offer
            </p>
          ) : (
            <p class=" bg-blue-700  p-2 text-white font-semibold text-2-xl rounded-md w-[120px] whitespace-nowrap ">
              Regular Price
            </p>
          )}

          <div class="flex items-center  ">
            {listing.offer ? (
              <div class="flex flex-row justify-between items-center space-x-10">
                <div>
                  <p class="text-gray-600">Regular price</p>
                  <p class="text-2xl font-semibold text-red-600">
                    ${listing.regularprice}
                    {listing.type === "rent" ? <>/Month </> : <></>}
                  </p>
                </div>
                <div>
                  <p class="text-gray-600">Discounted price</p>
                  <p class="text-2xl font-semibold text-green-600">
                    ${listing.discountedprice}
                    {listing.type === "rent" ? <>/Month </> : <></>}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                
                <p class="text-2xl font-semibold text-blue-600 comm ">
                  ${listing.regularprice}
                  {listing.type === "rent" ? <>/Month </> : <></>}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ListingInfo;
