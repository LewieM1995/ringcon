"use client";

import {Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../comps/comps.css'

export default function Login() {

const emailRef = useRef();
const passwordRef = useRef();
const [loading, setLoading] = useState(false);


async function handleSubmit(e) {
    e.preventDefault()
}

const currentUser = 'me'
const error = 'error'

  return (
    <div className="login-container">
        <Card style={{minWidth: '400px', margin: 'auto'}}>
            <Card.Body>
                <h2 className='text-center mb-4'>Employee Login</h2>
                {currentUser}
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Button type='submit' className='w-100 mt-4' disabled={loading}>Login</Button>
                </Form>
                <div className='w-100 text-center mt-2'><Button type='button'>Generate Guest Login</Button></div>
            </Card.Body>
        </Card>
    </div>
  )
}