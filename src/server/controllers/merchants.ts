import { Request, Response, NextFunction } from "express";

import * as merchantsModel from "../models/merchant";
import { MerchantSchema } from "../utils/types";
import MiddlewareError from "../utils/MiddlewareError";

/**
 * Fetch a list of merchants from the database.
 * @param res If successful, res.locals.merchants will contain an array of Merchant objects.
 */
export async function getMerchants(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dbMerchants: MerchantSchema[] = await merchantsModel.getMerchants();
    // Remove any database parameters
    const merchants: MerchantSchema[] = dbMerchants.map((dbMerchant) => ({
      name: dbMerchant.name,
      tagId: dbMerchant.tagId,
    }));

    res.locals.merchants = merchants;
    return next();
  } catch (err) {
    return next(err);
  }
}

/**
 * Update or create if entry doesn't exist a list of Merchant objects to the database.
 * @param req Requires request body to contain the list of merchants.
 */
export async function updateOrCreate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const merchants: MerchantSchema[] = req.body;

  if (!isValidMerchantArray(merchants)) {
    return next(
      new MiddlewareError("Request body must be an array of merchants.", 400)
    );
  }

  const results: boolean[] = await Promise.all(
    merchants.map((merchant) => merchantsModel.updateOrCreate(merchant))
  );
  const successful = results.every((result) => result);

  if (!successful) {
    return next(new MiddlewareError("Failed to update all merchants.", 500));
  }

  return next();
}

/**
 * Delete a list of Merchant objects from the database.
 * @param req Requires request body to contain the list of merchants.
 */
export async function deleteMany(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const merchants: MerchantSchema[] = req.body;

  if (!isValidMerchantArray(merchants)) {
    return next(
      new MiddlewareError("Request body must be an array of merchants.", 400)
    );
  }

  const results: boolean[] = await Promise.all(
    merchants.map((merchant) => merchantsModel.remove(merchant))
  );
  const successful = results.every((result) => result);

  if (!successful) {
    return next(new MiddlewareError("Failed to remove all merchants.", 500));
  }

  return next();
}

/**
 * Verify all elements of an array of MerchantSchema objects contains all valid properties.
 * @param merchants Array of merchant objects
 */
function isValidMerchantArray(merchants: MerchantSchema[]): boolean {
  return (
    merchants instanceof Array &&
    merchants.every((merchant) => typeof merchant.name === "string")
  );
}

