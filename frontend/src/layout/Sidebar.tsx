import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const drawerContent = (
    <>
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
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={isSelected}
              onClick={() => setOpen(false)}
              sx={{
                mx: 1.5,
                my: 0.5,
                borderRadius: 2,

                "&.Mui-selected": {
                  bgcolor: "#E8F0FE",
                  color: "#2563EB",
                },

                "&:hover": {
                  bgcolor: "#EEF4FF",
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: 15,
                    }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1400,
            bgcolor: "white",
            boxShadow: 3,
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#9fc3fa",
            boxShadow: "4px 0 24px rgba(15,23,42,.06)",
            borderRight: "1px solid #dfb11b",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;
