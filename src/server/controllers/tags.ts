import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import * as merchantsModel from "../models/merchant";

const prisma = new PrismaClient();

// Create a new tag
export const allTags = async (req: Request, res: Response) => {
  try {
    const tag = await prisma.tags.findMany();
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create tag" });
  }
};

// Create a new tag
export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await prisma.tags.create({
      data: {
        name,
      },
    });
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create tag" });
  }
};

// Change a merchant's tag
export const changeMerchantTag = async (req: Request, res: Response) => {
  try {
    const { name, tagId } = req.body;
    const updatedMerchant = await merchantsModel.updateOrCreate({
      name,
      tagId,
    });
    res.json(updatedMerchant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to change merchant tag" });
  }
};

// Remove a tag from a merchant
export const removeMerchantTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const updatedMerchant = await prisma.merchants.update({
      where: { name: name },
      data: { tagId: null },
    });
    res.json(updatedMerchant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove merchant tag" });
  }
};
