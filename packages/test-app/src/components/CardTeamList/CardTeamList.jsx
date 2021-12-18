import React from 'react';
import { Card, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { LegendItem } from '../LegendItem';
import { ROLES } from '../../constants';

const CardTeamList = ({ teams }) => {
  const navigate = useNavigate();

  if (!(teams?.length > 0)) return null;

  return (
    <>
      <LegendItem label="leader" color="black"/>
      <LegendItem label="dev" color="blue"/>
      <LegendItem label="stagiaire" color="yellow"/>

      <div className="d-flex" style={{ flexWrap: 'wrap' }}>
        {teams.map((team) => {
          return (
            <div
              key={team._id}
              style={{ cursor: 'pointer', margin: '10px 10px 10px 0', width: 'calc((100% / 3) - 10px)'}}
            >
              <Card
                onClick={() => navigate(`/team/${team._id}`)}
              >
                <Card.Title
                  style={{ display: 'flex', justifyContent: 'center', borderBottom: "1px solid black" }}
                  className="p-5"
                >
                  {team.name}
                </Card.Title>
                {!team.isCompleted &&
                  <Alert variant="danger">équipe invalide</Alert>
                }
                <Card.Body>
                  <Card.Text>
                    {team.userIds.map(user => {
                      const colorByRole = {
                        [ROLES.SQUAD_LEADER]: 'black',
                        [ROLES.SQUAD_MEMBER]: 'BLUE',
                        [ROLES.INTERN]: 'yellow',
                      }
                      return (
                        <div key={user._id}>
                          <FontAwesomeIcon
                            style={{ marginRight: '10px', color: colorByRole[user.role] }}
                            icon={faUser}
                          />
                          <span>
                            {user.lastName} {user.firstName}
                          </span>
                        </div>
                      )
                    })}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ) 
        })}
      </div>
    </>
  )
}

export { CardTeamList }