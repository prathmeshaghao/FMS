import type { Company } from "../types/company";
import api from "./axios";

export const getCompanies = async (): Promise<Company[]> => {
  const response = await api.get("/companies");

  return response.data.data;
};
export const createCompany = async (name: string): Promise<Company> => {
  const response = await api.post("/companies", {
    name,
  });

  return response.data.data;
};
