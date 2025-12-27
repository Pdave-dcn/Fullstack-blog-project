import { UserRepository } from "@/domains/users/UserRepository.js";
import { UserRole } from "@/domains/users/UserRole.js";
import { JwtService } from "@/application/auth/services/JwtService.js";

export class LoginGuestUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly jwt: JwtService,
    private readonly guestUsername: string
  ) {}

  async execute() {
    const user = await this.users.findByUsername(this.guestUsername);
    if (!user) {
      throw new Error("Guest user not found");
    }

    if (user.role !== UserRole.GUEST) {
      throw new Error("Invalid guest configuration");
    }

    const token = this.jwt.sign({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      token,
      user,
    };
  }
}
