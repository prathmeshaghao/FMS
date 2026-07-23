import { z } from "zod";

export const createProductSchema = z.object({
  companyId: z.number().int().min(1, "Company is required"),

  categoryId: z.number().int().min(1, "Category is required"),

  genderId: z.number().int().min(1, "Gender is required"),

  modelName: z
    .string()
    .trim()
    .min(2, "Model Name must be at least 2 characters")
    .max(100, "Model Name cannot exceed 100 characters"),

  variants: z
    .array(
      z.object({
        color: z.string().trim().min(2, "Color is required"),

        inventory: z.array(
          z.object({
            size: z.number().int().min(1, "Size must be at least 1"),

            price: z.number().positive("Price must be greater than 0"),

            quantity: z.number().int().min(0, "Quantity cannot be negative"),
          }),
        ),
      }),
    )
    .min(1, "At least one variant is required"),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
