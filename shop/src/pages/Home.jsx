import { collection, getDocs, limit, orderBy,query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { db } from "../FirebaseConfig";
import ListingItem from "../components/ListingItem";

function Home() {
  const [OfferList, setOfferList] = useState([]);

  useEffect(() => {
    async function fetchOfferListing() {
      try {
        const ref = collection(db, "listings");
        const q = query(
          ref,
          where("offer", "==", true ),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap =await  getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          });
        });
          setOfferList(listings)
          


      } catch (err) {
        console.log(err);
      }
    }
    fetchOfferListing()
  },[]);

  const [RentList, setRentList] = useState([]);
  useEffect(() => {
    async function fetchRentListing() {
      try {
        const ref = collection(db, "listings");
        const q = query(
          ref,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap =await  getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          });
        });
          setRentList(listings)
         


      } catch (err) {
        console.log(err);
      }
    }
    fetchRentListing()
  },[]);


  const [SaleList, setSaleList] = useState([]);
  useEffect(() => {
    async function fetchRentListing() {
      try {
        const ref = collection(db, "listings");
        const q = query(
          ref,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap =await  getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          });
        });
          setSaleList(listings)
          


      } catch (err) {
        console.log(err);
      }
    }
    fetchRentListing()
  },[]);

  return<>
  <div>
  <Slider />
  </div>
  
  
  
  {OfferList.length > 0 ? 
    <div class='max-w-6xl mx-auto pt-2 h-[500px] space-y-6  mt-5 '>
    <p class = 'text-2xl font-semibold mt-6 ml-10 '>Recent Offers</p>
     <Link to='/pages/offers' class = 'text-sm font-semibold mt-1 ml-10  text-blue-600 '>
      Show more offers
      </Link>
      <div class='flex grid-col-4 justify-center items-center mt-6 space-x-5'>
      {OfferList.map((offerlist)=>( 
        <div>
           <ListingItem
         id={offerlist.id}
         key={offerlist.id}
         listing={offerlist.data}
         />
        </div>
      ))}
    </div>
    </div>
   :<></>
   }
  {RentList.length > 0 ? 
    <div class='max-w-6xl mx-auto pt-4 space-y-6  mt-5 '>
    <p class = 'text-2xl font-semibold mt-6 ml-10 '>Places For Rent</p>
     <Link to='/pages/rent' class = 'text-sm font-semibold mt-1 ml-10  text-blue-600 '>
      Show more 
      </Link>
      <div class='flex grid-col-4 justify-center items-center mt-6 space-x-5'>
      {RentList.map((rentlist)=>( 
        <div>
           <ListingItem
         id={rentlist.id}
         key={rentlist.id}
         listing={rentlist.data}
         />
        </div>
      ))}
    </div>
    </div>
   :<></>
   }
  {SaleList.length > 0 ? 
    <div class='max-w-6xl mx-auto pt-4 space-y-6  mt-5 '>
    <p class = 'text-2xl font-semibold mt-6 ml-10 '>Places For Sale</p>
     <Link to='/pages/sale' class = 'text-sm font-semibold mt-1 ml-10 text-blue-600 '>
      Show more 
      </Link>
      <div class='flex grid-col-4 justify-center items-center mt-6 space-x-5'>
      {SaleList.map((salelist)=>( 
        <div>
           <ListingItem
         id={salelist.id}
         key={salelist.id}
         listing={salelist.data}
         />
        </div>
      ))}
    </div>
    </div>
   :<></>
   }
  </>
}

export default Home;
