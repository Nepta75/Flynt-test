import { UserModel } from '../../../models'

export const getUserById = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) throw `Utilisateur introuvable avec comme id ${id}`;
  return user;
}