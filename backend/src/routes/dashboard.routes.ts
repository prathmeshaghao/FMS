import { Router } from "express";
import {
  getDashboardStats,
  getRecentProducts,
} from "../controllers/dashboard.controller";

const router = Router();
router.get("/", getDashboardStats);
router.get("/recent-products", getRecentProducts);
export default router;
