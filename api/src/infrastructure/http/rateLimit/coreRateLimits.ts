import rateLimit, { type Options } from "express-rate-limit";

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
}

const createRateLimiter = ({ windowMs, max, message }: RateLimitConfig) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      code: "RATE_LIMIT_EXCEEDED",
      message,
    },
  } satisfies Partial<Options>);
};

export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many authentication attempts. Please wait 15 minutes.",
});

export const registerLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: "Too many accounts created. Please wait 1 hour.",
});

export const writeOperationsLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message:
    "You've reached the hourly limit. You can make up to 10 changes (create, update, or delete) per hour. Please try again later.",
});

export const generalApiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "API rate limit exceeded. Please slow down.",
});
