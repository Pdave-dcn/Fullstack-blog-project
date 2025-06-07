import { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/db.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import { User, UserRole } from "../generated/prisma";
import { handleServerError } from "../utils/error.js";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, username, password, role } = req.body;

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, and password are required!" });
    }

    const roleOfUser =
      role && Object.values(UserRole).includes(role) ? role : "user";

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser)
      return res.status(409).json({ message: "Username already in use!" });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, username, passwordHash, role: roleOfUser },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "3d" }
    );

    res.status(201).json({
      message: "User created Successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    handleServerError("Signup error", error, res);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false },
    (
      err: Error | null,
      user: User | false | null,
      info: { message: string } | undefined
    ) => {
      if (err) return next(err);

      if (!user)
        return res
          .status(401)
          .json({ message: info?.message || "Unauthorized" });

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "3d" }
      );

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
        token,
      });
    }
  )(req, res, next);
};
