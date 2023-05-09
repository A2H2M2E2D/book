import React,{useState, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import axios from 'axios';


export default function AddBook() {
  const auth = getAuthUser();
  const [book, setBook] =useState({
    loading: false,
    err: '',
    name:'',
    description:'',
    author:'',
    field:'',
    publicationDate:'',
    success: null
});

   const image = useRef(null);   

    const createBook = (e) => {
      e.preventDefault();
      setBook({...book, loading:true});

       const formData = new FormData();
       formData.append("name",book.name);
       formData.append("description",book.description);
       formData.append("author",book.author);
       formData.append("field",book.field);
       formData.append("publicationDate",book.publicationDate);

       if(image.current.files && image.current.files[0]){
       formData.append("image",image.current.files[0]);
       }

      axios.post("http://localhost:3000/book/create", formData ,{
        headers: {
          token: auth.token ,
          "Content-Type":"multipart/form-data",
        }
      })
      .then((resp) =>{
      setBook({
        loading: false,
        err: null,
        name:'',
        description:'',
        author:'',
        field:'',
        publicationDate:'',
        success:'Book Created Successfully '
      });
          image.current.value = null;
      })
      .catch((err) => {
        setBook({
          ...book,
          loading:false,
          success:null,
          err:'Something went wrong , TRY again later !'
        })
      });
    };

  return (
<div className='login-container p-3'>

<h1>Add New Book</h1>

{book.err && (
  <Alert  variant='danger' className='p-2'>
     {book.err}
</Alert>
)}

{book.success && (
   
<Alert  variant='success' className='p-2'>
   {book.success}
</Alert> 

 )}

 
<Form onSubmit={createBook}>
    {/* Book Title */}
  <Form.Group className="mb-3" controlId="formBasicBookTitle">
    <Form.Label>Book Title : </Form.Label>
    <Form.Control value={book.name}
                  onChange={(e) => setBook({ ...book, name :e.target.value})} 
                  type="text" 
                  required
                  placeholder="book title" />
  </Form.Group>

  {/* author */}
  <Form.Group className="mb-3" controlId="formBasicBookTitle">
    <Form.Label>Author Name : </Form.Label>
    <Form.Control value={book.author}
                  onChange={(e) => setBook({ ...book, author :e.target.value})}  
                  required
                  type="text" placeholder="author name" />
  </Form.Group>

  {/*book field  */}
  <Form.Group className="mb-3" controlId="formBasicBookTitle">
    <Form.Label>Book Field : </Form.Label>
    <Form.Control value={book.field}
                  onChange={(e) => setBook({ ...book, field :e.target.value})}  
                  required
                  type="text" placeholder="book field" />
  </Form.Group>
 
    {/*publication date */}
  <Form.Group className="mb-3" controlId="formBasicBookTitle">
    <Form.Label>Publication Date : </Form.Label>
    <Form.Control value={book.publicationDate}
                  onChange={(e) => setBook({ ...book, publicationDate :e.target.value})}  
                  type="text" placeholder="publication date" />
  </Form.Group>

   {/* Description */}
  <Form.Group className="mb-3" controlId="formBasicDescription">
    <Form.Label>Description :</Form.Label>
    <textarea className='form-control'
              required
              value={book.description}
              onChange={(e) => setBook({ ...book, description :e.target.value})} 
              placeholder='description'
              rows={5}
    ></textarea>

  </Form.Group>

   {/* Book Cover */}
   <Form.Group className="mb-3" controlId="formBasicBookCover">
    <Form.Label>Book Cover :</Form.Label>
      <input type='file' className='form-control' ref={image}  required/>
  </Form.Group>
  
  <Button className='btn btn-dark w-100' variant="primary" type="submit">
    Add New Book
  </Button>
</Form>


</div>  )
}
