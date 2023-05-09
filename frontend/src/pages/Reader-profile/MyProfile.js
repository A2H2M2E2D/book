import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import {FaUserCircle} from 'react-icons/fa';
import {MdAttachEmail} from 'react-icons/md';
import {MdOutlinePhoneIphone} from 'react-icons/md';
import {GrStatusUnknown} from 'react-icons/gr';
import {RiUserSharedFill} from 'react-icons/ri';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import {BsFillSendPlusFill} from 'react-icons/bs';


import AddRequest from '../manage-request/AddRequest';

export default function MyProfile() {
  const auth = getAuthUser();
  const [myHistiry, setMyHistory] =useState({
    loading: true,
    result: [],
    err: null,
    reload: 0,

});

useEffect(() => {
    setMyHistory({...myHistiry, loading: true}) ;
    axios.get("http://localhost:3000/book/showMyHistory"
  ,{
      headers: {
        token: auth.token ,
      }
    }
    )
     .then((resp) =>{
        setMyHistory({...myHistiry, result: resp.data, loading: false, err: null}); 
       
     })
     .catch((err) => {
        setMyHistory({...myHistiry, loading: false,
         err:"Somrthing went wrong , PLEASE try again later !!",
        }); 
       
     });
   },[myHistiry.reload]);


  const [reader, setReader] =useState({
    loading: true,
    result: null,
    err: null,
});

// to show user profile details 
useEffect(() => {
  setReader({...reader, loading: true}) ;
  axios.get("http://localhost:3000/book/showUser"
,{
    headers: {
      token: auth.token ,
    }
  }
  )
   .then((resp) =>{
    setReader({...reader, result: resp.data, loading: false, err: null}); 
     
   })
   .catch((err) => {
    setReader({...reader, loading: false,
       err:"Somrthing went wrong , PLEASE try again later !!",
      }); 
     
   });
 },[]);


 

  return (
    <div className='book-details-container p-5'>

          {/* loader */}
          {reader.loading === true && (
         <div className='text-center'>
         <Spinner animation="border" role="status">
           <span className="visually-hidden">Loading...</span>
         </Spinner>
         </div>
      )}

        {reader.loading === false && reader.err == null &&(
            <>

          {/* row = 12 column */}
          {/* Reader details */}
          <div className='row'>    
            <div className='col-2'>
              <FaUserCircle size={'90px'} />
            </div>
    
            <div className='col-10' >
            <h3 > {reader.result.name}</h3>
            <p ><RiUserSharedFill size={'22px'}/> : {reader.result.type}</p>
            <p ><MdAttachEmail size={'24px'}/> : {reader.result.email}</p>
            <p ><MdOutlinePhoneIphone size={'23px'}/> : {reader.result.phone}</p>
            <p ><GrStatusUnknown size={'22px'}/> : {reader.result.status}</p>

           
            </div>
    
          </div>


          <hr /> 
          {/* USER HISTORY SEARCH  */}
             {/* <h4 className='text-center bg-dark text-white p-3'>USER HISTORY SEARCH </h4> */}
             <div className='header d-flex justify-content-between mb-5' >
            <h2 className='text-center '>MyHistorySearch</h2>
            <Link to={'/addRequest'} className='btn btn-warning'>
            <BsFillSendPlusFill size='2rem'/> Add Request</Link>
            </div> 

              <Alert  variant='info' className='p-3'>
                   " NOTE : You need to know that 1 for ACCEPT and 0 for DECLINE and -1 for WAITING"
             </Alert>

            <div className='p-4'>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {/* <th>Book_id</th> */}
          <th>Requested Book</th>
          <th>Request Status</th>
        </tr>
      </thead>
      <tbody>
      {myHistiry.result.map((myHisto) =>(
        <tr key={myHisto.id}>
          <td>
          {/* {chapter.id} */}
          </td>
          {/* <td>{book.id}</td> */}
          <td>{myHisto.book_name}</td>
          <td>{myHisto.status}</td>
        </tr>
          ))}
 
       
      </tbody>
    </Table>
    
</div>
               
        
        
    

    </>
        )}
          

          {/* error handling   ==> if it found err after loading*/} 
          {reader.loading === false && reader.err != null &&(
           <Alert  variant='danger' className='p-2'>
             {reader.err}
            </Alert>
         )}

          </div>

        
  )
}
