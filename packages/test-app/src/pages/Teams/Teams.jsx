import React, { useEffect, useState } from "react"
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../../utils/customFetch";

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const userFetch = customFetch(`${process.env.REACT_APP_API_URL}/teams`)
  
  useEffect(() => {
    userFetch.get('', (err, res) => {
      if (err) return null;
      setTeams(res)

    })
  }, []);

  const handleDeleteTeam = (teamId) => {
    userFetch.del(teamId, (err, res) => {
      if (err) return null;
      setTeams(teams.filter(team => team._id !== teamId));
    })
  }
  
  return (
    <>
      <h1>Liste des teams</h1>
      <Button as={Link} to="/team" style={{ color: "#fff", marginBottom: "15px"}}>
        Ajouter une team
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>effectif</th>
            <th>valide</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {teams.map(team => {
          return (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.userIds.length}</td>
              <td>{team.isCompleted ? 'oui' : 'non'}</td>
              <td>
                <Button
                  onClick={() => navigate(`/team/${team._id}`)}
                  variant="warning"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  onClick={() => handleDeleteTeam(team._id)} 
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