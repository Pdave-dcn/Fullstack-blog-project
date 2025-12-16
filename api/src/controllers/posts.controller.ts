import { Request, Response } from "express";
import prisma from "../config/db.js";
import { handleServerError } from "../utils/error.js";

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
