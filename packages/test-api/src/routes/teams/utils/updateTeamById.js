

import { TeamModel } from '../../../models'
import { isValidTeam } from './isValidTeam';

export const updateTeamById = async (id, data) => {
  const team = await isValidTeam(data?.userIds);
  if (team.success) {
    const updatedTeam = await TeamModel.findByIdAndUpdate(id, {
      name: data?.name,
      userIds: data?.userIds
    }, {returnOriginal: false});

    if (!updatedTeam) throw 'Team introuvable';
    
    return updatedTeam;
  } 

  throw team.message;
}