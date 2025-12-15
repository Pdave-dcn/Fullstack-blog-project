import prisma from "@/config/db.js";
import { Article } from "@/domains/articles/Article";
import { ArticleStatus as DomainArticleStatus } from "@/domains/articles/ArticleStatus";
import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";

function mapPrismaStatusToDomain(status: string): DomainArticleStatus {
  switch (status) {
    case "DRAFT":
      return DomainArticleStatus.DRAFT;
    case "PUBLISHED":
      return DomainArticleStatus.PUBLISHED;
    default:
      throw new Error(`Unknown status ${status}`);
  }
}

export class PrismaArticleRepository implements ArticleRepository {
  async findById(id: string): Promise<Article | null> {
    const data = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
      },
    });

    if (!data) return null;

    // map plain object to domain entity
    return new Article(
      data.id,
      data.title,
      data.content,
      mapPrismaStatusToDomain(data.status),
      data.authorId,
      data.createdAt
    );
  }

  async update(article: Article): Promise<void> {
    await prisma.article.update({
      where: { id: article.id },
      data: {
        title: article.title,
        content: article.content,
        status: article.status,
        updatedAt: new Date(),
      },
    });
  }

  async create(article: Article): Promise<void> {
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
