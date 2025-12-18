import { ArticleCommentView } from "@/application/comments/queries/ListArticleComments/ArticleCommentView.js";
import { CommentForAuthorView } from "@/application/comments/queries/ListAuthorComments/CommentForAuthorView.js";
import { CommentReplyView } from "@/application/comments/queries/ListCommentReplies/CommentReplyView.js";
import prisma from "@/infrastructure/db/prismaClient.js";
import { CommentQueryRepository } from "@/domains/comments/CommentQueryRepository.js";

export class PrismaCommentQueryRepository implements CommentQueryRepository {
  async listAuthorComments(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const rows = await prisma.comment.findMany({
      where: { parentId: null },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        content: true,
        createdAt: true,
        article: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });

    const items: CommentForAuthorView[] = rows.map((row) => ({
      id: row.id,
      content: row.content,
      createdAt: row.createdAt,
      article: {
        id: row.article.id,
        title: row.article.title,
      },
      user: {
        name: row.user.name,
        username: row.user.username,
      },
    }));

    const total = await prisma.comment.count({
      where: { parentId: null },
    });

    return { items, total };
  }

  async listArticleComments(
    articleId: string,
    limit: number,
    cursor?: string
  ): Promise<{
    items: ArticleCommentView[];
    nextCursor: string | null;
    hasMore: boolean;
  }> {
    const rows = await prisma.comment.findMany({
      where: {
        articleId,
        parentId: null,
      },
      orderBy: { createdAt: "asc" },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;

    const nextCursor =
      hasMore && items.length > 0 ? items[items.length - 1].id : null;

    const result: ArticleCommentView[] = items.map((row) => ({
      id: row.id,
      content: row.content,
      createdAt: row.createdAt,
      author: {
        id: row.user.id,
        username: row.user.username,
      },
      repliesCount: row._count.replies,
    }));

    return {
      items: result,
      nextCursor,
      hasMore,
    };
  }

  async listCommentReplies(
    parentCommentId: string,
    limit: number,
    cursor?: string
  ): Promise<{
    items: CommentReplyView[];
    nextCursor: string | null;
    hasMore: boolean;
  }> {
    const rows = await prisma.comment.findMany({
      where: {
        parentId: parentCommentId,
      },
      orderBy: { createdAt: "asc" },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        mentionedUser: {
          select: {
            username: true,
          },
        },
      },
    });

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;

    const nextCursor =
      hasMore && items.length > 0 ? items[items.length - 1].id : null;

    const result: CommentReplyView[] = items.map((row) => ({
      id: row.id,
      content: row.content,
      createdAt: row.createdAt,
      mentionedUser: row.mentionedUser ?? undefined,
      author: {
        id: row.user.id,
        username: row.user.username,
      },
    }));

    return {
      items: result,
      nextCursor,
      hasMore,
    };
  }
}
