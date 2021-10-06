import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap';



export const Main = () => {
    const [userData, setUserData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        async function checkToken(){
            if(!localStorage.getItem('token')){
                history.push('/login');
            }
        }
        checkToken();
    }, [history]);
    async function fetchData(){
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  "token": localStorage.getItem('token')
                },
            };
            const res = await axios.get("/api/user/", config);
            console.log("res", res.data.results);
            setUserData([...res.data.results]);
        } catch (err) {
            console.log("error", err);
        }
    }
    const addUser = () => {
        history.push('/add-user');
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Container>
                <Button onClick={addUser}>Add User</Button>
                <br/>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Mobile</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
      {
          userData.length > 0 
          ? userData.map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
            </tr>
          ))
          : <>No Data</>
      }
  </tbody>
</Table>
</Container>
        </div>
    )
};