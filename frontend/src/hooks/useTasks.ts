import { useQuery } from "@tanstack/react-query";
import { fetchMyTasks } from "../api/tasks";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchMyTasks,
    initialData: [],
  });
};
