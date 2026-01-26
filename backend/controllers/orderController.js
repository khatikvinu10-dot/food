import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import generateOrderId from "../services/helper.js";
import transactionModel from "../models/transactionModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order for frontend
const placeorder = async (req, res) => {

    const forntend_url = "http://localhost:5173";
    const reqParams = req.body

    try {
        const newOrder = new orderModel({
            userId: reqParams.userId,
            items: reqParams.items,
            amount: reqParams.amount,
            address: reqParams.address,
        })

        const orderId = generateOrderId(10);
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const data = {
            orderId:orderId,
            userId:reqParams.userId,
            userName: reqParams.address.firstName,
            amount: reqParams.amount,
            paymentMethod:"UPI",
        }
        const transaction = await transactionModel.create(data);
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${forntend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${forntend_url}/verify?success=false&orderId=${newOrder._id}`,
            metadata:{
                orderId:orderId,
                transactionId:transaction._id.toString(),
                userId:reqParams.userId.toString(),
            }
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//user order for frontend
const userOrders = async (req, res) => {
    try {

        const orderid = req.body.orderid;
        let orders = [];
        if (orderid != null) {
            orders = await orderModel.find({ userId: req.body.userId, _id: orderid });
        } else {
            orders = await orderModel.find({ userId: req.body.userId });
        }
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
// listing order for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({date:-1});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
};
// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}
// track order
export const trackOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.userId; 

        const order = await orderModel.findOne({
            _id: orderId,
            userId: userId
        },);
        console.log(order)

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};




export { placeorder, verifyOrder, userOrders, listOrders, updateStatus }