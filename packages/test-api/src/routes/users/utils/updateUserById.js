

import { UserModel, USER_ROLE_ENUM } from '../../../models'

export const updateUserById = async (id, data) => {
  if (data?.role && !Object.values(USER_ROLE_ENUM).includes(data.role)) throw 'mauvais rôle';
  
  const updatedUser = await UserModel.findByIdAndUpdate(id, {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    email: data.email,
    ...(data.role && { role: data.role }),
  }, {returnOriginal: false});

  if (!updatedUser) throw 'Utilisateur introuvable';
  
  return updatedUser;
}