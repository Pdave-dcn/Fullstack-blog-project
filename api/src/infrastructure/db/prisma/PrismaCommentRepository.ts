import prisma from "@/config/db.js";
import { CommentRepository } from "@/domains/comments/CommentRepository.js";
import { Comment } from "@/domains/comments/Comment.js";

type PrismaCommentRow = {
  id: string;
  articleId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  parentId: string | null;
  mentionedUserId: string | null;
};

function mapPrismaCommentToDomain(row: PrismaCommentRow): Comment {
  return new Comment(
    row.id,
    row.articleId,
    row.authorId,
    row.content,
    row.createdAt,
    row.parentId ?? undefined,
    row.mentionedUserId ?? undefined
  );
}

export class PrismaCommentRepository implements CommentRepository {
  async findById(id: string): Promise<Comment | null> {
    const row = await prisma.comment.findUnique({ where: { id } });
    if (!row) return null;
    return mapPrismaCommentToDomain(row);
  }

  async findByArticleId(articleId: string): Promise<Comment[]> {
    const rows = await prisma.comment.findMany({
      where: { articleId },
      orderBy: { createdAt: "asc" },
    });
    return rows.map(mapPrismaCommentToDomain);
  }

  async create(comment: Comment): Promise<void> {
    await prisma.comment.create({
      data: {
        id: comment.id,
        articleId: comment.articleId,
        authorId: comment.authorId,
        content: comment.content,
        parentId: comment.parentId ?? null,
        mentionedUserId: comment.mentionedUserId ?? null,
        createdAt: comment.createdAt,
      },
    });
  }

  async deleteById(commentId: string): Promise<void> {
    await prisma.comment.delete({ where: { id: commentId } });
  }

  async update(comment: Comment): Promise<void> {
    await prisma.comment.update({
      where: { id: comment.id },
      data: {
        content: comment.content,
        updatedAt: new Date(),
      },
    });
  }
}
