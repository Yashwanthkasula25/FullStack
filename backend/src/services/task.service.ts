import { TaskRepository } from "../repositories/task.repository";

export const TaskService = {
  createTask: (userId: string, dto: any) =>
    TaskRepository.create({
      ...dto,
      creatorId: userId,
    }),

  updateTask: async (id: string, dto: any) => {
    const task = await TaskRepository.findById(id);
    if (!task) throw new Error("Task not found");
    return TaskRepository.update(id, dto);
  },

  deleteTask: (id: string) => TaskRepository.delete(id),

  getTasks: (userId: string, query: any) => {
    const { status, priority, sort } = query;

    return TaskRepository.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { assignedToId: userId },
        ],
        status,
        priority,
      },
      orderBy: sort === "dueDate" ? { dueDate: "asc" } : undefined,
    });
  },
};
