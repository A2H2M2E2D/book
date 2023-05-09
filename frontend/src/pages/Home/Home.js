import React, { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';
import Form from 'react-bootstrap/Form';
import Slider from './Slider';
import {GiArchiveResearch} from 'react-icons/gi';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';



export default function Home() {
  
  const [books, setBooks] =useState({
      loading: true,
      results: [],
      err: null,
      reload: 0
  });

  const [search, setSearch] =useState('');

 useEffect(() => {
  setBooks({...books, loading: true}) ;
  axios.get("http://localhost:3000/book/view" ,{
    params:{
      search:search,
    }
  })
   .then((resp) =>{
    console.log(resp);
    setBooks({...books, results: resp.data, loading: false, err: null}); 
     
   })
   .catch((err) => {
  setBooks({...books, loading: false, err:"Somrthing went wrong , PLEASE try again later !!"}); 
     
   });
 },[books.reload]);

  const searchBooks = (e) => {
   e.preventDefault();
   setBooks({...books, reload :books.reload+1});
  }

  return (
    <div className='home-container p-4'>
    
           {/* loader */}
      {books.loading === true && (
         <div className='text-center'>
         <Spinner animation="border" role="status">
           <span className="visually-hidden">Loading...</span>
         </Spinner>
         </div>
      )}
          
          {/* list books */}
        {books.loading === false && books.err == null &&(
          <>
                {/* Search */}
      <Form onSubmit={searchBooks}>
        <Form.Group className="mb-3 d-flex" >
        <Form.Control type="text" 
                      placeholder="search book..."
                      className='rounded-0'  /* rounded-0 ==> no radius border  */                
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      
                      />  
        <button className='btn btn-dark rounded-0'>
          <GiArchiveResearch size={'40px'}/>
          {/* Search */}
          </button>

      </Form.Group>
      </Form>

       {/* Slider */}
       <Slider />
       <hr/>
       <h2 className='text-center m-5 text-secondary'>Our Library DashBoard</h2>

          {/* list of movies  */}
        <div className='row '>
          {books.results.map((book) => (
             <div className='col-3 card-book-container' key={book.id}> 
             <BookCard 
               name={book.name}
               description={book.description}
               image={book.image_url}
               author={book.author}
               publicationDate={book.publicationDate}
               field={book.field}
               id={book.id}
             />
             </div>
          ))}
            
        </div>         
          </>
        )}

         {/* error handling  ==> if it found err after loading*/}
        {books.loading === false && books.err != null &&(

           <Alert  variant='danger' className='p-2'>
               {books.err}
            </Alert>
         )}

       {books.loading === false && books.err == null && books.results.length === 0 &&(
      <Alert  variant='info' className='p-2'>
         SORRY there is’t book like this ..
        </Alert>
        )}

                 
    </div>
  );
};  
