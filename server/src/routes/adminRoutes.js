import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";
import protect from "../middleware/adminMiddleware.js";
import { seedAdmins } from "../utils/seedData.js";
import mongoose from "mongoose";

const router = express.Router();

// Seed admins route (disabled in production)
router.post("/seed", async (req, res) => {
    if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ message: "Not allowed in production" });
    }

    try {
        await seedAdmins();
        res.status(200).json({ message: "Admins seeded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error seeding admins", error: error.message });
    }
});

// Admin Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;  
    
    console.log("in th /login");
    

    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("MongoDB not connected, reconnecting...");
            await connectDB();
        }

        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.json({
            token,
            user: {
                id: admin._id,
                username: admin.username,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Protected profile route
router.get("/profile", protect, async (req, res) => {

    console.log("in the /profile");
    
    try {
        const admin = await Admin.findById(req.admin.id).select("-password");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
