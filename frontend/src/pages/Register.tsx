import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "../utils/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const mutation = useMutation({
    mutationFn: registerUser,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <h2 className="text-2xl font-bold">Register</h2>

      <input {...register("name")} placeholder="Name" className="input" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Email" className="input" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password")} placeholder="Password" className="input" />
      {errors.password && <p>{errors.password.message}</p>}

      <button className="btn">Register</button>
    </form>
  );
}
