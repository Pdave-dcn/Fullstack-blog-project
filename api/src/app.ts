import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import router from "@/routes/appRouter.routes.js";
import initializePassport from "@/config/passport.js";
import cors from "cors";
import { corsOptions } from "@/config/cors.js";
import { errorMiddleware } from "@/interfaces/http/middlewares/error.middleware.js";
import { httpLogger } from "@/interfaces/http/middlewares/httpLogger.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(passport.initialize());
initializePassport(passport);

app.use(httpLogger);

app.use("/", router);

app.use(errorMiddleware);

export default app;
