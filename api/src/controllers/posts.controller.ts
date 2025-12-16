import { Request, Response } from "express";
import prisma from "../config/db.js";
import { handleServerError } from "../utils/error.js";
import { getValidatedPostId } from "../utils/validateParams.js";

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
