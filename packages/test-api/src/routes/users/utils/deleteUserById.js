import { UserModel } from '../../../models'

export const deleteUserById = async (id) => {
  const deletedUser =  await UserModel.deleteOne({ _id: id });
  if (!deletedUser?.deletedCount || deletedUser.deletedCount === 0) throw "Aucun utilisateur supprimé";
  return {
    message: `L'utilsateur ${id} a été supprimé correctement.`,
  }
}