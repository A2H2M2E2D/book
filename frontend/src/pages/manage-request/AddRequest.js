import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import axios from 'axios';


export default function AddRequest() {
  const auth = getAuthUser();
  const [request, setRequest] =useState({
    loading: false,
    err: [],
    book_name:'',
    success: null
});

const createRequest = (e) => {
  e.preventDefault();
  setRequest({...request, loading:true , err:[]});

axios.post("http://localhost:3000/book/order", {
  book_name:request.book_name,
} 
,{
  headers: {
    token: auth.token ,
  }
}
)
.then((resp) =>{
  setRequest({
  loading: false,
  err: [],
  success:'Request Created Successfully '
});

})
.catch((err) => {
  setRequest({
    ...request,
    loading:false,
    success:null,
    err:'Something went wrong , TRY again later !'
  })
});
};

    return (
        <div className='login-container' 
             style={{margin:'60px auto' , marginBottom:'100px auto' }}>
        
        <h1 >Add Request</h1>
        {/* <Alert  variant='danger' className='p-2'>
              This is simple alert!
        </Alert>
        */}
        {request.success && (  
         <Alert  variant='success' className='p-2'>
           {request.success}
         </Alert> 
       )}

       {/* مفروض اشوف هو الريدر اكتيف ولا عشان يقدر يعمل ريكوست */}
        <Form onSubmit={createRequest}>
            {/* Book Title */}
          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>Book Name  : </Form.Label>
            <Form.Control type="text" 
                          placeholder="Name"
                          value={request.book_name}
                          onChange={(e) => setRequest({ ...request, book_name :e.target.value})}  />
          </Form.Group>
         
        
          <Button className='btn btn-dark w-100' variant="dark" type="submit">
            Make Request
          </Button>
        </Form>
        
        
        </div> 
         )
}
