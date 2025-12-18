import { CreateArticleUseCase } from "@/application/articles/create/CreateArticleUseCase.js";
import { DeleteArticleUseCase } from "@/application/articles/delete/DeleteArticleUseCase.js";
import { EditArticleUseCase } from "@/application/articles/edit/EditArticleUseCase.js";
import { PrismaArticleRepository } from "../db/prisma/PrismaArticleRepository.js";
import { ListArticlesUseCase } from "@/application/articles/list/ListArticlesUseCase.js";
import { UpdateArticleStatusUseCase } from "@/application/articles/update/UpdateArticleStatusUseCase.js";
import { GetArticleByIdUseCase } from "@/application/articles/querySingle/GetArticleByIdUseCase.js";
import { GetRecentArticlesUseCase } from "@/application/articles/list/GetRecentArticlesUseCase.js";

import { PrismaUserRepository } from "../db/prisma/PrismaUserRepository.js";
import { SignupUserUseCase } from "@/application/users/signup/SignupUserUseCase.js";
import { LoginUserUseCase } from "@/application/users/login/LoginUserUseCase.js";
import { GetAuthenticatedUserUseCase } from "@/application/auth/GetAuthenticatedUserUseCase.js";

import { CreateCommentUseCase } from "@/application/comments/create/CreateCommentUseCase.js";
import { PrismaCommentRepository } from "../db/prisma/PrismaCommentRepository.js";
import { DeleteCommentUseCase } from "@/application/comments/delete/DeleteCommentUseCase.js";
import { EditCommentUseCase } from "@/application/comments/edit/EditCommentUseCase.js";
import { PrismaCommentQueryRepository } from "../db/prisma/PrismaCommentQueryRepository.js";
import { ListCommentsForAuthorUseCase } from "@/application/comments/queries/ListAuthorComments/ListCommentsForAuthorUseCase.js";
import { ListArticleCommentsUseCase } from "@/application/comments/queries/ListArticleComments/ListArticleCommentsUseCase.js";
import { ListCommentRepliesUseCase } from "@/application/comments/queries/ListCommentReplies/ListCommentRepliesUseCase.js";

import { PrismaDashboardQueryRepository } from "../db/prisma/PrismaDashboardQueryRepository.js";
import { GetDashboardStatsUseCase } from "@/application/dashboard/GetDashboardStatsUseCase.js";
import { GetRecentArticlesUseCase as GetRecentArticlesForDashboardUseCase } from "@/application/dashboard/GetRecentArticlesUseCase.js";
import { GetRecentCommentsUseCase } from "@/application/dashboard/GetRecentCommentsUseCase.js";

/**
 * Dependency Injection Container for application use cases and repositories.
 *
 * This container centralizes the creation and wiring of repositories and use cases
 * across multiple domains (Articles, Users), providing a single source of truth for
 * dependency management and ensuring consistent initialization order.
 *
 * @class Container
 *
 * @example
 * import { container } from './container.js';
 *
 * // Article domain
 * const article = await container.createArticleUseCase.execute({
 *   authorId: 'user-id',
 *   authorRole: 'AUTHOR',
 *   title: 'My Article',
 *   content: 'Some content',
 *   status: 'DRAFT'
 * });
 *
 * @example
 * // User domain
 * const user = await container.signupUserUseCase.execute({
 *   email: 'user@example.com',
 *   password: 'secure-password',
 *   username: 'johndoe'
 * });
 */
class Container {
  // Article domain
  public readonly articleRepository: PrismaArticleRepository;
  public readonly createArticleUseCase: CreateArticleUseCase;
  public readonly editArticleUseCase: EditArticleUseCase;
  public readonly deleteArticleUseCase: DeleteArticleUseCase;
  public readonly listArticlesUseCase: ListArticlesUseCase;
  public readonly updateArticleStatusUseCase: UpdateArticleStatusUseCase;
  public readonly getArticleByIdUseCase: GetArticleByIdUseCase;
  public readonly getRecentArticlesUseCase: GetRecentArticlesUseCase;

