import { ArticleDetailsView } from "@/application/articles/queries/ArticleDetails/ArticleDetailsView.js";
import {
  ArticlesForAuthorTableView,
  GetArticlesForAuthorTableParams,
} from "@/application/articles/queries/ArticlesForAuthorTable/ArticlesForAuthorTableView.js";

export interface ArticleQueryRepository {
  getArticleDetails(id: string): Promise<ArticleDetailsView | null>;
  getArticlesForAuthorTable(
    params?: GetArticlesForAuthorTableParams
  ): Promise<ArticlesForAuthorTableView[]>;
}
