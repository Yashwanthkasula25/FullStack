import { TaskRepository } from "../repositories/task.repository";

export const TaskService = {
  createTask: async (userId: string, dto: any) => {
    return TaskRepository.create({
      ...dto,
      creatorId: userId,
    });
  },

  getUserTasks: async (userId: string) => {
    return TaskRepository.findByUser(userId);
  },
};
