import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#F8FAFC",
          minHeight: "100vh",
          px: 4,
          py: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
