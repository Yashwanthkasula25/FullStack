import { AuthContext } from "../hooks/useAuth";
import type { User } from "../types/user";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
}
