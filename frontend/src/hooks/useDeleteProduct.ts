import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../api/product.api";

export function useDeleteProduct() {
  return useMutation({
    mutationFn: deleteProduct,
  });
}
