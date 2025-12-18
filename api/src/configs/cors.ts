import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import env from "./env.js";

const allowedOrigins = env.ALLOWED_ORIGINS;

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
