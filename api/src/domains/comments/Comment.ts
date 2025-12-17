export class Comment {
  constructor(
    public readonly id: string,
    public readonly articleId: string,
    public readonly authorId: string,
    public content: string,
    public readonly createdAt: Date,
    public readonly parentId?: string
  ) {}

  static create(props: {
    id: string;
    articleId: string;
    authorId: string;
    content: string;
    parentId?: string;
  }) {
    return new Comment(
      props.id,
      props.articleId,
      props.authorId,
      props.content,
      new Date(),
      props.parentId
    );
  }
}
