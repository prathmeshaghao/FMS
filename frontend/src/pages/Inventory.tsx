import { Box, CircularProgress, Typography } from "@mui/material";

import InventoryTable from "../components/inventory/InventoryTable";

import { useInventory } from "../hooks/useInventory";

function Inventory() {
  const { data, isLoading, error } = useInventory();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Failed to load inventory.</Typography>;
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          fontSize: {
            xs: "1.8rem",
            md: "2.125rem",
          },
        }}
      >
        Inventory
      </Typography>
      <InventoryTable rows={data ?? []} />
    </>
  );
}

export default Inventory;
