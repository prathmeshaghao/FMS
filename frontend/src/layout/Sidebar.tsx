import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 220;

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Inventory",
    path: "/inventory",
  },
  {
    label: "Add Product",
    path: "/products/new",
  },
];

function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",

          bgcolor: "#9fc3fa",

          boxShadow: "4px 0 24px rgba(15,23,42,.06)",

          borderRight: "1px solid #dfb11b",

          pt: 0, // Same height as Navbar
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 4,
          borderBottom: "1px solid #E2E8F0",
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: 3,
            background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 22,
            mb: 2,
          }}
        >
          AF
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          AMIT
          <br />
          FOOTWEAR
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mt: 0.5,
          }}
        >
          Inventory System
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 1.5,
              my: 0.5,
              borderRadius: 2,

              "&.Mui-selected": {
                bgcolor: "#E8F0FE",
                color: "#2563EB",
                fontWeight: 600,
              },

              "&:hover": {
                bgcolor: "#EEF4FF",
              },
            }}
          >
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  sx: {
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    fontSize: "15px",
                    "&.Mui-selected": {
                      background: "linear-gradient(90deg,#EAF2FF,#DCEBFF)",

                      color: "#2563EB",

                      borderLeft: "4px solid #2563EB",

                      "& .MuiTypography-root": {
                        fontWeight: 700,
                      },
                    },
                    "&:hover": {
                      transform: "translateX(3px)",
                      color: "#e4a828",
                      transition: ".2s",
                    },
                  },
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
