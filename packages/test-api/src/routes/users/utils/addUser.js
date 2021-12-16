import { USER_ROLE_ENUM, UserModel } from '../../../models'

export const addUser = (data) => {
  const { firstName, lastName, password, email } = data;
  const newUser = new UserModel({
    firstName,
    lastName,
    password,
    email,
    role: USER_ROLE_ENUM.INTERN
  });

  return newUser.save();
}