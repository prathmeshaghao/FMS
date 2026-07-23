export interface InventoryQuery {
  page?: number;
  limit?: number;
  search?: string;

  company?: number;
  category?: number;
  gender?: number;

  color?: string;

  stockStatus?: "low" | "out" | "available";

  sortBy?: "modelName" | "price" | "quantity";

  sortOrder?: "asc" | "desc";
}
