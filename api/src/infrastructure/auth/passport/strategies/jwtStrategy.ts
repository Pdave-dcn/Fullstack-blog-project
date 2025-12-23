import env from "@/configs/env";
import { container } from "@/infrastructure/di/containers/index.js";
import { Request } from "express";
import { Strategy as JwtStrategy } from "passport-jwt";

const cookieExtractor = (req: Request) => {
  if (req?.cookies) {
    return req.cookies["token"];
  }

  return null;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: env.JWT_SECRET,
};

type JwtPayload = {
  id: string;
  role: string;
  username: string;
};

const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload: JwtPayload, done) => {
    try {
      const user = await container.users.getAuthenticatedUseCase.execute(
        payload.id
      );

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err: unknown) {
      return done(err);
    }
  }
);

export default jwtStrategy;
