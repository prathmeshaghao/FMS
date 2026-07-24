import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type {
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import Stack from "@mui/material/Stack";
import type { ProductFormData } from "../../schemas/product.schema";
import { useFieldArray } from "react-hook-form";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
type VariantCardProps = {
  index: number;
  control: Control<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  removeVariant: UseFieldArrayRemove;
  totalVariants: number;
};

function VariantCard({
  index,
  control,
  register,
  errors,
  removeVariant,
  totalVariants,
}: VariantCardProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${index}.inventory`,
  });

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            🎨 Color Variant {index + 1}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            Different colors of the same shoe.
          </Typography>
        </Box>

        <Button
          color="error"
          variant="text"
          disabled={totalVariants === 1}
          onClick={() => removeVariant(index)}
        >
          Remove Color
        </Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Color"
          {...register(`variants.${index}.color`)}
          error={!!errors?.variants?.[index]?.color}
          helperText={errors?.variants?.[index]?.color?.message}
          sx={{ mb: 3 }}
        />
      </Box>
      {fields.map((_item, inventoryIndex) => (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Size"
            type="number"
            {...register(`variants.${index}.inventory.${inventoryIndex}.size`, {
              valueAsNumber: true,
            })}
            error={
              !!errors.variants?.[index]?.inventory?.[inventoryIndex]?.size
            }
            helperText={
              errors.variants?.[index]?.inventory?.[inventoryIndex]?.size
                ?.message
            }
          />

          <TextField
            label="Price"
            type="number"
            {...register(
              `variants.${index}.inventory.${inventoryIndex}.price`,
              { valueAsNumber: true },
            )}
            error={
              !!errors.variants?.[index]?.inventory?.[inventoryIndex]?.price
            }
            helperText={
              errors.variants?.[index]?.inventory?.[inventoryIndex]?.price
                ?.message
            }
          />

          <TextField
            label="Quantity"
            type="number"
            fullWidth
            {...register(
              `variants.${index}.inventory.${inventoryIndex}.quantity`,
              { valueAsNumber: true },
            )}
            error={
              !!errors.variants?.[index]?.inventory?.[inventoryIndex]?.quantity
            }
            helperText={
              errors.variants?.[index]?.inventory?.[inventoryIndex]?.quantity
                ?.message
            }
          />

          <IconButton
            color="error"
            onClick={() => remove(inventoryIndex)}
            disabled={fields.length === 1}
            sx={{
              alignSelf: "center",
            }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddRoundedIcon />}
        sx={{ mt: 3 }}
        onClick={() =>
          append({
            size: 0,
            price: 0,
            quantity: 0,
          })
        }
      >
        Add Size
      </Button>
    </Paper>
  );
}

export default VariantCard;
