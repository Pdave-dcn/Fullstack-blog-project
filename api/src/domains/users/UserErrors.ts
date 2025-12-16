import { DomainError } from "@/domains/shared/DomainError.js";

export class UsernameAlreadyExistsError extends DomainError {
  constructor(username: string) {
    super(`Username "${username}" is already in use.`);
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super("Invalid username or password.");
  }
}
