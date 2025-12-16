import { UserRepository } from "@/domains/users/UserRepository.js";
import { LoginUserCommand } from "./LoginUserCommand.js";
import { InvalidCredentialsError } from "@/domains/users/UserErrors.js";
import bcrypt from "bcryptjs";
import { User } from "@/domains/users/User.js";

export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: LoginUserCommand): Promise<User> {
    const user = await this.userRepository.findByUsername(command.username);
    if (!user) throw new InvalidCredentialsError();

    const isValid = await bcrypt.compare(command.password, user.passwordHash);
    if (!isValid) throw new InvalidCredentialsError();

    return user;
  }
}
