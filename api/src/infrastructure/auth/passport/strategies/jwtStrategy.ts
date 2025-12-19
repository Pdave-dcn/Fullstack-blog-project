import { container } from "@/infrastructure/di/containers/index.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET not defined in environment variables");
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
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
