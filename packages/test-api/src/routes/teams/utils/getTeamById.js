import { TeamModel } from '../../../models'

export const getTeamById = async (id) => {
  const team = await TeamModel.findById(id).populate('userIds');
  if (!team) throw `Team introuvable avec comme id ${id}`;
  return team
};