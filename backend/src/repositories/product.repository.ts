import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { CreateProductDto } from "../schemas/product.schema";

class ProductRepository {
  async create(data: CreateProductDto) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Check duplicate product
      const existingProduct = await tx.product.findUnique({
        where: {
          companyId_modelName: {
            companyId: data.companyId,
            modelName: data.modelName,
          },
        },
      });

      if (existingProduct) {
        throw new Error("Product already exists");
      }

      // Create Product
      const product = await tx.product.create({
        data: {
          companyId: data.companyId,
          categoryId: data.categoryId,
          genderId: data.genderId,
          modelName: data.modelName,
        },
      });

      // Create Variants
      for (const variant of data.variants) {
        const createdVariant = await tx.variant.create({
          data: {
            productId: product.id,
            color: variant.color,
          },
        });

        // Create Inventory
        for (const item of variant.inventory) {
          await tx.inventory.create({
            data: {
              variantId: createdVariant.id,
              size: item.size,
              price: item.price,
              quantity: item.quantity,
            },
          });
        }
      }

      return product;
    });
  }

  async findAll() {
    return prisma.product.findMany({
      select: {
        id: true,

        modelName: true,

        createdAt: true,

        updatedAt: true,

        company: {
          select: {
            name: true,
          },
        },

        category: {
          select: {
            name: true,
          },
        },

        gender: {
          select: {
            name: true,
          },
        },

        variants: {
          select: {
            id: true,

            color: true,

            inventory: {
              select: {
                id: true,

                size: true,

                price: true,

                quantity: true,
              },

              orderBy: {
                size: "asc",
              },
            },
          },
        },
      },

      orderBy: {
        modelName: "asc",
      },
    });
  }

  async findById(id: number) {
    return prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
        category: true,
        gender: true,
        variants: {
          include: {
            inventory: {
              orderBy: {
                size: "asc",
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, data: CreateProductDto) {
    return prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          modelName: data.modelName,
          companyId: data.companyId,
          categoryId: data.categoryId,
          genderId: data.genderId,
        },
      });

      const variants = await tx.variant.findMany({
        where: {
          productId: id,
        },
        select: {
          id: true,
        },
      });

      const variantIds = variants.map((v) => v.id);

      await tx.inventory.deleteMany({
        where: {
          variantId: {
            in: variantIds,
          },
        },
      });

      await tx.variant.deleteMany({
        where: {
          productId: id,
        },
      });

      for (const variant of data.variants) {
        const createdVariant = await tx.variant.create({
          data: {
            productId: id,
            color: variant.color,
          },
        });

        for (const item of variant.inventory) {
          await tx.inventory.create({
            data: {
              variantId: createdVariant.id,
              size: item.size,
              price: item.price,
              quantity: item.quantity,
            },
          });
        }
      }

      return product;
    });
  }

  async deleteProduct(id: number) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}

export default new ProductRepository();
