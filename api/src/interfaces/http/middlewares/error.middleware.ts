import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { DomainError } from "@/domains/shared/DomainError.js";
import { z, ZodError } from "zod";
import { logger } from "@/infrastructure/logger/logger.js";

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: z.treeifyError(err),
    });
    return;
  }

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
  logger.error({ err }, "Unhandled error");

  res.status(500).json({
    message: "Internal server error",
  });
};
