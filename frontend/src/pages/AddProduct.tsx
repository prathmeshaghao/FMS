import { Box, Typography } from "@mui/material";
import ProductForm from "../components/product/ProductForm";
import { useCreateProduct } from "../hooks/useCreateProduct";
import type { ProductFormData } from "../schemas/product.schema";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const createMutation = useCreateProduct();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleCreate = async (data: ProductFormData) => {
    try {
      await createMutation.mutateAsync(data);
      showSnackbar("Product created successfully", "success");

      navigate("/inventory");
    } catch {
      showSnackbar("Failed to create product", "error");
    }
  };
  return (
    <>
      <Box
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "1.8rem",
              md: "2.125rem",
            },
          }}
        >
          Add Product
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 950,
        }}
      >
        <ProductForm
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
        />
      </Box>
    </>
  );
}

export default AddProduct;
