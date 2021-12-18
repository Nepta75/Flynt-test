

import { UserModel, USER_ROLE_ENUM } from '../../../models'
import { getUserById } from './getUserById';
import { updateManyTeamByUserId } from '../../teams/utils/updateManyTeamByUserId';
import { getManyTeamByUserId } from '../../teams/utils/getManyTeamByUserId';

export const updateUserRoleById = async (id, isDowngrade) => {
  const user = await getUserById(id);
  let newRole = user?.role;

  if (!user.role === USER_ROLE_ENUM.SQUAD_LEADER) return user;

  switch (newRole) {
    case USER_ROLE_ENUM.INTERN: newRole = isDowngrade ? USER_ROLE_ENUM.INTERN : USER_ROLE_ENUM.SQUAD_MEMBER; break;
    case USER_ROLE_ENUM.SQUAD_MEMBER: newRole = isDowngrade ? USER_ROLE_ENUM.INTERN : USER_ROLE_ENUM.SQUAD_LEADER; break;
    default: newRole = isDowngrade ? USER_ROLE_ENUM.SQUAD_MEMBER : USER_ROLE_ENUM.SQUAD_LEADER;
  }

  const newUser = {
    ...user,
    role: newRole
  }
  
  await updateManyTeamByUserId(newUser)

  const userWithNewRole = await UserModel.findByIdAndUpdate(id, { role: newRole }, { returnOriginal: false }).lean();
  const teams = await getManyTeamByUserId(id);

  return {
    ...userWithNewRole,
    teams
  }
}