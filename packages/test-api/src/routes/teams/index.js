import { Router } from "express";
import { addTeam, getAllTeam, updateTeamById, getTeamById, deleteTeamById } from "./utils";
import { handleError } from "../utils/handleError";

const teamsRoutes = Router();

teamsRoutes.get('/', async (req, res) => {
  try {
    const teams = await getAllTeam()
    res.send(teams)
  } catch (error) {
    res.status(500).send({ message: handleError(error) });
  }
});

teamsRoutes.get('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await getTeamById(teamId);
    res.send(team)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

teamsRoutes.post('/', async (req, res) => {
  try {
    const newTeam = await addTeam(req.body)
    res.status(201).send(newTeam)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
});

teamsRoutes.put('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const updatedTeam = await updateTeamById(teamId, req.body)
    res.send(updatedTeam)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

teamsRoutes.delete('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const result = await deleteTeamById(teamId)
    res.send(result)
  } catch (error) {
    res.status(400).send({ message: handleError(error) });
  }
})

export { teamsRoutes }
