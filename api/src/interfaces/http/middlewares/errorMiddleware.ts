import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { DomainError } from "../../../domains/shared/DomainError";

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Domain errors → client errors
  if (err instanceof DomainError) {
    switch (err.name) {
      case "UnauthorizedAuthorError":
        res.status(403).json({ message: err.message });
      default:
        res.status(400).json({ message: err.message });
    }
  }

  // Unknown / programmer / infra errors
  console.error(err); // ← Pino will replace this later

  res.status(500).json({
    message: "Internal server error",
  });
};
