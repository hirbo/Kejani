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
          console.log(listings);


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
          console.log(listings);


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
          console.log(listings);


      } catch (err) {
        console.log(err);
      }
    }
    fetchRentListing()
  },[]);

  return<>
   <Slider />
  
  
  {OfferList.length > 0 ? 
    <div class='max-w-6xl mx-auto pt-2 h-[500px] space-y-6 bg-yellow-100 mt-5 '>
    <p class = 'text-2xl font-semibold mt-6 ml-10 '>Recent Offers</p>
     <Link to='/pages/offers' class = 'text-sm font-semibold mt-1 ml-10  text-blue-600 '>
      Show more offers
      </Link>
      <div class=' justify-center items-center grid md:grid-cols-3 lg:grid-cols-4 mt-8 '>
      {OfferList.map((list)=>(
        <div>
          <ListingItem
        key={list.id}
        listing={list.data}
        id={list.id}
        />
        </div>
      ))}
      </div>
    </div>
   :<></>
   }
  {RentList.length > 0 ? 
    <div class='max-w-6xl mx-auto pt-4 space-y-6 bg-yellow-100 mt-5 '>
    <p class = 'text-2xl font-semibold mt-6 ml-10 '>Places For Rent</p>
     <Link to='/pages/rent' class = 'text-sm font-semibold mt-1 ml-10  text-blue-600 '>
      Show more 
      </Link>
      <div class=' justify-center items-center grid md:grid-cols-3 lg:grid-cols-4 mt-8  '>
      {RentList.map((list)=>(
        <div>
          <ListingItem
        key={list.id}
        listing={list.data}
        id={list.id}
        />
        </div>
      ))}
      </div>
    </div>
   :<></>
   }
  {SaleList.length > 0 ? 
    <div class='max-w-6xl mx-auto pt-4 space-y-6 bg-yellow-100 mt-5 '>
    <p class = 'text-2xl font-semibold mt-6 ml-10 '>Places For Sale</p>
     <Link to='/pages/sale' class = 'text-sm font-semibold mt-1 ml-10 text-blue-600 '>
      Show more 
      </Link>
      <div class=' justify-center items-center grid md:grid-cols-3 lg:grid-cols-4 mt-8 '>
      {SaleList.map((list)=>(
        <div>
          <ListingItem
        key={list.id}
        listing={list.data}
        id={list.id}
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
