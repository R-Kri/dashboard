import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import Admin from "./src/models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:8080", credentials: true })); 
app.use(express.json());

// Connect to DB
connectDB();

// Function to seed admins
const seedAdmins = async () => {
    const existingAdmins = await Admin.find();
    if (existingAdmins.length === 0) {
        const admins = [
            { username: "admin1", password: await bcrypt.hash("password1", 10) },
            { username: "admin2", password: await bcrypt.hash("password2", 10) },
            { username: "admin3", password: await bcrypt.hash("password3", 10) },
        ];
        await Admin.insertMany(admins);
        console.log("Admins seeded!");
    }
};
seedAdmins();

// API Routes
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
