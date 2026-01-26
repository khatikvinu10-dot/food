import transactionModel from "../models/transactionModel.js";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionModel.find().sort({ createdAt: -1 });
        res.json({ success: true, data: transactions });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching transactions" });
    }
};


export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log("Signature error:", err.message);
        return res.status(400).send("Webhook Error");
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        console.log("SESSION METADATA:", session.metadata);
        const orderId = session.metadata.orderId;

        const transaction = await transactionModel.findOneAndUpdate(await transactionModel.findOneAndUpdate(
            { orderId: orderId },
            { status: "Success" },
            { new: true }
        ));
        console.log(transaction, "TRUE")

    }

    res.json({ received: true });
};
