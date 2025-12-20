import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(), // Allow this
  dueDate: z.string().datetime().optional(), // Allow this (expect ISO string)
  assignedToId: z.string().uuid().optional(),
});