import { PassportStatic } from "passport";
import localStrategy from "./strategies/localStrategy.js";
import jwtStrategy from "./strategies/jwtStrategy.js";

const initializePassport = (passport: PassportStatic) => {
  passport.use("local", localStrategy);
  passport.use("jwt", jwtStrategy);
};

export default initializePassport;
