
import { Types } from 'mongoose';
import { USER_ROLE_ENUM, TeamModel } from '../../../models'

export const isValidTeam = async (users, teamId = null) => {
  let message = '';
  let success = true;
  const userLeader = users.filter(user => user.role === USER_ROLE_ENUM.SQUAD_LEADER);
  const usersDev = users.filter(user => user.role === USER_ROLE_ENUM.SQUAD_MEMBER);
  const userIntern = users.filter(user => user.role === USER_ROLE_ENUM.INTERN);

  if (!(users.length < 4)) {
    if (!(userLeader?.length !== 1)) {
      if (!(usersDev?.length < 2)) {
        if (!(userIntern?.length !== 1)) {
          let teamsWhereCurrentLeaderIsLeader = await TeamModel.find({ userIds:  userLeader[0]._id }).populate({
            path: 'userIds',
            match: { role: USER_ROLE_ENUM.SQUAD_LEADER },
          });
        
          if (teamId) {
            teamsWhereCurrentLeaderIsLeader = teamsWhereCurrentLeaderIsLeader.filter(team => !team._id.equals(Types.ObjectId(teamId)));
          }
        
          if (teamsWhereCurrentLeaderIsLeader?.length > 0) {
            message = "le team leader fait déjà partie d'une autre équipe !";
            success = false;
          }
        } else {
          message =  `Une équipe doit avoir un stagiaire ! (${userIntern.length} parmis la liste)`;
          success = false;
        }
      } else {
        message = `Une équipe doit avoir au moins deux développeurs (${usersDev.length} parmis la liste)`;
        success = false;
      }
    } else {
      message = `Une équipe peut avoir seulement un leader (${userLeader.length} parmis la liste)`;
      success = false;
    }
  } else {
    message = `Une équipe doit être composée de 4 utilisateurs minimum (attention aux doublons)`;
    success = false;
  }





  return { success, message };
}