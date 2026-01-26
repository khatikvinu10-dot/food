import express from "express"
import authMiddelware from "../middleware/auth.js"
import { placeorder, verifyOrder,userOrders, listOrders, updateStatus, trackOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddelware,placeorder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrders",authMiddelware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/track", authMiddelware, trackOrder);


export default orderRouter;