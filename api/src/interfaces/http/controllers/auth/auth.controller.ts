import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  LoginUserSchema,
  SignupUserSchema,
} from "../../validators/users/auth.schema.js";
import { getCookieConfig } from "@/infrastructure/http/cookies/authCookieConfig.js";
import env from "@/configs/env.js";
import { container } from "@/infrastructure/di/containers/index.js";

export const signupUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = SignupUserSchema.parse(req.body);
    const user = await container.users.signupUseCase.execute(parsed);

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("auth", token, getCookieConfig());

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = LoginUserSchema.parse(req.body);
    const user = await container.users.loginUseCase.execute(parsed);

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("auth", token, getCookieConfig());

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
