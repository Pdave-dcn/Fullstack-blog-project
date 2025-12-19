import { GetDashboardStatsUseCase } from "@/application/dashboard/GetDashboardStatsUseCase.js";
import { GetRecentArticlesUseCase } from "@/application/dashboard/GetRecentArticlesUseCase.js";
import { GetRecentCommentsUseCase } from "@/application/dashboard/GetRecentCommentsUseCase.js";
import { PrismaDashboardQueryRepository } from "@/infrastructure/db/prisma/PrismaDashboardQueryRepository.js";

/**
 * Dashboard domain dependency injection container.
 *
 * Manages all dashboard-related repositories and use cases including
 * statistics, recent articles, and recent comments aggregation.
 *
 * @example
 * const dashboard = new DashboardContainer();
 * const stats = await dashboard.getStatsUseCase.execute();
 */
export class DashboardContainer {
  public readonly queryRepository: PrismaDashboardQueryRepository;
  public readonly getStatsUseCase: GetDashboardStatsUseCase;
  public readonly getRecentArticlesUseCase: GetRecentArticlesUseCase;
  public readonly getRecentCommentsUseCase: GetRecentCommentsUseCase;

  constructor() {
    this.queryRepository = new PrismaDashboardQueryRepository();
    this.getStatsUseCase = new GetDashboardStatsUseCase(this.queryRepository);
    this.getRecentArticlesUseCase = new GetRecentArticlesUseCase(
      this.queryRepository
    );
    this.getRecentCommentsUseCase = new GetRecentCommentsUseCase(
      this.queryRepository
    );
  }
}
