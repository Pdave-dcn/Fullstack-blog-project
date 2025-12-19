import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: unknown, user: Express.User | false) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthenticated" });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
