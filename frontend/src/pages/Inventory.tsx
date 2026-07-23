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
      <Typography variant="h4" sx={{ mb: 2 }}>
        Inventory
      </Typography>
      <InventoryTable rows={data ?? []} />
    </>
  );
}

export default Inventory;
