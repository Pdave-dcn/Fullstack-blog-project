import { Request, Response } from "express";
import { handleServerError } from "../utils/error.js";
import prisma from "../config/db.js";
import { User } from "../utils/types.js";

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
