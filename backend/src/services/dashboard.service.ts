import dashboardRepository from "../repositories/dashboard.repository";

class DashboardService {
  async getDashboardStats() {
    return dashboardRepository.getDashboardStats();
  }
  async getRecentProducts() {
    return dashboardRepository.getRecentProducts();
  }
}

export default new DashboardService();
