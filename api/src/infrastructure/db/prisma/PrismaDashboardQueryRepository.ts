import prisma from "../prismaClient.js";
import { DashboardQueryRepository } from "@/domains/dashboard/DashboardQueryRepository.js";

export class PrismaDashboardQueryRepository
  implements DashboardQueryRepository
{
  async getStats() {
    const [totalArticles, publishedArticles, draftArticles, totalComments] =
      await Promise.all([
        prisma.article.count(),
        prisma.article.count({ where: { status: "PUBLISHED" } }),
        prisma.article.count({ where: { status: "DRAFT" } }),
        prisma.comment.count(),
      ]);

    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      totalComments,
    };
  }

  async getRecentArticles(limit: number) {
    const rows = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
      },
    });

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      status: row.status,
      updatedAt: row.updatedAt,
    }));
  }

  async getRecentComments(limit: number) {
    const rows = await prisma.comment.findMany({
      where: { parentId: null },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        content: true,
        createdAt: true,
        article: {
          select: { title: true },
        },
        user: {
          select: { name: true, username: true },
        },
      },
    });

    return rows.map((row) => ({
      id: row.id,
      content: row.content,
      articleTitle: row.article.title,
      author: {
        name: row.user.name,
        username: row.user.username,
      },
      createdAt: row.createdAt,
    }));
  }
}
