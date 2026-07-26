import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { InventoryItem } from "../../types/inventory";

type Props = {
  row: InventoryItem;
  onEdit: () => void;
  onDelete: () => void;
};

function InventoryCard({ row, onEdit, onDelete }: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          {row.modelName}
        </Typography>

        <Stack spacing={1.2}>
          <Row label="Company" value={row.company} />
          <Row label="Category" value={row.category} />
          <Row label="Gender" value={row.gender} />
          <Row label="Color" value={row.color} />
          <Row label="Size" value={row.size} />
          <Row
            label="Price"
            value={new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(row.price)}
          />
          <Row label="Quantity" value={row.quantity} />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Chip
            label={row.status}
            color={
              row.status === "In Stock"
                ? "success"
                : row.status === "Low Stock"
                  ? "warning"
                  : "error"
            }
          />

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={onEdit}
            >
              Edit
            </Button>

            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography color="text.secondary">{label}</Typography>

      <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
    </Box>
  );
}

export default InventoryCard;
