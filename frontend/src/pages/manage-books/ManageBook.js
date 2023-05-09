import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import '../../css/manageBook.css';
import { Link } from 'react-router-dom';
import {FaRegEdit} from 'react-icons/fa';
import {MdDeleteSweep} from 'react-icons/md';
import {FaBookReader} from 'react-icons/fa';
import {BiBookAdd} from 'react-icons/bi';
import axios from 'axios';
import { getAuthUser } from '../../healper/Storage';


export default function ManageBook() {
  const auth = getAuthUser();
  const [books, setBooks] =useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
});


useEffect(() => {
  setBooks({...books, loading: true}) ;
  axios.get("http://localhost:3000/book/view")
   .then((resp) =>{
    setBooks({...books, results: resp.data, loading: false, err: null}); 
   })
   .catch((err) => {
   setBooks({...books, loading: false, err:"Somrthing went wrong , PLEASE try again later !!",
  }); 
   });
 },[books.reload]);

  const deleteBook = (id) => {
    axios.delete("http://localhost:3000/book/delete/"+ id ,{
      headers:{
        token: auth.token,
      },
    })
   .then((resp) =>{
     setBooks({...books ,reload: books.reload + 1 });
   })
   .catch((err) => {
  setBooks({...books, loading: false, err:"Somrthing went wrong , PLEASE try again later !!"});    
   });
  };



  
return (
    <div className='manage-book p-5'>
        <div className='header d-flex justify-content-between mb-5' >
        <h2 className='text-center '>MANAGE Books</h2>
        <Link to={'add'} className='btn btn-warning'>
          <BiBookAdd size={'24px'}/> Add New Book</Link>
        </div>

       
        
    <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Cover</th>
          <th>Book </th>
          <th>Author</th>
          <th>Field</th>
          <th>Description</th>
          <th>Publication </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

   {books.results.map((book) =>(
     <tr key={book.id}>
     <td>{book.id}</td>
     <td>
       <img className='book-cover' src={book.image_url} alt=''/>
     </td>
     <td>{book.name}</td>
     <td>{book.author}</td>
     <td>{book.field}</td>
     <td>{book.description}</td>
     <td>{book.publicationDate}</td>

     <td>
       <Link to={'/'+book.id} size="lg" className='btn btn-sm btn-success mx-1 mb-2'>
        <FaBookReader size={'20px'}/>  show</Link>

       <Link to={""+book.id} size="lg" className='btn btn-sm btn-primary mx-1 mb-2 '>
       <FaRegEdit size={'18px'}/>  update</Link>

       <button size="lg" className='btn btn-sm btn-danger mx-1 mb-2' 
                         onClick={(e) => {deleteBook(book.id)}}>
        <MdDeleteSweep size={'19px'}/> delete</button>

       


     </td>
   </tr>
   ))}
        


      </tbody>
    </Table>
    </div>
  )
}
