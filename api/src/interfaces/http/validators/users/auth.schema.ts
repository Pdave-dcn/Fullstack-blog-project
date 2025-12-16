import { UserRole } from "@/domains/users/UserRole";
import { z } from "zod";

export const SignupUserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(8),
  role: z.enum(UserRole).optional(),
});

export const LoginUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});
