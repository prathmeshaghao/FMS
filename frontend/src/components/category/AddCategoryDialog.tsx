import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

type AddCategoryDialogProps = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSave: (name: string) => Promise<void> | void;
};

function AddCategoryDialog({
  open,
  loading = false,
  onClose,
  onSave,
}: AddCategoryDialogProps) {
  const [CategoryName, setCategoryName] = useState("");

  const handleSave = async () => {
    if (!CategoryName.trim()) return;

    await onSave(CategoryName.trim());

    setCategoryName("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New Category</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Category Name"
          value={CategoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          sx={{
            mt: 1,
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCategoryDialog;
