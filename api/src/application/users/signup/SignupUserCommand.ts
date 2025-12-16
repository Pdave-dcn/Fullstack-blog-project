import { UserRole } from "@/domains/users/UserRole.js";

export interface SignupUserCommand {
  name: string;
  username: string;
  password: string;
  role?: UserRole;
}
