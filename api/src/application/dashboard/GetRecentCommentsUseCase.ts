import { DashboardQueryRepository } from "@/domains/dashboard/DashboardQueryRepository.js";

export class GetRecentCommentsUseCase {
  constructor(private readonly repo: DashboardQueryRepository) {}

  execute(limit = 2) {
    return this.repo.getRecentComments(limit);
  }
}
