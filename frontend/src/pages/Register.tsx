import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerSchema, type RegisterInput } from "../utils/auth.schema";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
  mutationFn: registerUser,
  onSuccess: () => {
    alert("Registered successfully");
    navigate("/login");
  },
  onError: (error: any) => {
  console.error("REGISTER ERROR:", error);
  alert(error?.response?.data?.message || "Registration failed");
},


});


  const onSubmit = (data: RegisterInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md text-white shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              {...register("name")}
              placeholder="Your name"
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
  type="submit"
  disabled={mutation.isPending}
  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 py-2 rounded"
>
  {mutation.isPending ? "Registering..." : "Register"}
</button>

        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
