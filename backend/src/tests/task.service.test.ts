jest.mock("../sockets", () => ({
  emitTaskUpdate: jest.fn(),
  emitAssignment: jest.fn(),
}));

import { TaskService } from "../services/task.service";
import { TaskRepository } from "../repositories/task.repository";

jest.mock("../repositories/task.repository", () => ({
  TaskRepository: {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe("TaskService Tests", () => {

  it("should throw error if task not found", async () => {
    (TaskRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      TaskService.updateTask("invalid-id", {})
    ).rejects.toThrow("Task not found");
  });

  it("should attach creatorId when creating task", async () => {
    const mockTask = {
      id: "task-1",
      creatorId: "user-1",
      assignedToId: "user-2",
    };

    (TaskRepository.create as jest.Mock).mockResolvedValue(mockTask);

    const result = await TaskService.createTask("user-1", {
      title: "Test Task",
      description: "Test desc",
      dueDate: new Date().toISOString(),
      priority: "LOW",
      status: "TODO",
      assignedToId: "user-2",
    });

    expect(TaskRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        creatorId: "user-1",
      })
    );

    expect(result.creatorId).toBe("user-1");
  });

  it("should fetch overdue tasks", async () => {
    const overdueTasks = [
      {
        id: "task-1",
        status: "TODO",
        dueDate: new Date(Date.now() - 86400000),
      },
    ];

    (TaskRepository.findMany as jest.Mock).mockResolvedValue(overdueTasks);

    const result = await TaskService.getTasks("user-1", {
      view: "overdue",
    });

    expect(TaskRepository.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          dueDate: { lt: expect.any(Date) },
          status: { not: "COMPLETED" },
        }),
      })
    );

    expect(result.length).toBe(1);
  });

});
