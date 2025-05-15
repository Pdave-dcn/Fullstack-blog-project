import { Request, Response } from "express";

/**
 * Validates and returns numeric route parameters: postId and commentId.
 * If invalid, responds with 400 and returns null.
 */
export function getValidatedPostAndCommentIds(
  req: Request,
  res: Response
): { postId: number; commentId: number } | null {
  const postId = Number(req.params.postId);
  const commentId = Number(req.params.commentId);

  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid post ID!" });
    return null;
  }

  if (isNaN(commentId)) {
    res.status(400).json({ message: "Invalid comment ID!" });
    return null;
  }

  return { postId, commentId };
}

export function getValidatedPostId(req: Request, res: Response): number | null {
  const postId = Number(req.params.postId);
  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid post ID!" });
    return null;
  }
  return postId;
}
