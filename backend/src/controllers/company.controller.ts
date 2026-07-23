import { Request, Response } from "express";

import companyService from "../services/company.service";

import { asyncHandler } from "../utils/asyncHandler";

import { successResponse } from "../utils/apiResponse";

export const getCompanies = asyncHandler(
  async (_req: Request, res: Response) => {
    const companies = await companyService.getAllCompanies();

    res.json(successResponse("Companies fetched successfully", companies));
  },
);
export const createCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const company = await companyService.createCompany(name);

    res
      .status(201)
      .json(successResponse("Company created successfully", company));
  },
);
