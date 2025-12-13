import { UserRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const exists = await UserRepository.findByEmail(email);
    if (exists) throw new Error("User already exists");

    return UserRepository.update(
      (await UserRepository.findById(
        (
          await UserRepository.update("", {})
        ).id
      ))?.id!,
      {}
    );
  },

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return signToken({ id: user.id });
  },
};
