import "dotenv/config.js";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx src/infrastructure/db/seed/index.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
