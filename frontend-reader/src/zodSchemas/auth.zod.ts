import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 5 characters"),
});

const RoleEnum = z.enum(["AUTHOR", "READER"]);

const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  username: z.string(),
  role: RoleEnum,
});

const AuthResponseSchema = z.object({
  user: UserSchema,
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export type FormData = SignupFormData | LoginFormData;

export type Role = z.infer<typeof RoleEnum>;
export type User = z.infer<typeof UserSchema>;

export { loginSchema, signupSchema, AuthResponseSchema };
