import { Request, Response } from "express";
import prisma from "../config/db.js";
import { PostStatus } from "../generated/prisma";
import { handleServerError } from "../utils/error.js";
import { PostInput, User } from "../utils/types.js";
import { getValidatedPostId } from "../utils/validateParams.js";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const whereClause =
      user.role === "author" ? undefined : { status: PostStatus.published };

    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: { comments: true },
    });

    res.status(200).json(posts);
  } catch (error) {
    handleServerError("Error fetching posts", error, res);
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
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

    const commentSelect = {
      id: true,
      content: true,
      createdAt: true,
      parentId: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      parent: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    };

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          select: commentSelect,
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: {
          select: {
            comments: true,
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

export const updatePostStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author") {
      return res.status(403).json({ message: "Access denied" });
    }

    const postId = getValidatedPostId(req, res);
    if (!postId) return;

    const { status } = req.body;
    if (!Object.values(PostStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const isExisting = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!isExisting) return res.status(404).json({ message: "Post not found" });

    await prisma.post.update({
      where: { id: postId },
      data: {
        status: status,
      },
    });

    return res.status(200).json({
      message: "Post status updated successfully",
    });
  } catch (error) {
    handleServerError("Error updating post status", error, res);
  }
};

export const getRecentArticles = async (_req: Request, res: Response) => {
  try {
    const recentArticles = await prisma.post.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).json(recentArticles);
  } catch (error) {
    handleServerError("Error fetching recent articles", error, res);
  }
};
