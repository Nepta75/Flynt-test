

import { TeamModel, UserModel } from '../../../models'
import { isValidTeam } from './isValidTeam';

export const updateTeamById = async (id, data) => {
  const users = await UserModel.find({ _id: { $in: data.userIds}})
  const team = await isValidTeam(users, id);
  if (team.success) {
    const updatedTeam = await TeamModel.findByIdAndUpdate(id, {
      name: data?.name,
      userIds: data?.userIds,
      isCompleted: true,
    }, {returnOriginal: false});

    if (!updatedTeam) throw 'Team introuvable';
    
    return updatedTeam;
  } 

  throw team.message;
}