import { Request, Response } from "express";
import prisma from "../config/db";
import { PostStatus } from "../generated/prisma";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number; username: string; role: string };

    const whereClause =
      user.role === "author" ? undefined : { status: PostStatus.published };

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: { comments: true },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUniquePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.postId);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid post ID!" });

    const post = await prisma.post.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!post) return res.status(404).json({ message: "Post not found!" });

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number; username: string; role: string };
    if (user.role !== "author")
      return res.status(403).json({ message: "Access denied" });

    const { title, content, status } = req.body as {
      title: string;
      content: string;
      status: "published" | "draft";
    };
    if (!title || !content || !status)
      return res.status(400).json({ message: "All fields are required!" });

    const post = await prisma.post.create({
      data: { title, content, status, userId: user.id },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.postId);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid post ID" });

    const user = req.user as { id: number; username: string; role: string };
    if (user.role !== "author") {
      return res.status(403).json({ message: "Access denied" });
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: "Post not found!" });

    const { title, content, status } = req.body as {
      title?: string;
      content?: string;
      status?: "draft" | "published";
    };

    const updatedPost = await prisma.post.update({
      where: { id },
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
    console.error("Error editing post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.postId);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const user = req.user as { id: number; username: string; role: string };
    if (user.role !== "author") {
      return res.status(403).json({ message: "Access denied" });
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await prisma.post.delete({ where: { id } });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};
