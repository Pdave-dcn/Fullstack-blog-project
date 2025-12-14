import pinoHttp from "pino-http";
import { logger } from "@/infrastructure/logger/logger.js";

export const httpLogger = pinoHttp({
  logger,
});
