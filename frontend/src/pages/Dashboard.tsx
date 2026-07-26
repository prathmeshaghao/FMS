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
            letterSpacing: -0.5,
            fontSize: {
              xs: "1.8rem",
              md: "2.125rem",
            },
          }}
        >
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Total Products" value={data?.totalProducts ?? 0} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Total Inventory" value={data?.totalInventory ?? 0} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Low Stock" value={data?.lowStock ?? 0} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Out Of Stock" value={data?.outOfStock ?? 0} />
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: "1.3rem",
              md: "1.5rem",
            },
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
