export const useAuth = () => {
  const token = localStorage.getItem("token");

  return {
    user: null,
    isLoading: false,
    isAuthenticated: !!token,
  };
};
