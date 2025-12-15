import { prisma } from "../config/prisma";

export const TaskRepository = {
  create: (data: any) =>
    prisma.task.create({ data }),

  findById: (id: string) =>
    prisma.task.findUnique({ where: { id } }),

  update: (id: string, data: any) =>
    prisma.task.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.task.delete({ where: { id } }),

  findMany: (filters: any) =>
    prisma.task.findMany(filters),
};
