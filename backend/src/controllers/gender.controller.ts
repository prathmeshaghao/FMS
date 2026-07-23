import { Request, Response } from "express";

import genderService from "../services/gender.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";

export const getGenders = asyncHandler(async (_req: Request, res: Response) => {
  const genders = await genderService.getAllGenders();

  res
    .status(200)
    .json(successResponse("Genders fetched successfully", genders));
});
