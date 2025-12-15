import { TaskRepository } from "../repositories/task.repository";
import {
  emitTaskUpdate,
  emitAssignment,
} from "../sockets";

export const TaskService = {
  createTask: async (userId: string, dto: any) => {
    const task = await TaskRepository.create({
      ...dto,
      creatorId: userId,
    });

    // Notify assigned user
    emitAssignment(task.assignedToId, task);

    return task;
  },

  updateTask: async (id: string, dto: any) => {
    const existingTask = await TaskRepository.findById(id);
    if (!existingTask) throw new Error("Task not found");

    const updatedTask = await TaskRepository.update(id, dto);

    // Broadcast task update
    emitTaskUpdate(updatedTask);

    // If reassigned → notify new user
    if (
      dto.assignedToId &&
      dto.assignedToId !== existingTask.assignedToId
    ) {
      emitAssignment(dto.assignedToId, updatedTask);
    }

    return updatedTask;
  },

  deleteTask: async (id: string) => {
    const task = await TaskRepository.findById(id);
    if (!task) throw new Error("Task not found");

    await TaskRepository.delete(id);

    emitTaskUpdate({ id, deleted: true });
  },

  getTasks: (userId: string, query: any) => {
    const { status, priority, sort, view } = query;
    const where: any = {};

    if (view === "assigned") {
      where.assignedToId = userId;
    } else if (view === "created") {
      where.creatorId = userId;
    } else if (view === "overdue") {
      where.assignedToId = userId;
      where.dueDate = { lt: new Date() };
      where.status = { not: "COMPLETED" };
    } else {
      where.OR = [
        { creatorId: userId },
        { assignedToId: userId },
      ];
    }

    if (status) where.status = status;
    if (priority) where.priority = priority;

    const orderBy =
      sort === "dueDate" ? { dueDate: "asc" } : undefined;

    return TaskRepository.findMany({ where, orderBy });
  },
};
