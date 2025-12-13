import { TaskService } from "../services/task.service";

describe("TaskService", () => {
  it("should throw error if task not found", async () => {
    await expect(
      TaskService.updateTask("invalid-id", {})
    ).rejects.toThrow("Task not found");
  });
});
