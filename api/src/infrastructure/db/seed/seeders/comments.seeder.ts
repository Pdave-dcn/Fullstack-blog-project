import { faker } from "@faker-js/faker";
import prisma from "../../prismaClient.js";
import { Article, Prisma, User } from "@/generated/prisma/client.js";

/**
 * Create test comments in the database
 * @param {User[]} users - Array of users to author comments
 * @param {Article[]} articles - Array of articles to comment on
 * @returns {Promise<Object>} Comment statistics
 */
const seedComments = async (users: User[], articles: Article[]) => {
  try {
    // -------------------------------
    // PHASE 1: ROOT COMMENTS
    // -------------------------------
    const rootCommentsData: Prisma.CommentUncheckedCreateInput[] = [];

    for (const article of articles) {
      const commentCount = faker.number.int({ min: 0, max: 15 });

      for (let i = 0; i < commentCount; i++) {
        rootCommentsData.push({
          content: faker.lorem.sentences(faker.number.int({ min: 1, max: 5 })),
          articleId: article.id,
          authorId: faker.helpers.arrayElement(users).id,
        });
      }
    }

    const rootComments = await prisma.comment.createManyAndReturn({
      data: rootCommentsData,
    });

    // -------------------------------
    // PHASE 2: FIRST-LEVEL REPLIES
    // -------------------------------
    const commentsEligibleForReplies = rootComments.filter(() =>
      faker.datatype.boolean({ probability: 0.3 })
    );

    const firstLevelRepliesData: Prisma.CommentUncheckedCreateInput[] = [];

    for (const parentComment of commentsEligibleForReplies) {
      const replyCount = faker.number.int({ min: 1, max: 6 });

      for (let i = 0; i < replyCount; i++) {
        const author = faker.helpers.arrayElement(users);

        firstLevelRepliesData.push({
          content: faker.lorem.sentences(faker.number.int({ min: 1, max: 2 })),
          articleId: parentComment.articleId,
          authorId: author.id,
          parentId: parentComment.id,
          mentionedUserId: null,
        });
      }
    }

    const firstLevelReplies = await prisma.comment.createManyAndReturn({
      data: firstLevelRepliesData,
    });

    // -------------------------------
    // PHASE 3: DEEP REPLIES (replies to replies)
    // -------------------------------
    const deepRepliesEligible = firstLevelReplies.filter(() =>
      faker.datatype.boolean({ probability: 0.15 })
    );

    const deepRepliesData: Prisma.CommentUncheckedCreateInput[] = [];

    for (const reply of deepRepliesEligible) {
      const deepReplyCount = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < deepReplyCount; i++) {
        const author = faker.helpers.arrayElement(users);

        deepRepliesData.push({
          content: faker.lorem.sentences(faker.number.int({ min: 1, max: 2 })),
          articleId: reply.articleId,
          authorId: author.id,
          parentId: reply.parentId,
          mentionedUserId: reply.authorId,
        });
      }
    }

    await prisma.comment.createManyAndReturn({
      data: deepRepliesData,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Comments seeding process failed: ${errorMessage}`);
  }
};

export default seedComments;