  // User domain
  public readonly userRepository: PrismaUserRepository;
  public readonly signupUserUseCase: SignupUserUseCase;
  public readonly loginUserUseCase: LoginUserUseCase;
  public readonly getAuthenticatedUserUseCase: GetAuthenticatedUserUseCase;

  // Comment domain
  public readonly commentRepository: PrismaCommentRepository;
  public readonly createCommentUseCase: CreateCommentUseCase;
  public readonly deleteCommentUseCase: DeleteCommentUseCase;
  public readonly editCommentUseCase: EditCommentUseCase;

  public readonly commentQueryRepository: PrismaCommentQueryRepository;
  public readonly listCommentsForAuthorUseCase: ListCommentsForAuthorUseCase;
  public readonly listArticleCommentsUseCase: ListArticleCommentsUseCase;
  public readonly listCommentRepliesUseCase: ListCommentRepliesUseCase;

  // Dashboard domain
  public readonly dashboardQueryRepository: PrismaDashboardQueryRepository;
  public readonly getDashboardStatsUseCase: GetDashboardStatsUseCase;
  public readonly getRecentArticlesForDashboardUseCase: GetRecentArticlesForDashboardUseCase;
  public readonly getRecentCommentsUseCase: GetRecentCommentsUseCase;

  constructor() {
    // Article domain wiring
    this.articleRepository = new PrismaArticleRepository();

    this.createArticleUseCase = new CreateArticleUseCase(
      this.articleRepository
    );

    this.editArticleUseCase = new EditArticleUseCase(this.articleRepository);

    this.deleteArticleUseCase = new DeleteArticleUseCase(
      this.articleRepository
    );

    this.listArticlesUseCase = new ListArticlesUseCase(this.articleRepository);

    this.updateArticleStatusUseCase = new UpdateArticleStatusUseCase(
      this.articleRepository
    );

    this.getArticleByIdUseCase = new GetArticleByIdUseCase(
      this.articleRepository
    );

    this.getRecentArticlesUseCase = new GetRecentArticlesUseCase(
      this.articleRepository
    );

    // User domain wiring
    this.userRepository = new PrismaUserRepository();
    this.signupUserUseCase = new SignupUserUseCase(this.userRepository);
    this.loginUserUseCase = new LoginUserUseCase(this.userRepository);
    this.getAuthenticatedUserUseCase = new GetAuthenticatedUserUseCase(
      this.userRepository
    );

    // Comment domain wiring
    this.commentRepository = new PrismaCommentRepository();

    this.createCommentUseCase = new CreateCommentUseCase(
      this.commentRepository,
      this.articleRepository
    );

    this.deleteCommentUseCase = new DeleteCommentUseCase(
      this.commentRepository
    );

    this.editCommentUseCase = new EditCommentUseCase(this.commentRepository);

    // ****
    this.commentQueryRepository = new PrismaCommentQueryRepository();

    this.listCommentsForAuthorUseCase = new ListCommentsForAuthorUseCase(
      this.commentQueryRepository
    );

    this.listArticleCommentsUseCase = new ListArticleCommentsUseCase(
      this.commentQueryRepository
    );

    this.listCommentRepliesUseCase = new ListCommentRepliesUseCase(
      this.commentQueryRepository
    );

    // Dashboard domain wiring
    this.dashboardQueryRepository = new PrismaDashboardQueryRepository();

    this.getRecentCommentsUseCase = new GetRecentCommentsUseCase(
      this.dashboardQueryRepository
    );

    this.getRecentArticlesForDashboardUseCase =
      new GetRecentArticlesForDashboardUseCase(this.dashboardQueryRepository);

    this.getDashboardStatsUseCase = new GetDashboardStatsUseCase(
      this.dashboardQueryRepository
    );
  }
}

export const container = new Container();
