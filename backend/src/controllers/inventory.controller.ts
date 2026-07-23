import { Request, Response } from "express";

import inventoryService from "../services/inventory.service";

import { asyncHandler } from "../utils/asyncHandler";

import { successResponse } from "../utils/apiResponse";

export const getInventory = asyncHandler(
  async (req: Request, res: Response) => {
    const inventory = await inventoryService.getInventory({
      page: Number(req.query.page) || 1,

      limit: Number(req.query.limit) || 10,

      search: req.query.search as string,

      company: req.query.company ? Number(req.query.company) : undefined,

      category: req.query.category ? Number(req.query.category) : undefined,

      gender: req.query.gender ? Number(req.query.gender) : undefined,

      color: req.query.color as string,

      stockStatus: req.query.stockStatus as any,

      sortBy: req.query.sortBy as any,

      sortOrder: req.query.sortOrder as any,
    });

    const result = inventory.map((item) => ({
      inventoryId: item.id,

      productId: item.variant.product.id,

      company: item.variant.product.company.name,

      modelName: item.variant.product.modelName,

      category: item.variant.product.category.name,

      gender: item.variant.product.gender.name,

      color: item.variant.color,

      size: item.size,

      price: Number(item.price),

      quantity: item.quantity,

      status:
        item.quantity === 0
          ? "Out Of Stock"
          : item.quantity <= 5
            ? "Low Stock"
            : "In Stock",
    }));

    res
      .status(200)
      .json(successResponse("Inventory fetched successfully", result));
  },
);
