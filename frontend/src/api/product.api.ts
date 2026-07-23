import type { ProductFormData } from "../schemas/product.schema";
import api from "./axios";

export const createProduct = async (data: ProductFormData) => {
  const response = await api.post("/products", data);
  return response.data;
};
export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data;
};
export const updateProduct = async (id: number, data: ProductFormData) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};
export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
