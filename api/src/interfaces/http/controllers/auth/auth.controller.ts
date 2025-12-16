import { Request, Response, NextFunction } from "express";
import { container } from "@/infrastructure/di/container.js";
import jwt from "jsonwebtoken";
import {
  LoginUserSchema,
  SignupUserSchema,
} from "../../validators/users/auth.schema.js";

export const signupUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = SignupUserSchema.parse(req.body);
    const user = await container.signupUserUseCase.execute(parsed);

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "3d" }
    );

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      token,
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
    const user = await container.loginUserUseCase.execute(parsed);

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      process.env.JWT_SECRET!,
      {
        expiresIn: "3d",
      }
    );

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
