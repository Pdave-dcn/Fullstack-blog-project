import { faker } from "@faker-js/faker";
import prisma from "../../prismaClient.js";

/**
 * Create test articles in the database
 * @param {string} authorId - ID of the author user
 * @param {number} articleCount - Number of articles to create
 * @returns {Promise<Object>} Created articles array
 */
const seedArticles = async (authorId: string, articleCount = 15) => {
  try {
    const articles = [];

    for (let i = 0; i < articleCount; i++) {
      // Randomly choose between DRAFT and PUBLISHED status
      const status = faker.datatype.boolean({ probability: 0.4 })
        ? "DRAFT"
        : "PUBLISHED";

      const article = await prisma.article.create({
        data: {
          title: faker.lorem.sentence({ min: 3, max: 8 }),
          content: faker.lorem.paragraphs({ min: 5, max: 15 }, "\n\n"),
          status: status,
          authorId: authorId,
        },
      });

      articles.push(article);
    }

    return { articles };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Articles seeding process failed: ${errorMessage}`);
  }
};

export default seedArticles;
