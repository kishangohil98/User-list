import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Container, Button } from 'react-bootstrap';



export const AddUser = () => {
    const history = useHistory();
    useEffect(() => {
        async function checkToken(){
            if(!localStorage.getItem('token')){
                history.push('/login');
            }
        }
        checkToken();
    }, [history]);
    return (
        <div>
            <Container>
                Add User
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Firstname" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Lastname" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
            </Container>
        </div>
    )
};