import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB already connected.");
            return;
        }

        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }

        await mongoose.connect(mongoURI);  

        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
