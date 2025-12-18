import { DashboardQueryRepository } from "@/domains/dashboard/DashboardQueryRepository.js";

export class GetDashboardStatsUseCase {
  constructor(private readonly repo: DashboardQueryRepository) {}

  execute() {
    return this.repo.getStats();
  }
}
