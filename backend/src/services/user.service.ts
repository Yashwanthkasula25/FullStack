import { UserRepository } from "../repositories/user.repository";

export const UserService = {
  getProfile: (id: string) => UserRepository.findById(id),

  updateProfile: (id: string, name: string) =>
    UserRepository.update(id, { name }),
};
