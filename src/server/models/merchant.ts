import { PrismaClient } from '@prisma/client';
import { MerchantSchema } from '../utils/types';

const prisma = new PrismaClient();

/**
 * Get all merchants in database.
 * @returns Array of merchant objects with additional database fields.
 */
export async function getMerchants(): Promise<MerchantSchema[]> {
  return await prisma.merchants.findMany();
}

/**
 * Update or create if entity doesn't exist a merchant in the database.
 * @param merchant New or existing merchant.
 * @returns Boolean result of operation.
 */
export async function updateOrCreate(merchant: MerchantSchema): Promise<boolean> {
  try {
    await prisma.merchants.upsert({
      where: {
        name: merchant.name,
      },
      update: {
        isOwnedByBezos: merchant.isOwnedByBezos,
      },
      create: 
        merchant
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Delete an merchant if it exist in the database.
 * @param merchant Merchant to be deleted. Matched on name property.
 * @returns Boolean result of operation.
 */
export async function remove(merchant: MerchantSchema): Promise<boolean> {
  try {
    const result = await prisma.merchants.deleteMany({ where: { name: merchant.name } });
    return result.count > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}
