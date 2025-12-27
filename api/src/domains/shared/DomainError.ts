export abstract class DomainError extends Error {
  abstract readonly code?: string;
  abstract readonly status: number;
  readonly isOperational = true;

  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
