import express from "express";
import { stripeWebhook } from "../controllers/transactionController.js";

const webhookRouter = express.Router();


webhookRouter.post("/callback-stripe",stripeWebhook)

export default webhookRouter;