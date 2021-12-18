import React, { useEffect, useState } from "react"
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../../utils/customFetch";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const userFetch = customFetch(`${process.env.REACT_APP_API_URL}/users`)
  
  useEffect(() => {
    userFetch.get('', (err, res) => {
      if (err) return null;
      setUsers(res)

    })
  }, []);

  const handleDeleteUser = (userId) => {
    userFetch.del(userId, (err, res) => {
      if (err) return null;
      setUsers(users.filter(res => res._id !== userId));
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
        {users?.map(user => {
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