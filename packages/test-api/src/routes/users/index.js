import { Router } from "express";
import { getUserById, addUser, updateUserById, updateUserRoleById, deleteUserById, getAllUsers } from "./utils";

const usersRoutes = Router();

usersRoutes.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error });
  }
})

usersRoutes.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params 
    const user = await getUserById(userId);
    res.send(user);
  } catch (error) {
    res.status(400).send({  message: error });
  }
})

usersRoutes.post('/', async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).send(newUser)
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

usersRoutes.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await updateUserById(userId, req.body)
    res.send(updatedUser)
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

usersRoutes.patch('/role/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await updateUserRoleById(userId)
    res.send(updatedUser)
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

usersRoutes.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await deleteUserById(userId);
    res.send(result)
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

export { usersRoutes }
