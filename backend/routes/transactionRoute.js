import express from "express";
import { getAllTransactions, stripeWebhook } from "../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.get("/list", getAllTransactions);


export default transactionRouter;
