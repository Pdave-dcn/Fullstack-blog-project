import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/AuthRequest.js";
import { UserRole } from "@/domains/users/UserRole.js";

export const requireRole =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    next();
  };
