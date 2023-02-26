import React from 'react'

import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner';
import { db } from '../FirebaseConfig'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore,{EffectFade,Autoplay,Navigation,Pagination} from 'swiper'
import 'swiper/css/bundle';

function Slider() {
  const [listings,setListings] = useState();
const [loading,setLoading] = useState(true);
const navigate = useNavigate()
 SwiperCore.use(Autoplay,Navigation,Pagination)

    useEffect(()=>{
        async function fetchListings (){
            const ref = collection(db,'listings');
            const q = query(ref,orderBy('timestamp',"desc"),limit(5));
            const snap =await getDocs(q);
            let listings = [];
            snap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            setListings(listings);
            console.log(listings);
           setLoading(false)
        }
        fetchListings()
    },[]);

    
    if (loading){
       return  <Spinner/>
    }
    if (listings.length === 0 ){
      return<></>
    }
   return (  
    listings && 
       <>
 <Swiper
 slidesPerView={1}
 pagination={{type:'progressbar'}}
 effect='fade'
 modules={[EffectFade]}
 autoplay={{delay:3000}}
 >
 {listings.map((listing) => ( 
    <SwiperSlide key={listing.id} >
      <Link to={`/pages/listinginfo/${listing.id}`}>
        <div style={{background:`url(${listing.data.imgUrls[0]}) center, no-repeat `,
        backgroundsize:'cover' 
      }}
      class='w-full h-[300px] overflow-hidden'
      > <div class='p-3'>
        <p className='text-white bg-emerald-700 w-[150px]  
                        text-center font-semibold rounded-md
                        tracking-[1px] '>
      {listing.data.name}
    </p>
      </div>
      </div>
     
      </Link>
    </SwiperSlide>
  ))}
 </Swiper>
  </>
  
  
  )
}

export default Slider