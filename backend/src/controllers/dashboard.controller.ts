import dashboardService from "../services/dashboard.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const stats = await dashboardService.getDashboardStats();

  res.status(200).json(successResponse("Dashboard fetched", stats));
});
export const getRecentProducts = asyncHandler(async (_req, res) => {
  const products = await dashboardService.getRecentProducts();

  res
    .status(200)
    .json(successResponse("Recent products fetched successfully", products));
});
