import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../db.js";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET not defined in environment variables");
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) return done(null, false);

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default jwtStrategy;
