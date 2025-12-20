import { useQuery } from "@tanstack/react-query";
import { getMyTasks } from "../api/tasks";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getMyTasks,
  });
};
