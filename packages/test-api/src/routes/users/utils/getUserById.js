import { UserModel } from '../../../models'
import { getManyTeamByUserId } from '../../teams/utils';

export const getUserById = async (id) => {
  const user = await UserModel.findById(id).lean();
  const teams = await getManyTeamByUserId(id);

  const newUser = {
    ...user,
    teams
  }
  if (!user) throw `Utilisateur introuvable avec comme id ${id}`;
  
  return newUser;
}