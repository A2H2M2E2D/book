import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../../css/login.css';
import { setAuthUser } from '../../healper/Storage';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] =useState({
    email:'',
    password:'',
    loading:false,
    err:[],
  });
  const LoginFunc = (e) => {
      e.preventDefault();
      setLogin({...login,loading : true ,err:[]});
      axios.post("http://localhost:3000/auth/login",{
        email:login.email,
        password:login.password,
      },
      ).then((resp) => {
        console.log(resp);
      setLogin({...login,loading : false ,err:[]});
      setAuthUser(resp.data);    
      navigate("/");

      }).catch((error) => {
      setLogin({...login,loading : false ,err:error.response.data.error,})
       
      }); 
  };
  return (
    
    <div className='image-login'>
    <div className='login-container'>
    <h1>Login Form</h1>

     {login.err.map((error ,index) => (
          <Alert key={index} variant='danger' className='p-2'>
            {error.msg}
          </Alert>
     ))}
    
    <Form onSubmit={LoginFunc}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" 
                      placeholder="email" 
                      required
                      value={login.email} 
                      onChange={(e) => setLogin({...login, email: e.target.value})} />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
                      placeholder="password"
                      required
                      value={login.password} 
                      onChange={(e) => setLogin({...login, password: e.target.value})} />
      </Form.Group>
      
      <Button className='btn btn-dark w-100' 
              variant="primary" 
              type="submit"
              disabled={login.loading === true}
              >
        Login
      </Button>
    </Form>


    </div>
    </div>
  )
}
