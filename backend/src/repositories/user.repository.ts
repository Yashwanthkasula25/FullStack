import { prisma } from "../config/prisma";

export const UserRepository = {
  findByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  findById: (id: string) =>
    prisma.user.findUnique({ where: { id } }),

  update: (id: string, data: any) =>
    prisma.user.update({ where: { id }, data }),
};
