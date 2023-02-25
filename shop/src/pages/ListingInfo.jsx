import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
        autoplay={{ delay: 300 }}
      >
      {listing.imgUrls.map((url,index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full overflow-hidden h-[300px]"
          style={{background: `url(${listing.imgUrls[index]})center no-repeat`,backgroundSize:'cover'}}
          >
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </main>
  );
}

export default ListingInfo;
