import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../api/category.api";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};
