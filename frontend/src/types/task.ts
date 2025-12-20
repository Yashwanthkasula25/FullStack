export type Task = {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  createdAt: string;
};
