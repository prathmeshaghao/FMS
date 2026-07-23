import type { DashboardStats } from "../types/dashboard";
import api from "./axios";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard");

  return response.data.data;
};
export const getRecentProducts = async () => {
  const response = await api.get("/dashboard/recent-products");

  return response.data.data;
};
