import { Router } from "express";
import { usersRoutes } from "./users";
import { teamsRoutes } from "./teams";

const routes = Router();
routes.use('/users', usersRoutes)
routes.use('/teams', teamsRoutes)

export { routes }
