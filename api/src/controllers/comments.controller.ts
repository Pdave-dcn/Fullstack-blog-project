import { Request, Response } from "express";
import { handleServerError } from "../utils/error";
import prisma from "../config/db";

export const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number; username: string; role: string };

    const postId = Number(req.params.postId);
    if (isNaN(postId))
      return res.status(400).json({ message: "Invalid post ID!" });

    const content = req.body.content;
    if (!content) return res.status(400).json({ message: "Content required" });

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
    const user = req.user as { id: number; username: string; role: string };

    const postId = Number(req.params.postId);
    if (isNaN(postId))
      return res.status(400).json({ message: "Invalid post ID!" });

    const commentId = Number(req.params.commentId);
    if (isNaN(commentId))
      return res.status(400).json({ message: "Invalid comment ID!" });

    const comment = await prisma.comment.findUnique({
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
    const user = req.user as { id: number; username: string; role: string };

    const { content } = req.body as { content: string };
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty!" });
    }

    const postId = Number(req.params.postId);
    if (isNaN(postId))
      return res.status(400).json({ message: "Invalid post ID!" });

    const commentId = Number(req.params.commentId);
    if (isNaN(commentId))
      return res.status(400).json({ message: "Invalid comment ID!" });

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
