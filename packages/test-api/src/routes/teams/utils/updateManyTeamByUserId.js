import { TeamModel } from '../../../models'
import { isValidTeam } from './isValidTeam'

export const updateManyTeamByUserId = async (user) => {
  const userTeams = await TeamModel.find({ userIds: user._id }).populate('userIds');

  let newNotCompletedTeamIds = [];
  let newCompletedteamIds = [];
  
  await Promise.all(userTeams.map(async team => {
    const newTeamUsers = [...team.userIds.filter(u => u !== user._id), user]
    const verif = await isValidTeam(newTeamUsers);
    if (!verif.success && team.isCompleted) newNotCompletedTeamIds = [...newNotCompletedTeamIds, team._id];
    if (verif.success && !team.isCompleted) newCompletedteamIds = [...newCompletedteamIds, team._id];
  }));
  
  if (newCompletedteamIds.length > 0) {
    await TeamModel.updateMany({ _id: { $in: newCompletedteamIds } }, { isCompleted: true })
  }
  
  if (newNotCompletedTeamIds.length > 0) {
    await TeamModel.updateMany({ _id: { $in: newNotCompletedTeamIds } }, { isCompleted: false })
  }
}