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
        p: {
          xs: 2,
          md: 4,
        },
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
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
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
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
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              height: 56,
            },
          }}
          label="Color"
          {...register(`variants.${index}.color`)}
          error={!!errors?.variants?.[index]?.color}
          helperText={errors?.variants?.[index]?.color?.message}
        />
      </Box>
      {fields.map((item, inventoryIndex) => (
        <Stack
          key={item.id}
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          sx={{
            mb: 2,
            alignItems: {
              xs: "stretch",
              md: "center",
            },
          }}
        >
          <TextField
            fullWidth
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
            fullWidth
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
            fullWidth
            label="Quantity"
            type="number"
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
              alignSelf: {
                xs: "flex-end",
                md: "center",
              },
            }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddRoundedIcon />}
        sx={{
          mt: 3,
          width: {
            xs: "100%",
            sm: "auto",
          },
        }}
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
