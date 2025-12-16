import { UserRepository } from "@/domains/users/UserRepository.js";
import { User } from "@/domains/users/User.js";

export class GetAuthenticatedUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
