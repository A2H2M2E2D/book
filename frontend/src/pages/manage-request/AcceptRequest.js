import React from 'react';
import { useParams } from 'react-router-dom';


export default function AcceptRequest() {
  let {id} = useParams();

    
const acceptRequest = (e) => {
    // e.preventDefault();
    setRequests({...requests, loading:true, err:[]});
    axios.patch("http://localhost:3000/book/accept/"+ id,{
      status:requests.status,
    } ,{
      headers:{
        token: auth.token,
      },
    })
   .then((resp) =>{
    setRequests({...requests ,reload: requests.reload + 1 });
   })
   .catch((err) => {
    setRequests({...requests, loading: false, err:"Somrthing went wrong , PLEASE try again later !!"});    
   });
  };
  return (
    <div>AcceptRequest</div>
  )
}
