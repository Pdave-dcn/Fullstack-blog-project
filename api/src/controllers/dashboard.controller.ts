import prisma from "../config/db";
import { Request, Response } from "express";
import { handleServerError } from "../utils/error";
import { User } from "../utils/types";

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
