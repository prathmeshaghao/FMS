export interface InventoryInput {
  size: number;
  price: number;
  quantity: number;
}

export interface VariantInput {
  color: string;
  inventory: InventoryInput[];
}

export interface CreateProductInput {
  companyId: number;
  categoryId: number;
  genderId: number;
  modelName: string;
  variants: VariantInput[];
}
