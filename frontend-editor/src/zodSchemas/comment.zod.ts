import { z } from "zod";

const AuthorSchema = z.object({
  id: z.uuid(),
  username: z.string(),
});

const BaseCommentSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  createdAt: z.string(),
  authorId: z.uuid(),
  author: AuthorSchema,
  repliesCount: z.number().nonnegative(),
});

const CommentForAuthorViewSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  authorId: z.uuid(),
  article: z.object({
    id: z.uuid(),
    title: z.string(),
  }),
  author: z.object({
    name: z.string(),
    username: z.string(),
  }),
  createdAt: z.string(),
});

const CommentForAuthorViewResponseSchema = z.object({
  data: z.array(CommentForAuthorViewSchema),
  pagination: z.object({
    totalItems: z.number().int().nonnegative(),
    currentPage: z.number().int().nonnegative(),
    pageSize: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
});

const CommentPaginationSchema = z.object({
  hasMore: z.boolean(),
  nextCursor: z.uuid().nullable(),
});

const ReplySchema = z.object({
  id: z.uuid(),
  content: z.string(),
  author: AuthorSchema,
  createdAt: z.string(),
  authorId: z.uuid(),
  mentionedUser: z
    .object({
      id: z.uuid(),
      username: z.string(),
    })
    .nullish(),
});

const ReplyPaginationSchema = z.object({
  hasMore: z.boolean(),
  nextCursor: z.number().int().nullable(),
});

const ParentCommentsResponseSchema = z.object({
  data: z.array(BaseCommentSchema),
  pagination: CommentPaginationSchema,
});

const RepliesResponseSchema = z.object({
  data: z.array(ReplySchema),
  pagination: ReplyPaginationSchema,
});

const ParentCommentSchema = z
  .object({
    id: z.uuid(),
    content: z.string(),
    author: AuthorSchema,
  })
  .nullable();

const CommentCreationSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment content cannot be empty.")
    .max(780, "Comment content cannot exceed 780 characters."),
  articleId: z.uuid(),
  parentId: z.uuid().optional(),
});

const PaginationSchema = z.object({
  hasMore: z.boolean(),
  nextCursor: z.uuid().nullable(),
});

export type Comment = z.infer<typeof BaseCommentSchema>;
export type CommentForAuthorView = z.infer<typeof CommentForAuthorViewSchema>;
export type CommentCreationData = z.infer<typeof CommentCreationSchema>;
export type ParentCommentsResponse = z.infer<
  typeof ParentCommentsResponseSchema
>;
export type Reply = z.infer<typeof ReplySchema>;
export type RepliesResponse = z.infer<typeof RepliesResponseSchema>;

export {
  CommentCreationSchema,
  ParentCommentSchema,
  AuthorSchema,
  PaginationSchema,
  ParentCommentsResponseSchema,
  RepliesResponseSchema,
  CommentForAuthorViewResponseSchema,
};
