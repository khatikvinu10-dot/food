import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String
  },
  companyLinks: {
    type: [String],
    default: ["Home", "About us", "Delivery", "Privacy Policy"]
  }
});

const footerModel = mongoose.model("Footer", footerSchema);
export default footerModel;

