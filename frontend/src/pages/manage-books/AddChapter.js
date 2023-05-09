import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import axios from 'axios';

export default function AddChapter() {
    const auth = getAuthUser();
    const [chapter, setChapter] =useState({
      loading: false,
      err: [],
      title:'',
      description:'',
      book_id:'',
      success: null
  });
  

  const createChapter = (e) => {
    e.preventDefault();
    setChapter({...chapter, loading:true , err:[]});
  
  axios.post("http://localhost:3000/book/create_chapters", {
     title:chapter.title,
     description:chapter.description,
     book_id:chapter.book_id,
  } 
  ,{
    headers: {
      token: auth.token ,
    }
  }
  )
  .then((resp) =>{
    setChapter({
    loading: false,
    err: [],
    success:'Chapter Created Successfully '
  });
  
  })
  .catch((err) => {
    setChapter({
      ...chapter,
      loading:false,
      success:null,
      err:'Something went wrong , TRY again later !'
    })
  });
  };
  return (
<div className='login-container p-3'>
        
        <h1>Add Chapter</h1>
       
        {chapter.success && (  
         <Alert  variant='success' className='p-2'>
           {chapter.success}
         </Alert> 
       )}
   
        
        <Form onSubmit={createChapter}>
            {/* Chapter title*/}
          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>Chapter Title  : </Form.Label>
            <Form.Control type="text" 
                          placeholder="title"
                          value={chapter.title}
                          onChange={(e) => setChapter({ ...chapter, title :e.target.value})}  />
          </Form.Group>

           {/* Description */}
           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description  : </Form.Label>
            <textarea type="text" 
                          placeholder="description"
                          value={chapter.description}
                          onChange={(e) => setChapter({ ...chapter, description :e.target.value})}   
                          rows={5}
            ></textarea>
          </Form.Group>

          {/* Reader phone */}
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Book id  : </Form.Label>
            <Form.Control type="text" 
                          placeholder="book id"
                          value={chapter.book_id}
                          onChange={(e) => setChapter({ ...chapter, book_id :e.target.value})} />
          </Form.Group>

         
          
          <Button className='btn btn-dark w-100' variant="primary" type="submit">
            Add New Chapter
          </Button>
        </Form>
        
        
        </div>    )
}
