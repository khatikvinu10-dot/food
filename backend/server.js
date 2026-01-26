import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import transactionRouter from "./routes/transactionRoute.js";
import webhookRouter from './routes/webhook.js';
import promoRoute from './routes/promoRoute.js'
import footerRoute from './routes/footerRoute.js'


//App config
const app = express();
const port = 4000
//Middlewares
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  webhookRouter
);
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
//DB connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/transaction", transactionRouter);
app.use("/api/promo",promoRoute)
app.use("/api/footer", footerRoute);




app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})