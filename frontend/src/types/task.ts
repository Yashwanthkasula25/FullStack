export type Task = {
  id: string;
  title: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "To Do" | "In Progress" | "Review" | "Completed";
  assignedToId: string;
  description?: string;
};
