import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import { db } from '../FirebaseConfig';

function Category() {
  const [offerlist,setOfferList]  = useState([]);
  const [loading,setLoading] = useState(true);
  const params = useParams();

useEffect(()=>{
 async function fetchOffers (){
  
  const ref = collection(db,'listings');
  const q = query(ref,where('type' , '==', params.type ),orderBy('timestamp','desc'));
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
    <div class=' flex flex-col items-center justify-center mx-autoex grid-col-3'>
       <div class='grid grid-cols-4 gap-4'>
      {offerlist.map((offerlist)=>( 
       
           <ListingItem
         id={offerlist.id}
         key={offerlist.id}
         listing={offerlist.data}
         />
       
      ))}
       </div>
    </div>
  )
}

export default Category;