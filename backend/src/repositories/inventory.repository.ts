import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { InventoryQuery } from "../types/inventory.types";

class InventoryRepository {
  async findAll(query: InventoryQuery) {
    const productWhere: Prisma.ProductWhereInput = {};
    if (query.search) {
      productWhere.modelName = {
        contains: query.search,
        mode: "insensitive",
      };
    }
    if (query.company) {
      productWhere.companyId = query.company;
    }
    if (query.category) {
      productWhere.categoryId = query.category;
    }
    if (query.gender) {
      productWhere.genderId = query.gender;
    }
    const where: Prisma.InventoryWhereInput = {
      variant: {
        product: productWhere,
      },
    };

    return prisma.inventory.findMany({
      where,

      include: {
        variant: {
          include: {
            product: {
              include: {
                company: true,
                category: true,
                gender: true,
              },
            },
          },
        },
      },

      orderBy: [
        {
          variant: {
            product: {
              modelName: "asc",
            },
          },
        },
        {
          size: "asc",
        },
      ],
    });
  }
}

export default new InventoryRepository();
