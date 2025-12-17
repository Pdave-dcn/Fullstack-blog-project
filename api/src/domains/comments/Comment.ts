import { InvalidCommentContentError } from "./CommentErrors.js";

export class Comment {
  constructor(
    public readonly id: string,
    public readonly articleId: string,
    public readonly authorId: string,
    public content: string,
    public readonly createdAt: Date,
    public readonly parentId?: string,
    public readonly mentionedUserId?: string
  ) {}

  static create(props: {
    id: string;
    articleId: string;
    authorId: string;
    content: string;
    parentId?: string;
    mentionedUserId?: string;
  }) {
    if (!props.content || props.content.trim() === "")
      throw new InvalidCommentContentError();
    return new Comment(
      props.id,
      props.articleId,
      props.authorId,
      props.content,
      new Date(),
      props.parentId,
      props.mentionedUserId
    );
  }

  /**
   * Creates a reply to a parent comment.
   * Automatically sets parentId and mentionedUserId according to the rules.
   */
  static createReply(
    parentComment: Comment,
    authorId: string,
    content: string
  ): Comment {
    if (!content || content.trim() === "")
      throw new InvalidCommentContentError();

    let parentId = parentComment.parentId ?? parentComment.id;
    let mentionedUserId = parentComment.parentId
      ? parentComment.authorId
      : undefined;

    return new Comment(
      crypto.randomUUID(),
      parentComment.articleId,
      authorId,
      content,
      new Date(),
      parentId,
      mentionedUserId
    );
  }
}
