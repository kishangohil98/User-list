import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';

export const Login = () => {
    const history = useHistory();
    useEffect(() => {
        function checkToken(){
            if(localStorage.getItem('token')){
                history.push('/');
            }
        }
        checkToken();
    }, [history]);
    const [formData, setformData] = useState({
        email: "",
        password: "",
      });
      const [showError, setShowError] = useState(false);

  const onChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
  };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit called");
        //login(email, password);

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };
        const body = { email: formData.email, password: formData.password };
        
        try {
            const res = await axios.post("/api/user/login", body, config);
            setShowError(false);
            localStorage.setItem("token", res.data.token);
            history.push('/');
        } catch (err) {
            setShowError(true);
        }
    };
    return (
        <div>
            <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required name="email" onChange={onChange} value={formData.noOfDays}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required name="password" onChange={onChange} value={formData.noOfDays}/>
                    </Form.Group>
                    {showError ? 
                        <Alert variant='danger'>
                            Invalid credentials
                        </Alert>
                         : <></>
                    }
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
};