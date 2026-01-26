import express from "express";
import PromoCode from "../models/promocode.js";
import { applyPromoCode, createPromoCode, disablePromoCode, getAllPromoCodes } from "../controllers/promoController.js";


const router = express.Router();

router.post("/create", createPromoCode);
router.post("/apply", applyPromoCode);
router.get("/all", getAllPromoCodes);
router.put("/disable/:id", disablePromoCode);

// CREATE PROMO CODE 
router.post("/create", async (req, res) => {
  try {
    const promo = await PromoCode.create(req.body);
    res.json({ success: true, promo });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// APPLY PROMO CODE 
router.post("/apply", async (req, res) => {
  const { code, orderAmount } = req.body;

  const promo = await PromoCode.findOne({ code, isActive: true });

  if (!promo) {
    return res.json({ success: false, message: "Invalid promo code" });
  }

  if (new Date() > promo.expiryDate) {
    return res.json({ success: false, message: "Promo code expired" });
  }

  if (orderAmount < promo.minOrderValue) {
    return res.json({
      success: false,
      message: `Minimum order ₹${promo.minOrderValue}`
    });
  }

  let discount =
    promo.discountType === "PERCENT"
      ? (orderAmount * promo.discountValue) / 100
      : promo.discountValue;

  res.json({
    success: true,
    discount,
    finalAmount: orderAmount - discount
  });
});

export default router;
