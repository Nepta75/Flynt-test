import { sortedUniq } from 'lodash'
import { TeamModel, UserModel } from '../../../models'
import { isValidTeam } from './isValidTeam';

export const addTeam = async (data) => {
  const { userIds, name } = data;
  const sortedIds = sortedUniq(userIds);

  if (sortedIds.length !== userIds.length) throw "Il y a plusieurs fois le même utilisateur";
  if (userIds?.length !== 4) throw "Une équipe doit être composée de 4 utilisateurs";

  const users = await UserModel.find({
    _id: { $in: userIds.map(id => id)}
  });

  if (users.length !== userIds.length) throw "Un des identifiants utilisateur parmis la liste n'existe pas";
  
  const team = await isValidTeam(users);

  if (team.success) {
    const newTeam = new TeamModel({
      name,
      userIds,
      isCompleted: true,
    });
    return newTeam.save();
  } 

  throw team.message;
}