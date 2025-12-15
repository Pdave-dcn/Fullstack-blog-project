import prisma from "@/config/db.js";
import { Article } from "@/domains/articles/Article";
import {
  ArticleStatus,
  ArticleStatus as DomainArticleStatus,
} from "@/domains/articles/ArticleStatus";
import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";

type PrismaArticleRow = {
  id: string;
  title: string;
  content: string;
  status: string;
  authorId: string;
  createdAt: Date;
};

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

export function mapPrismaArticleToDomain(row: PrismaArticleRow): Article {
  return new Article(
    row.id,
    row.title,
    row.content,
    mapPrismaStatusToDomain(row.status),
    row.authorId,
    row.createdAt
  );
}

export class PrismaArticleRepository implements ArticleRepository {
  async findById(id: string): Promise<Article | null> {
    const row = await prisma.article.findUnique({
      where: { id },
    });

    if (!row) return null;

    return mapPrismaArticleToDomain(row);
  }

  async findByStatuses(statuses: ArticleStatus[]): Promise<Article[]> {
    const rows = await prisma.article.findMany({
      where: { status: { in: statuses } },
      orderBy: { createdAt: "desc" },
    });

    return rows.map(mapPrismaArticleToDomain);
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

  async deleteById(articleId: string): Promise<void> {
    await prisma.article.delete({ where: { id: articleId } });
  }
}
