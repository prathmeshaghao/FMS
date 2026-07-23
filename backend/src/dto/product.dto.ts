import { Product } from "@prisma/client";

export class ProductDto {
  static toResponse(product: any) {
    return {
      id: product.id,

      modelName: product.modelName,

      company: product.company.name,

      category: product.category.name,

      gender: product.gender.name,

      createdAt: product.createdAt,

      updatedAt: product.updatedAt,

      variants: product.variants.map((variant: any) => ({
        id: variant.id,

        color: variant.color,

        inventory: variant.inventory.map((item: any) => ({
          id: item.id,

          size: item.size,

          price: Number(item.price),

          quantity: item.quantity,
        })),
      })),
    };
  }

  static toResponseList(products: Product[]) {
    return products.map((product: any) => this.toResponse(product));
  }
}
