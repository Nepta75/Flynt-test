import { Router } from "express";
import { getUserById, addUser, updateUserById, updateUserRoleById, deleteUserById, getAllUsers } from "./utils";
import { handleError } from '../utils/handleError'

const usersRoutes = Router();

usersRoutes.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: handleError(error) });
  }
})

usersRoutes.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params 
    const user = await getUserById(userId);
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

usersRoutes.post('/', async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).send(newUser)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

usersRoutes.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await updateUserById(userId, req.body)
    res.send(updatedUser)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

usersRoutes.patch('/role/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const isDowngrade = req.body.isDowngrade || false;
    const updatedUser = await updateUserRoleById(userId, isDowngrade)
    res.send(updatedUser)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

usersRoutes.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await deleteUserById(userId);
    res.send(result)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

export { usersRoutes }
