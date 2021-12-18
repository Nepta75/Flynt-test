import { UserModel } from '../../../models'
import { updateManyTeamByUserId } from '../../teams/utils/updateManyTeamByUserId';

export const deleteUserById = async (id) => {
  await updateManyTeamByUserId({ _id: id}, true)

  const deletedUser =  await UserModel.deleteOne({ _id: id });
  if (!deletedUser?.deletedCount || deletedUser.deletedCount === 0) throw "Aucun utilisateur supprimé";

  return {
    message: `L'utilsateur ${id} a été supprimé correctement.`,
  }
}