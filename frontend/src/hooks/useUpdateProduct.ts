import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/product.api";
import type { ProductFormData } from "../schemas/product.schema";

export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormData }) =>
      updateProduct(id, data),
  });
}
