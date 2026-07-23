import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

type AddCompanyDialogProps = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSave: (name: string) => Promise<void> | void;
};

function AddCompanyDialog({
  open,
  loading = false,
  onClose,
  onSave,
}: AddCompanyDialogProps) {
  const [companyName, setCompanyName] = useState("");

  const handleSave = async () => {
    if (!companyName.trim()) return;

    await onSave(companyName.trim());

    setCompanyName("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New Company</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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

export default AddCompanyDialog;
