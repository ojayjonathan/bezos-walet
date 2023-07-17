import * as tagController from "../controllers/tags";
import { Router } from "express";

const router: Router = Router();

// Create a new tag
router.get("/", tagController.allTags);

// Create a new tag
router.post("/", tagController.createTag);

// Change a merchant's tag
router.put("/", tagController.changeMerchantTag);

// Remove a tag from a merchant
router.delete("/:name", tagController.removeMerchantTag);

export default router;
