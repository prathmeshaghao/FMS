import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

import { validate } from "../middlewares/validate.middleware";
import { createProductSchema } from "../schemas/product.schema";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", validate(createProductSchema), createProduct);

router.put("/:id", validate(createProductSchema), updateProduct);

router.delete("/:id", deleteProduct);
export default router;
