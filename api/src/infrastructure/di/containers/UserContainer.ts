import { SignupUserUseCase } from "@/application/users/signup/SignupUserUseCase.js";
import { LoginUserUseCase } from "@/application/users/login/LoginUserUseCase.js";
import { GetAuthenticatedUserUseCase } from "@/application/auth/GetAuthenticatedUserUseCase.js";
import { PrismaUserRepository } from "@/infrastructure/db/prisma/PrismaUserRepository.js";

/**
 * User domain dependency injection container.
 *
 * Manages all user-related repositories and use cases including
 * authentication, registration, and user profile operations.
 *
 * @example
 * const users = new UserContainer();
 * const user = await users.signupUseCase.execute({
 *   email: 'user@example.com',
 *   password: 'secure-password',
 *   username: 'johndoe'
 * });
 */
export class UserContainer {
  public readonly repository: PrismaUserRepository;
  public readonly signupUseCase: SignupUserUseCase;
  public readonly loginUseCase: LoginUserUseCase;
  public readonly getAuthenticatedUseCase: GetAuthenticatedUserUseCase;

  constructor() {
    this.repository = new PrismaUserRepository();
    this.signupUseCase = new SignupUserUseCase(this.repository);
    this.loginUseCase = new LoginUserUseCase(this.repository);
    this.getAuthenticatedUseCase = new GetAuthenticatedUserUseCase(
      this.repository
    );
  }
}
