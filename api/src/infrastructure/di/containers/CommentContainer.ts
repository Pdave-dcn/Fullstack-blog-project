import { CreateCommentUseCase } from "@/application/comments/create/CreateCommentUseCase.js";
import { DeleteCommentUseCase } from "@/application/comments/delete/DeleteCommentUseCase.js";
import { EditCommentUseCase } from "@/application/comments/edit/EditCommentUseCase.js";
import { ListCommentsForAuthorUseCase } from "@/application/comments/queries/ListAuthorComments/ListCommentsForAuthorUseCase.js";
import { ListArticleCommentsUseCase } from "@/application/comments/queries/ListArticleComments/ListArticleCommentsUseCase.js";
import { ListCommentRepliesUseCase } from "@/application/comments/queries/ListCommentReplies/ListCommentRepliesUseCase.js";
import { PrismaCommentRepository } from "@/infrastructure/db/prisma/PrismaCommentRepository.js";
import { PrismaCommentQueryRepository } from "@/infrastructure/db/prisma/PrismaCommentQueryRepository.js";
import { PrismaArticleRepository } from "@/infrastructure/db/prisma/PrismaArticleRepository.js";

/**
 * Comment domain dependency injection container.
 *
 * Manages all comment-related repositories and use cases including
 * CRUD operations, querying comments by various criteria, and replies.
 *
 * @example
 * const comments = new CommentContainer(articleRepository);
 * const comment = await comments.createUseCase.execute({
 *   articleId: 'article-id',
 *   authorId: 'user-id',
 *   content: 'Great article!'
 * });
 */
export class CommentContainer {
  public readonly repository: PrismaCommentRepository;
  public readonly queryRepository: PrismaCommentQueryRepository;

  public readonly createUseCase: CreateCommentUseCase;
  public readonly deleteUseCase: DeleteCommentUseCase;
  public readonly editUseCase: EditCommentUseCase;
  public readonly listForAuthorUseCase: ListCommentsForAuthorUseCase;
  public readonly listArticleCommentsUseCase: ListArticleCommentsUseCase;
  public readonly listRepliesUseCase: ListCommentRepliesUseCase;

  constructor(articleRepository: PrismaArticleRepository) {
    this.repository = new PrismaCommentRepository();
    this.queryRepository = new PrismaCommentQueryRepository();

    this.createUseCase = new CreateCommentUseCase(
      this.repository,
      articleRepository
    );
    this.deleteUseCase = new DeleteCommentUseCase(this.repository);
    this.editUseCase = new EditCommentUseCase(this.repository);
    this.listForAuthorUseCase = new ListCommentsForAuthorUseCase(
      this.queryRepository
    );
    this.listArticleCommentsUseCase = new ListArticleCommentsUseCase(
      this.queryRepository
    );
    this.listRepliesUseCase = new ListCommentRepliesUseCase(
      this.queryRepository
    );
  }
}
