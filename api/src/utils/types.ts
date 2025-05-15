import { PostStatus } from "../generated/prisma";

export type User = { id: number; username: string; role: string };

export type PostInput = { title: string; content: string; status: PostStatus };
