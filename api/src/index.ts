import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import router from "./routes/appRouter.routes";
import initializePassport from "./config/passport";
import cors from "cors";
import { corsOptions } from "./config/cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(passport.initialize());
initializePassport(passport);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
