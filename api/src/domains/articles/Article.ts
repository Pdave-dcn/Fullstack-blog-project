import {
  ArticleAlreadyDraftError,
  ArticleAlreadyPublishedError,
} from "./ArticleErrors.js";
import { ArticleStatus } from "./ArticleStatus.js";

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

  update(props: { title?: string; content?: string; status?: ArticleStatus }) {
    if (props.title !== undefined) {
      this.title = props.title;
    }

    if (props.content !== undefined) {
      this.content = props.content;
    }

    if (props.status !== undefined) {
      this.status = props.status;
    }
  }

  publish() {
    if (this.status === ArticleStatus.PUBLISHED) {
      throw new ArticleAlreadyPublishedError();
    }
    this.status = ArticleStatus.PUBLISHED;
  }

  unpublish() {
    if (this.status === ArticleStatus.DRAFT) {
      throw new ArticleAlreadyDraftError();
    }
    this.status = ArticleStatus.DRAFT;
  }
}
