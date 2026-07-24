import express from "express";
import cors from "cors";
import companyRoutes from "./routes/company.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import categoryRoutes from "./routes/category.routes";
import genderRoutes from "./routes/gender.routes";
import inventoryRoutes from "./routes/inventory.routes";
import productRoutes from "./routes/product.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/genders", genderRoutes);
app.get("/", (_, res) => {
  res.send("Footwear Inventory API 🚀");
});
app.use("/api/inventory", inventoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(errorMiddleware);

export default app;
