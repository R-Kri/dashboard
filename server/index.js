import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import { seedAdmins } from "./src/utils/seedData.js";

dotenv.config();
const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
    "http://localhost:8080", 
    "https://dashboard-six-delta-99.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

// ✅ Root Route - Fixes "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// ✅ Register Routes BEFORE Starting Server
app.use("/api/admin", adminRoutes);

// Start the server after DB connection and seeding
const startServer = async () => {
    try {
        await connectDB();
        await seedAdmins();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

startServer();
