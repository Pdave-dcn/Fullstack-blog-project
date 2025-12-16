import { UserRepository } from "@/domains/users/UserRepository.js";
import { SignupUserCommand } from "./SignupUserCommand.js";
import { User } from "@/domains/users/User.js";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { UserRole } from "@/domains/users/UserRole.js";
import { UsernameAlreadyExistsError } from "@/domains/users/UserErrors.js";

export class SignupUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: SignupUserCommand): Promise<User> {
    const existing = await this.userRepository.findByUsername(command.username);
    if (existing) throw new UsernameAlreadyExistsError(command.username);

    const passwordHash = await bcrypt.hash(command.password, 12);

    const user = User.create({
      id: randomUUID(),
      name: command.name,
      username: command.username,
      passwordHash,
      role: command.role ?? UserRole.READER,
    });

    await this.userRepository.create(user);

    return user;
  }
}
