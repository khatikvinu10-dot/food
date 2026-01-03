import mongoose from 'mongoose';
import 'dotenv'


export const connectDB = async () => {
    mongoose.connect(process.env.MONGO).then(() => console.log("DB connected"));
}