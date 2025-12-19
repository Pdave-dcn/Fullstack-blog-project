import type { UserRole } from "@/domains/users/UserRole.js";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      role: UserRole;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
