import { PostStatus } from "@prisma/client";

export type User = { id: number; username: string; role: string };

export type PostInput = { title: string; content: string; status: PostStatus };
