import { Request, Response } from "express";

import categoryService from "../services/category.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();

    res
      .status(200)
      .json(successResponse("Categories fetched successfully", categories));
  },
);
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await categoryService.createCategory(req.body.name);

    res
      .status(201)
      .json(successResponse("Category created successfully", category));
  },
);
