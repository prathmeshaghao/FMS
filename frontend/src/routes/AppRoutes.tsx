import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AddProduct from "../pages/AddProduct";
import Dashboard from "../pages/Dashboard";
import EditProduct from "../pages/EditProduct";
import Inventory from "../pages/Inventory";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/inventory" element={<Inventory />} />

          <Route path="/products/new" element={<AddProduct />} />

          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
