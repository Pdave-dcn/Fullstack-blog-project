import { Strategy as LocalStrategy } from "passport-local";
import { container } from "@/infrastructure/di/container.js";
import { LoginUserCommand } from "@/application/users/login/LoginUserCommand.js";
import { InvalidCredentialsError } from "@/domains/users/UserErrors.js";

const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, done) => {
    try {
      const command: LoginUserCommand = { username, password };
      const user = await container.loginUserUseCase.execute(command);

      return done(null, user);
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return done(null, false, {
          message: "Invalid username or password",
        });
      }
      return done(err);
    }
  }
);

export default localStrategy;
