import { Request, Response } from "express";
import { handleServerError } from "../utils/error";
import prisma from "../config/db";
import { User } from "../utils/types";
import {
  getValidatedPostAndCommentIds,
  getValidatedPostId,
} from "../utils/validateParams";

export const AuthorGetComments = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author")
      return res.status(403).json({ message: "Access denied" });

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
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

    res.status(200).json(comments);
  } catch (error) {
    handleServerError("Error fetching comments", error, res);
  }
};

export const AuthorDeleteComment = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author")
      return res.status(403).json({ message: "Access denied" });

    const commentId = Number(req.params.commentId);
    if (isNaN(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID!" });
    }

    const isExisting = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!isExisting)
      return res.status(404).json({ message: "Comment not found" });

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    handleServerError("Error deleting comment", error, res);
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const postId = getValidatedPostId(req, res);
    if (!postId) return;

    const content = req.body.content;
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty!" });
    }

    const postExists = await prisma.post.findUnique({ where: { id: postId } });
    if (!postExists) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const comment = await prisma.comment.create({
      data: { content, postId, userId: user.id },
    });

    res.status(201).json({
      message: "Comment created",
      comment,
    });
  } catch (error) {
    handleServerError("Error creating comment", error, res);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

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
        .json({ message: "Unauthorized to delete this comment" });

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    handleServerError("Error deleting comment", error, res);
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
