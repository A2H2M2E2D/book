import React from 'react';
import { useParams } from 'react-router-dom';


export default function DeclineRequest() {
    const declineRequest = (e) => {
        // e.preventDefault();
        setRequests({...requests, loading:true, err:[]});
        axios.patch("http://localhost:3000/book/decline/"+ id,{
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
    <div>DeclineRequest</div>
  )
}
