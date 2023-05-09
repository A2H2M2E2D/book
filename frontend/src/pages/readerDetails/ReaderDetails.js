import React, { useEffect, useState } from 'react';
import '../../css/readerDetails.css';
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


export default function ReaderDetails() {
  const auth = getAuthUser();
  let {id} = useParams();
  const [reader, setReader] =useState({
    loading: true,
    result: null,
    err: null,
});

useEffect(() => {
  setReader({...reader, loading: true}) ;
  axios.get("http://localhost:3000/book/show_users/"+id
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
          {/* Book Reviews  */}
             <h4 className='text-center bg-dark text-white p-3'>USER HISTORY SEARCH </h4>
         {/*  <ReviewBook />
           <ReviewBook />
           <ReviewBook /> */}
    

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
