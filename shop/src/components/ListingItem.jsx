import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationPin } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { getAuth } from "firebase/auth";









const auth = getAuth();



const navigate =useNavigate


function ListingItem({ listing, id,onDelete,onEdit }) {




  return (<>
   
    <div
      class="relative  bg-y  flex flex-col justify-between items-center shadow-md
              hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-1
              bg-opacity-50 backdrop-blur-3xl backdrop-filter backdrop-saturate-150 backdrop-contrast-200 
              "
             
    > <Link  to={`/pages/listinginfo/${listing.type}/${listing.userRef}`}>
       
       <img
        
        className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
        loading="lazy"
        src={listing.imgUrls[0]}
      />
      <div>info</div>
      </Link>
     
      <Moment
        class="absolute top-2 left-2 text-yellow-100
             bg-amber-500 rounded-md py-1 px-2 text-sm font-semibold  "
        fromNow
      >
        {listing.timestamp?.toDate()}
      </Moment>
      <div class="w-full p-[10px]">
        <div class="flex items-center space-x-1">
          <MdLocationPin class="h-4 w-4 text-emerald-900" />
          <p class="font-semibold text-sm truncate">{listing.adress}</p>
        </div>

        <p class="font-semibold font-sans text-lg mt-1">{listing.name}</p>
        <p class=" font-semibold text-lg mt-1 ">
          ${listing.offer ? listing.discountedprice : listing.regularprice}
          {listing.type === "rent" && "/mpnth"}
        </p>
        <div class="flex w-full  space-x-8 mt-1">
          <div>
            <p class="font-semibold font-sans text-lg">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : "1 bed"}
            </p>
          </div>
          <div>
            <p class="font-semibold font-sans text-lg">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}
            </p>
          </div>
        </div>
      </div>
      <div class=''>
       {auth?.currentUser?.uid === listing.userRef ? <>
        <MdDelete
       class= ' hover:text-red-700 h-7 w-6 absolute bottom-2 right-2 cursor-pointer text-red-600 ' 
        onClick={onDelete}
        />
     
       
        <MdEdit
       class=' hover:text-blue-700 text-lg h-7 w-6 absolute bottom-2 right-8  cursor-pointer text-blue-600   ' 
       onClick={onEdit}
        />
       </> :<></>}
       
      
      </div>
     
     
      
    </div>
    
    </>
    
    
  );
}

export default ListingItem;
