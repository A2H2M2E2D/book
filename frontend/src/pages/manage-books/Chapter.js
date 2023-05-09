import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAuthUser } from '../../healper/Storage';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {TbPlaylistAdd} from 'react-icons/tb';
import {MdEditNote} from 'react-icons/md';
import {CgPlayListRemove} from 'react-icons/cg';

// import Button from 'react-bootstrap/Button';
// import { useParams } from 'react-router-dom';
// import Spinner from 'react-bootstrap/Spinner';
// import Alert from 'react-bootstrap/Alert';



export default function Chapter() {
  const auth = getAuthUser();
  // let {id} = useParams();
  const [chapters, setChapters] =useState({
    loading: true,
    result: [],
    err: null,
    reload: 0,

});
useEffect(() => {
  setChapters({...chapters, loading: true}) ;
  axios.get("http://localhost:3000/book/showChapter",
  {
    headers: {
      token: auth.token ,
    }
  }
  )
   .then((resp) =>{
    setChapters({...chapters, result: resp.data, loading: false, err: null}); 
   })
   .catch((err) => {
    setChapters({...chapters, loading: false, err:"Somrthing went wrong , PLEASE try again later !!",
  }); 
   });
 },[chapters.reload]);

 const deleteChapter = (id) => {
  axios.delete("http://localhost:3000/book/deleteChapter/"+ id ,{
    headers:{
      token: auth.token,
    },
  })
 .then((resp) =>{
  setChapters({...chapters ,reload: chapters.reload + 1 });
 })
 .catch((err) => {
  setChapters({...chapters, loading: false, err:"Somrthing went wrong , PLEASE try again later !!"});    
 });
};


  return (
    <>

     {/* Book Chapters  */}
     <div className='manage-chapter p-5'>
    <div className='header d-flex justify-content-between mb-5' >
    <h2 className='text-center '>MANAGE Chapters</h2>
    <Link to={'addchapter'} className='btn btn-warning'>
    <TbPlaylistAdd size={'24px'}/>   Add New chapter</Link>
    </div>


           <Table striped bordered hover>
           <thead>
             <tr>
               <th>#</th>
               {/* <th>Book_id</th> */}
               <th>Chapter title</th>
               <th>Description</th>
               <th>Actions</th>

             </tr>
           </thead>
           <tbody>


           {chapters.result.map((chapter) =>(
             <tr key={chapter.id}>
               <td>
               {chapter.id}
               </td>
               {/* <td>{book.id}</td> */}
               <td>{chapter.title}</td>
               <td>{chapter.description}</td>
               <td>
                 
               <Link to={""+chapter.id} size="lg" className='btn btn-sm btn-primary mx-3'>
                <MdEditNote size={'24px'}/>  update</Link>

               <button size="lg" className='btn btn-sm btn-danger mx-3 ' 
                   onClick={(e) => {deleteChapter(chapter.id)}}>
                <CgPlayListRemove size={'24px'} />    delete</button>


               </td>

             </tr>
               ))}
      
            
           </tbody>
         </Table>
     </div>
     </>
    
    )  
}
