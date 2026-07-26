import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowX: "hidden",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          py: {
            xs: 8,
            md: 3,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
