import { z } from "zod";

export const productSchema = z.object({
  companyId: z.number().min(1, "Please select a company"),

  categoryId: z.number().min(1, "Please select a category"),

  genderId: z.number().min(1, "Please select a gender"),

  modelName: z.string().trim().min(1, "Model name is required"),

  variants: z.array(
    z.object({
      color: z.string().trim().min(1, "Color is required"),

      inventory: z.array(
        z.object({
          size: z.number().min(1, "Size is required"),

          price: z.number().positive("Price must be greater than 0"),

          quantity: z.number().min(0, "Quantity cannot be negative"),
        }),
      ),
    }),
  ),
});

export type ProductFormData = z.infer<typeof productSchema>;
