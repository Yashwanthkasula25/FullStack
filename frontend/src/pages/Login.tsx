import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { loginSchema, type LoginInput } from "../utils/auth.schema";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();          // ✅ hook inside component
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      const token = res.data.access_token; // ✅ correct axios access
      login(token);
      navigate("/dashboard");
    },
    onError: () => {
      alert("Invalid email or password");
    },
  });

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-slate-900 rounded-xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              {...register("email")}
              className="w-full mt-1 px-4 py-2 rounded-md bg-slate-800 text-white"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 rounded-md bg-slate-800 text-white"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-red-600 text-white py-2 rounded-md"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
