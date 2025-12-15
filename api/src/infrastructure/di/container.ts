import { CreateArticleUseCase } from "@/application/articles/create/CreateArticleUseCase.js";
import { DeleteArticleUseCase } from "@/application/articles/delete/DeleteArticleUseCase.js";
import { EditArticleUseCase } from "@/application/articles/edit/EditArticleUseCase";
import { ArticleRepository } from "@/domains/articles/ArticleRepository.js";
import { PrismaArticleRepository } from "../db/prisma/PrismaArticleRepository";

/**
 * Dependency Injection Container for the Article domain.
 *
 * This container centralizes the creation and wiring of repositories
 * and use cases, providing a single source of truth for dependencies.
 *
 * @class Container
 * @property {ArticleRepository} articleRepository - The repository responsible for Article persistence.
 * @property {CreateArticleUseCase} createArticleUseCase - Use case to handle creating articles.
 * @property {EditArticleUseCase} editArticleUseCase - Use case to handle editing articles.
 * @property {DeleteArticleUseCase} deleteArticleUseCase - Use case to handle deleting articles.
 *
 * @example
 * import { container } from './container.js';
 *
 * // Using the container to execute a use case
 * const article = await container.createArticleUseCase.execute({
 *   authorId: 'user-id',
 *   authorRole: 'AUTHOR',
 *   title: 'My Article',
 *   content: 'Some content',
 *   status: 'DRAFT'
 * });
 */

class Container {
  public readonly articleRepository: ArticleRepository;
  public readonly createArticleUseCase: CreateArticleUseCase;
  public readonly editArticleUseCase: EditArticleUseCase;
  public readonly deleteArticleUseCase: DeleteArticleUseCase;

  constructor() {
    this.articleRepository = new PrismaArticleRepository();
    this.createArticleUseCase = new CreateArticleUseCase(
      this.articleRepository
    );
    this.editArticleUseCase = new EditArticleUseCase(this.articleRepository);
    this.deleteArticleUseCase = new DeleteArticleUseCase(
      this.articleRepository
    );
  }
}

export const container = new Container();
