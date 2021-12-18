import { TeamModel } from "../../../models";

const getManyTeamByUserId = async (userId) => {
  const userTeams = await TeamModel.find({ userIds: userId }).populate('userIds');
  return userTeams;
}

export { getManyTeamByUserId }