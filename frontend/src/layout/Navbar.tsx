import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#0F172A",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", height: 72 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          AF
        </Box>

        {/* <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            AMIT FOOTWEAR
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            Inventory Management System
          </Typography>
        </Box> */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Admin
          </Typography>

          <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
