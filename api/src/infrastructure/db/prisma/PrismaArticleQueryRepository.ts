import prisma from "@/infrastructure/db/prismaClient.js";
import { Article } from "@/domains/articles/Article";
import { ArticleStatus as DomainArticleStatus } from "@/domains/articles/ArticleStatus";
import { ArticleDetailsView } from "@/application/articles/queries/ArticleDetails/ArticleDetailsView";
import { ArticleQueryRepository } from "@/domains/articles/ArticleQueryRepository";
import { ArticlesForAuthorTableView } from "@/application/articles/queries/ArticlesForAuthorTable/ArticlesForAuthorTableView";
import { GetArticlesForAuthorTableParams } from "@/application/articles/queries/ArticlesForAuthorTable/ArticlesForAuthorTableView";
import { Prisma } from "@/generated/prisma/client";

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

export class PrismaArticleQueryRepository implements ArticleQueryRepository {
  async getArticleDetails(id: string): Promise<ArticleDetailsView | null> {
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!article) return null;

    return {
      id: article.id,
      title: article.title,
      content: article.content,
      status: mapPrismaStatusToDomain(article.status),
      createdAt: article.createdAt,
      commentsCount: article._count.comments,
    };
  }

  async getArticlesForAuthorTable(
    params?: GetArticlesForAuthorTableParams
  ): Promise<ArticlesForAuthorTableView[]> {
    const where: Prisma.ArticleWhereInput = {};

    if (params?.status && params.status !== "all") {
      where.status = params.status.toUpperCase() as "DRAFT" | "PUBLISHED";
    }

    if (params?.search && params.search.trim()) {
      where.title = {
        contains: params.search.trim(),
        mode: "insensitive",
      };
    }

    const rows = await prisma.article.findMany({
      where,
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const articles: ArticlesForAuthorTableView[] = rows.map((row) => ({
      id: row.id,
      title: row.title,
      status: mapPrismaStatusToDomain(row.status),
      createdAt: row.createdAt,
      commentsCount: row._count.comments,
    }));

    return articles;
  }
}
