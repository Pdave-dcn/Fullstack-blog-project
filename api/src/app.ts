import "dotenv/config.js";
import express from "express";
import passport from "passport";
import router from "./interfaces/http/routes/index.js";
import initializePassport from "./infrastructure/auth/passport/passport.js";
import cors from "cors";
import { corsOptions } from "./configs/cors.js";
import { errorMiddleware } from "./interfaces/http/middlewares/error.middleware.js";
import { httpLogger } from "./interfaces/http/middlewares/httpLogger.middleware.js";
import cookieParser from "cookie-parser";
import env from "./configs/env.js";

const app = express();

if (env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
initializePassport(passport);

app.use(httpLogger);

app.use("/", router);

app.use(errorMiddleware);

export default app;
