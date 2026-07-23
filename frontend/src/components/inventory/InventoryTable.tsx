import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { InventoryItem } from "../../types/inventory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { useState, useMemo } from "react";
import DeleteProductDialog from "../DeleteProductDialog";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useSnackbar } from "../../context/SnackbarContext";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  rows: InventoryItem[];
}

function InventoryTable({ rows }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const filterStyle = {
    width: 180,

    "& .MuiOutlinedInput-root": {
      height: 56,
    },
  };
  const columns: GridColDef[] = [
    {
      field: "company",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "modelName",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
    },
    {
      field: "size",
      headerName: "Size",
      width: 80,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      valueFormatter: (value) => {
        const amount = Number(value);

        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(amount);
      },
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Stock",
      width: 150,
      renderCell: (params) => {
        const status = params.value;

        return (
          <Chip
            label={status}
            color={
              status === "In Stock"
                ? "success"
                : status === "Low Stock"
                  ? "warning"
                  : "error"
            }
            variant="filled"
            size="small"
            sx={{
              fontWeight: 600,
              minWidth: 100,
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => navigate(`/products/${params.row.productId}/edit`)}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => {
              setSelectedProductId(params.row.productId);
              setOpen(true);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];
  const deleteMutation = useDeleteProduct();
  const handleDelete = async () => {
    if (!selectedProductId) return;

    try {
      await deleteMutation.mutateAsync(selectedProductId);

      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });

      showSnackbar("Product deleted successfully", "success");

      setOpen(false);
    } catch {
      showSnackbar("Failed to delete product", "error");
    }
  };
  const filteredRows = useMemo(() => {
    const query = search.toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        row.company.toLowerCase().includes(query) ||
        row.modelName.toLowerCase().includes(query) ||
        row.category.toLowerCase().includes(query) ||
        row.gender.toLowerCase().includes(query) ||
        row.color.toLowerCase().includes(query);

      const matchesCompany = !companyFilter || row.company === companyFilter;

      const matchesCategory =
        !categoryFilter || row.category === categoryFilter;

      const matchesGender = !genderFilter || row.gender === genderFilter;

      return (
        matchesSearch && matchesCompany && matchesCategory && matchesGender
      );
    });
  }, [rows, search, companyFilter, categoryFilter, genderFilter]);
  const companies = [...new Set(rows.map((row) => row.company))];
  const categories = [...new Set(rows.map((row) => row.category))];
  const genders = [...new Set(rows.map((row) => row.gender))];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
          p: 2.5,
          bgcolor: "background.paper",
          borderRadius: 2,
          border: "1px solid #EAECEF",
        }}
      >
        <TextField
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            ...filterStyle,
            flex: 1,
            minWidth: 320,
          }}
        />
        {/* ================================================================== */}
        <FormControl
          size="small"
          sx={{
            width: 180,

            "& .MuiOutlinedInput-root": {
              height: 56,
            },
          }}
        >
          <InputLabel>Company</InputLabel>

          <Select
            value={companyFilter}
            label="Company"
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>

            {companies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* ================================================================== */}
        <FormControl
          size="small"
          sx={{
            width: 180,

            "& .MuiOutlinedInput-root": {
              height: 56,
            },
          }}
        >
          <InputLabel>Category</InputLabel>

          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>

            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ================================================================== */}
        <FormControl
          size="small"
          sx={{
            width: 180,

            "& .MuiOutlinedInput-root": {
              height: 56,
            },
          }}
        >
          <InputLabel>Gender</InputLabel>

          <Select
            value={genderFilter}
            label="Gender"
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>

            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* ================================================================== */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setSearch("");
            setCompanyFilter("");
            setCategoryFilter("");
            setGenderFilter("");
          }}
        >
          Clear Filters
        </Button>
      </Box>
      <Paper
        elevation={0}
        sx={{
          bgcolor: "transparent",
          borderRadius: 0,
          border: "none",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredRows}
          getRowId={(row) => row.inventoryId}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
          sx={{
            border: "1px solid #EAECEF",
            borderRadius: 3,
            backgroundColor: "#FFFFFF",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FAFBFC",
              borderBottom: "1px solid #ECEFF3",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F3F4F6",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#FAFBFC",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #ECEFF3",
            },
          }}
        />
      </Paper>
      <DeleteProductDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
}

export default InventoryTable;
