

import { UserModel } from '../../../models'

export const updateUserById = async (id, data) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    email: data.email,
  }, {returnOriginal: false});

  if (!updatedUser) throw 'Utilisateur introuvable';
  
  return updatedUser;
}