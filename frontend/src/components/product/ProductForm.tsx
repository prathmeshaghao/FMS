import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import VariantCard from "./VariantCard";
import { useCompanies } from "../../hooks/useCompanies";
import { useCategories } from "../../hooks/useCategories";
import { useGenders } from "../../hooks/useGenders";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormData,
} from "../../schemas/product.schema";
import { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { Company } from "../../types/company";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCompany } from "../../hooks/useCreateCompany";
import AddCompanyDialog from "../company/AddCompanyDialog";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import AddCategoryDialog from "../category/AddCategoryDialog";

type ProductFormProps = {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  isLoading?: boolean;
};
function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const { data: companies = [] } = useCompanies();
  const companyOptions: Company[] = companies;
  const { data: categories = [] } = useCategories();
  const { data: genders = [] } = useGenders();
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const createCategoryMutation = useCreateCategory();
  const createCompanyMutation = useCreateCompany();
  const queryClient = useQueryClient();
  const handleCreateCompany = async (name: string) => {
    try {
      const company = await createCompanyMutation.mutateAsync(name);

      await queryClient.invalidateQueries({
        queryKey: ["companies"],
      });

      setValue("companyId", company.id);

      setCompanyDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateCategory = async (name: string) => {
    try {
      const category = await createCategoryMutation.mutateAsync(name);

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setValue("categoryId", category.id);

      setCategoryDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    shouldFocusError: true,
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      companyId: 0,
      categoryId: 0,
      genderId: 0,
      modelName: "",

      variants: [
        {
          color: "",

          inventory: [
            {
              size: 0,
              price: 0,
              quantity: 0,
            },
          ],
        },
      ],
    },
  });
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 900,
          mx: "auto",
        }}
      >
        <Card
          elevation={0}
          sx={{
            border: "1px solid #E5E7EB",
            borderRadius: 4,
            mb: 4,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                📦 Product Information
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: "text.secondary",
                }}
              >
                Fill in the basic details of your footwear product.
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {/* ///////////////////////////////////////////////////////            */}
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Controller
                  name="companyId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Autocomplete
                        options={companyOptions}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        value={
                          companyOptions.find(
                            (company) => company.id === field.value,
                          ) ?? null
                        }
                        onChange={(_, value) => {
                          field.onChange(value?.id ?? 0);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Company"
                            error={!!errors.companyId}
                            helperText={errors.companyId?.message}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: 56,
                              },
                            }}
                          />
                        )}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 1,
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => setCompanyDialogOpen(true)}
                        >
                          + Add New Company
                        </Button>
                      </Box>
                    </>
                  )}
                />
              </Grid>

              {/* ///////////////////////////////////////////////////////            */}
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Autocomplete
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(a, b) => a.id === b.id}
                        value={
                          categories.find(
                            (category) => category.id === field.value,
                          ) ?? null
                        }
                        onChange={(_, value) => field.onChange(value?.id ?? 0)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Category"
                            error={!!errors.categoryId}
                            helperText={errors.categoryId?.message}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: 56,
                              },
                            }}
                          />
                        )}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 1,
                          minHeight: 32,
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => setCategoryDialogOpen(true)}
                        >
                          + Add New Category
                        </Button>
                      </Box>
                    </>
                  )}
                />
              </Grid>
              {/* ///////////////////////////////////////////////////////            */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="genderId"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.genderId}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 56,
                        },
                      }}
                    >
                      <InputLabel>Gender</InputLabel>

                      <Select
                        {...field}
                        label="Gender"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        {genders.map((gender: any) => (
                          <MenuItem key={gender.id} value={gender.id}>
                            {gender.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                        {errors.genderId?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* ///////////////////////////////////////////////////////            */}
            </Grid>
            <TextField
              sx={{
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  height: 56,
                },
              }}
              fullWidth
              label="Model Name"
              {...register("modelName")}
              error={!!errors.modelName}
              helperText={errors.modelName?.message}
            />
          </CardContent>
        </Card>

        {fields.map((variant, index) => (
          <VariantCard
            key={variant.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            removeVariant={remove}
            totalVariants={fields.length}
          />
        ))}
        {/* ================================================================ */}
        <Box
          sx={{
            mt: 2,
            pt: 3,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              mb: 3,
            }}
          >
            Total Color Variants:{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {fields.length}
            </Box>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "space-between",
              alignItems: "stretch",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
              startIcon={<AddRoundedIcon />}
              onClick={() =>
                append({
                  color: "",
                  inventory: [
                    {
                      size: 0,
                      price: 0,
                      quantity: 0,
                    },
                  ],
                })
              }
            >
              Add Color Variant
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                width: {
                  xs: "100%",
                  sm: 180,
                },
                height: 48,
              }}
            >
              {isLoading
                ? "Saving..."
                : initialData
                  ? "Update Product"
                  : "Save Product"}
            </Button>
          </Box>
        </Box>
      </Box>
      <AddCompanyDialog
        open={companyDialogOpen}
        loading={createCompanyMutation.isPending}
        onClose={() => setCompanyDialogOpen(false)}
        onSave={handleCreateCompany}
      />
      <AddCategoryDialog
        open={categoryDialogOpen}
        loading={createCategoryMutation.isPending}
        onClose={() => setCategoryDialogOpen(false)}
        onSave={handleCreateCategory}
      />
    </>
  );
}

export default ProductForm;
