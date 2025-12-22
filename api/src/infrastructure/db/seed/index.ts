import prisma from "../prismaClient.js";
import seedUsers from "./seeders/users.seeder.js";
import seedArticles from "./seeders/articles.seeder.js";
import seedComments from "./seeders/comments.seeder.js";
import { logger } from "@/infrastructure/logger/logger.js";

const main = async () => {
  try {
    logger.info("Starting seeding process");

    // Phase 1: Cleanup existing data
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();

    // Phase 2: Seed users
    const { authorId, users } = await seedUsers(10);

    // Phase 3: Seed articles
    const { articles } = await seedArticles(authorId, 10);

    // Phase 4: Seed comments
    await seedComments(users, articles);

    logger.info("Seeding process completed successfully");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Seeding process failed: ${errorMessage}`);
  }
};

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
