import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../api/company.api";
import type { Company } from "../types/company";

export function useCreateCompany() {
  return useMutation<Company, Error, string>({
    mutationFn: createCompany,
  });
}
