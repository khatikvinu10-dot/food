import express from "express";
import { getFooterData, updateFooter } from "../controllers/footerController.js";


const router = express.Router();

router.get("/", getFooterData);  //frontend
router.post("/", updateFooter); // admin


//search bar

router.get("/search", async (req, res) => {
  const { q } = req.query;

  try {
    const foods = await foodModel.find({
      name: { $regex: q, $options: "i" }
    });

    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default router;
