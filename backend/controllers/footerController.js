import footerModel from "../models/footerModel.js";

// GET footer data
export const getFooterData = async (req, res) => {
  try {
    const footer = await footerModel.findOne();
    res.json({ success: true, data: footer });
  } catch (error) {
    res.json({ success: false, message: "Failed to load footer" });
  }
};

// ADD / UPDATE footer data (Admin)
export const updateFooter = async (req, res) => {
  try {
    const data = req.body;
    await footerModel.findOneAndUpdate({}, data, { upsert: true });
    res.json({ success: true, message: "Footer updated" });
  } catch (error) {
    res.json({ success: false, message: "Update failed" });
  }
};
