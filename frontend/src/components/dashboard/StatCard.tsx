import { Card, CardContent, Typography, Box } from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type StatCardProps = {
  title: string;
  value: number;
};

function StatCard({ title, value }: StatCardProps) {
  const getIcon = () => {
    switch (title) {
      case "Total Products":
        return (
          <Inventory2RoundedIcon
            sx={{
              color: "#2563EB",
              fontSize: 30,
            }}
          />
        );

      case "Total Inventory":
        return (
          <WarehouseRoundedIcon
            sx={{
              color: "#16A34A",
              fontSize: 30,
            }}
          />
        );

      case "Low Stock":
        return (
          <WarningAmberRoundedIcon
            sx={{
              color: "#F59E0B",
              fontSize: 30,
            }}
          />
        );

      default:
        return (
          <CancelRoundedIcon
            sx={{
              color: "#DC2626",
              fontSize: 30,
            }}
          />
        );
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#FCFDFE",
        border: "1px solid #9baec7",
        borderRadius: 2.5,
        boxShadow: "0 2px 12px rgba(15,23,42,0.04)",

        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 28px rgba(15,23,42,0.08)",
          borderColor: "#e68d8d",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "14px",
              background: "#F3F7FD",
              border: "1px solid #defde3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getIcon()}
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid #EEF2F7",
              my: 2,
            }}
          />
          <Box
            sx={{
              px: 1.2,
              py: 0.4,
              borderRadius: 5,
              bgcolor: "#ECFDF3",
              border: "1px solid #3b9458",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#38b152",
                fontWeight: 700,
              }}
            >
              Active
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
