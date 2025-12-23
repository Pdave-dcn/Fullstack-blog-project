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
  logger.warn({ err }, "Request error caught in middleware");

  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation failed",
      errors: z.treeifyError(err),
    });
    return;
  }

  if (err instanceof DomainError) {
    const status = err.name === "UnauthorizedAuthorError" ? 403 : 400;
    res.status(status).json({ message: err.message });
    return;
  }

  logger.error({ err }, "Unhandled critical error");
  res.status(500).json({
    message: "Internal server error",
  });
};
