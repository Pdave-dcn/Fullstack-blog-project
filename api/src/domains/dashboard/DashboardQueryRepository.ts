import { DashboardStatsView } from "@/application/dashboard/queries/DashboardStatsView.js";
import { RecentArticleView } from "@/application/dashboard/queries/RecentArticleView.js";
import { RecentCommentView } from "@/application/dashboard/queries/RecentCommentView.js";

export interface DashboardQueryRepository {
  getStats(): Promise<DashboardStatsView>;
  getRecentArticles(limit: number): Promise<RecentArticleView[]>;
  getRecentComments(limit: number): Promise<RecentCommentView[]>;
}
