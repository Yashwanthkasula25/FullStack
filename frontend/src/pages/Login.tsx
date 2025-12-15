import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "../utils/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

 const mutation = useMutation({
  mutationFn: loginUser,
  onSuccess: () => {
    window.location.href = "/";
  },
});


  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <h2 className="text-2xl font-bold">Login</h2>

      <input {...register("email")} placeholder="Email" className="input" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password")} placeholder="Password" className="input" />
      {errors.password && <p>{errors.password.message}</p>}

      <button className="btn">Login</button>
    </form>
  );
}
