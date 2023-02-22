import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setformData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking:false,
    furnished:false,
    adress:"",
    description:"",
    offer:true,
    regularprice:0,
    discountedprice:0
  });

  const {offer,
        description,
        discountedprice,
        adress,
        parking,
        furnished,
        bedrooms, 
        bathrooms,
        regularprice,
            type,
            name } = formData;
  function onChange() {}

  return (
    <main class="max-w-md px-2 mx-auto">
      <h1 class="text-3xl text-center mt-6 font-bold">Create Listing</h1>

      <form action="">
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
            value="sale"
            class={`px-16 py-3 font-medium text-sm 
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${type === "sell" ? "bg-slate-300" : "bg-slate-600"}
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
            <input type="number"
             id="bedrooms"
              value={bedrooms} 
              onChange={onchange} 
              min='1' 
              max='2' 
              required 
              class='px-4 py-2 text-gray-800 bg-white rounded-md transition duration-150 ease-in-out
              text-center w-full
  
              '/>
              
          </div>
          <div class="">
            <p class="text-lg font-semibold">Baths</p>
            <input 
            type="number" 
            id="bathrooms" value={bathrooms} 
            onChange={onchange}  min='1' max='2' 
            required 
            class='px-4 py-2 text-gray-800 bg-white rounded-md transition duration-150 ease-in-out
                        text-center w-full
            '
            />
          </div>
        </div>
        <p class="text-lg mt-6 font-semibold">Parking Spot</p>
        <div class="flex space-x-6 mx-auto ">
          <button
            onClick={onChange}
            type="button"
            id="parking"
            value={true}
            class={`px-16 py-3 font-medium text-sm  
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${!parking ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            yes
          </button>
          <button
            onClick={onChange}
            type="parking"
            id="type"
            value={false}
            class={`px-16 py-3 font-medium text-sm 
            uppercase shadow-md rounded-md hover:shadow-lg
            active:shadow-lg focus:shadow-lg
            transition  duration-150 ease-in-out
            ${parking ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            No
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
            ${ furnished ? "bg-slate-300" : "bg-slate-600"}
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
            ${ offer ? "bg-slate-300" : "bg-slate-600"}
            `}
          >
            No
          </button>
        </div>
        <div class='mt-3'>
            <p class='text-lg font-semibold'>Regular price</p>
            <div class='mt-2 flex items-center'>
                
                <div>
                    <input
                    type="number"
                    id='regularprice'
                    value={regularprice}
                    onchange={onchange}
                    min='1000'
                    max='400000000'
                    className="
                    w-full px-4 py-4  text-gray-600 bg-white rounded-md
                    transition duration-150 ease-in-out focus:shadow-lg
                    
                    "
                    />
                </div>
                {type === 'rent' &&
                <div>
                    <p class=' text-xl font-semibold whitespace-nowrap '>$ / month</p>
                </div>
                }
            </div>
        </div>


        {offer &&
                <div class='mt-3'>
                <p class='text-lg font-semibold'>Discounted price</p>
                <div class='mt-2 flex items-center'>
                    
                    <div>
                        <input
                        type="number"
                        id='discountedprice'
                        value={discountedprice}
                        onchange={onchange}
                        min='1000'
                        max='400000000'
                        className="
                        w-full px-4 py-4  text-gray-600 bg-white rounded-md
                        transition duration-150 ease-in-out focus:shadow-lg
                        
                        "
                        />
                    </div>
                    {type === 'rent' &&
                    <div>
                        <p class=' text-xl font-semibold whitespace-nowrap '>$ / month</p>
                    </div>
                    }
                </div>
            </div>
        }
       <div class='mt-6'>
        <p class='text-lg font-semibold'>
            Images
        </p>
        <p class='text-gray-600'>
            First Image will be the cover(max of 6)
        </p>
        <input 
        multiple
        required
        onchange={onChange}
        accept='.jpg , .png , .jpeg'
        type="file" 
        id="images"
        class='w-full px-3 py-1.5 text-gray-700 bg-white border rounded-md 
        transition duration-150 ease-in-out focus:bg-slate-500 focus:shadow-lg
        '/>
       </div>
       <button
       type="submit"
       class='mb-6 w-full bg-blue-600 text-yellow-50 font-semibold
        shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700
        rounded-md  active:bg-blue-900 transition duration-150 py-5 px-4 mt-6 ease-in-out
        '
       >
            Create Listing
       </button>
      </form>
    </main>
  );
}
