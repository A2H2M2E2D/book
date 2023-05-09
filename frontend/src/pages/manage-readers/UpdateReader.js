import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../healper/Storage';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function UpdateReader() {
  let {id} = useParams();
  const auth = getAuthUser();
  const [reader, setReader] =useState({
    loading: false,
    err: [],
    name:'',
    email:'',
    // password:'',
    phone:'',
    status:'',
    reload:false,
    success: null
});

const updateReader = (e) => {
  e.preventDefault();
  setReader({...reader, loading:true, err:[]});
  axios.put("http://localhost:3000/book/update_user/"+ id, {
    name:reader.name,
    email:reader.email,
    phone:reader.phone,
    // password:reader.password
    status:reader.status,
  } ,{
    headers: {
      token: auth.token ,
    }
  })
  .then((resp) =>{
    setReader({
      ...reader,
      loading:false,
      success:'Reader Updated Successfully !!',
      reload:reader.reload+1,
     })
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


useEffect(() => {
  axios.get("http://localhost:3000/book/show_users/"+ id,{
    headers: {
      token: auth.token ,
    }
  })
  .then((resp) =>{
    setReader({
      ...reader,
      name: resp.data.name ,
      email: resp.data.email,
      // password: resp.data.password,
      status: resp.data.status,
      phone: resp.data.phone,
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

}, [reader.reload])

    return (
        <div className='login-container p-3'>
        
        <h1>Update Reader</h1>
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



        <Form onSubmit={updateReader}>
            {/* Book Title */}
          <Form.Group className="mb-3" controlId="formBasicBookTitle">
            <Form.Label>Full Name : </Form.Label>
            <Form.Control type="text" 
                          placeholder="name"
                          value={reader.name}
                          onChange={(e) => setReader({ ...reader, name :e.target.value})}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBookTitle">
            <Form.Label>Email : </Form.Label>
            <Form.Control type="email" 
                          placeholder="email"
                          value={reader.email}
                          onChange={(e) => setReader({ ...reader, email :e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBookTitle">
            <Form.Label>Phone : </Form.Label>
            <Form.Control type="text" 
                          placeholder="phone"
                          value={reader.phone}
                          onChange={(e) => setReader({ ...reader, phone :e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBookTitle">
            <Form.Label>Status : </Form.Label>
            <Form.Control type="text" 
                          placeholder="status"
                          value={reader.status}
                          onChange={(e) => setReader({ ...reader, status :e.target.value})} />
          </Form.Group>
         
          
        
           
          
          <Button className='btn btn-dark w-100' variant="primary" type="submit">
            Update Reader
          </Button>
        </Form>
        
        
        </div>  )
}
