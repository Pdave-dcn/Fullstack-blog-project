import prisma from "@/config/db";
import { ArticleRepository } from "@/domains/articles/ArticleRepository";
import { Article } from "@/domains/articles/Article";

export class PrismaArticleRepository implements ArticleRepository {
  async save(article: Article): Promise<void> {
    await prisma.article.create({
      data: {
        id: article.id,
        title: article.title,
        content: article.content,
        status: article.status,
        authorId: article.authorId,
        createdAt: article.createdAt,
      },
    });
  }
}
