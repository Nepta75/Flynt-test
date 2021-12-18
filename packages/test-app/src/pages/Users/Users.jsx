import React, { useEffect, useState } from "react"
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => {
        if (res.status !== 200) return null;
        return res.json();
      })
      .then((users) => {
        setUsers(users)
      })
  }, []);

  const handleDeleteUser = (userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, { method: 'DELETE' })
      .then((res) => {
        if (res.status !== 200) return null;
        setUsers(users.filter(user => user._id !== userId));
      })
  }
  
  return (
    <>
      <h1>Liste des utilisateurs</h1>
      <Button as={Link} to="/user" style={{ color: "#fff", marginBottom: "15px"}}>
        Ajouter un utilisateur
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user => {
          return (
            <tr key={user._id}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  onClick={() => navigate(`/user/${user._id}`)}
                  variant="warning"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  onClick={() => handleDeleteUser(user._id)} 
                  variant="danger"
                  className="mx-3"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table> 
    </>
  )
}