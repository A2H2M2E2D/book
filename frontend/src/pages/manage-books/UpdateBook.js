import React,{useState,useRef,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function UpdateBook() {
  let {id} = useParams();
  const auth = getAuthUser();
  const [book, setBook] =useState({
    loading: false,
    err: '',
    name:'',
    description:'',
    author:'',
    image_url :null,
    field:'',
    publicationDate:'',
    reload:false,
    success: null
});

const image = useRef(null);   

const updateBook = (e) => {
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
   
  axios.put("http://localhost:3000/book/update/"+ id, formData ,{
    headers: {
      token: auth.token ,
      "Content-Type":"multipart/form-data",
    }
  })

  .then((resp) =>{
     setBook({
      ...book,
      loading:false,
      success:'Book Updated Successfully !!',
      reload:book.reload+1,
     })
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

console.log('token',auth.token);


useEffect(() => {
  axios.get("http://localhost:3000/book/show/"+ id)
  .then((resp) =>{
    setBook({
      ...book,
      name: resp.data.name ,
      description: resp.data.description,
      image_url: resp.data.image_url,
      author: resp.data.author,
      publicationDate: resp.data.publicationDate,
      field: resp.data.field,
    }); 
  })
  .catch((err) => {
    setBook({
      ...book,
      loading:false,
      success:null,
      err:'Something went wrong , TRY again later !'
    })
  });

}, [book.reload])


    return (
        <div className='login-container p-3'>
        
        <h1>Update Book</h1>
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
     
        <Form onSubmit={updateBook}>
            {/* Book Title */}
           <img src={book.image_url} 
                alt={book.name}
                style={{
                  width:'50%',
                  height:'200px', 
                  objectFit:'cover',
                  borderRadius: '10px',
                  border:'1px solid #ddd',
                  marginBottom:'10px',

                }}
            />
          <Form.Group className="mb-3" controlId="formBasicBookTitle">
            <Form.Label>Book Title : </Form.Label>
            <Form.Control type="text" placeholder="book title"
                          value={book.name}
                          onChange={(e) => setBook({ ...book, name :e.target.value})} 
            />
          </Form.Group>

           {/* author */}
  <Form.Group className="mb-3" controlId="formBasicBookTitle">
    <Form.Label>Author Name : </Form.Label>
    <Form.Control type="text" placeholder="author name"
                  value={book.author}
                  onChange={(e) => setBook({ ...book, author :e.target.value})}  />
  </Form.Group>

  {/*book field  */}
  <Form.Group className="mb-3" controlId="formBasicBookTitle">
    <Form.Label>Book Field : </Form.Label>
    <Form.Control type="text" placeholder="book field"
                  value={book.field}
                  onChange={(e) => setBook({ ...book, field :e.target.field})}  />
  </Form.Group>
 
    {/*publication date */}
  <Form.Group className="mb-3" controlId="formBasicBookTitle">
    <Form.Label>Publication Date : </Form.Label>
    <Form.Control type="text" placeholder="publication date"
                  value={book.publicationDate}
                  onChange={(e) => setBook({ ...book, publicationDate :e.target.value})}  />
  </Form.Group>

         
           {/* Description */}
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description :</Form.Label>
            <textarea className='form-control'
            value={book.description}
            onChange={(e) => setBook({ ...book, description :e.target.value})} 
            placeholder='description'
            rows={5}
            ></textarea>
          </Form.Group>
        
           {/* Book Cover */}
           <Form.Group className="mb-3" controlId="formBasicBookCover">
            <Form.Label>Book Cover :</Form.Label>
              <input type='file' className='form-control'  ref={image}/>
          </Form.Group>
          
          <Button className='btn btn-dark w-100' variant="primary" type="submit">
            Update Book
          </Button>
        </Form>
        
        
        </div>  )
}
