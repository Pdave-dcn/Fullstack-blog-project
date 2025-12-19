import { ArticleContainer } from "./ArticleContainer.js";
import { UserContainer } from "./UserContainer.js";
import { CommentContainer } from "./CommentContainer.js";
import { DashboardContainer } from "./DashboardContainer.js";

/**
 * Main dependency injection container for the application.
 *
 * This container composes all domain-specific containers and manages
 * cross-domain dependencies. Each domain (articles, users, comments, dashboard)
 * is encapsulated in its own sub-container for better organization and maintainability.
 *
 * @class Container
 *
 * @example
 * import { container } from './containers';
 *
 * // Article operations
 * const article = await container.articles.createUseCase.execute({
 *   authorId: 'user-id',
 *   authorRole: 'AUTHOR',
 *   title: 'My Article',
 *   content: 'Some content',
 *   status: 'DRAFT'
 * });
 *
 * @example
 * // User operations
 * const user = await container.users.signupUseCase.execute({
 *   email: 'user@example.com',
 *   password: 'secure-password',
 *   username: 'johndoe'
 * });
 *
 * @example
 * // Comment operations
 * const comment = await container.comments.createUseCase.execute({
 *   articleId: 'article-id',
 *   authorId: 'user-id',
 *   content: 'Great article!'
 * });
 *
 * @example
 * // Dashboard operations
 * const stats = await container.dashboard.getStatsUseCase.execute();
 */
class Container {
  public readonly articles: ArticleContainer;
  public readonly users: UserContainer;
  public readonly comments: CommentContainer;
  public readonly dashboard: DashboardContainer;

  constructor() {
    // Initialize domains in dependency order
    this.articles = new ArticleContainer();
    this.users = new UserContainer();

    // CommentContainer depends on ArticleRepository for validation
    this.comments = new CommentContainer(this.articles.repository);

    this.dashboard = new DashboardContainer();
  }
}

/**
 * Singleton instance of the application container.
 */
export const container = new Container();
