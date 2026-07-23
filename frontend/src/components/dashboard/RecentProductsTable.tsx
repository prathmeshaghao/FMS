import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useRecentProducts } from "../../hooks/useRecentProducts";

function RecentProductsTable() {
  const { data = [], isLoading } = useRecentProducts();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Created On</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{
                  transition: "0.2s",

                  "&:hover": {
                    backgroundColor: "#F8FAFC",
                  },
                }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 36,
                        height: 36,
                        fontSize: 15,
                      }}
                    >
                      {product.company.name.charAt(0)}
                    </Avatar>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {product.company.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>{product.modelName}</TableCell>

                <TableCell>{product.category.name}</TableCell>

                <TableCell>{product.gender.name}</TableCell>

                <TableCell>
                  {new Date(product.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{
                    py: 5,
                  }}
                >
                  <Typography color="text.secondary">
                    No recent products found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RecentProductsTable;
