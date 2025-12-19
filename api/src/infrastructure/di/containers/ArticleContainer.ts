import { CreateArticleUseCase } from "@/application/articles/create/CreateArticleUseCase.js";
import { DeleteArticleUseCase } from "@/application/articles/delete/DeleteArticleUseCase.js";
import { EditArticleUseCase } from "@/application/articles/edit/EditArticleUseCase.js";
import { ListArticlesUseCase } from "@/application/articles/list/ListArticlesUseCase.js";
import { UpdateArticleStatusUseCase } from "@/application/articles/update/UpdateArticleStatusUseCase.js";
import { GetArticleByIdUseCase } from "@/application/articles/querySingle/GetArticleByIdUseCase.js";
import { GetRecentArticlesUseCase } from "@/application/articles/list/GetRecentArticlesUseCase.js";
import { PrismaArticleRepository } from "@/infrastructure/db/prisma/PrismaArticleRepository.js";

/**
 * Article domain dependency injection container.
 *
 * Manages all article-related repositories and use cases including
 * CRUD operations, listing, and status management.
 *
 * @example
 * const articles = new ArticleContainer();
 * const article = await articles.createUseCase.execute({
 *   authorId: 'user-id',
 *   authorRole: 'AUTHOR',
 *   title: 'My Article',
 *   content: 'Some content',
 *   status: 'DRAFT'
 * });
 */
export class ArticleContainer {
  public readonly repository: PrismaArticleRepository;
  public readonly createUseCase: CreateArticleUseCase;
  public readonly editUseCase: EditArticleUseCase;
  public readonly deleteUseCase: DeleteArticleUseCase;
  public readonly listUseCase: ListArticlesUseCase;
  public readonly updateStatusUseCase: UpdateArticleStatusUseCase;
  public readonly getByIdUseCase: GetArticleByIdUseCase;
  public readonly getRecentUseCase: GetRecentArticlesUseCase;

  constructor() {
    this.repository = new PrismaArticleRepository();
    this.createUseCase = new CreateArticleUseCase(this.repository);
    this.editUseCase = new EditArticleUseCase(this.repository);
    this.deleteUseCase = new DeleteArticleUseCase(this.repository);
    this.listUseCase = new ListArticlesUseCase(this.repository);
    this.updateStatusUseCase = new UpdateArticleStatusUseCase(this.repository);
    this.getByIdUseCase = new GetArticleByIdUseCase(this.repository);
    this.getRecentUseCase = new GetRecentArticlesUseCase(this.repository);
  }
}
