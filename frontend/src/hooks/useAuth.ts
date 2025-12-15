import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";

export const useAuth = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  return {
    user: query.data?.data,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
  };
};
