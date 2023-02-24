import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationPin } from "react-icons/md";
function ListingItem({ listing, id }) {
  return (
    <li
      class="relative   bg-white flex flex-col justify-between items-center shadow-md
              hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-1

              "
    >
      <Link to={`/category/${listing.type}/${id}`} />
      <img
        className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
        loading="lazy"
        src={listing.imgUrls[0]}
      />
      <Moment
        class="absolute top-2 left-2 text-yellow-100
             bg-amber-500 rounded-md py-1 px-2 text-sm font-semibold  "
        fromNow
      >
        {listing.timestamp?.toDate()}
      </Moment>
      <div class="w-full p-[10px]">
        <div class="flex items-center space-x-1">
          <MdLocationPin class="h-4 w-4" />
          <p class="font-semibold text-sm truncate">{listing.adress}</p>
        </div>

        <p class="font-semibold font-sans text-lg mt-1">{listing.name}</p>
        <p class=" font-semibold text-lg mt-1 ">
          ${listing.offer ? listing.discountedprice : listing.regularprice}
          {listing.type === "rent" && "/mpnth"}
        </p>
        <div class='flex w-full  space-x-12 mt-1' >
          <div>
            <p class="font-semibold font-sans text-lg">
              {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : "1 bed"}
            </p>
          </div>
          <div>
            <p class="font-semibold font-sans text-lg">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ListingItem;
