import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { setAuthUser } from '../../healper/Storage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Register() {

  const navigate = useNavigate();
  const [register, setRegister] =useState({
    email:'',
    password:'',
    name: '',
    phone: '',
    loading:false,
    err:[],
  });
  const RegisterFunc = (e) => {
      e.preventDefault();
      setRegister({...register,loading : true ,err:[]});
      axios.post("http://localhost:3000/auth/register",{
        email:register.email,
        password:register.password,
        name:register.name,
        phone:register.phone,

      }).then((resp) => {
        setRegister({...register,loading : false ,err:[]});
      setAuthUser(resp.data);    
      navigate("/");

      }).catch((error) => {
        setRegister({...register,loading : false ,err:error.response.data.error,})
       
      }); 
  };

  return (
    <div className='image-login'>

    <div className='login-container'>

    <h1>Registration Form</h1>
    {register.err.map((error ,index) => (
    <Alert key={index} variant='danger' className='p-2'>
            {error.msg}
    </Alert>
     ))}
   

    <Form onSubmit={RegisterFunc}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full-Name </Form.Label>
        <Form.Control type="text" 
                      placeholder="full-name"
                      value={register.name} 
                      onChange={(e) => setRegister({...register, name: e.target.value})} />
      </Form.Group> 

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" 
                      placeholder="email"
                      value={register.email} 
                      onChange={(e) => setRegister({...register, email: e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone </Form.Label>
        <Form.Control type="text" 
                      placeholder="phone"
                      value={register.phone} 
                      onChange={(e) => setRegister({...register, phone: e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
                      placeholder="Password"
                      value={register.password} 
                      onChange={(e) => setRegister({...register, password: e.target.value})} />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Type</Form.Label> <br/>
        <Form.Check label= 'Admin' inline/>
        <Form.Check label= 'Reader' inline/>
      </Form.Group> */}
      
      <Button className='btn btn-dark w-100' 
              variant="primary" 
              type="submit"
              disabled={register.loading === true}
              
              >
        Register
      </Button>
    </Form>


    </div>
    </div>
  )
}
