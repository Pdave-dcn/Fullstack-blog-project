import express, { RequestHandler, Router } from "express";
import { loginUser, signupUser } from "../controllers/auth.controller.js";

const router: Router = express.Router();

router.post("/users/signup", signupUser as RequestHandler);

router.post("/users/login", loginUser as RequestHandler);

export default router;
