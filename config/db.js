import mongoose from "mongoose";
import * as dotenv from "dotenv";

export const connectDB = async () => {
    dotenv.config();

    const uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(uri).then((con) => {
            console.log(`MongoDB connected - ${con.connection.host}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};