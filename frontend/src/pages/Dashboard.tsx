import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import StatCard from "../components/dashboard/StatCard";
import { useDashboard } from "../hooks/useDashboard";
import RecentProductsTable from "../components/dashboard/RecentProductsTable";

function Dashboard() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Typography color="error">Failed to load dashboard.</Typography>;
  }
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="Total Products" value={data?.totalProducts ?? 0} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="Total Inventory" value={data?.totalInventory ?? 0} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="Low Stock" value={data?.lowStock ?? 0} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="Out Of Stock" value={data?.outOfStock ?? 0} />
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          Recent Products
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          Latest products added to inventory
        </Typography>
      </Box>

      <RecentProductsTable />
    </Box>
  );
}

export default Dashboard;
