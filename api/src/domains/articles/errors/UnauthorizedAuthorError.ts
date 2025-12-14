import { DomainError } from "../../shared/DomainError";

export class UnauthorizedAuthorError extends DomainError {
  readonly name = "UnauthorizedAuthorError";

  constructor() {
    super("Only authors can create articles");
  }
}
