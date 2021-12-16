
import { USER_ROLE_ENUM, TeamModel } from '../../../models'

export const isValidTeam = async (users) => {
  let message = '';
  let success = true;
  const userLeader = users.filter(user => user.role === USER_ROLE_ENUM.SQUAD_LEADER);
  const usersDev = users.filter(user => user.role === USER_ROLE_ENUM.SQUAD_MEMBER);
  const userIntern = users.filter(user => user.role === USER_ROLE_ENUM.INTERN);

  if (userLeader?.length !== 1) {
    message = `Une équipe peut avoir seulement un leader (${userLeader.length} parmis la liste)`;
    success = false;
  }
  if (usersDev?.length < 2) {
    message = `Une équipe doit avoir au moins deux développeurs (${usersDev.length} parmis la liste)`;
    success = false;
  }
  if (userIntern?.length !== 1) {
    message =  `Une équipe doit avoir un stagiaire ! (${userIntern.length} parmis la liste)`;
    success = false;
  }
  
  const teamWithCurrentLeader = await TeamModel.find({
    userIds : { $in : userLeader.map(leader => leader._id) }
  })

  if (teamWithCurrentLeader?.length > 1) {
    message = "le team leader fait déjà partie d'une autre équipe !";
    success = false;
  }
  
  return { success, message };
}