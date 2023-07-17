/**
 * Main router used to connect all api endpoints to Express app.
 */

import { Router } from "express";

import transactionsRouter from "./transactions";
import merchantsRouter from "./merchants";
import tagsRouter from "./tags";

const router: Router = Router();

router.use("/transactions", transactionsRouter);
router.use("/merchants", merchantsRouter);
router.use("/tags", tagsRouter);

export default router;
