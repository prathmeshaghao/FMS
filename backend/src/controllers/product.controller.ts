import { Request, Response } from "express";

import productService from "../services/product.service";

import { asyncHandler } from "../utils/asyncHandler";

import { errorResponse, successResponse } from "../utils/apiResponse";
// import { ProductDto } from "../dto/product.dto";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);

    res
      .status(201)
      .json(successResponse("Product created successfully", product));
  },
);

export const getProducts = asyncHandler(async (_req, res) => {
  const products = await productService.getAllProducts();
  res
    .status(200)
    .json(successResponse("Products fetched successfully", products));
});

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json(errorResponse("Product not found"));
      return;
    }

    res
      .status(200)
      .json(successResponse("Product fetched successfully", product));
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const product = await productService.updateProduct(id, req.body);

    res
      .status(200)
      .json(successResponse("Product updated successfully", product));
  },
);
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await productService.deleteProduct(id);

    res.status(200).json(successResponse("Product deleted successfully", null));
  },
);
