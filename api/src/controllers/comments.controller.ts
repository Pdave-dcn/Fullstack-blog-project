import { Request, Response } from "express";
import { handleServerError } from "../utils/error.js";
import prisma from "../config/db.js";
import { User } from "../utils/types.js";
import { getValidatedPostAndCommentIds } from "../utils/validateParams.js";

export const AuthorGetComments = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author")
      return res.status(403).json({ message: "Access denied" });

    const page = parseInt(req.params.page as string) || 1;
    const pageSize = parseInt(req.params.pageSize as string) || 10;

    if (isNaN(page))
      return res.status(400).json({ message: "Invalid page number" });
    if (isNaN(pageSize))
      return res.status(400).json({ message: "Invalid page size" });

    const skip = (page - 1) * pageSize;

    const comments = await prisma.comment.findMany({
      where: { parentId: null },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: pageSize,
      select: {
        id: true,
        content: true,
        post: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            username: true,
          },
        },
        createdAt: true,
      },
    });

    const totalComments = await prisma.comment.count({
      where: { parentId: null },
    });

    res.status(200).json({
      data: comments,
      pagination: {
        totalItems: totalComments,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(totalComments / pageSize),
      },
    });
  } catch (error) {
    handleServerError("Error fetching comments", error, res);
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const { content } = req.body as { content: string };
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty!" });
    }

    const ids = getValidatedPostAndCommentIds(req, res);
    if (!ids) return;

    const { postId, commentId } = ids;

    const comment = await prisma.comment.findFirst({
      where: { id: commentId, postId },
    });
    if (!comment)
      return res
        .status(404)
        .json({ message: "Comment not found for this post!" });

    if (comment.userId !== user.id)
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this comment" });

    const editedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content: content ?? comment.content },
    });

    res.status(200).json({
      message: "Comment edited successfully",
      editedComment,
    });
  } catch (error) {
    handleServerError("Error editing comment", error, res);
  }
};
