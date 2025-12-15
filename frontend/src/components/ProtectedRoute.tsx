import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
