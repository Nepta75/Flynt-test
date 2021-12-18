import { TeamModel, UserModel } from '../../../models'
import { isValidTeam } from './isValidTeam';

export const addTeam = async (data) => {
  const { userIds, name } = data;

  const users = await UserModel.find({
    _id: { $in: userIds.map(id => id)}
  });
  
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