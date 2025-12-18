import { z } from "zod";

const baseSchema = z.object({
  DATABASE_URL: z.url().refine((val) => val.startsWith("postgresql://"), {
    message: "DATABASE_URL must be a valid PostgreSQL connection string",
  }),
  ALLOWED_ORIGINS: z
    .string()
    .trim()
    .transform((val) => val.split(",").map((url) => url.trim()))
    .refine((urls) => urls.length === 2, {
      message: "ALLOWED_ORIGINS must contain exactly 2 URLs",
    })
    .refine((urls) => urls.every((url) => z.url().safeParse(url).success), {
      message: "ALLOWED_ORIGINS must contain valid URLs",
    }),
  JWT_SECRET: z
    .string()
    .trim()
    .min(10, "JWT_SECRET must be at least 10 characters long"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),

  AUTHOR_NAME: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .default("author user"),

  AUTHOR_USERNAME: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .default("author_user"),

  AUTHOR_PASSWORD: z
    .string()
    .trim()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .regex(/^[\u0020-\u007E]+$/)
    .default("Author123"),
});

// Enforce production rules
const envSchema = baseSchema.superRefine((vals, ctx) => {
  if (vals.NODE_ENV === "production") {
    const requiredFields: (keyof typeof vals)[] = [
      "AUTHOR_NAME",
      "AUTHOR_USERNAME",
      "AUTHOR_PASSWORD",
    ];

    for (const field of requiredFields) {
      if (!process.env[field] || process.env[field] === "") {
        ctx.addIssue({
          code: "custom",
          message: `${field} is required in production and must be set in the environment.`,
          path: [field],
        });
      }
    }
  }
});

export default envSchema;
