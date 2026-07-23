import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import ProductForm from "../components/product/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import type { ProductFormData } from "../schemas/product.schema";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useSnackbar } from "../context/SnackbarContext";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(Number(id));
  const { showSnackbar } = useSnackbar();
  const updateMutation = useUpdateProduct();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  const formData: ProductFormData | undefined = product
    ? {
        companyId: product.companyId,
        categoryId: product.categoryId,
        genderId: product.genderId,
        modelName: product.modelName,

        variants: product.variants.map((variant: any) => ({
          color: variant.color,

          inventory: variant.inventory.map((item: any) => ({
            size: item.size,
            price: item.price,
            quantity: item.quantity,
          })),
        })),
      }
    : undefined;

  const handleUpdate = async (data: ProductFormData) => {
    try {
      await updateMutation.mutateAsync({
        id: Number(id),
        data,
      });

      showSnackbar("Product updated successfully", "success");

      navigate("/inventory");
    } catch {
      showSnackbar("Failed to update product", "error");
    }
  };
  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 700,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Product
      </Typography>

      <ProductForm
        initialData={formData}
        onSubmit={handleUpdate}
        isLoading={updateMutation.isPending}
      />
    </Paper>
  );
}

export default EditProduct;
