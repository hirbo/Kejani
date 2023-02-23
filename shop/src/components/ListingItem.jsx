import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationPin } from "react-icons/md";
function ListingItem({ listing, id }) {
  return (
    <li class="bg-white flex flex-col justify-between items-center shadow-md
              hover:shadow-lg rounded-md overflow-hidden transition-shadow duration-150

              ">
      <Link to={`/category/${listing.type}/${id}`} />
      <img src={listing.imgUrls[0]} alt="" />
      <Moment fromNow>{listing.timestamp?.toDate()}</Moment>
      <div>
        <MdLocationPin />
        {listing.adress}
        <div>
          {listing.name}
          <p>
            ${listing.offer ? listing.discountedprice : listing.regularprice}
            {listing.type === "rent" && "/mpnth"}
          </p>
        </div>
      </div>
      <div>
        <div>
          <p>
            {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : "1 bed"}
          </p>
        </div>
        <div>
          <p>
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}
          </p>
        </div>
      </div>
    </li>
  );
}

export default ListingItem;
