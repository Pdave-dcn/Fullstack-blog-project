import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/AuthRequest.js";
import { UserRole } from "@/domains/users/UserRole.js";

export const requireRole =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
      req.log.warn(
        {
          path: req.originalUrl,
        },
        "Authorization attempted without authenticated user"
      );

      res.status(403).json({ message: "Access denied" });
      return;
    }

    if (!roles.includes(user.role)) {
      req.log.warn(
        {
          userId: user.id,
          role: user.role,
          requiredRoles: roles,
          path: req.originalUrl,
        },
        "Authorization denied"
      );

      res.status(403).json({ message: "Access denied" });
      return;
    }

    req.log.info(
      {
        userId: user.id,
        role: user.role,
      },
      "Authorization granted"
    );

    next();
  };
