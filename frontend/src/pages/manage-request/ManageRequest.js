import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
// import '../../css/manageReader.css';
import { Link } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
import {BsSendPlusFill} from 'react-icons/bs';
import {BsFillSendCheckFill} from 'react-icons/bs';
import {BsSendXFill} from 'react-icons/bs';
import axios from 'axios';
import { getAuthUser } from '../../healper/Storage';
import {MdCancelScheduleSend} from 'react-icons/md';
import { useParams } from 'react-router-dom';


export default function ManageRequest() {
  // let {id} = useParams();
  const auth = getAuthUser();
  const [requests, setRequests] =useState({
    loading: true,
    results: [],
    status:'',
    err: null,
    reload: 0
});

useEffect(() => {
  setRequests({...requests, loading: true}) ;
  axios.get("http://localhost:3000/book/showHistory",{
    headers:{
      token: auth.token,
    },
  })
   .then((resp) =>{
    setRequests({...requests, results: resp.data, loading: false, err: null}); 
   })
   .catch((err) => {
    setRequests({...requests, loading: false, err:"Somrthing went wrong , PLEASE try again later !!"}); 
     
   });
 },[requests.reload]);

 const deleteRequest = (id) => {
  axios.delete("http://localhost:3000/book/deletereq/"+ id ,{
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

const acceptRequest = (id) => {
  // e.preventDefault();
  setRequests({...requests, loading:true, err:[]});
  axios.patch("http://localhost:3000/book/accept/"+id,{
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

const declineRequest = (id) => {
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
    <div className='manage-reader p-5'>
    <div className='header d-flex justify-content-between mb-5' >
    <h2 className='text-center '>MANAGE Requests</h2>
    <Link to={'request'} className='btn btn-warning'>
      <BsSendPlusFill size={'24px'}/> Make Request</Link>
    </div>

    {/* <Alert  variant='danger' className='p-2'>
  This is simple alert!
   </Alert>

    <Alert  variant='success' className='p-2'>
  This is simple alert!
    </Alert> */}
    
<Table striped bordered hover >
  <thead>
    <tr>
      <th>#</th>
      <th>Reader Name</th>
      <th>Book Name</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>

  {requests.results.map((request) =>(
    <tr key={request.id}>
      <td>{request.id}</td>
      <td>{request.user_name}
      </td>
      <td>{request.book_name}</td>
      <td>
        {/* <Link to={'/acept'} className='btn btn-sm btn-success '>
         <BsFillSendCheckFill size={'18px'}/>  Accept</Link> */}

         <button className='btn btn-sm btn-success mx-1'
                         onClick={(id) => {acceptRequest(request.id)}}
                >
                 <BsFillSendCheckFill size={'18px'}/>  Accept</button>
   
        {/* <Link to={'/decline'} className='btn btn-sm btn-warning mx-5 '>
        <BsSendXFill size={'20px'}/>  Decline</Link> */}

              <button className='btn btn-sm btn-warning mx-1'
                         onClick={(e) => {declineRequest(request.id)}}
                                       >
                 <BsSendXFill size={'20px'}/>  Decline</button>

        <button className='btn btn-sm btn-danger mx-1'
                         onClick={(e) => {deleteRequest(request.id)}}
                >
                 <MdCancelScheduleSend size={'20px'}/>  delete</button>
      </td>
    </tr>
   ))}


   


  </tbody>
</Table>


</div>
)
}
