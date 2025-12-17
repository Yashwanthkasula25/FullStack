import { z } from "zod";

/* REGISTER */
export const registerSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[@$!%*?&]/, "Must contain special character"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/* LOGIN  ✅ THIS WAS MISSING */
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
