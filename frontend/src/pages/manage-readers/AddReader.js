import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


export default function AddReader() {
  const auth = getAuthUser();

  // const navigate = useNavigate();
  const [reader, setReader] =useState({
    loading: false,
    err: [],
    name:'',
    email:'',
    phone:'',
    password:'',
    success: null
});

const createReader = (e) => {
  e.preventDefault();
  setReader({...reader, loading:true , err:[]});

axios.post("http://localhost:3000/book/create_user", {
   name:reader.name,
   email:reader.email,
   phone:reader.phone,
   password:reader.password
} 
,{
  headers: {
    token: auth.token ,
  }
}
)
.then((resp) =>{
  setReader({
  loading: false,
  err: [],
  success:'Reader Created Successfully '
});

})
.catch((err) => {
  setReader({
    ...reader,
    loading:false,
    success:null,
    err:'Something went wrong , TRY again later !'
  })
});
};



    return (
        <div className='login-container p-3'>
        
        <h1>Add Reader</h1>
        {/* {reader.err && (
        <Alert  variant='danger' className='p-2'>
          {reader.err}
        </Alert>
        )} */}

        {reader.success && (  
         <Alert  variant='success' className='p-2'>
           {reader.success}
         </Alert> 
       )}
   
        
        <Form onSubmit={createReader}>
            {/* Reader name*/}
          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>Full Name  : </Form.Label>
            <Form.Control type="text" 
                          placeholder="name"
                          value={reader.name}
                          onChange={(e) => setReader({ ...reader, name :e.target.value})}  />
          </Form.Group>

           {/* Reader email */}
           <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email  : </Form.Label>
            <Form.Control type="email" 
                          placeholder="email"
                          value={reader.email}
                          onChange={(e) => setReader({ ...reader, email :e.target.value})} />
          </Form.Group>

          {/* Reader phone */}
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone  : </Form.Label>
            <Form.Control type="text" 
                          placeholder="phone"
                          value={reader.phone}
                          onChange={(e) => setReader({ ...reader, phone :e.target.value})} />
          </Form.Group>

           {/* Reader password */}
           <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>password  : </Form.Label>
            <Form.Control type="password" 
                          placeholder="password"
                          value={reader.password}
                          onChange={(e) => setReader({ ...reader, password :e.target.value})} />
          </Form.Group>
         
          
          <Button className='btn btn-dark w-100' variant="primary" type="submit">
            Add New Reader
          </Button>
        </Form>
        
        
        </div>  
        )
}
