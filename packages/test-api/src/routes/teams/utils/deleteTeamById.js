import { TeamModel } from '../../../models'

export const deleteTeamById = async (id) => {
  const deletedTeam =  await TeamModel.deleteOne({ _id: id });
  if (!deletedTeam?.deletedCount || deletedTeam.deletedCount === 0) throw "team non supprimée";
  return {
    message: `la team ${id} a été supprimé correctement.`,
  }
}