import express, { Request, Response } from "express";
const router = express.Router();
import { updateBalance } from "../services/balance.service";

router.patch("/update-balance", updateBalance);

export default router;
