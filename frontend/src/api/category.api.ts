import type { Category } from "../types/category";
import api from "./axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");
  return response.data.data;
};
export const createCategory = async (name: string): Promise<Category> => {
  const response = await api.post("/categories", {
    name,
  });

  return response.data.data;
};
