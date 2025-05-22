import { Request, Response } from "express";
import prisma from "../config/db";
import { PostStatus } from "../generated/prisma";
import { handleServerError } from "../utils/error";
import { PostInput, User } from "../utils/types";
import { getValidatedPostId } from "../utils/validateParams";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const whereClause =
      user.role === "author" ? undefined : { status: PostStatus.published };

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: { comments: true },
    });

    res.status(200).json(posts);
  } catch (error) {
    handleServerError("Error fetching posts", error, res);
  }
};

export const getUniquePost = async (req: Request, res: Response) => {
  try {
    const postId = getValidatedPostId(req, res);
    if (!postId) return;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!post) return res.status(404).json({ message: "Post not found!" });

    res.status(200).json(post);
  } catch (error) {
    handleServerError("Error fetching post", error, res);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author")
      return res.status(403).json({ message: "Access denied" });

    const { title, content, status } = req.body as PostInput;

    if (!title || !content || !status)
      return res.status(400).json({ message: "All fields are required!" });

    if (!Object.values(PostStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const post = await prisma.post.create({
      data: { title, content, status, userId: user.id },
    });

    res.status(201).json(post);
  } catch (error) {
    handleServerError("Error creating post", error, res);
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const postId = getValidatedPostId(req, res);
    if (!postId) return;

    const user = req.user as User;

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post not found!" });

    if (user.role !== "author" || post.userId !== user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, content, status } = req.body as PostInput;

    if (status && !Object.values(PostStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title ?? post.title,
        content: content ?? post.content,
        status: status ? (status as PostStatus) : post.status,
      },
    });

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    handleServerError("Error editing post", error, res);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = getValidatedPostId(req, res);
    if (!postId) return;

    const user = req.user as User;
    if (user.role !== "author") {
      return res.status(403).json({ message: "Access denied" });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await prisma.post.delete({ where: { id: postId } });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    handleServerError("Error deleting post", error, res);
  }
};
