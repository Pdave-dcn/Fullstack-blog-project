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

const RoleEnum = z.enum(["AUTHOR", "READER", "GUEST"]);

const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  username: z.string(),
  role: RoleEnum,
});

const AuthResponseSchema = z.object({
  user: UserSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type Role = z.infer<typeof RoleEnum>;
export type User = z.infer<typeof UserSchema>;

export { loginSchema, AuthResponseSchema };
