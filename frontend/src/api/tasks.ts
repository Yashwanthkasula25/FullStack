import api from "./axios";

export const getTasks = (params?: {
  status?: string;
  priority?: string;
  sort?: string;
}) =>
  api.get("/tasks", {
    params,
  });

export const createTask = (data: any) =>
  api.post("/tasks", data);

export const updateTask = (id: string, data: any) =>
  api.put(`/tasks/${id}`, data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);
