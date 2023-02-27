import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../FirebaseConfig';

function Offers() {
  const [offerlist,setOfferList]  = useState([]);
  const [loading,setLoading] = useState(true);

useEffect(()=>{
 async function fetchOffers (){

  const ref = collection(db,'listings');
  const q = query(ref,where('offer' , '==', true ),orderBy('timestamp','desc'));
  const qsnap = await getDocs(q);
  let list = [];

  
  try{
    qsnap.forEach((doc)=>{
      return list.push({
        id:doc.id,
        data:doc.data()
      })
    })
    setOfferList(list);
    
    setLoading(false);

  }catch(err){
    console.log(err);
  }
 }
 fetchOffers();
},[])
if (loading){
return <Spinner/>
}
  return (
    <div class='flex grid-col-4 justify-center items-center mt-6 space-x-5'>
      {offerlist.map((offerlist)=>( 
        <div>
           <ListingItem
         id={offerlist.id}
         key={offerlist.id}
         listing={offerlist.data}
         />
        </div>
      ))}
    </div>
  )
}

export default Offers