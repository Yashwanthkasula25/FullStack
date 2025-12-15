import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

export const useTasks = (filters: any) =>
  useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTasks(filters),
  });

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTask(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
