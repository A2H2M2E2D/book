import React, { useEffect, useState } from 'react';
import '../../css/bookDetails.css';
import ReviewBook from '../../components/ReviewBook';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Chapter from '../manage-books/Chapter';
import {BsFiletypePdf} from 'react-icons/bs';
import Table from 'react-bootstrap/Table';
import { getAuthUser } from '../../healper/Storage';
import generatePDF from '../../healper/generatePDF';



export default function BookDetails() {
  const auth = getAuthUser();
  let {id} = useParams();
  const [chapters, setChapters] =useState({
    loading: true,
    result: [],
    err: null,
    reload: 0,

});
useEffect(() => {
  setChapters({...chapters, loading: true}) ;
  axios.get("http://localhost:3000/book/showBookChapter/" +id ,
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


  const [book, setBook] =useState({
    loading: true,
    result: null,
    err: null,
});

useEffect(() => {
  setBook({...book, loading: true}) ;
  axios.get("http://localhost:3000/book/show/"+id ,{
    headers: {
      token: auth.token ,
    }
  })
   .then((resp) =>{
    setBook({...book, result: resp.data, loading: false, err: null}); 
   })
   .catch((err) => {
  setBook({...book, loading: false, err:"Somrthing went wrong , PLEASE try again later !!",}); 
     
   });
 },[]);


  return (
    <div className='book-details-container p-5'>
      
           {/* loader */}
           {book.loading === true && (
         <div className='text-center'>
         <Spinner animation="border" role="status">
           <span className="visually-hidden">Loading...</span>
         </Spinner>
         </div>
      )}

          {/* list books */}
        {book.loading === false && book.err == null &&(
           <>
      {/* row = 12 column */}
      {/* book details */}
      <div className='row'>    
      <div className='col-3'>
        <img  className='book-image' 
              src={book.result.image_url}
              alt={book.result.name}
        />
      </div>

      <div id='bookPdf' className='col-9'>
        <h2 >{book.result.name}</h2>
        <h4 >{book.result.author}</h4>
        <p>{book.result.description}</p>
        <p >{book.result.field}</p>
        <p >{book.result.publicationDate}</p>
        </div>

          {/* { auth && auth.status === 1 &&( */}
            
            
           {/* )} */}
          

    </div>
    <div className='header d-flex justify-content-between mb-5' >
    <button size="sm"  className='btn btn-success m-3' onClick={() => generatePDF('bookPdf',book.result.name)}>
            <BsFiletypePdf size={'24px'}/>  PDF</button>
    </div>
          
    <hr />
    {/* Book Chapters  */}
    
      <h4 className='text-center bg-dark text-white p-3'>BOOK Chapters </h4>
<div className='p-4'>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {/* <th>Book_id</th> */}
          <th>Chapter title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {chapters.result.map((chapter) =>(
        <tr key={chapter.id}>
          <td>
          {/* {chapter.id} */}
          </td>
          {/* <td>{book.id}</td> */}
          <td>{chapter.title}</td>
          <td>{chapter.description}</td>
        </tr>
          ))}
 
       
      </tbody>
    </Table>

</div>
      
       
     </>
        )}

         {/* error handling   ==> if it found err after loading*/} 
         {book.loading === false && book.err != null &&(

          <Alert  variant='danger' className='p-2'>
             {book.err}
          </Alert>
)}



      
      </div>
  )
}
