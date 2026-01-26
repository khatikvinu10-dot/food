import PromoCode from "../models/promocode.js";


   // CREATE PROMO CODE (ADMIN)
 
export const createPromoCode = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderValue,
      expiryDate
    } = req.body;

    const existing = await PromoCode.findOne({ code });
    if (existing) {
      return res.json({
        success: false,
        message: "Promo code already exists"
      });
    }

    const promo = await PromoCode.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minOrderValue,
      expiryDate
    });

    res.json({
      success: true,
      message: "Promo code created successfully",
      promo
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


 //  APPLY PROMO CODE
 
export const applyPromoCode = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const promo = await PromoCode.findOne({
      code: code.toUpperCase(),
      isActive: true
    });

    if (!promo) {
      return res.json({
        success: false,
        message: "Invalid promo code"
      });
    }

    if (new Date() > promo.expiryDate) {
      return res.json({
        success: false,
        message: "Promo code expired"
      });
    }

    if (orderAmount < promo.minOrderValue) {
      return res.json({
        success: false,
        message: `Minimum order value is ₹${promo.minOrderValue}`
      });
    }

    let discount = 0;

    if (promo.discountType === "PERCENT") {
      discount = (orderAmount * promo.discountValue) / 100;
    } else {
      discount = promo.discountValue;
    }

    if (discount > orderAmount) discount = orderAmount;

    res.json({
      success: true,
      discount,
      finalAmount: orderAmount - discount,
      promoCode: promo.code
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


  // GET ALL PROMO CODES

export const getAllPromoCodes = async (req, res) => {
  try {
    const promos = await PromoCode.find().sort({ createdAt: -1 });
    res.json({ success: true, promos });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


  // DISABLE PROMO CODE
   
export const disablePromoCode = async (req, res) => {
  try {
    const { id } = req.params;

    await PromoCode.findByIdAndUpdate(id, { isActive: false });

    res.json({
      success: true,
      message: "Promo code disabled"
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};
