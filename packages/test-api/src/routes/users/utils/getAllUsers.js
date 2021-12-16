import { UserModel } from '../../../models'

export const getAllUsers = () => UserModel.find();