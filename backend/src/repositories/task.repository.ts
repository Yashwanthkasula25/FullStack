import { prisma } from "../config/prisma";

export const TaskRepository = {
  create: (data: any) => {
    return prisma.task.create({ data });
  },

  findByUser: (userId: string) => {
    return prisma.task.findMany({
      where: {
        OR: [
          { userId: userId },
          { assignedToId: userId },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
