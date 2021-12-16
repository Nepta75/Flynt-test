

import { UserModel, USER_ROLE_ENUM } from '../../../models'
import { getUserById } from './getUserById';
import { updateManyTeamByUserId } from '../../teams/utils/updateManyTeamByUserId';

export const updateUserRoleById = async (id) => {
  const user = await getUserById(id);
  let newRole = user?.role;

  if (!user.role === USER_ROLE_ENUM.SQUAD_LEADER) return user;

  switch (newRole) {
    case USER_ROLE_ENUM.INTERN: newRole = USER_ROLE_ENUM.SQUAD_MEMBER; break;
    case USER_ROLE_ENUM.SQUAD_MEMBER: newRole = USER_ROLE_ENUM.SQUAD_LEADER; break;
    default: newRole = USER_ROLE_ENUM.SQUAD_LEADER;
  }

  const newUser = {
    ...user,
    role: newRole
  }
  await updateManyTeamByUserId(newUser)

  return UserModel.findByIdAndUpdate(id, { role: newRole }, { returnOriginal: false })
}