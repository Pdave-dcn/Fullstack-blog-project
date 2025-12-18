import { DashboardQueryRepository } from "@/domains/dashboard/DashboardQueryRepository.js";

export class GetRecentArticlesUseCase {
  constructor(private readonly repo: DashboardQueryRepository) {}

  execute(limit = 4) {
    return this.repo.getRecentArticles(limit);
  }
}
