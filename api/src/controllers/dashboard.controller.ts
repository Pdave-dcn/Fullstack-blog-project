import prisma from "../infrastructure/db/prismaClient.js";
import { Request, Response } from "express";
import { handleServerError } from "../utils/error.js";
import { User } from "../utils/types.js";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author")
      return res.status(403).json({ message: "Access denied" });

    const [totalPosts, publishedPosts, draftPosts, totalComments] =
      await Promise.all([
        prisma.post.count(),
        prisma.post.count({ where: { status: "published" } }),
        prisma.post.count({ where: { status: "draft" } }),
        prisma.comment.count(),
      ]);

    res
      .status(200)
      .json({ totalPosts, publishedPosts, draftPosts, totalComments });
  } catch (error) {
    handleServerError("Error fetching dashboard stats", error, res);
  }
};

export const getRecentArticles = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author") {
      return res.status(403).json({ message: "Access denied" });
    }

    const recentArticles = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
      },
    });

    res.status(200).json(recentArticles);
  } catch (error) {
    handleServerError("Error fetching recent articles", error, res);
  }
};

export const getRecentComments = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    if (user.role !== "author") {
      return res.status(403).json({ message: "Access denied" });
    }

    const recentComments = await prisma.comment.findMany({
      where: { parentId: null },
      orderBy: { createdAt: "desc" },
      take: 2,
      select: {
        id: true,
        content: true,
        post: {
          select: {
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

    res.status(200).json(recentComments);
  } catch (error) {
    handleServerError("Error fetching recent comments", error, res);
  }
};
