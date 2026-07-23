import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../api/company.api";
import type { Company } from "../types/company";

export function useCompanies() {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
}
