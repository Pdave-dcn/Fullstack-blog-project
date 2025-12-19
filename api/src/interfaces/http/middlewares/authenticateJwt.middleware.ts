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
        req.log.error({ err }, "JWT authentication error");
        return next(err);
      }

      if (!user) {
        req.log.warn(
          {
            path: req.originalUrl,
            ip: req.ip,
          },
          "Unauthenticated request"
        );
        return res.status(401).json({ message: "Unauthenticated" });
      }

      req.user = user;

      req.log.info(
        {
          userId: user.id,
          role: user.role,
        },
        "User authenticated successfully"
      );

      next();
    }
  )(req, res, next);
};
