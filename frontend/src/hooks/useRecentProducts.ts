import { useQuery } from "@tanstack/react-query";
import { getRecentProducts } from "../api/dashboard.api";
import type { RecentProduct } from "../types/recent-product";

export const useRecentProducts = () => {
  return useQuery<RecentProduct[]>({
    queryKey: ["recent-products"],
    queryFn: getRecentProducts,
  });
};
