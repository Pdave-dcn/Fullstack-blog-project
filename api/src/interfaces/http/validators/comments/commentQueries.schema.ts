import { z } from "zod";

export const AuthorCommentsQuerySchema = z.object({
  page: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val), { message: "Page must be a number" })
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),
  pageSize: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !isNaN(val), { message: "Page size must be a number" })
    .refine((val) => val > 0, { message: "Page size must be greater than 0" })
    .transform((val) => Math.min(val, 50)),
});

const CursorPaginationSchema = z.object({
  limit: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !isNaN(val), { message: "limit must be a number" })
    .refine((val) => val > 0, { message: "limit must be greater than 0" })
    .transform((val) => Math.min(val, 50)),
  cursor: z.uuid().optional(),
});

export const ArticleCommentsQuerySchema = CursorPaginationSchema.extend({
  articleId: z.uuid(),
});

export const CommentRepliesQuerySchema = CursorPaginationSchema.extend({
  parentCommentId: z.uuid(),
});
