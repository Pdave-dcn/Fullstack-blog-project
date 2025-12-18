import { UserRepository } from "@/domains/users/UserRepository.js";
import { User } from "@/domains/users/User.js";
import { UserRole as DomainUserRole } from "@/domains/users/UserRole.js";
import prisma from "@/infrastructure/db/prismaClient.js";

function mapPrismaRoleToDomain(role: string): DomainUserRole {
  switch (role) {
    case "READER":
      return DomainUserRole.READER;
    case "AUTHOR":
      return DomainUserRole.AUTHOR;
    default:
      throw new Error(`Unknown role ${role}`);
  }
}

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { id } });
    if (!row) return null;

    return new User(
      row.id,
      row.name,
      row.username,
      row.passwordHash,
      mapPrismaRoleToDomain(row.role),
      row.createdAt
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { username } });
    if (!row) return null;

    return new User(
      row.id,
      row.name,
      row.username,
      row.passwordHash,
      mapPrismaRoleToDomain(row.role),
      row.createdAt
    );
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        username: user.username,
        passwordHash: user.passwordHash,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  }
}
