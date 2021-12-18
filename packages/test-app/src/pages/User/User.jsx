import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { CardTeamList } from '../../components/CardTeamList';
import { useAlertMessage } from '../../hooks/useAlertMessage';
import { customFetch } from '../../utils/customFetch';

const User = () => {
  const [user, setUser] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const { renderMessage, setMessage } = useAlertMessage();

  const userFetch = customFetch(`${process.env.REACT_APP_API_URL}/users`);

  useEffect(() => {
    if (!userId?.length > 0) return null;

    userFetch.get(userId, (err, result) => {
      if (err) return setMessage(err)
      setUser(result)
      setInputValues(result)
    })
  }, [userId]);

  const handleUpdate = () => {
    userFetch.update(inputValues, userId, (err, result) => {
      if (err) return setMessage(err)
      setUser(result)
      setMessage({ error: false, message: 'utilisateur modifié' })
    })
  }

  const handleUpdateUserRole = (isDowngrade = false) => {
    userFetch.patch({ isDowngrade }, `role/${userId}`, (err, result) => {
      if (err) return setMessage(err)
      setUser(result)
      setMessage({ error: false, message: `utilisateur ${isDowngrade ? 'retrogradé' : 'promu'}` })
    })
  }

  const handleDeleteUser = () => {
    userFetch.del(userId, (err) => {
      if (err) return setMessage(err)
      navigate('/users')
    })
  }

  const handleCreateUser = () => {
    userFetch.post(inputValues, (err, result) => {
      if (err) return setMessage(err)
      navigate(`/user/${result._id}`)
    })
  }

  return (
      <div>
        {userId ?
          <h2 className="text-center">
            <div>{user?.lastName} {user?.firstName}</div>
            {userId &&
              <div className="my-3 d-flex align-items-center justify-content-center">
                <div className="mx-2" >ROLE: {user?.role}</div>
                <Button onClick={() => handleUpdateUserRole()}>PROMOUVOIR</Button>
                <Button variant="warning" onClick={() => handleUpdateUserRole(true)}>RETROGRADER</Button>
              </div>
            }
          </h2>
        : <h2>Ajout d'un utilisateur</h2>
        }

        {renderMessage()}

        <Form className="mt-5">
          {['firstName', 'lastName', 'email', 'password'].map(key => {
            return (
              <Form.Group key={key} className="mb-2" controlId={key}>
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  onChange={(e) => setInputValues({
                    ...inputValues,
                    [key]: e.target.value,
                  })}
                  type={key === 'email' ? 'email' : 'text'}
                  placeholder={`Enter ${key}`}
                  value={inputValues[key] || ''}
                />
              </Form.Group>
            )
          })}
        </Form>
        
        {userId ? (
          <>
            <Button onClick={() => handleUpdate()} variant="warning">
              Modifier
            </Button>
            <Button onClick={() => handleDeleteUser()} variant="danger" className="mx-3">
              Supprimer
            </Button>
          </>
        ) : <Button onClick={() => handleCreateUser()}>Ajouter</Button>}

        {userId && user?.teams?.length > 0 &&
          <div className="mt-5">
            <h3 className="mt-3">Les teams dont fait partie {user.firstName}</h3>
            <CardTeamList teams={user.teams} />
          </div>
        }
      </div>
  )
}

export { User };
