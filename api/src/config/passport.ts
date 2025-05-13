import { PassportStatic } from "passport";
import localStrategy from "./strategies/localStrategy";
import jwtStrategy from "./strategies/jwtStrategy";

const initializePassport = (passport: PassportStatic) => {
  passport.use("local", localStrategy);
  passport.use("jwt", jwtStrategy);
};

export default initializePassport;
