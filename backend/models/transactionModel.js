import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "UPI", "Card", "NetBanking"],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending"
    }
}, { timestamps: true });

const transactionModel = mongoose.model("Transaction", transactionSchema);
export default transactionModel;
