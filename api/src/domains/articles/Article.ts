import { ArticleStatus } from "./ArticleStatus";

export class Article {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public status: ArticleStatus,
    public readonly authorId: string,
    public readonly createdAt: Date
  ) {}

  static create(props: {
    id: string;
    title: string;
    content: string;
    status: ArticleStatus;
    authorId: string;
  }) {
    return new Article(
      props.id,
      props.title,
      props.content,
      props.status,
      props.authorId,
      new Date()
    );
  }
}
