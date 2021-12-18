import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { ROLES } from '../../constants';
import { useAlertMessage } from '../../hooks/useAlertMessage';
import { customFetch } from '../../utils/customFetch';

const Team = () => {
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState(null);
  const {setMessage, renderMessage} = useAlertMessage();
  const [inputValues, setInputValues] = useState({
    name: '',
    leadIds: [null],
    devIds: [null, null],
    internIds: [null],
  });
  const { teamId } = useParams();
  const navigate = useNavigate();


  const userFetch = customFetch(`${process.env.REACT_APP_API_URL}/users`);
  const teamFetch = customFetch(`${process.env.REACT_APP_API_URL}/teams`);


  useEffect(() => {
    userFetch.get('', (err, result) => {
      if (err) return setMessage(err);
      setUsers(result)
    })
  }, []);

  useEffect(() => {
    if (!teamId?.length > 0) return null;

    teamFetch.get(teamId, (err, result) => {
      if (err) return setMessage(err);
      const users = result.userIds;
      const leadUsers = users?.filter(u => u.role === ROLES.SQUAD_LEADER);
      const devUsers = users?.filter(u => u.role === ROLES.SQUAD_MEMBER);
      const internUsers = users?.filter(u => u.role === ROLES.INTERN);

      setTeam(result)
      setInputValues({
        name: result.name,
        leadIds: leadUsers.length === 0 ? [null] : leadUsers.map(l => l._id),
        devIds: devUsers.length === 0 ? [null, null] : devUsers.map(d => d._id),
        internIds: internUsers.length === 0 ? [null] : internUsers.map(i => i._id),
      });
    })
  }, [teamId]);

  const handleUpdate = () => {
    const body = {
      name: inputValues.name,
      userIds: [
        ...inputValues.leadIds,
        ...inputValues.devIds,
        ...inputValues.internIds
      ]
    };

    teamFetch.update(body, teamId, (err, result) => {
      if (err) return setMessage(err);
      setMessage({ error: false, message: "Team modifiée !" })
      setTeam(result)

    })
  }

  const handleDeleteTeam = () => {
    teamFetch.del(teamId, (err) => {
      if (err) return setMessage(err);
      navigate('/teams')
    })
  }

  const handleCreateTeam = async () => {
    const body = {
      name: inputValues.name,
      userIds: [
        ...inputValues.leadIds,
        ...inputValues.devIds,
        ...inputValues.internIds
      ]
    };

    teamFetch.post(body, (err, result) => {
      if (err) return setMessage(err);
      navigate(`/team/${result._id}`);
    })
  }

  const onInputChange = (e, key, index) => {
    inputValues[key][index] = e.target.value;
    setInputValues({
      ...inputValues,
      [key]: inputValues[key]
    })
  }
  const leadUsers = users?.filter(u => u.role === 'SQUAD_LEADER');
  const devUsers = users?.filter(u => u.role === 'SQUAD_MEMBER');
  const internUsers = users?.filter(u => u.role === 'INTERN');

  return (
      <div>
        {teamId ?
          <h2 className="text-center">
            <div>{team?.name}</div>
            {team && !team.isCompleted && 
              <Alert variant="danger">Team invalide</Alert>
            }
          </h2>
        : <h2>Ajout d'une team</h2>
        }

        {renderMessage()}

        <Form className="mt-5">
          <Form.Group className="mb-2">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })}
              type="text"
              placeholder="entrer le nom de la team"
              value={inputValues.name}
            />
          </Form.Group>

          {inputValues.leadIds.map((leadId, index) => {
            const currentLead = leadUsers?.find(l => l._id === leadId);
            return (
              <FloatingLabel key={`${leadId}-${index}`} className="mb-2" label="Leader de l'équipe">
                <Form.Select onChange={(e) => onInputChange(e, "leadIds", index)}>
                  <option value={currentLead?._id}>{currentLead?.firstName} {currentLead?.lastName}</option>
                  {leadUsers?.filter(l => l._id !== leadId)?.map(leadUser => (
                    <option key={leadUser._id} value={leadUser._id}>{leadUser.firstName} {leadUser.lastName}</option>
                  ))}
                </Form.Select>
                {(index + 1) > 1 && 
                  <Button
                    className="mb-4"
                    variant="danger" 
                    onClick={() => {
                      const newLeadsInputs = inputValues.leadIds.slice();
                      newLeadsInputs.splice(index, 1);
                      setInputValues({...inputValues, leadIds: newLeadsInputs })
                    }}
                  >
                    Supprimer
                  </Button>
                }
              </FloatingLabel>
            )
          })}
           
          {inputValues.internIds.map((internId, index) => {
            const currentIntern = internUsers?.find(i => i._id === internId);
            return (
              <FloatingLabel key={`${internId}-${index}`} className="mb-2" label="stagiaire">
                <Form.Select onChange={(e) => onInputChange(e, "internIds", index)}>
                  <option value={currentIntern?._id}>{currentIntern?.firstName} {currentIntern?.lastName}</option>
                  {internUsers?.filter(i => i._id !== internId)?.map(interUser => (
                    <option key={interUser._id} value={interUser._id}>{interUser.firstName} {interUser.lastName}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            )
          })}

          {inputValues.devIds.map((devId, index) => {
            const currentDev = devUsers?.find(d => d._id === devId);
            return (
              <FloatingLabel key={`${devId}-${index}`} className="mb-2" label="dev">
                <Form.Select onChange={(e) => onInputChange(e, "devIds", index)}>
                  <option value={currentDev?._id}>{currentDev?.firstName} {currentDev?.lastName}</option>
                  {devUsers?.filter(d => d._id !== devId)?.map(devUser => (
                    <option key={devUser._id} value={devUser._id}>{devUser.firstName} {devUser.lastName}</option>
                  ))}
                </Form.Select>
                {(index + 1) > 2 && 
                  <Button
                    className="mb-4"
                    variant="danger" 
                    onClick={() => {
                      const newDevsInputs = inputValues.devIds.slice();
                      newDevsInputs.splice(index, 1);
                      setInputValues({...inputValues, devIds: newDevsInputs })
                    }}
                  >
                    Supprimer
                  </Button>
                }
              </FloatingLabel>
            )
          })}

          <Button className="mb-4" onClick={() => {
            const devIds = [...inputValues.devIds, 1]
            setInputValues({...inputValues, devIds })
          }}
          >+ ajouter un dev</Button>
        </Form>
        
        {teamId ? (
          <>
            <Button onClick={() => handleUpdate()} variant="warning">
              Modifier
            </Button>
            <Button onClick={() => handleDeleteTeam()} variant="danger" className="mx-3">
              Supprimer
            </Button>
          </>
        ) : <Button onClick={() => handleCreateTeam()}>Ajouter</Button>}
      </div>
  )
}

export { Team };
