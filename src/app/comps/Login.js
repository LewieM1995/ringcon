"use client";

import {Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../comps/comps.css'

export default function Login() {

const emailRef = useRef();
const passwordRef = useRef();
const [loading, setLoading] = useState(false);

const handleLogin = () => {
    fetch('http://localhost:8080/login')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log('Login successful:', data);
        // Update the login state or perform any other actions upon successful login
        isLogin(true);
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="login-container">
        <Card style={{minWidth: '400px', margin: 'auto'}}>
            <Card.Body>
                <h2 className='text-center mb-4'>Employee Login</h2>
                <Form>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Button onClick={handleLogin} className='w-100 mt-4' disabled={loading}>Login</Button>
                </Form>
                <div className='w-100 text-center mt-2'><Button type='button'>Generate Guest Login</Button></div>
            </Card.Body>
        </Card>
    </div>
  )
}