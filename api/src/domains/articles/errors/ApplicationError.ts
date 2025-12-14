export abstract class ApplicationError extends Error {
  abstract readonly name: string;
}
