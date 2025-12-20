export interface Task {
  id: string;
  title: string;
  description: string;
  // These must match your Prisma Enums exactly
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: string; // It comes as a string from the API
  userId: string;
  assignedToId?: string;
  createdAt: string;
}