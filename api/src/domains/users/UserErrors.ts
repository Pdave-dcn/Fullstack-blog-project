import { DomainError } from "../shared/DomainError.js";

export class UsernameAlreadyExistsError extends DomainError {
  readonly code = "USERNAME_ALREADY_EXISTS";
  readonly status = 409;

  constructor(username: string) {
    super(`Username "${username}" is already in use.`);
  }
}

export class InvalidCredentialsError extends DomainError {
  readonly code = "INVALID_CREDENTIALS";
  readonly status = 401;

  constructor(field?: "username" | "password") {
    const messages = {
      username: "Invalid username.",
      password: "Invalid password.",
    };

    super(field ? messages[field] : "Invalid username or password.");
  }
}

export class UserNotFoundError extends DomainError {
  readonly code = "USER_NOT_FOUND";
  readonly status = 404;

  constructor(UserId: string) {
    super(`User with ID ${UserId} not found.`);
  }
}
