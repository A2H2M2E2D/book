import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import '../../css/manageReader.css';
import { Link } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
import {FaUserPlus} from 'react-icons/fa';
import {FaUser} from 'react-icons/fa';
import {FaUserTimes} from 'react-icons/fa';
import {FaUserEdit} from 'react-icons/fa';
import axios from 'axios';
import { getAuthUser } from '../../healper/Storage';


export default function ManageReader() {
  const auth = getAuthUser();
  const [readers, setReaders] =useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
});

useEffect(() => {
  setReaders({...readers, loading: true}) ;
  axios.get("http://localhost:3000/book/viewAllUsers",{
    headers:{
      token: auth.token,
    },
  })
   .then((resp) =>{
    setReaders({...readers, results: resp.data, loading: false, err: null}); 
   })
   .catch((err) => {
    setReaders({...readers, loading: false, err:"Somrthing went wrong , PLEASE try again later !!"}); 
     
   });
 },[readers.reload]);

 const deleteReader = (id) => {
  axios.delete("http://localhost:3000/book/delete_user/"+ id ,{
    headers:{
      token: auth.token,
    },
  })
 .then((resp) =>{
  setReaders({...readers ,reload: readers.reload + 1 });
 })
 .catch((err) => {
  setReaders({...readers, loading: false, err:"Somrthing went wrong , PLEASE try again later !!"});    
 });
};




    return (
        <div className='manage-reader p-5'>
            <div className='header d-flex justify-content-between mb-5' >
            <h2 className='text-center '>MANAGE Readers</h2>
            <Link to={'add'} className='btn btn-warning'>
              <FaUserPlus size={'24px'}/> Add New Reader</Link>
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
              {/* <th>Reader Type</th> */}
              <th>Reader Name</th>
              <th>Reader Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

   {readers.results.map((reader) =>(
            <tr key={reader.id}>
              <td>{reader.id}</td>
              {/* <td>{reader.type}</td> */}
              <td>{reader.name}</td>
              <td>{reader.email}</td>
              <td>{reader.phone}</td>
              <td>{reader.status}</td>
              <td>
                <Link to={'/view/'+reader.id} className='btn btn-sm btn-success mx-1'>
                 <FaUser size={'18px'}/>  show</Link>

                <Link to={" "+reader.id} className='btn btn-sm btn-primary mx-1 '>
                <FaUserEdit size={'20px'}/>  update</Link>

                <button className='btn btn-sm btn-danger mx-1'
                         onClick={(e) => {deleteReader(reader.id)}}
                >
                 <FaUserTimes size={'20px'}/>  delete</button>


    
              </td>
            </tr>
   ))}


           


          </tbody>
        </Table>
    
    
        </div>
      )
}
