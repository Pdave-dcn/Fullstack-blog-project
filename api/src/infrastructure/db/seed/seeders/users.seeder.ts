import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

import prisma from "../../prismaClient.js";
import env from "@/configs/env.js";

/**
 * Create test users in the database
 * @param {number} userCount - Number of regular users to create (excluding author)
 * @returns {Promise<Object>} Author user ID and created users array
 */
const seedUsers = async (userCount = 10) => {
  try {
    const users = [];

    // Create author user first
    const authorPassword = env.AUTHOR_PASSWORD;
    const authorHashedPassword = await bcrypt.hash(authorPassword, 12);

    const authorUser = await prisma.user.create({
      data: {
        name: env.AUTHOR_NAME,
        username: env.AUTHOR_USERNAME,
        passwordHash: authorHashedPassword,
        role: "AUTHOR",
      },
    });

    users.push(authorUser);

    // Create guest user
    const guestPassword = env.GUEST_PASSWORD;
    const guestHashedPassword = await bcrypt.hash(guestPassword, 12);

    const guestUser = await prisma.user.create({
      data: {
        name: env.GUEST_NAME,
        username: env.GUEST_USERNAME,
        passwordHash: guestHashedPassword,
        role: "GUEST",
      },
    });

    users.push(guestUser);

    // Create regular users
    for (let i = 0; i < userCount; i++) {
      const password = faker.internet.password();
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          username: faker.internet.username(),
          passwordHash: hashedPassword,
          role: "READER",
        },
      });

      users.push(user);
    }

    return {
      authorId: authorUser.id,
      users,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Users seeding process failed: ${errorMessage}`);
  }
};

export default seedUsers;
